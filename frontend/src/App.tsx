import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { Users, GraduationCap, Music, Map, Heart, HandHelping } from 'lucide-react';

// --- Animation Variants ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const pageTransition: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: 'easeIn' } }
};

// API root definition
const API_URL = 'http://127.0.0.1:8000/api';

// --- Types ---
interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  passage: string;
  category: string;
}

interface ChurchEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  desc: string;
}

interface BibleStudy {
  id?: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  course: string;
  status?: string;
}

interface PrayerRequest {
  id?: number;
  name: string;
  content: string;
  confidential: boolean;
}

interface Donation {
  id?: number;
  amount: number;
  fund: string;
  method: string;
  status?: string;
}

interface ActivityLog {
  time: string;
  msg: string;
}

// --- Initial Fallback Mock Data ---
const DEFAULT_LEADERS = [
  { name: "Pastor John Mwangi", role: "Lead Pastor", bio: "Pastor Mwangi has served the global SDA community for 12 years and has a deep passion for student chaplaincy." },
  { name: "Pastor Sarah Namubiru", role: "Assistant Pastor", bio: "A graduate of Bugema University's theology department, focused on campus outreach and counselling." },
  { name: "Elder Caleb Ndikumana", role: "First Elder", bio: "Coordinates board operations, spiritual fellowships, and guest relations for our international members." },
  { name: "Deaconess Mercy Awori", role: "Head Deaconess", bio: "Leads a team of deaconesses focused on hospitality, visitation, and church neatness." },
  { name: "Timothy Omondi", role: "Youth Leader", bio: "Organizes student programs, choir coordination, and voluntary missions around the campus." },
  { name: "Grace Kente", role: "Pathfinder Director", bio: "Guides our pathfinders and adventurers in skill building, community outreach, and scripture memorization." },
  { name: "Enock Birungi", role: "Treasurer", bio: "Ensures meticulous accounting practices, budget compliance, and transparent reporting." },
  { name: "Aisha Mukasa", role: "Church Clerk", bio: "Handles memberships, transfers, announcements, and board meeting minutes." }
];

const DEFAULT_MINISTRIES = [
  {
    id: "youth",
    title: "Youth Ministry",
    short: "Empowering young professionals and students.",
    desc: "Our Youth Ministry provides a space where students connect, share, and grow. We organize campouts, vespers, and forums on mental health, careers, and relationships.",
    icon: <Users size={24} />
  },
  {
    id: "campus",
    title: "Campus Ministry",
    short: "Reaching student hearts at Bugema.",
    desc: "Being situated right inside Bugema University, we coordinate Bible classes, Friday evening vespers, cell group interactions, and baptismal instruction specifically tailored for university students.",
    icon: <GraduationCap size={24} />
  },
  {
    id: "music",
    title: "Music Ministry",
    short: "Worship through international harmonies.",
    desc: "We host multiple choirs representing various linguistic and regional groups. Join our praise band, dynamic orchestra, or the Seattle International Choir.",
    icon: <Music size={24} />
  },
  {
    id: "pathfinders",
    title: "Pathfinders & Adventurers",
    short: "Training children and teens for God.",
    desc: "An active scouting-style club focused on physical skills, nature studies, camping, survival guides, and foundational Bible learning for ages 6-18.",
    icon: <Map size={24} />
  },
  {
    id: "women",
    title: "Women's Ministries",
    short: "Nurturing faith, family, and sisterhood.",
    desc: "Providing opportunities for spiritual growth, fellowship, and mentoring among women of all backgrounds. We host prayer circles, cooking workshops, and charity outreaches.",
    icon: <Heart size={24} />
  },
  {
    id: "prayer",
    title: "Prayer Ministry",
    short: "Standing in the gap for our community.",
    desc: "Our prayer warriors maintain a chain of prayer. We gather for prayer requests submitted online or physically, hosting early morning devotions and specialized fasting sessions.",
    icon: <HandHelping size={24} />
  }
];

const DEFAULT_SERMONS: Sermon[] = [
  { id: 1, title: "The Sanctuary & The Sanctuary Guard", speaker: "Pastor John Mwangi", date: "2026-07-11", passage: "Hebrews 8:1-5", category: "Sabbath Sermons" },
  { id: 2, title: "Finding Rest in a Restless Campus", speaker: "Pastor Sarah Namubiru", date: "2026-07-04", passage: "Matthew 11:28-30", category: "Sabbath Sermons" },
  { id: 3, title: "Unshakable Faith in Prophetic Times", speaker: "Elder Caleb Ndikumana", date: "2026-06-20", passage: "Daniel 2:44", category: "Week of Prayer" },
  { id: 4, title: "Stepping into the Waters of Covenant", speaker: "Pastor John Mwangi", date: "2026-06-13", passage: "Romans 6:3-4", category: "Bible Studies" }
];

const DEFAULT_EVENTS: ChurchEvent[] = [
  { id: 1, title: "Bugema University Camp Meeting", date: "2026-08-15", location: "Main Assembly Pavilion", desc: "A week-long spiritual feast under the theme 'Behold, He Comes!' featuring international speakers, choirs, and community services." },
  { id: 2, title: "Youth Week of Devotion", date: "2026-09-05", location: "SIC Chapel", desc: "Interactive evenings centered on student mental wellness, career integrity, and spiritual stewardship." },
  { id: 3, title: "Choir Grand Concert", date: "2026-09-26", location: "University Auditorium", desc: "A praise celebration representing choral music from 10 different countries." }
];

const BIBLE_VERSES = [
  { text: "Growing in grace, and in the knowledge of our Lord and Saviour Jesus Christ.", ref: "2 Peter 3:18" },
  { text: "Commit your way to the Lord; trust in him, and he will act.", ref: "Psalm 37:5" },
  { text: "Watch, stand fast in the faith, be brave, be strong. Let all that you do be done with love.", ref: "1 Corinthians 16:13-14" },
  { text: "Remember the Sabbath day, to keep it holy.", ref: "Exodus 20:8" },
  { text: "For I know the plans I have for you, plans to give you hope and a future.", ref: "Jeremiah 29:11" }
];

const DEFAULT_GALLERY = [
  { album: "Sabbath Worship", title: "Joyful Choirs Singing", img: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=600" },
  { album: "Baptism", title: "15 Students Baptized", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600" },
  { album: "Graduation Sabbath", title: "Blessing the Graduating Class", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600" },
  { album: "Youth Camp", title: "Hiking & Bible Study", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600" },
  { album: "Choir", title: "International Ensemble Rehearsal", img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=600" },
  { album: "Community Outreach", title: "Free Health Checkups Clinic", img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600" }
];

const DEFAULT_BELIEFS = [
  { title: "The Bible", desc: "The Holy Scriptures are the written Word of God, given by divine inspiration. They are the supreme standard of character and test of experience." },
  { title: "The Sabbath", desc: "The seventh day of the week, Sabbath (Saturday), is a holy day of rest, worship, and ministry, established at Creation and kept by Jesus." },
  { title: "Salvation", desc: "In infinite love, God made Christ, who knew no sin, to be sin for us, so that in Him we might be made the righteousness of God." },
  { title: "Second Coming", desc: "The second coming of Christ is the blessed hope of the church, the grand climax of the gospel, when he returns to rescue His people." },
  { title: "Health Message", desc: "Our bodies are temples of the Holy Spirit. We believe in adopting a healthy diet, getting clean air, water, and rest to serve God fully." },
  { title: "Baptism", desc: "By baptism we confess our faith in the death and resurrection of Jesus Christ, and testify of our death to sin and purpose to walk in newness of life." }
];

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core Data States
  const [sermons, setSermons] = useState<Sermon[]>(DEFAULT_SERMONS);
  const [events, setEvents] = useState<ChurchEvent[]>(DEFAULT_EVENTS);
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [bibleStudies, setBibleStudies] = useState<BibleStudy[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([{ time: new Date().toLocaleTimeString(), msg: "App loaded." }]);

  // Interactive View States
  const [dailyVerse, setDailyVerse] = useState(BIBLE_VERSES[0]);
  const [selectedSermonCat, setSelectedSermonCat] = useState('all');
  const [selectedGalleryAlbum, setSelectedGalleryAlbum] = useState('all');
  
  // Modals States
  const [selectedMinistry, setSelectedMinistry] = useState<typeof DEFAULT_MINISTRIES[0] | null>(null);
  const [registeringEvent, setRegisteringEvent] = useState<ChurchEvent | null>(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showAddSermonModal, setShowAddSermonModal] = useState(false);

  // Form input states
  const [addEventForm, setAddEventForm] = useState({ title: '', date: '', location: '', desc: '' });
  const [addSermonForm, setAddSermonForm] = useState({ title: '', speaker: '', date: '', passage: '', category: 'Sabbath Sermons' });
  const [studyForm, setStudyForm] = useState({ name: '', email: '', phone: '', country: '', course: '' });
  const [prayerForm, setPrayerForm] = useState({ name: '', content: '', confidential: false });
  const [donationForm, setDonationForm] = useState({ amount: '', fund: 'Tithe', method: 'Mobile Money' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [eventRegForm, setEventRegForm] = useState({ name: '', email: '', phone: '', notes: '' });

  // Alerts
  const [studySuccess] = useState(false);
  const [prayerSuccess] = useState(false);
  const [donationSuccess] = useState(false);
  const [eventRegSuccess] = useState(false);
  const [contactSuccess] = useState(false);

  // Chat Feed Sim
  const [chatMessages, setChatMessages] = useState([
    { user: "Ruth Atwine", text: "Happy Sabbath everyone! Watching from Kampala." },
    { user: "Pastor John", text: "Amen, welcome Ruth! Blessed Sabbath." },
    { user: "David Miller", text: "Greetings from Seattle, USA. So glad to tune in today." }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Admin Panel states
  const [activeAdminTab, setActiveAdminTab] = useState('admin-stats');

  // --- API Sync on Load ---
  useEffect(() => {
    fetchSermons();
    fetchEvents();
    fetchPrayers();
    fetchBibleStudies();
    fetchDonations();
  }, []);

  const triggerLog = (msg: string) => {
    setLogs(prev => [{ time: new Date().toLocaleTimeString(), msg }, ...prev]);
  };

  const fetchSermons = async () => {
    try {
      const res = await fetch(`${API_URL}/sermons/`);
      if (res.ok) {
        const data = await res.json();
        setSermons(data);
      }
    } catch {
      triggerLog("Django API unavailable. Fallback to mock sermons database.");
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_URL}/events/`);
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch {
      triggerLog("Django API unavailable. Fallback to mock events database.");
    }
  };

  const fetchPrayers = async () => {
    try {
      const res = await fetch(`${API_URL}/prayers/`);
      if (res.ok) {
        const data = await res.json();
        setPrayers(data);
      }
    } catch {
      // Local fallback
    }
  };

  const fetchBibleStudies = async () => {
    try {
      const res = await fetch(`${API_URL}/bible-studies/`);
      if (res.ok) {
        const data = await res.json();
        setBibleStudies(data);
      }
    } catch {
      // Local fallback
    }
  };

  const fetchDonations = async () => {
    try {
      const res = await fetch(`${API_URL}/donations/`);
      if (res.ok) {
        const data = await res.json();
        setDonations(data);
      }
    } catch {
      // Local fallback
    }
  };

  // --- Submissions handlers ---

  const handleBibleStudySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/bible-studies/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studyForm)
      });
      if (res.ok) {
        fetchBibleStudies();
      } else {
        throw new Error();
      }
    } catch {
      // Local storage sync fallback
      const data = { ...studyForm, id: Date.now(), status: 'Pending Guide Assignment' };
      setBibleStudies(prev => [...prev, data]);
    }
    triggerLog(`New Bible study registered for ${studyForm.name} (${studyForm.course})`);
    toast.success("Thank you for registering! Our team will reach out to you shortly.");
    setStudyForm({ name: '', email: '', phone: '', country: '', course: '' });
  };

  const handlePrayerRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/prayers/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prayerForm)
      });
      if (res.ok) {
        fetchPrayers();
      } else {
        throw new Error();
      }
    } catch {
      const data = { ...prayerForm, id: Date.now() };
      setPrayers(prev => [...prev, data]);
    }
    triggerLog(`New prayer request submitted by ${prayerForm.name || 'Anonymous'}`);
    toast.success("Your prayer request has been submitted. We are praying with you.");
    setPrayerForm({ name: '', content: '', confidential: false });
  };

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(donationForm.amount);
    if (!amountNum || amountNum <= 0) return;
    
    try {
      const res = await fetch(`${API_URL}/donations/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountNum, fund: donationForm.fund, method: donationForm.method })
      });
      if (res.ok) {
        fetchDonations();
      } else {
        throw new Error();
      }
    } catch {
      const data = { amount: amountNum, fund: donationForm.fund, method: donationForm.method, id: Date.now(), status: 'Completed Stewardship' };
      setDonations(prev => [...prev, data]);
    }
    triggerLog(`Donation received: ${amountNum.toLocaleString()} UGX for ${donationForm.fund}`);
    toast.success(`Donation of ${amountNum} received for ${donationForm.fund}!`);
    setDonationForm({ amount: '', fund: 'Tithe', method: 'Mobile Money' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerLog(`Contact inquiry message received from ${contactForm.name}`);
    toast.success("Your message has been sent successfully.");
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleEventRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerLog(`Registration received from ${eventRegForm.name} for event: ${registeringEvent?.title}`);
    toast.success("Successfully registered for the event!");
    setEventRegForm({ name: '', email: '', phone: '', notes: '' });
    setRegisteringEvent(null);
  };

  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { user: "You", text: chatInput.trim() }]);
    setChatInput('');
  };

  // Add Event Action (Admin)
  const handleAdminAddEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, date, location, desc } = addEventForm;
    try {
      const res = await fetch(`${API_URL}/events/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date, location, desc })
      });
      if (res.ok) {
        fetchEvents();
      } else {
        throw new Error();
      }
    } catch {
      const nextId = events.length > 0 ? Math.max(...events.map(ev => ev.id)) + 1 : 1;
      setEvents(prev => [...prev, { id: nextId, title, date, location, desc }]);
    }
    triggerLog(`Event "${title}" added to calendar.`);
    toast.success("Event added successfully!");
    setAddEventForm({ title: '', date: '', location: '', desc: '' });
    setShowAddEventModal(false);
  };

  // Add Sermon Action (Admin)
  const handleAdminAddSermonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, speaker, date, passage, category } = addSermonForm;
    try {
      const res = await fetch(`${API_URL}/sermons/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, speaker, date, passage, category })
      });
      if (res.ok) {
        fetchSermons();
      } else {
        throw new Error();
      }
    } catch {
      const nextId = sermons.length > 0 ? Math.max(...sermons.map(s => s.id)) + 1 : 1;
      setSermons(prev => [{ id: nextId, title, speaker, date, passage, category }, ...prev]);
    }
    triggerLog(`Sermon "${title}" added to archive.`);
    toast.success("Sermon added successfully!");
    setAddSermonForm({ title: '', speaker: '', date: '', passage: '', category: 'Sabbath Sermons' });
    setShowAddSermonModal(false);
  };

  // Delete Handlers
  const handleAdminDeleteEvent = async (id: number) => {
    try {
      await fetch(`${API_URL}/events/${id}/`, { method: 'DELETE' });
      fetchEvents();
    } catch {
      setEvents(prev => prev.filter(e => e.id !== id));
    }
    triggerLog(`Removed event ID: ${id}`);
  };

  const handleAdminDeleteSermon = async (id: number) => {
    try {
      await fetch(`${API_URL}/sermons/${id}/`, { method: 'DELETE' });
      fetchSermons();
    } catch {
      setSermons(prev => prev.filter(s => s.id !== id));
    }
    triggerLog(`Removed sermon ID: ${id}`);
  };

  const handleAdminDeletePrayer = async (id: number) => {
    try {
      await fetch(`${API_URL}/prayers/${id}/`, { method: 'DELETE' });
      fetchPrayers();
    } catch {
      setPrayers(prev => prev.filter(p => p.id !== id));
    }
    triggerLog(`Deleted Prayer Request ID: ${id}`);
  };

  const handleAdminDeleteStudy = async (id: number) => {
    try {
      await fetch(`${API_URL}/bible-studies/${id}/`, { method: 'DELETE' });
      fetchBibleStudies();
    } catch {
      setBibleStudies(prev => prev.filter(b => b.id !== id));
    }
    triggerLog(`Deleted Bible Study registration ID: ${id}`);
  };

  // Filter systems
  const filteredSermons = selectedSermonCat === 'all' 
    ? sermons 
    : sermons.filter(s => s.category === selectedSermonCat);

  const filteredGallery = selectedGalleryAlbum === 'all' 
    ? DEFAULT_GALLERY 
    : DEFAULT_GALLERY.filter(g => g.album === selectedGalleryAlbum);

  const totalDonations = donations.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div>
      <Toaster position="top-right" />
      {/* Top Bar with Tagline & Social / Admin Link */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <span className="tagline">Growing in Christ • Serving the World • Sharing Hope</span>
          <div className="top-bar-right">
            <button onClick={() => setCurrentRoute('admin')} className="admin-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Admin Portal
            </button>
          </div>
        </div>
      </div>

      {/* Header & Navigation */}
      <header className="main-header">
        <div className="container header-container">
          <a href="#home" onClick={() => setCurrentRoute('home')} className="logo-area">
            <div className="logo-icon">
              <svg width="40" height="40" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="85" cy="85" r="85" fill="#1E3A8A" />
                <g transform="translate(17, 17) scale(0.8)">
                  <g transform="translate(-20.5, -20.6)" fill="#D4AF37">
                    <path d="m 128.7,161.7 c -11.5,-1.9 -17.7,3.5 -19.6,8.6 -0.2,0.5 -0.7,0.4 -0.7,0 v -1.6 c 0,-5.7 5.1,-10.9 11.1,-17 l 10,-10 26.6,4.6 c 0,0 7.6,7.6 14.1,14.1 12.5,-14.8 20.1,-34 20.1,-54.9 0,-46.9 -38,-84.9 -84.9,-84.9 -46.9,0 -84.9,38 -84.9,84.9 0,20.9 7.6,40.1 20.1,54.9 6.5,-6.5 14.1,-14.1 14.1,-14.1 l 30.2,-5.2 c 14,-2.4 17.5,0.7 17.5,5.4 0,0.2 -0.2,0.4 -0.4,0.4 h -8.5 c -0.2,0 -0.2,0.2 -0.2,0.4 v 5.2 c 0,0.2 -0.2,0.2 0,0.2 h 8.7 c 0.2,0 0.4,0.2 0.4,0.4 0,0 0,16.9 0,17.3 0,0.4 -0.5,0.5 -0.7,0.1 -1.9,-5.1 -8.1,-10.5 -19.6,-8.6 0,0 -19.9,3.4 -34.7,6 15.2,14.1 35.5,22.8 57.9,22.8 22.4,0 42.7,-8.6 57.9,-22.8 -14.6,-2.8 -34.5,-6.2 -34.5,-6.2 z m -19.5,0.2 c -0.1,0.5 -0.7,0.5 -0.7,0 V 153 c 0,-0.2 0.1,-0.4 0.3,-0.4 h 4.4 c -1.9,2.7 -3.2,5.3 -4,9.3 z m 31.5,-55.5 c 2.1,6.9 0.7,17.4 -9.2,27.4 l -12,11.8 c -0.3,0.3 -0.7,0.8 -1,0.8 h -8.2 c 2,-3 5.4,-6.8 9.2,-10.6 l 8.3,-8.3 C 138.3,117 140,112 140,106.2 c 0.1,-0.4 0.6,-0.4 0.7,0.2 z m -16.3,-6.5 c 6.8,-6.8 8.5,-14.7 3,-19.4 -0.5,-0.4 -0.2,-0.9 0.4,-0.6 6.8,3.1 12.1,14.3 0.5,25.9 l -8.8,8.8 c -6,6 -8.8,8.8 -10.3,16.1 -0.1,0.5 -0.7,0.5 -0.7,0 v -8.9 c 0,-5.7 5,-10.9 11.1,-17 z m -54.1,8 C 68.2,101 69.6,90.5 79.5,80.5 l 26.4,-26.4 c 6,-6 9.1,-8.9 10.6,-16.1 0.1,-0.5 1,-0.5 1,0 v 8.9 c 0,5.7 -5.3,10.9 -11.4,17 L 83.3,86.6 C 72.7,97.2 71,102.1 71,107.9 c 0,0.6 -0.5,0.6 -0.7,0 z m 4,15.7 c -5.9,-7.2 -3.9,-18.4 7.7,-30 l 23.9,-23.9 c 6,-6 9.1,-8.9 10.6,-16.2 0.1,-0.5 1,-0.5 1,0 v 9 c 0,5.7 -5.3,10.9 -11.4,17 l -21.2,21.1 c -4.4,4.4 -13.9,13.8 -10,22.6 0.3,0.6 -0.2,0.9 -0.6,0.4 z m 12.3,-9.2 c -6.8,6.8 -8.5,14.7 -3,19.4 0.5,0.4 0.2,0.9 -0.4,0.6 -6.8,-3.1 -12.1,-14.3 -0.5,-25.9 l 23.2,-23.2 c 6,-6 9.1,-8.8 10.6,-16.1 0.1,-0.5 1,-0.5 1,0 v 8.9 c 0,5.7 -5.3,10.9 -11.4,17 z m 21.9,23 c 0,-5.7 5,-10.9 11.1,-17 l 6.7,-6.7 c 4.4,-4.4 13.8,-13.8 9.9,-22.6 -0.3,-0.6 0.2,-0.9 0.6,-0.4 5.9,7.2 3.9,18.4 -7.7,30 l -9.5,9.5 c -6,6 -8.8,8.9 -10.3,16.2 -0.1,0.5 -0.7,0.5 -0.7,0 v -9 z" />
                  </g>
                </g>
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-title">Seattle International</span>
              <span className="logo-sub">Church at Bugema University</span>
            </div>
          </a>
          <nav className={`nav-bar ${mobileMenuOpen ? 'active' : ''}`}>
            {[
              { route: 'home', label: 'Home' },
              { route: 'about', label: 'About' },
              { route: 'ministries', label: 'Ministries' },
              { route: 'sermons', label: 'Sermons' },
              { route: 'events', label: 'Events' },
              { route: 'gallery', label: 'Gallery' },
              { route: 'bible-study', label: 'Bible Study' },
              { route: 'prayer-requests', label: 'Prayer' },
              { route: 'give', label: 'Give' },
              { route: 'contact', label: 'Contact' },
            ].map(({ route, label }) => (
              <button
                key={route}
                onClick={() => { setCurrentRoute(route); setMobileMenuOpen(false); }}
                className={`nav-link ${currentRoute === route ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {label}
              </button>
            ))}

            <button 
              onClick={() => { setCurrentRoute('watch-live'); setMobileMenuOpen(false); }} 
              className="nav-link watch-live-btn"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              <span className="pulse-dot"></span>
              Watch Live
            </button>
          </nav>
          <button className="mobile-nav-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Content wrapper */}
      <main className="content-wrapper">
        
        <AnimatePresence mode="wait">
        {/* ================= HOME VIEW ================= */}
        {currentRoute === 'home' && (
          <motion.div key="home" variants={pageTransition} initial="hidden" animate="visible" exit="exit">
            <div className="hero-section">
              <motion.div className="hero-content" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>Seattle International Church</motion.h1>
                <motion.p className="hero-location" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>Bugema University</motion.p>
                <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}>Welcome to a Christ-Centered International Family of Faith</motion.p>
                <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
                  <button onClick={() => setCurrentRoute('contact')} className="btn btn-primary">Plan Your Visit</button>
                  <button onClick={() => setCurrentRoute('watch-live')} className="btn btn-accent">Watch Live</button>
                </motion.div>
              </motion.div>
            </div>

            <div className="section-padding bg-light">
              <motion.div className="container grid grid-2 gap-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                <motion.div className="pastor-welcome-card card" variants={slideLeft}>
                  <div className="pastor-img-placeholder">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="pastor-greeting">
                    <h2 className="section-title">Welcome from our Pastor</h2>
                    <p className="pastor-quote">"Greetings in the matchless name of our Lord and Savior Jesus Christ! Whether you are a student at Bugema University, a member of the local community, or visiting from abroad, we welcome you to our international family of faith. Together, we seek to grow in grace, serve our community, and share the hope of Christ's soon return."</p>
                    <p className="pastor-signature">- Pastor John Mwangi, Lead Pastor</p>
                  </div>
                </motion.div>
                
                <motion.div className="service-times-card card dark-card" variants={slideRight}>
                  <h2 className="card-title text-gold">Sabbath Worship Times</h2>
                  <ul className="worship-list">
                    <li>
                      <span className="worship-title">Sabbath School</span>
                      <span className="worship-time">9:00 AM</span>
                    </li>
                    <li>
                      <span className="worship-title">Divine Worship Service</span>
                      <span className="worship-time">11:00 AM</span>
                    </li>
                    <li>
                      <span className="worship-title">Afternoon Bible Study</span>
                      <span className="worship-time">2:30 PM</span>
                    </li>
                  </ul>
                  <div className="midweek-times">
                    <h3 className="midweek-title text-gold">Midweek Fellowship</h3>
                    <p><strong>Wednesday Prayer Meeting:</strong> 6:00 PM</p>
                    <p><strong>Friday Vespers:</strong> 6:30 PM</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Student Hub Feature */}
            <div className="section-padding accent-bg">
              <div className="container">
                <motion.div className="section-header text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <h2 className="section-title">Student Ministry Hub</h2>
                  <p className="section-subtitle">Empowering students at Bugema University for service, fellowship, and discipleship</p>
                </motion.div>
                <motion.div className="grid grid-3 gap-3 margin-top-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
                  <motion.div className="student-card card" variants={staggerItem} whileHover={{ y: -6, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.15)' }}>
                    <div className="student-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
                      </svg>
                    </div>
                    <h3>Bible Study Groups</h3>
                    <p>Join specialized student-led cell groups that study, discuss, and encourage one another during the academic semester.</p>
                    <button onClick={() => setCurrentRoute('bible-study')} className="btn btn-outline margin-top-1 btn-small">Sign Up for Study</button>
                  </motion.div>
                  <motion.div className="student-card card" variants={staggerItem} whileHover={{ y: -6, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.15)' }}>
                    <div className="student-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                    <h3>Volunteer Opportunities</h3>
                    <p>Get involved in local community service, healthcare outreaches, orphanage visits, and high school ministry campaigns.</p>
                    <button onClick={() => setCurrentRoute('contact')} className="btn btn-outline margin-top-1 btn-small">Join Volunteer Team</button>
                  </motion.div>
                  <motion.div className="student-card card" variants={staggerItem} whileHover={{ y: -6, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.15)' }}>
                    <div className="student-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                      </svg>
                    </div>
                    <h3>Choir & Music Schedules</h3>
                    <p>Lend your voice to the International Choir or assist in the instrumental praise teams during worship services.</p>
                    <button onClick={() => setCurrentRoute('ministries')} className="btn btn-outline margin-top-1 btn-small">Explore Music Ministry</button>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Home previews */}
            <div className="section-padding">
              <motion.div className="container grid grid-3 gap-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                <motion.div className="home-sermon-preview card" variants={staggerItem} whileHover={{ y: -5 }}>
                  <span className="badge">Latest Sermon</span>
                  {sermons.length > 0 && (
                    <div className="margin-top-2">
                      <h3>{sermons[0].title}</h3>
                      <p className="text-muted font-size-sm">Speaker: {sermons[0].speaker} | Passage: {sermons[0].passage}</p>
                      <p className="font-size-sm">Preached on: {sermons[0].date}</p>
                    </div>
                  )}
                  <button onClick={() => setCurrentRoute('sermons')} className="btn btn-outline margin-top-2 btn-small">View All Sermons</button>
                </motion.div>
                
                <motion.div className="home-events-preview card" variants={staggerItem} whileHover={{ y: -5 }}>
                  <span className="badge badge-accent">Upcoming Event</span>
                  {events.length > 0 && (
                    <div className="margin-top-2">
                      <h3>{events[0].title}</h3>
                      <p className="text-muted font-size-sm">Date: {events[0].date} | Location: {events[0].location}</p>
                      <p className="font-size-sm text-truncate" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{events[0].desc}</p>
                    </div>
                  )}
                  <button onClick={() => setCurrentRoute('events')} className="btn btn-outline margin-top-2 btn-small">View All Events</button>
                </motion.div>

                <motion.div className="daily-verse-card card dark-card text-center justify-center" variants={staggerItem} whileHover={{ y: -5 }}>
                  <div className="verse-icon">&#10077;</div>
                  <p className="verse-text">"{dailyVerse.text}"</p>
                  <p className="verse-ref">{dailyVerse.ref}</p>
                  <motion.button 
                    onClick={() => setDailyVerse(BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)])} 
                    className="btn btn-small btn-accent"
                    whileTap={{ scale: 0.95 }}
                  >
                    Refresh Verse
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ================= ABOUT VIEW ================= */}
        {currentRoute === 'about' && (
          <motion.div key="about" variants={pageTransition} initial="hidden" animate="visible" exit="exit">
            <div className="page-header">
              <div className="container text-center">
                <h1>About Our Church</h1>
                <p>Learn about our history, mission, and beliefs</p>
              </div>
            </div>

            <div className="section-padding">
              <div className="container grid grid-2 gap-4">
                <div>
                  <h2 className="section-title">Our History</h2>
                  <p>Seattle International Church (SIC) was established to provide a vibrant, spirit-filled worship atmosphere specifically designed for the diverse and multi-ethnic community at Bugema University. Over the years, it has grown from a small gathering of students and faculty members into a prominent international spiritual hub.</p>
                  <p>As a Seventh-day Adventist congregation, we celebrate diversity and strive to be a home away from home for students representing dozens of nations, fostering deep spiritual integration and professional excellence under God's guidance.</p>
                  
                  <div className="mission-vision margin-top-3">
                    <div className="statement-card">
                      <h3>Our Mission</h3>
                      <p>To proclaim the everlasting gospel of Jesus Christ and prepare people for His soon return.</p>
                    </div>
                    <div className="statement-card margin-top-2">
                      <h3>Our Vision</h3>
                      <p>To build an international family of believers that reflects Christ's love through worship, discipleship, and service.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="section-title">Core Values</h2>
                  <div className="values-grid">
                    <div className="value-item">
                      <strong>Biblical Truth</strong>
                      <p>We hold the Word of God as our ultimate standard of faith and practice.</p>
                    </div>
                    <div className="value-item">
                      <strong>Prayer</strong>
                      <p>We believe prayer is the lifeline of our relationship with God and the foundation of all ministry.</p>
                    </div>
                    <div className="value-item">
                      <strong>Love</strong>
                      <p>We practice the unconditional love of Jesus in our relationships and community interaction.</p>
                    </div>
                    <div className="value-item">
                      <strong>Service</strong>
                      <p>We follow Christ's example of humble service to meet the physical and spiritual needs of others.</p>
                    </div>
                    <div className="value-item">
                      <strong>Fellowship</strong>
                      <p>We cultivate a warm, inclusive international family where everyone belongs.</p>
                    </div>
                    <div className="value-item">
                      <strong>Integrity</strong>
                      <p>We strive to walk in honesty, transparency, and consistency in our words and actions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-padding bg-light">
              <div className="container">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <h2 className="section-title text-center">Our Core Beliefs</h2>
                  <p className="section-subtitle text-center">As Seventh-day Adventists, we accept the Bible as our only creed and hold certain fundamental beliefs.</p>
                </motion.div>
                <motion.div className="grid grid-3 gap-3 margin-top-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                  {DEFAULT_BELIEFS.map(b => (
                    <motion.div key={b.title} className="belief-card card" variants={staggerItem} whileHover={{ y: -4, borderTopColor: 'var(--accent)' }}>
                      <h3>{b.title}</h3>
                      <p>{b.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="section-padding">
              <div className="container">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <h2 className="section-title text-center">Our Leadership</h2>
                  <p className="section-subtitle text-center">Dedicated servants coordinating ministries and spiritual growth</p>
                </motion.div>
                <motion.div className="grid grid-4 gap-3 margin-top-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                  {DEFAULT_LEADERS.map(l => (
                    <motion.div key={l.name} className="leader-card card" variants={staggerItem} whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.12)' }}>
                      <div className="leader-avatar-mock">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div className="leader-name">{l.name}</div>
                      <div className="leader-role">{l.role}</div>
                      <div className="leader-bio">{l.bio}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= MINISTRIES VIEW ================= */}
        {currentRoute === 'ministries' && (
          <motion.div key="ministries" variants={pageTransition} initial="hidden" animate="visible" exit="exit">
            <div className="page-header">
              <div className="container text-center">
                <h1>Our Ministries</h1>
                <p>Discover where you can grow and serve</p>
              </div>
            </div>

            <div className="section-padding">
              <div className="container">
                <motion.div className="grid grid-3 gap-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                  {DEFAULT_MINISTRIES.map(m => (
                    <motion.div key={m.id} className="card student-card" style={{ cursor: 'pointer' }} onClick={() => setSelectedMinistry(m)} variants={staggerItem} whileHover={{ y: -6, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.12)', borderTopColor: 'var(--primary)' }}>
                      <div className="student-icon">{m.icon}</div>
                      <h3>{m.title}</h3>
                      <p>{m.short}</p>
                      <span className="card-link text-gold">Learn More &arr;</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= SERMONS VIEW ================= */}
        {currentRoute === 'sermons' && (
          <motion.div key="sermons" variants={pageTransition} initial="hidden" animate="visible" exit="exit">
            <div className="page-header">
              <div className="container text-center">
                <h1>Sermon Archive</h1>
                <p>Listen, download resources, and grow in God's Word</p>
              </div>
            </div>

            <div className="section-padding">
              <div className="container">
                <div className="sermon-filters">
                  {['all', 'Sabbath Sermons', 'Week of Prayer', 'Evangelistic Series', 'Bible Studies'].map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setSelectedSermonCat(cat)} 
                      className={`filter-btn ${selectedSermonCat === cat ? 'active' : ''}`}
                    >
                      {cat === 'all' ? 'All Sermons' : cat}
                    </button>
                  ))}
                </div>

                <motion.div className="grid grid-3 gap-3 margin-top-3" variants={staggerContainer} initial="hidden" animate="visible">
                  <AnimatePresence mode="wait">
                  {filteredSermons.map(s => (
                    <motion.div key={s.id} className="card sermon-card" variants={staggerItem} layout whileHover={{ y: -4 }}>
                      <span className="badge badge-accent">{s.category}</span>
                      <h3 className="margin-top-2">{s.title}</h3>
                      <p className="sermon-meta">Speaker: <strong>{s.speaker}</strong> | Text: {s.passage}</p>
                      <p className="font-size-sm">Delivered: {s.date}</p>
                      <div className="sermon-actions">
                        <button onClick={() => setCurrentRoute('watch-live')} className="btn btn-small btn-primary">Watch Sermon</button>
                        <button className="btn btn-small btn-outline" onClick={() => alert(`Download PDF for ${s.title}`)}>Notes PDF</button>
                      </div>
                    </motion.div>
                  ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= EVENTS VIEW ================= */}
        {currentRoute === 'events' && (
          <motion.div key="events" variants={pageTransition} initial="hidden" animate="visible" exit="exit">
            <div className="page-header">
              <div className="container text-center">
                <h1>Upcoming Events</h1>
                <p>Keep up to date with events, programs, and outreach campaigns</p>
              </div>
            </div>

            <div className="section-padding">
              <div className="container">
                <motion.div className="grid grid-2 gap-4" variants={staggerContainer} initial="hidden" animate="visible">
                  {events.map(e => (
                    <motion.div key={e.id} className="card event-card" variants={staggerItem} whileHover={{ y: -5 }}>
                      <div className="event-banner-placeholder">
                        {e.title}
                        <span className="event-date-badge">{e.date}</span>
                      </div>
                      <h3>{e.title}</h3>
                      <p className="text-muted font-size-sm">Venue: <strong>{e.location}</strong></p>
                      <p className="margin-top-1">{e.desc}</p>
                      <motion.button onClick={() => setRegisteringEvent(e)} className="btn btn-accent btn-small margin-top-2" whileTap={{ scale: 0.97 }}>Register for Event</motion.button>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= GALLERY VIEW ================= */}
        {currentRoute === 'gallery' && (
          <motion.div key="gallery" variants={pageTransition} initial="hidden" animate="visible" exit="exit">
            <div className="page-header">
              <div className="container text-center">
                <h1>Photo Gallery</h1>
                <p>Memorable moments of worship, fellowship, and service</p>
              </div>
            </div>

            <div className="section-padding">
              <div className="container">
                <div className="gallery-albums">
                  {['all', 'Sabbath Worship', 'Baptism', 'Graduation Sabbath', 'Youth Camp', 'Choir', 'Community Outreach'].map(album => (
                    <button 
                      key={album} 
                      onClick={() => setSelectedGalleryAlbum(album)} 
                      className={`album-btn ${selectedGalleryAlbum === album ? 'active' : ''}`}
                    >
                      {album === 'all' ? 'All Albums' : album}
                    </button>
                  ))}
                </div>

                <motion.div className="grid grid-3 gap-2 margin-top-3" variants={staggerContainer} initial="hidden" animate="visible">
                  <AnimatePresence mode="wait">
                  {filteredGallery.map((g, i) => (
                    <motion.div key={i} className="gallery-item" variants={scaleIn} layout whileHover={{ scale: 1.02 }}>
                      <div className="gallery-mock-img" style={{ backgroundImage: `url('${g.img}')` }}></div>
                      <div className="gallery-overlay">
                        <span className="gallery-album-name">{g.album}</span>
                        <span className="gallery-title">{g.title}</span>
                      </div>
                    </motion.div>
                  ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= WATCH LIVE VIEW ================= */}
        {currentRoute === 'watch-live' && (
          <motion.div key="watch-live" variants={pageTransition} initial="hidden" animate="visible" exit="exit">
            <div className="page-header">
              <div className="container text-center">
                <h1>Watch Live</h1>
                <p>Worship with us virtually from anywhere in the world</p>
              </div>
            </div>

            <div className="section-padding">
              <div className="container grid grid-3 gap-4">
                <div className="col-span-2">
                  <div className="video-container shadow">
                    <iframe width="100%" height="450" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Worship Stream Player" frameBorder="0" allowFullScreen></iframe>
                  </div>
                  <div className="stream-info card margin-top-2">
                    <div className="flex justify-between items-center">
                      <span className="badge badge-accent pulsing-badge">LIVE NOW</span>
                      <span className="viewers-count">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        142 Watching
                      </span>
                    </div>
                    <h2 className="margin-top-2">Sabbath Divine Worship Service</h2>
                    <p className="text-muted">Seattle International Church, Bugema University - Live Broadcast</p>
                    <p className="margin-top-1">Welcome online family! We are currently worshiping together. Feel free to submit prayer requests during the service and participate in the live community chat.</p>
                  </div>
                </div>

                <div className="live-chat-panel card">
                  <h3 className="card-title">Live Prayer & Fellowship Chat</h3>
                  <div className="chat-messages">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className="chat-msg">
                        <span className="chat-user">{msg.user}:</span>
                        <span className="chat-text">{msg.text}</span>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleChatSend} className="chat-input-area margin-top-2">
                    <input 
                      type="text" 
                      value={chatInput} 
                      onChange={(e) => setChatInput(e.target.value)} 
                      placeholder="Type a message..." 
                      required 
                    />
                    <button type="submit" className="btn btn-accent btn-small">Send</button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= BIBLE STUDY VIEW ================= */}
        {currentRoute === 'bible-study' && (
          <motion.div key="bible-study" variants={pageTransition} initial="hidden" animate="visible" exit="exit">
            <div className="page-header">
              <div className="container text-center">
                <h1>Bible Study Registration</h1>
                <p>Grow in knowledge of the scriptures with church leaders and friends</p>
              </div>
            </div>

            <div className="section-padding">
              <div className="container max-width-600 card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2 className="section-title text-center">Register for Bible Study</h2>
                <p className="text-center text-muted">Submit the form below, and one of our study guides or elders will contact you to coordinate a group or individual session.</p>
                
                <form onSubmit={handleBibleStudySubmit} className="margin-top-3">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      value={studyForm.name} 
                      onChange={(e) => setStudyForm({ ...studyForm, name: e.target.value })} 
                      required 
                      placeholder="Enter your full name" 
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={studyForm.email} 
                      onChange={(e) => setStudyForm({ ...studyForm, email: e.target.value })} 
                      required 
                      placeholder="Enter your email" 
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      value={studyForm.phone} 
                      onChange={(e) => setStudyForm({ ...studyForm, phone: e.target.value })} 
                      required 
                      placeholder="e.g. +256 701 234567" 
                    />
                  </div>
                  <div className="form-group">
                    <label>Country of Origin</label>
                    <input 
                      type="text" 
                      value={studyForm.country} 
                      onChange={(e) => setStudyForm({ ...studyForm, country: e.target.value })} 
                      required 
                      placeholder="e.g. Uganda, Kenya, Rwanda, USA" 
                    />
                  </div>
                  <div className="form-group">
                    <label>Select Study Topic / Level</label>
                    <select 
                      value={studyForm.course} 
                      onChange={(e) => setStudyForm({ ...studyForm, course: e.target.value })} 
                      required
                    >
                      <option value="" disabled>Select a study guide...</option>
                      <option value="Discover Bible Lessons (Introduction)">Discover Bible Lessons (Introduction)</option>
                      <option value="Daniel and Revelation (Prophecy Focus)">Daniel & Revelation (Prophecy Focus)</option>
                      <option value="SDA Baptism Preparation Study">Baptism Preparation Study</option>
                      <option value="Christ-Centered Living (Discipleship)">Christ-Centered Living (Discipleship)</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Submit Registration</button>
                </form>

                {studySuccess && (
                  <motion.div className="alert alert-success margin-top-2" variants={fadeIn} initial="hidden" animate="visible">
                    Thank you for registering! Our Bible study team will reach out to you shortly.
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= PRAYER VIEW ================= */}
        {currentRoute === 'prayer-requests' && (
          <motion.div key="prayer-requests" variants={pageTransition} initial="hidden" animate="visible" exit="exit">
            <div className="page-header">
              <div className="container text-center">
                <h1>Prayer Request Chamber</h1>
                <p>You are not alone. Let us stand with you in prayer.</p>
              </div>
            </div>

            <div className="section-padding">
              <div className="container max-width-600 card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2 className="section-title text-center">Submit a Prayer Request</h2>
                <p className="text-center text-muted">Your request will be delivered to our pastors and elders. If checked confidential, only the pastors will receive it.</p>
                
                <form onSubmit={handlePrayerRequestSubmit} className="margin-top-3">
                  <div className="form-group">
                    <label>Your Name (Optional)</label>
                    <input 
                      type="text" 
                      value={prayerForm.name} 
                      onChange={(e) => setPrayerForm({ ...prayerForm, name: e.target.value })} 
                      placeholder="Leave blank to submit anonymously" 
                    />
                  </div>
                  <div className="form-group">
                    <label>Prayer Request</label>
                    <textarea 
                      value={prayerForm.content} 
                      onChange={(e) => setPrayerForm({ ...prayerForm, content: e.target.value })} 
                      required 
                      rows={6} 
                      placeholder="Write your petition or praise report here..."
                    />
                  </div>
                  <div className="form-group checkbox-group">
                    <input 
                      type="checkbox" 
                      id="prayer-check" 
                      checked={prayerForm.confidential} 
                      onChange={(e) => setPrayerForm({ ...prayerForm, confidential: e.target.checked })} 
                    />
                    <label htmlFor="prayer-check">Keep this request strictly confidential (Pastors only)</label>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Submit Request</button>
                </form>

                {prayerSuccess && (
                  <motion.div className="alert alert-success margin-top-2" variants={fadeIn} initial="hidden" animate="visible">
                    Your request has been submitted. Rest assured, our team will be praying for you.
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= GIVE VIEW ================= */}
        {currentRoute === 'give' && (
          <motion.div key="give" variants={pageTransition} initial="hidden" animate="visible" exit="exit">
            <div className="page-header">
              <div className="container text-center">
                <h1>Giving & Support</h1>
                <p>Support our local church, student ministries, and outreach programs</p>
              </div>
            </div>

            <div className="section-padding">
              <div className="container grid grid-2 gap-4">
                <div className="card">
                  <h2 className="card-title text-gold">Online Tithes & Offerings</h2>
                  <form onSubmit={handleDonationSubmit} className="margin-top-2">
                    <div className="form-group">
                      <label>Amount (UGX / USD)</label>
                      <input 
                        type="number" 
                        value={donationForm.amount} 
                        onChange={(e) => setDonationForm({ ...donationForm, amount: e.target.value })} 
                        required 
                        min="1000" 
                        placeholder="e.g. 50000" 
                      />
                    </div>
                    <div className="form-group">
                      <label>Allocation Fund</label>
                      <select 
                        value={donationForm.fund} 
                        onChange={(e) => setDonationForm({ ...donationForm, fund: e.target.value })} 
                        required
                      >
                        <option value="Tithe">Tithe</option>
                        <option value="Offering">Offering</option>
                        <option value="Building Fund">Building Fund</option>
                        <option value="Mission Fund">Mission / Student Outreach</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Payment Method</label>
                      <select 
                        value={donationForm.method} 
                        onChange={(e) => setDonationForm({ ...donationForm, method: e.target.value })} 
                        required
                      >
                        <option value="Mobile Money">Mobile Money (MTN / Airtel)</option>
                        <option value="Bank Account">Bank Account Transfer</option>
                        <option value="PayPal">PayPal</option>
                      </select>
                    </div>

                    <div className="payment-detail-box">
                      {donationForm.method === 'Mobile Money' && (
                        <div>
                          <p>Enter your 10-digit mobile wallet number below. A prompt will be sent to your device.</p>
                          <div className="form-group margin-top-1">
                            <label>Wallet Number</label>
                            <input type="tel" required placeholder="e.g. 0770000000" />
                          </div>
                        </div>
                      )}
                      {donationForm.method === 'Bank Account' && (
                        <div>
                          <p>Please initiate a transfer from your bank app using the details provided on the right. Enter reference text below.</p>
                          <div className="form-group margin-top-1">
                            <label>Transaction Reference ID</label>
                            <input type="text" required placeholder="Enter reference number" />
                          </div>
                        </div>
                      )}
                      {donationForm.method === 'PayPal' && (
                        <div>
                          <p>You will be redirected to PayPal sandbox. Enter your PayPal email below.</p>
                          <div className="form-group margin-top-1">
                            <label>PayPal Email Address</label>
                            <input type="email" required placeholder="name@domain.com" />
                          </div>
                        </div>
                      )}
                    </div>

                    <button type="submit" className="btn btn-accent btn-block margin-top-2">Complete Transfer</button>
                  </form>

                  {donationSuccess && (
                    <div className="alert alert-success margin-top-2">
                      Thank you! Your donation request has been recorded. May God bless your stewardship.
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="section-title">Giving Details</h2>
                  <p>Honoring the Lord with your substance is an act of worship. Here are the local bank and mobile accounts for Seattle International Church.</p>
                  
                  <div className="payment-method-card card margin-top-2">
                    <h3>Mobile Money (Uganda)</h3>
                    <p><strong>Airtel Money Merchant Code:</strong> 1224556</p>
                    <p><strong>MTN MoMo Pay Merchant Code:</strong> 889988</p>
                    <p className="text-muted">Account Name: Seattle International Church - Bugema</p>
                  </div>

                  <div className="payment-method-card card margin-top-2">
                    <h3>Bank Transfer</h3>
                    <p><strong>Bank:</strong> Stanbic Bank Uganda</p>
                    <p><strong>Branch:</strong> Mukono Branch</p>
                    <p><strong>Account Number:</strong> 9030018945628</p>
                    <p><strong>Swift Code:</strong> SBICUGKAX</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= CONTACT VIEW ================= */}
        {currentRoute === 'contact' && (
          <motion.div key="contact" variants={pageTransition} initial="hidden" animate="visible" exit="exit">
            <div className="page-header">
              <div className="container text-center">
                <h1>Contact Us</h1>
                <p>Get in touch or visit Bugema University campus</p>
              </div>
            </div>

            <div className="section-padding">
              <div className="container grid grid-2 gap-4">
                <div className="card">
                  <h2 className="card-title">Send a Message</h2>
                  <form onSubmit={handleContactSubmit} className="margin-top-2">
                    <div className="form-group">
                      <label>Your Name</label>
                      <input 
                        type="text" 
                        value={contactForm.name} 
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} 
                        required 
                        placeholder="Enter name" 
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        value={contactForm.email} 
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} 
                        required 
                        placeholder="Enter email" 
                      />
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea 
                        value={contactForm.message} 
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} 
                        required 
                        rows={5} 
                        placeholder="Write message..." 
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Send Message</button>
                  </form>

                  {contactSuccess && (
                    <div className="alert alert-success margin-top-2">
                      Message sent successfully! We'll reply as soon as possible.
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="section-title">Where to Find Us</h2>
                  <p className="margin-top-1">Our chapel is situated on the beautiful campus of <strong>Bugema University</strong>, located along Gayaza-Zirobwe Road, 32 kilometers north of Kampala, Uganda.</p>
                  
                  <div className="contact-details margin-top-2">
                    <p><strong>Phone:</strong> +256 700 000 000 | +256 770 000 000</p>
                    <p><strong>Email:</strong> sic@bugema.ac.ug</p>
                    <p><strong>WhatsApp:</strong> +256 700 000 000</p>
                  </div>

                  <div className="mock-map margin-top-3">
                    <div className="map-inner">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <strong>Bugema University Campus</strong>
                      <span>Gayaza-Zirobwe Road, Uganda</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= ADMIN VIEW ================= */}
        {currentRoute === 'admin' && (
          <motion.div key="admin" variants={pageTransition} initial="hidden" animate="visible" exit="exit">
            <div className="page-header">
              <div className="container text-center">
                <h1>Admin Dashboard</h1>
                <p>Church Management and Request Portal</p>
              </div>
            </div>

            <div className="section-padding">
              <div className="container admin-container">
                <div className="admin-sidebar card">
                  <h3 className="admin-sidebar-title">Navigation</h3>
                  <ul className="admin-menu">
                    {[
                      { id: 'admin-stats', label: 'Dashboard Stats' },
                      { id: 'admin-studies', label: 'Bible Studies' },
                      { id: 'admin-prayers', label: 'Prayer Requests' },
                      { id: 'admin-donations', label: 'Donations' },
                      { id: 'admin-events', label: 'Manage Events' },
                      { id: 'admin-sermons', label: 'Manage Sermons' }
                    ].map(tab => (
                      <li key={tab.id}>
                        <button 
                          onClick={() => setActiveAdminTab(tab.id)} 
                          className={`admin-tab-btn ${activeAdminTab === tab.id ? 'active' : ''}`}
                        >
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="admin-main-panel card">
                  {/* Dashboard Stats */}
                  {activeAdminTab === 'admin-stats' && (
                    <div className="admin-tab-content active">
                      <h2>Key Statistics</h2>
                      <div className="grid grid-3 gap-2 margin-top-2">
                        <div className="stat-card">
                          <span className="stat-num">{prayers.length}</span>
                          <span className="stat-label">Prayer Requests</span>
                        </div>
                        <div className="stat-card">
                          <span className="stat-num">{bibleStudies.length}</span>
                          <span className="stat-label">Bible Study Signups</span>
                        </div>
                        <div className="stat-card">
                          <span className="stat-num">{totalDonations.toLocaleString()} UGX</span>
                          <span className="stat-label">Total Donations</span>
                        </div>
                      </div>
                      <h3 className="margin-top-3">Recent Activity Logs</h3>
                      <div className="activity-log-table margin-top-1">
                        {logs.map((log, i) => (
                          <div key={i} className="activity-item">
                            <span className="activity-time">[{log.time}]</span>
                            <span>{log.msg}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bible Studies List */}
                  {activeAdminTab === 'admin-studies' && (
                    <div className="admin-tab-content active">
                      <h2>Bible Study Registration List</h2>
                      <div className="table-responsive margin-top-2">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Email / Phone</th>
                              <th>Country</th>
                              <th>Topic</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bibleStudies.length === 0 ? (
                              <tr><td colSpan={5} className="text-center">No registrations yet.</td></tr>
                            ) : (
                              bibleStudies.map(item => (
                                <tr key={item.id}>
                                  <td><strong>{item.name}</strong></td>
                                  <td>{item.email}<br />{item.phone}</td>
                                  <td>{item.country}</td>
                                  <td><span className="badge">{item.course}</span></td>
                                  <td>
                                    <button onClick={() => item.id && handleAdminDeleteStudy(item.id)} className="btn btn-small btn-outline">Delete</button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Prayers List */}
                  {activeAdminTab === 'admin-prayers' && (
                    <div className="admin-tab-content active">
                      <h2>Prayer Requests Chamber Log</h2>
                      <div className="table-responsive margin-top-2">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Request</th>
                              <th>Confidential?</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prayers.length === 0 ? (
                              <tr><td colSpan={4} className="text-center">No prayer requests submitted yet.</td></tr>
                            ) : (
                              prayers.map(item => (
                                <tr key={item.id}>
                                  <td><strong>{item.name}</strong></td>
                                  <td>{item.content}</td>
                                  <td>{item.confidential ? <span className="badge badge-accent">CONFIDENTIAL</span> : <span className="badge">PUBLIC</span>}</td>
                                  <td>
                                    <button onClick={() => item.id && handleAdminDeletePrayer(item.id)} className="btn btn-small btn-outline">Delete</button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Donations list */}
                  {activeAdminTab === 'admin-donations' && (
                    <div className="admin-tab-content active">
                      <h2>Donation Records</h2>
                      <div className="table-responsive margin-top-2">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Amount</th>
                              <th>Fund</th>
                              <th>Method</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {donations.length === 0 ? (
                              <tr><td colSpan={4} className="text-center">No contributions logged.</td></tr>
                            ) : (
                              donations.map(item => (
                                <tr key={item.id}>
                                  <td><strong>{item.amount.toLocaleString()} UGX</strong></td>
                                  <td>{item.fund}</td>
                                  <td>{item.method}</td>
                                  <td><span className="badge" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>{item.status || 'Success'}</span></td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Manage Events */}
                  {activeAdminTab === 'admin-events' && (
                    <div className="admin-tab-content active">
                      <div className="flex justify-between items-center">
                        <h2>Events Calendar Management</h2>
                        <button onClick={() => setShowAddEventModal(true)} className="btn btn-accent btn-small">+ Add New Event</button>
                      </div>
                      <div className="table-responsive margin-top-2">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Event Name</th>
                              <th>Date</th>
                              <th>Location</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {events.map(item => (
                              <tr key={item.id}>
                                <td><strong>{item.title}</strong></td>
                                <td>{item.date}</td>
                                <td>{item.location}</td>
                                <td>
                                  <button onClick={() => handleAdminDeleteEvent(item.id)} className="btn btn-small btn-outline">Remove</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Manage Sermons */}
                  {activeAdminTab === 'admin-sermons' && (
                    <div className="admin-tab-content active">
                      <div className="flex justify-between items-center">
                        <h2>Sermon Archive Management</h2>
                        <button onClick={() => setShowAddSermonModal(true)} className="btn btn-accent btn-small">+ Add New Sermon</button>
                      </div>
                      <div className="table-responsive margin-top-2">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Speaker</th>
                              <th>Date</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sermons.map(item => (
                              <tr key={item.id}>
                                <td><strong>{item.title}</strong></td>
                                <td>{item.speaker}</td>
                                <td>{item.date}</td>
                                <td>
                                  <button onClick={() => handleAdminDeleteSermon(item.id)} className="btn btn-small btn-outline">Remove</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </motion.div>
        )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container footer-grid grid grid-3 gap-3">
          <div>
            <h3>Seattle International Church</h3>
            <p className="margin-top-1 font-size-sm">Bugema University, Gayaza-Zirobwe Road, Uganda. Fostering faith, global citizenship, and active ministry in preparation for the Second Coming.</p>
            <div className="footer-socials margin-top-2">
              <a href="https://wa.me/256700000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
              <button onClick={() => setCurrentRoute('watch-live')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Watch Live Link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </button>
            </div>
          </div>
          
          <div>
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><button onClick={() => setCurrentRoute('about')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Our Beliefs & Team</button></li>
              <li><button onClick={() => setCurrentRoute('ministries')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Ministries & Service</button></li>
              <li><button onClick={() => setCurrentRoute('bible-study')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Request Bible Study</button></li>
              <li><button onClick={() => setCurrentRoute('prayer-requests')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Prayer Chamber</button></li>
              <li><button onClick={() => setCurrentRoute('give')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Support Ministry</button></li>
            </ul>
          </div>

          <div>
            <h3>Daily Verse</h3>
            <div className="footer-verse">
              <p>"Commit your way to the Lord; trust in him, and he will act."</p>
              <span>- Psalm 37:5</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom text-center">
          <p>&copy; 2026 Seattle International Church, Bugema University. All rights reserved.</p>
        </div>
      </footer>

      {/* Ministry Detail Modal */}
      <AnimatePresence>
      {selectedMinistry && (
        <motion.div className="modal active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <motion.div className="modal-content" initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 30 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <button className="close-modal" onClick={() => setSelectedMinistry(null)}>&times;</button>
            <div className="student-icon" style={{ marginBottom: '1rem' }}>{selectedMinistry.icon}</div>
            <h2>{selectedMinistry.title}</h2>
            <hr style={{ margin: '15px 0', border: '0', borderTop: '1px solid var(--border-color)' }} />
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{selectedMinistry.desc}</p>
            <div className="margin-top-3" style={{ display: 'flex', gap: '15px' }}>
              <button onClick={() => { setCurrentRoute('bible-study'); setSelectedMinistry(null); }} className="btn btn-primary">Join Bible Study Group</button>
              <button onClick={() => { setCurrentRoute('contact'); setSelectedMinistry(null); }} className="btn btn-outline">Get in Touch</button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Event Reg Modal */}
      <AnimatePresence>
      {registeringEvent && (
        <motion.div className="modal active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <motion.div className="modal-content modal-medium" initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 30 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <button className="close-modal" onClick={() => setRegisteringEvent(null)}>&times;</button>
            <h2 className="section-title text-center">Event Registration</h2>
            <p className="text-center text-muted">Registering for: {registeringEvent.title}</p>
            <form onSubmit={handleEventRegSubmit} className="margin-top-3">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={eventRegForm.name} 
                  onChange={(e) => setEventRegForm({ ...eventRegForm, name: e.target.value })} 
                  required 
                  placeholder="Enter your name" 
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={eventRegForm.email} 
                  onChange={(e) => setEventRegForm({ ...eventRegForm, email: e.target.value })} 
                  required 
                  placeholder="Enter your email" 
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  value={eventRegForm.phone} 
                  onChange={(e) => setEventRegForm({ ...eventRegForm, phone: e.target.value })} 
                  required 
                  placeholder="e.g. +256..." 
                />
              </div>
              <div className="form-group">
                <label>Additional Notes / Dietary requirements (if applicable)</label>
                <textarea 
                  value={eventRegForm.notes} 
                  onChange={(e) => setEventRegForm({ ...eventRegForm, notes: e.target.value })} 
                  placeholder="Any optional details" 
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Confirm Registration</button>
            </form>

            {eventRegSuccess && (
              <motion.div className="alert alert-success margin-top-2" variants={fadeIn} initial="hidden" animate="visible">
                Successfully registered! We have saved your spot.
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Add Event Modal (Admin) */}
      <AnimatePresence>
      {showAddEventModal && (
        <motion.div className="modal active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <motion.div className="modal-content modal-medium" initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 30 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <button className="close-modal" onClick={() => setShowAddEventModal(false)}>&times;</button>
            <h2 className="section-title text-center">Add New Event</h2>
            <form onSubmit={handleAdminAddEventSubmit} className="margin-top-3">
              <div className="form-group">
                <label>Event Title</label>
                <input 
                  type="text" 
                  value={addEventForm.title} 
                  onChange={(e) => setAddEventForm({ ...addEventForm, title: e.target.value })} 
                  required 
                  placeholder="e.g. Bugema Camp Meeting" 
                />
              </div>
              <div className="form-group">
                <label>Event Date</label>
                <input 
                  type="date" 
                  value={addEventForm.date} 
                  onChange={(e) => setAddEventForm({ ...addEventForm, date: e.target.value })} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Location Venue</label>
                <input 
                  type="text" 
                  value={addEventForm.location} 
                  onChange={(e) => setAddEventForm({ ...addEventForm, location: e.target.value })} 
                  required 
                  placeholder="e.g. Main Assembly Pavilion" 
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={addEventForm.desc} 
                  onChange={(e) => setAddEventForm({ ...addEventForm, desc: e.target.value })} 
                  required 
                  rows={4}
                  placeholder="Provide details about the event..." 
                />
              </div>
              <button type="submit" className="btn btn-accent btn-block">Add Event</button>
            </form>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Add Sermon Modal (Admin) */}
      <AnimatePresence>
      {showAddSermonModal && (
        <motion.div className="modal active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <motion.div className="modal-content modal-medium" initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 30 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <button className="close-modal" onClick={() => setShowAddSermonModal(false)}>&times;</button>
            <h2 className="section-title text-center">Add New Sermon</h2>
            <form onSubmit={handleAdminAddSermonSubmit} className="margin-top-3">
              <div className="form-group">
                <label>Sermon Title</label>
                <input 
                  type="text" 
                  value={addSermonForm.title} 
                  onChange={(e) => setAddSermonForm({ ...addSermonForm, title: e.target.value })} 
                  required 
                  placeholder="e.g. The Sanctuary & The Sanctuary Guard" 
                />
              </div>
              <div className="form-group">
                <label>Speaker Name</label>
                <input 
                  type="text" 
                  value={addSermonForm.speaker} 
                  onChange={(e) => setAddSermonForm({ ...addSermonForm, speaker: e.target.value })} 
                  required 
                  placeholder="e.g. Pastor John Mwangi" 
                />
              </div>
              <div className="form-group">
                <label>Date Preached</label>
                <input 
                  type="date" 
                  value={addSermonForm.date} 
                  onChange={(e) => setAddSermonForm({ ...addSermonForm, date: e.target.value })} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Scripture Passage</label>
                <input 
                  type="text" 
                  value={addSermonForm.passage} 
                  onChange={(e) => setAddSermonForm({ ...addSermonForm, passage: e.target.value })} 
                  required 
                  placeholder="e.g. Hebrews 8:1-5" 
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={addSermonForm.category} 
                  onChange={(e) => setAddSermonForm({ ...addSermonForm, category: e.target.value })} 
                  required
                >
                  <option value="Sabbath Sermons">Sabbath Sermons</option>
                  <option value="Week of Prayer">Week of Prayer</option>
                  <option value="Evangelistic Series">Evangelistic Series</option>
                  <option value="Bible Studies">Bible Studies</option>
                </select>
              </div>
              <button type="submit" className="btn btn-accent btn-block">Add Sermon</button>
            </form>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

    </div>
  );
}
