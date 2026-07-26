"""patch_supabase_gallery.py — wires the Supabase gallery into App.tsx"""
import sys

SRC = r'frontend\src\App.tsx'

with open(SRC, 'rb') as f:
    content = f.read().decode('utf-8')

def nl(s):
    return s.replace('\n', '\r\n')

# ─── PATCH 1: Add supabase import at top of file ───────────────────────────────
OLD1 = nl("""import { useState, useEffect } from 'react';""")
NEW1 = nl("""import { useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';""")

if OLD1 not in content:
    print("ERROR: import anchor not found"); sys.exit(1)
content = content.replace(OLD1, NEW1, 1)
print("✓ Patch 1 (supabase import) applied")

# ─── PATCH 2: Add GalleryImage interface after ChurchProject ──────────────────
OLD2 = nl("""interface ChurchProject {
  id: number;
  title: string;
  category: string;
  desc: string;
  goal_amount: number;
  raised_amount: number;
  image_url: string;
  status: string;
}""")

NEW2 = nl("""interface ChurchProject {
  id: number;
  title: string;
  category: string;
  desc: string;
  goal_amount: number;
  raised_amount: number;
  image_url: string;
  status: string;
}

interface GalleryImage {
  id?: string;
  album: string;
  title: string;
  img_url: string;
  created_at?: string;
}""")

if OLD2 not in content:
    print("ERROR: ChurchProject interface anchor not found"); sys.exit(1)
content = content.replace(OLD2, NEW2, 1)
print("✓ Patch 2 (GalleryImage interface) applied")

# ─── PATCH 3: Add gallery state ───────────────────────────────────────────────
OLD3 = nl("""  const [selectedGalleryAlbum, setSelectedGalleryAlbum] = useState('all');""")
NEW3 = nl("""  const [selectedGalleryAlbum, setSelectedGalleryAlbum] = useState('all');
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryUploadForm, setGalleryUploadForm] = useState({ title: '', album: 'Sabbath Worship' });
  const [galleryUploadFile, setGalleryUploadFile] = useState<File | null>(null);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const galleryFileRef = useRef<HTMLInputElement>(null);""")

if OLD3 not in content:
    print("ERROR: selectedGalleryAlbum anchor not found"); sys.exit(1)
content = content.replace(OLD3, NEW3, 1)
print("✓ Patch 3 (gallery state) applied")

# ─── PATCH 4: Replace filteredGallery to use `gallery` state ──────────────────
OLD4 = nl("""  const filteredGallery = selectedGalleryAlbum === 'all' 
    ? DEFAULT_GALLERY 
    : DEFAULT_GALLERY.filter(g => g.album === selectedGalleryAlbum);""")
NEW4 = nl("""  const gallerySource = gallery.length > 0 ? gallery : DEFAULT_GALLERY.map(g => ({ ...g, img_url: g.img }));
  const filteredGallery = selectedGalleryAlbum === 'all' 
    ? gallerySource 
    : gallerySource.filter(g => g.album === selectedGalleryAlbum);""")

if OLD4 not in content:
    print("ERROR: filteredGallery anchor not found"); sys.exit(1)
content = content.replace(OLD4, NEW4, 1)
print("✓ Patch 4 (filteredGallery updated) applied")

# ─── PATCH 5: Add fetchGallery function + add to useEffect ────────────────────
OLD5 = nl("""  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects/`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data.length > 0 ? data : DEFAULT_PROJECTS);
      }
    } catch {
      // Local fallback
    }
  };""")

NEW5 = nl("""  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects/`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data.length > 0 ? data : DEFAULT_PROJECTS);
      }
    } catch {
      // Local fallback
    }
  };

  const fetchGallery = async () => {
    setGalleryLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setGallery(data as GalleryImage[]);
      }
    } catch {
      // fallback to DEFAULT_GALLERY
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleGalleryUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryUploadFile) { toast.error('Please select an image file.'); return; }
    setGalleryUploading(true);
    try {
      const fileName = `${Date.now()}-${galleryUploadFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('church-gallery')
        .upload(fileName, galleryUploadFile, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('church-gallery').getPublicUrl(fileName);
      const publicUrl = urlData.publicUrl;

      const { error: insertError } = await supabase
        .from('gallery')
        .insert([{ album: galleryUploadForm.album, title: galleryUploadForm.title, img_url: publicUrl }]);

      if (insertError) throw insertError;

      toast.success('Image uploaded to gallery successfully! 🎉');
      setGalleryUploadForm({ title: '', album: 'Sabbath Worship' });
      setGalleryUploadFile(null);
      if (galleryFileRef.current) galleryFileRef.current.value = '';
      fetchGallery();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Upload failed. Check your Supabase bucket permissions.';
      toast.error(message);
    } finally {
      setGalleryUploading(false);
    }
  };""")

if OLD5 not in content:
    print("ERROR: fetchProjects anchor not found"); sys.exit(1)
content = content.replace(OLD5, NEW5, 1)
print("✓ Patch 5 (fetchGallery + handleGalleryUpload) applied")

# ─── PATCH 6: Add fetchGallery to useEffect ──────────────────────────────────
OLD6 = nl("""  useEffect(() => {
    fetchSermons();
    fetchEvents();
    fetchPrayers();
    fetchBibleStudies();
    fetchDonations();
    fetchProjects();
  }, []);""")

NEW6 = nl("""  useEffect(() => {
    fetchSermons();
    fetchEvents();
    fetchPrayers();
    fetchBibleStudies();
    fetchDonations();
    fetchProjects();
    fetchGallery();
  }, []);""")

if OLD6 not in content:
    print("ERROR: useEffect anchor not found"); sys.exit(1)
content = content.replace(OLD6, NEW6, 1)
print("✓ Patch 6 (fetchGallery in useEffect) applied")

# ─── PATCH 7: Update gallery JSX to use img_url instead of img ───────────────
OLD7 = nl("""                    <motion.div key={i} className="gallery-item" variants={scaleIn} layout whileHover={{ scale: 1.02 }}>
                      <div className="gallery-mock-img" style={{ backgroundImage: `url('${g.img}')` }}></div>""")

NEW7 = nl("""                    <motion.div key={i} className="gallery-item" variants={scaleIn} layout whileHover={{ scale: 1.02 }}>
                      <div className="gallery-mock-img" style={{ backgroundImage: `url('${g.img_url || (g as {img?: string}).img || ''}')` }}></div>""")

if OLD7 not in content:
    print("ERROR: gallery item JSX anchor not found"); sys.exit(1)
content = content.replace(OLD7, NEW7, 1)
print("✓ Patch 7 (gallery JSX updated) applied")

# ─── PATCH 8: Add album filter tabs dynamically ───────────────────────────────
OLD8 = nl("""                  {['all', 'Sabbath Worship', 'Baptism', 'Graduation Sabbath', 'Youth Camp', 'Choir', 'Community Outreach'].map(album => (""")
NEW8 = nl("""                  {['all', ...Array.from(new Set(filteredGallery.map(g => g.album)))].map(album => (""")

if OLD8 not in content:
    print("ERROR: album filter anchor not found"); sys.exit(1)
content = content.replace(OLD8, NEW8, 1)
print("✓ Patch 8 (dynamic album filter tabs) applied")

# ─── PATCH 9: Add loading state to gallery grid ──────────────────────────────
OLD9 = nl("""                <motion.div className="grid grid-3 gap-2 margin-top-3" variants={staggerContainer} initial="hidden" animate="visible">
                  <AnimatePresence mode="wait">
                  {filteredGallery.map((g, i) => (""")
NEW9 = nl("""                {galleryLoading && (
                  <div className="text-center margin-top-3" style={{ padding: '3rem', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📸</div>
                    <p>Loading photos from cloud...</p>
                  </div>
                )}
                <motion.div className="grid grid-3 gap-2 margin-top-3" variants={staggerContainer} initial="hidden" animate="visible">
                  <AnimatePresence mode="wait">
                  {filteredGallery.map((g, i) => (""")

if OLD9 not in content:
    print("ERROR: gallery grid anchor not found"); sys.exit(1)
content = content.replace(OLD9, NEW9, 1)
print("✓ Patch 9 (gallery loading state) applied")

# ─── PATCH 10: Add 'Manage Gallery' admin tab ────────────────────────────────
OLD10 = nl("""                      { id: 'admin-projects', label: 'Manage Projects' }""")
NEW10 = nl("""                      { id: 'admin-projects', label: 'Manage Projects' },
                      { id: 'admin-gallery', label: 'Manage Gallery' }""")

if OLD10 not in content:
    print("ERROR: admin tabs anchor not found"); sys.exit(1)
content = content.replace(OLD10, NEW10, 1)
print("✓ Patch 10 (admin gallery tab) applied")

# ─── PATCH 11: Add Gallery Admin Panel tab content ──────────────────────────
OLD11 = nl("""                  {/* Projects Tab */}
                  {activeAdminTab === 'admin-projects' && (""")
NEW11 = nl("""                  {/* Gallery Upload Tab */}
                  {activeAdminTab === 'admin-gallery' && (
                    <div className="admin-tab-content active">
                      <h2>Manage Gallery</h2>
                      <p className="text-muted">Upload church photos directly to Supabase cloud storage. They will appear instantly in the Gallery page.</p>
                      <form onSubmit={handleGalleryUpload} className="card margin-top-2" style={{ padding: '1.5rem' }}>
                        <div className="grid grid-2 gap-3">
                          <div className="form-group">
                            <label>Photo Title</label>
                            <input
                              type="text"
                              value={galleryUploadForm.title}
                              onChange={e => setGalleryUploadForm(f => ({ ...f, title: e.target.value }))}
                              placeholder="e.g., Youth Baptism 2025"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Album Category</label>
                            <select
                              value={galleryUploadForm.album}
                              onChange={e => setGalleryUploadForm(f => ({ ...f, album: e.target.value }))}
                            >
                              {['Sabbath Worship', 'Baptism', 'Graduation Sabbath', 'Youth Camp', 'Choir', 'Community Outreach', 'Back to School', 'Other'].map(a => (
                                <option key={a} value={a}>{a}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="form-group margin-top-2">
                          <label>Select Photo</label>
                          <input
                            ref={galleryFileRef}
                            type="file"
                            accept="image/*"
                            onChange={e => setGalleryUploadFile(e.target.files?.[0] || null)}
                            required
                            style={{ padding: '0.5rem' }}
                          />
                          {galleryUploadFile && (
                            <div className="margin-top-2">
                              <img
                                src={URL.createObjectURL(galleryUploadFile)}
                                alt="Preview"
                                style={{ maxWidth: '200px', maxHeight: '140px', objectFit: 'cover', borderRadius: '8px', border: '2px solid var(--primary)' }}
                              />
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{galleryUploadFile.name}</p>
                            </div>
                          )}
                        </div>
                        <button type="submit" className="btn btn-primary margin-top-2" disabled={galleryUploading}>
                          {galleryUploading ? '⏳ Uploading...' : '📤 Upload to Supabase'}
                        </button>
                      </form>

                      <div className="margin-top-3">
                        <h3>Cloud Gallery ({gallery.length} photos)</h3>
                        {gallery.length === 0 ? (
                          <p className="text-muted" style={{ marginTop: '0.5rem' }}>No photos uploaded yet. Use the form above to add your first photo.</p>
                        ) : (
                          <div className="grid grid-3 gap-2 margin-top-2">
                            {gallery.map((img, i) => (
                              <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                                <img src={img.img_url} alt={img.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                                <div style={{ padding: '0.75rem' }}>
                                  <p style={{ fontWeight: 600, fontSize: '0.88rem', margin: 0 }}>{img.title}</p>
                                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>{img.album}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Projects Tab */}
                  {activeAdminTab === 'admin-projects' && (""")

if OLD11 not in content:
    print("ERROR: Projects Tab anchor not found"); sys.exit(1)
content = content.replace(OLD11, NEW11, 1)
print("✓ Patch 11 (Gallery admin panel) applied")

with open(SRC, 'wb') as f:
    f.write(content.encode('utf-8'))
print("\nAll patches applied successfully!")
