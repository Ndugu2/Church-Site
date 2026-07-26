import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Music, Download } from 'lucide-react';

interface Hymn {
  id: number;
  number: number;
  title: string;
  author: string;
  composer: string;
  tune_name?: string;
  lyrics: string;
  theme: string;
  hymn_book_title: string;
  hymn_book_abbr: string;
}

interface HymnBook {
  id: number;
  title: string;
  abbreviation: string;
  description: string;
  publisher: string;
  year: number;
  hymn_count: number;
  is_featured: boolean;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Sample hymn data for Bridge Hymnal and other collections
const SAMPLE_HYMN_BOOKS: HymnBook[] = [
  {
    id: 1,
    title: 'Bridge Hymnal',
    abbreviation: 'BH',
    description: 'A comprehensive collection of hymns for worship, prayer, and devotion.',
    publisher: 'Review and Herald Publishing Association',
    year: 2002,
    hymn_count: 638,
    is_featured: true
  },
  {
    id: 2,
    title: 'Church Hymnal',
    abbreviation: 'CH',
    description: 'Traditional and contemporary spiritual hymns for all occasions.',
    publisher: 'SDA Church',
    year: 2000,
    hymn_count: 500,
    is_featured: true
  },
  {
    id: 3,
    title: 'Seventh-day Adventist Hymnal',
    abbreviation: 'SDA',
    description: 'Official hymnal of the Seventh-day Adventist Church.',
    publisher: 'Review and Herald Publishing Association',
    year: 1985,
    hymn_count: 695,
    is_featured: false
  },
];

const SAMPLE_HYMNS: Hymn[] = [
  {
    id: 1,
    number: 1,
    title: 'All Praise to Jesus\' Holy Name',
    author: 'Unknown',
    composer: 'Unknown',
    lyrics: `All praise to Jesus' holy name,
Let every heart his power proclaim,
And let us bow before his throne,
Our Savior, King and Lord alone.

Chorus:
Praise God, praise God from whom all blessings flow;
Praise Him, all creatures here below;
Praise Him above, ye heavenly host;
Praise Father, Son, and Holy Ghost.`,
    theme: 'Praise',
    hymn_book_title: 'Bridge Hymnal',
    hymn_book_abbr: 'BH'
  },
  {
    id: 2,
    number: 41,
    title: 'Jesus, Savior, Pilot Me',
    author: 'Edward Hopper',
    composer: 'John Edgar Gould',
    lyrics: `Jesus, Savior, pilot me
Over life's tempestuous sea;
Unknown waves before me roll,
Hiding rock and treacherous shoal;
Chart and compass come from Thee—
Jesus, Savior, pilot me.

As a mother stills her child,
Thou canst hush the ocean wild;
Boisterous waves obey Thy will
When Thou say'st to them, "Be still!"
Wondrous Sovereign of the sea,
Jesus, Savior, pilot me.`,
    theme: 'Trust & Guidance',
    hymn_book_title: 'Bridge Hymnal',
    hymn_book_abbr: 'BH'
  },
  {
    id: 3,
    number: 67,
    title: 'Holy, Holy, Holy! Lord God Almighty',
    author: 'Reginald Heber',
    composer: 'John Bacchus Dykes',
    lyrics: `Holy, holy, holy! Lord God Almighty!
Early in the morning our song shall rise to Thee;
Holy, holy, holy, merciful and mighty!
God in three Persons, blessed Trinity!

Holy, holy, holy! All the saints adore Thee,
Casting down their golden crowns around the glassy sea;
Cherubim and seraphim falling down before Thee,
Which wert and art and evermore shall be.

Holy, holy, holy! Though the darkness hide Thee,
Though the eye of sinful man Thy glory may not see;
Only Thou art holy; there is none beside Thee,
Perfect in power, in love, and purity.`,
    theme: 'Worship',
    hymn_book_title: 'Bridge Hymnal',
    hymn_book_abbr: 'BH'
  },
  {
    id: 4,
    number: 73,
    title: 'Jesus, I My Cross Have Taken',
    author: 'Henry Francis Lyte',
    composer: 'Jude Hill',
    lyrics: `Jesus, I my cross have taken,
All to leave and follow Thee;
Destitute, despised, forsaken,
Thou from hence my all shall be.
Perish every fond ambition,
All I've sought or hoped or known;
Yet how rich is my condition!
God and Heaven are still my own.

Let the world despise and leave me,
They have left my Savior too;
Human hearts and looks deceive me—
Thou art not, like them, untrue.
And while Thou shalt smile upon me,
God of wisdom, love, and might,
Foes may hate and friends disown me;
Show Thy face and all is bright.`,
    theme: 'Commitment',
    hymn_book_title: 'Bridge Hymnal',
    hymn_book_abbr: 'BH'
  },
  {
    id: 5,
    number: 133,
    title: 'There Is a Fountain Filled With Blood',
    author: 'William Cowper',
    composer: 'American Melody',
    lyrics: `There is a fountain filled with blood
Drawn from Immanuel's veins;
And sinners plunged beneath that flood
Lose all their guilty stains.
Lose all their guilty stains,
Lose all their guilty stains;
And sinners plunged beneath that flood
Lose all their guilty stains.

Dear dying Lamb, Thy precious blood
Shall never lose its power
Till all the ransomed Church of God
Be saved, to sin no more.
Be saved, to sin no more,
Be saved, to sin no more;
Till all the ransomed Church of God
Be saved, to sin no more.`,
    theme: 'Redemption',
    hymn_book_title: 'Bridge Hymnal',
    hymn_book_abbr: 'BH'
  },
  {
    id: 6,
    number: 167,
    title: 'Power in the Blood',
    author: 'Lewis E. Jones',
    composer: 'Lewis E. Jones',
    lyrics: `Would you be free from the burden of sin?
There's power in the blood, power in the blood;
Would you o'er evil a victory win?
There's power in the blood of the Lamb.

Chorus:
There is power, power, wonder-working power
In the blood of the Lamb;
There is power, power, wonder-working power
In the precious blood of the Lamb.

Would you be free from your passion and pride?
There's power in the blood, power in the blood;
Come for a cleansing to Calvary's tide;
There's power in the blood of the Lamb.`,
    theme: 'Victory',
    hymn_book_title: 'Bridge Hymnal',
    hymn_book_abbr: 'BH'
  },
  {
    id: 7,
    number: 184,
    title: 'O Love That Wilt Not Let Me Go',
    author: 'George Matheson',
    composer: 'Albert Peace',
    lyrics: `O Love that wilt not let me go,
I rest my weary soul in Thee;
I give Thee back the life I owe,
That in Thine ocean depths its flow
May richer, fuller be.

O Light that followest all my way,
I yield my flickering torch to Thee;
My heart restores its borrowed ray,
That in Thy sunshine's blaze its day
May brighter, fairer be.

O Joy that seekest me through pain,
I cannot close my heart to Thee;
I trace the rainbow through the rain,
And feel the promise is not vain
That morn shall tearless be.`,
    theme: 'Love & Trust',
    hymn_book_title: 'Bridge Hymnal',
    hymn_book_abbr: 'BH'
  },
  {
    id: 8,
    number: 212,
    title: 'Jesus Paid It All',
    author: 'Elvina M. Hall',
    composer: 'John T. Grape',
    lyrics: `I hear the Savior say,
"Thy strength indeed is small;
Child of weakness, watch and pray,
Find in Me thine all in all."

Chorus:
Jesus paid it all,
All to Him I owe;
Sin had left a crimson stain—
He washed it white as snow.

For nothing good have I
Whereby my hope secure,
I nothing have, I all things need,
In Jesus Christ am sure.

Lord, now indeed I find
Thy power and Thy grace,
Reigning in my inmost mind,
Thou hast won the place.`,
    theme: 'Redemption',
    hymn_book_title: 'Bridge Hymnal',
    hymn_book_abbr: 'BH'
  },
  {
    id: 9,
    number: 253,
    title: 'Jesus, Keep Me Near the Cross',
    author: 'Fanny J. Crosby',
    composer: 'William H. Doane',
    lyrics: `Jesus, keep me near the cross,
There a precious fountain,
Free to all, a healing stream,
Flows from Calvary's mountain.

Chorus:
In the cross, in the cross,
Be my glory ever,
Till my raptured soul shall find
Rest beyond the river.

Near the cross, a trembling soul,
Love and mercy found me;
There the bright and morning star
Sheds its beams around me.

Near the cross! O Lamb divine,
Richest treasures welcome;
Singing o'er and o'er anew,
"All the riches here are mine."`,
    theme: 'Devotion',
    hymn_book_title: 'Bridge Hymnal',
    hymn_book_abbr: 'BH'
  },
  {
    id: 10,
    number: 625,
    title: 'There Is a Better World',
    author: 'Isaac Watts',
    composer: 'Unknown',
    lyrics: `There is a better world, we're told,
Where sin and sorrow cease,
Where light surpasses earthly gold,
And saints forever see the Lord
In righteousness and peace.

O may my soul take flight to soar
To that celestial shore,
Where I shall know my Savior dear,
And worship Him forevermore,
When in His presence I appear,
Forever and forever there.

Though here below my way seems long,
And trials press me sore,
I'll sing a pilgrim's hopeful song,
And press toward the realm above,
Where Christ my King shall greet me there,
With everlasting love.`,
    theme: 'Heaven & Hope',
    hymn_book_title: 'Bridge Hymnal',
    hymn_book_abbr: 'BH'
  },
  {
    id: 11,
    number: 624,
    title: 'How Firm a Foundation',
    author: 'Robert Keen (possibly)',
    composer: 'Unknown',
    lyrics: `How firm a foundation, ye saints of the Lord,
Is laid for your faith in His excellent word!
What more can He say than to you He has said,
You, who unto Jesus for refuge have fled?

"Fear not, I am with thee, O be not dismayed,
For I am thy God, and will still give thee aid;
I'll strengthen thee, help thee, and cause thee to stand,
Upheld by My righteous, omnipotent hand.

"When through the deep waters I call thee to go,
The rivers of woe shall not thee overflow;
For I will be with thee, thy troubles to bless,
And sanctify to thee thy deepest distress.`,
    theme: 'Faith',
    hymn_book_title: 'Bridge Hymnal',
    hymn_book_abbr: 'BH'
  },
];

export const HymnsPage: React.FC = () => {
  const [hymnBooks] = useState<HymnBook[]>(SAMPLE_HYMN_BOOKS);
  const [hymns] = useState<Hymn[]>(SAMPLE_HYMNS);
  const [selectedBook, setSelectedBook] = useState<HymnBook | null>(SAMPLE_HYMN_BOOKS[0]);
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hymnNumberInput, setHymnNumberInput] = useState('');
  const [filterTheme, setFilterTheme] = useState('');
  const [view, setView] = useState<'books' | 'hymns' | 'detail'>('books');

  // Filter hymns by selected book and search query
  const filteredHymns = hymns.filter(h => {
    const matchesBook = !selectedBook || h.hymn_book_title === selectedBook.title;
    const matchesSearch = !searchQuery || 
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.number.toString().includes(searchQuery) ||
      h.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTheme = !filterTheme || h.theme === filterTheme;
    return matchesBook && matchesSearch && matchesTheme;
  });

  // Get unique themes
  const themes = Array.from(new Set(hymns.map(h => h.theme))).filter(Boolean);

  const handleHymnSelect = (hymn: Hymn) => {
    setSelectedHymn(hymn);
    setView('detail');
  };

  // Jump to hymn by number
  const jumpToHymnByNumber = (number: string) => {
    if (!number) return;
    const hymnNum = parseInt(number, 10);
    const foundHymn = filteredHymns.find(h => h.number === hymnNum);
    if (foundHymn) {
      handleHymnSelect(foundHymn);
      setHymnNumberInput('');
    }
  };

  const downloadHymnAsPDF = (hymn: Hymn) => {
    // In a real app, this would generate a PDF
    alert(`Download PDF for: ${hymn.title} (${hymn.hymn_book_abbr} #${hymn.number})`);
  };

  return (
    <div>
      {/* Page Header */}
      <motion.div className="page-header" variants={fadeUp} initial="hidden" animate="visible">
        <div className="container text-center">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Music size={40} color="var(--accent)" />
            <h1>Hymn Books</h1>
          </div>
          <p>Explore our collection of beautiful hymns for worship, prayer, and devotion</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="section-padding">
        <div className="container">
          {view === 'books' && (
            <>
              {/* Search Bar */}
              <motion.div 
                style={{ marginBottom: '2rem' }}
                variants={fadeUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
              >
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  maxWidth: '500px',
                  margin: '0 auto'
                }}>
                  <div style={{
                    flex: 1,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Search size={20} style={{
                      position: 'absolute',
                      left: '1rem',
                      color: '#999'
                    }} />
                    <input
                      type="text"
                      placeholder="Search hymns by title, number, or author..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.5rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Hymn Books Grid */}
              <motion.div 
                className="grid grid-3 gap-3 margin-bottom-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {hymnBooks.map(book => (
                  <motion.div
                    key={book.id}
                    className={`card hymn-book-card ${book.is_featured ? 'featured' : ''}`}
                    variants={staggerItem}
                    whileHover={{ y: -8, boxShadow: '0 20px 35px rgba(212, 175, 55, 0.2)' }}
                    onClick={() => {
                      setSelectedBook(book);
                      setSearchQuery('');
                      setFilterTheme('');
                      setView('hymns');
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1))`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Music size={32} color="var(--accent)" />
                      </div>
                      {book.is_featured && (
                        <span style={{
                          background: `linear-gradient(135deg, var(--accent), ${book.is_featured ? 'rgba(212, 175, 55, 0.8)' : 'var(--accent)'})`,
                          color: 'white',
                          padding: '0.35rem 0.85rem',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          letterSpacing: '0.5px',
                          boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
                        }}>
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 style={{ color: 'var(--primary)', marginBottom: '0.75rem', fontSize: '1.3rem', fontWeight: '600' }}>{book.title}</h3>
                    <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                      {book.description}
                    </p>
                    <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '1.25rem', fontSize: '0.9rem', color: '#777' }}>
                      <p style={{ marginBottom: '0.4rem' }}><strong style={{ color: 'var(--primary)' }}>{book.hymn_count}</strong> hymns</p>
                      <p style={{ marginBottom: '0.4rem' }}>Publisher: {book.publisher}</p>
                      {book.year && <p>Year: {book.year}</p>}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}

          {view === 'hymns' && selectedBook && (
            <>
              {/* Back Button and Book Header */}
              <motion.div 
                style={{ marginBottom: '2rem' }}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <button
                  onClick={() => setView('books')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginBottom: '1rem',
                    textDecoration: 'underline'
                  }}
                >
                  ← Back to Hymn Books
                </button>
                <h2>{selectedBook.title}</h2>
                <p style={{ color: '#666' }}>{selectedBook.description}</p>
              </motion.div>

              {/* Search and Filter */}
              <motion.div 
                style={{ marginBottom: '2rem', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '1rem', alignItems: 'center' }}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1
                }}>
                  <Search size={20} style={{
                    position: 'absolute',
                    left: '1rem',
                    color: '#999'
                  }} />
                  <input
                    type="text"
                    placeholder="Search by hymn title or number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.5rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Jump to Hymn by Number */}
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center'
                }}>
                  <input
                    type="number"
                    placeholder="Hymn #"
                    value={hymnNumberInput}
                    onChange={(e) => setHymnNumberInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        jumpToHymnByNumber(hymnNumberInput);
                      }
                    }}
                    style={{
                      padding: '0.75rem 1rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      width: '100px',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    onClick={() => jumpToHymnByNumber(hymnNumberInput)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'var(--accent)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'opacity 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    Go
                  </button>
                </div>

                {themes.length > 0 && (
                  <select
                    value={filterTheme}
                    onChange={(e) => setFilterTheme(e.target.value)}
                    style={{
                      padding: '0.75rem 1rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      minWidth: '150px'
                    }}
                  >
                    <option value="">All Themes</option>
                    {themes.map(theme => (
                      <option key={theme} value={theme}>{theme}</option>
                    ))}
                  </select>
                )}
              </motion.div>

              {/* Hymns List */}
              <motion.div 
                className="grid grid-2 gap-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {filteredHymns.map(hymn => (
                  <motion.div
                    key={hymn.id}
                    className="card"
                    variants={staggerItem}
                    whileHover={{ y: -2 }}
                    onClick={() => handleHymnSelect(hymn)}
                    style={{
                      cursor: 'pointer',
                      borderLeft: '4px solid var(--accent)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <h4 style={{
                        color: 'var(--primary)',
                        marginBottom: '0.5rem'
                      }}>
                        {selectedBook.abbreviation} #{hymn.number}: {hymn.title}
                      </h4>
                      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                        <strong>Author:</strong> {hymn.author}
                      </p>
                      {hymn.composer && (
                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                          <strong>Composer:</strong> {hymn.composer}
                        </p>
                      )}
                      {hymn.theme && (
                        <span style={{
                          display: 'inline-block',
                          background: '#f0f0f0',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          color: '#666',
                          marginTop: '0.5rem'
                        }}>
                          {hymn.theme}
                        </span>
                      )}
                    </div>
                    <Music size={20} color="var(--accent)" style={{ flexShrink: 0, marginLeft: '1rem' }} />
                  </motion.div>
                ))}
              </motion.div>

              {filteredHymns.length === 0 && (
                <motion.div 
                  className="text-center"
                  style={{ padding: '2rem', color: '#999' }}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                >
                  <p>No hymns found matching your search.</p>
                </motion.div>
              )}
            </>
          )}

          {view === 'detail' && selectedHymn && (
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <button
                onClick={() => setView('hymns')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  marginBottom: '2rem',
                  textDecoration: 'underline'
                }}
              >
                ← Back to {selectedBook?.title}
              </button>

              <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* Hymn Header */}
                <div style={{ marginBottom: '2rem', borderBottom: '2px solid #eee', paddingBottom: '2rem' }}>
                  <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                    {selectedBook?.abbreviation} #{selectedHymn.number}
                  </h2>
                  <h3 style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '1.5rem' }}>
                    {selectedHymn.title}
                  </h3>
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                    <strong>Author:</strong> {selectedHymn.author}
                  </p>
                  {selectedHymn.composer && (
                    <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                      <strong>Composer:</strong> {selectedHymn.composer}
                    </p>
                  )}
                  {selectedHymn.tune_name && (
                    <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                      <strong>Tune:</strong> {selectedHymn.tune_name}
                    </p>
                  )}
                  {selectedHymn.theme && (
                    <span style={{
                      display: 'inline-block',
                      background: 'var(--accent)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      marginTop: '1rem'
                    }}>
                      {selectedHymn.theme}
                    </span>
                  )}
                </div>

                {/* Lyrics */}
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.2rem' }}>Lyrics</h4>
                  <pre style={{
                    background: '#f9f9f9',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    fontFamily: 'Georgia, serif',
                    lineHeight: '1.8',
                    color: '#333',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word'
                  }}>
                    {selectedHymn.lyrics}
                  </pre>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => downloadHymnAsPDF(selectedHymn)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      background: 'var(--accent)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#d4a042'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
                  >
                    <Download size={18} />
                    Download as PDF
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
