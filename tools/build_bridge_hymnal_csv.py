#!/usr/bin/env python3
"""Build a normalized Bridge Hymnal CSV from CSV or JSON input.

Usage:
  python tools/build_bridge_hymnal_csv.py --input full_hymns.csv --output bridge_hymnal_songs.csv --expected-count 638
  python tools/build_bridge_hymnal_csv.py --input full_hymns.json --output bridge_hymnal_songs.csv --expected-count 638
"""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path
from typing import Dict, Iterable, List, Tuple

CANONICAL_FIELDS = [
    "id",
    "number",
    "title",
    "author",
    "composer",
    "theme",
    "hymn_book_title",
    "hymn_book_abbr",
    "lyrics",
]

FIELD_ALIASES = {
    "number": ["number", "hymn_number", "song_number", "no", "num"],
    "title": ["title", "hymn_title", "song_title", "name"],
    "author": ["author", "writer", "lyricist"],
    "composer": ["composer", "tune", "music_by", "composed_by"],
    "theme": ["theme", "category", "topic"],
    "lyrics": ["lyrics", "lyric", "text", "body", "verses"],
}


def normalize_key(key: str) -> str:
    return key.strip().lower().replace(" ", "_")


def pick_value(row: Dict[str, str], logical_field: str, default: str = "") -> str:
    for alias in FIELD_ALIASES[logical_field]:
        if alias in row and str(row[alias]).strip() != "":
            return str(row[alias]).strip()
    return default


def load_rows(input_path: Path) -> List[Dict[str, str]]:
    suffix = input_path.suffix.lower()
    if suffix == ".csv":
        with input_path.open("r", encoding="utf-8-sig", newline="") as f:
            reader = csv.DictReader(f)
            rows = []
            for raw in reader:
                rows.append({normalize_key(k): (v if v is not None else "") for k, v in raw.items() if k is not None})
            return rows

    if suffix == ".json":
        with input_path.open("r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, dict):
            if "hymns" in data and isinstance(data["hymns"], list):
                data = data["hymns"]
            else:
                raise ValueError("JSON object must contain a list under the 'hymns' key.")
        if not isinstance(data, list):
            raise ValueError("JSON input must be a list of hymn objects or an object with a 'hymns' list.")
        rows = []
        for item in data:
            if not isinstance(item, dict):
                continue
            rows.append({normalize_key(str(k)): ("" if v is None else str(v)) for k, v in item.items()})
        return rows

    raise ValueError("Unsupported input type. Use .csv or .json")


def to_int(value: str, fallback: int) -> int:
    try:
        return int(str(value).strip())
    except (TypeError, ValueError):
        return fallback


def transform_rows(raw_rows: Iterable[Dict[str, str]]) -> Tuple[List[Dict[str, str]], List[str]]:
    warnings: List[str] = []
    transformed: List[Dict[str, str]] = []

    for idx, raw in enumerate(raw_rows, start=1):
        number_raw = pick_value(raw, "number")
        title = pick_value(raw, "title")
        author = pick_value(raw, "author", default="Unknown")
        composer = pick_value(raw, "composer", default="Unknown")
        theme = pick_value(raw, "theme")
        lyrics = pick_value(raw, "lyrics")

        if not number_raw or not title:
            warnings.append(f"Skipped row {idx}: missing required number/title")
            continue

        number = to_int(number_raw, fallback=-1)
        if number < 1:
            warnings.append(f"Skipped row {idx}: invalid number '{number_raw}'")
            continue

        transformed.append(
            {
                "id": str(len(transformed) + 1),
                "number": str(number),
                "title": title,
                "author": author,
                "composer": composer,
                "theme": theme,
                "hymn_book_title": "Bridge Hymnal",
                "hymn_book_abbr": "BH",
                "lyrics": lyrics,
            }
        )

    transformed.sort(key=lambda r: int(r["number"]))

    seen = set()
    deduped = []
    for row in transformed:
        n = row["number"]
        if n in seen:
            warnings.append(f"Duplicate hymn number dropped: {n} ({row['title']})")
            continue
        seen.add(n)
        row["id"] = str(len(deduped) + 1)
        deduped.append(row)

    return deduped, warnings


def write_csv(rows: List[Dict[str, str]], output_path: Path) -> None:
    with output_path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=CANONICAL_FIELDS)
        writer.writeheader()
        writer.writerows(rows)


def main() -> int:
    parser = argparse.ArgumentParser(description="Build normalized Bridge Hymnal CSV")
    parser.add_argument("--input", required=True, help="Input file path (.csv or .json)")
    parser.add_argument("--output", default="bridge_hymnal_songs.csv", help="Output CSV path")
    parser.add_argument("--expected-count", type=int, default=638, help="Expected hymn count for validation")
    args = parser.parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output)

    if not input_path.exists():
        print(f"ERROR: Input file not found: {input_path}")
        return 1

    try:
        raw = load_rows(input_path)
        rows, warnings = transform_rows(raw)
        write_csv(rows, output_path)
    except Exception as exc:
        print(f"ERROR: {exc}")
        return 1

    print(f"Input rows read: {len(raw)}")
    print(f"Output hymns written: {len(rows)}")
    print(f"Output file: {output_path}")

    if warnings:
        print("Warnings:")
        for w in warnings[:50]:
            print(f"- {w}")
        if len(warnings) > 50:
            print(f"- ... and {len(warnings) - 50} more")

    if args.expected_count and len(rows) != args.expected_count:
        print(
            f"COUNT CHECK: expected {args.expected_count}, got {len(rows)}. "
            "Please verify your source file includes all hymns."
        )
    else:
        print("COUNT CHECK: OK")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
