/* ==========================================================================
   Seattle International Church - Application Engine (Bugema University)
   ========================================================================== */

// --- Initial Mock Data ---
const DEFAULT_LEADERS = [
    { name: "Pastor John Mwangi", role: "Lead Pastor", bio: "Pastor Mwangi has served the global SDA community for 12 years and has a deep passion for student chaplaincy." },
    { name: "Pastor Sarah Namubiru", role: "Assistant Pastor", bio: "A graduate of Bugema University's theology department, focused on campus outreach and counselling." },
    { name: "Elder Caleb Ndikumana", role: "First Elder", bio: "Coordinates board operations, spiritual fellowships, and guest relations for our international members." },
    { name: "Deaconess Mercy Awori", role: "Head Deaconess", bio: "Leads a team of deaconesses focused on hospitality, visitation, and church neatness." },
    { name: "Timothy Omondi", role: "Youth Leader", bio: "Organizes student programs, choir coordination, and voluntary missions around the campus." },
    { name: "Grace Kente", role: "Pathfinder Director", bio: "Guids our pathfinders and adventurers in skill building, community outreach, and scripture memorization." },
    { name: "Enock Birungi", role: "Treasurer", bio: "Ensures meticulous accounting practices, budget compliance, and transparent reporting." },
    { name: "Aisha Mukasa", role: "Church Clerk", bio: "Handles memberships, transfers, announcements, and board meeting minutes." }
];

const DEFAULT_MINISTRIES = [
    {
        id: "youth",
        title: "Youth Ministry",
        short: "Empowering young professionals and students.",
        desc: "Our Youth Ministry provides a space where students connect, share, and grow. We organize campouts, vespers, and forums on mental health, careers, and relationships.",
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
    },
    {
        id: "campus",
        title: "Campus Ministry",
        short: "Reaching student hearts at Bugema.",
        desc: "Being situated right inside Bugema University, we coordinate Bible classes, Friday evening vespers, cell group interactions, and baptismal instruction specifically tailored for university students.",
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>'
    },
    {
        id: "music",
        title: "Music Ministry",
        short: "Worship through international harmonies.",
        desc: "We host multiple choirs representing various linguistic and regional groups. Join our praise band, dynamic orchestra, or the Seattle International Choir.",
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>'
    },
    {
        id: "pathfinders",
        title: "Pathfinders & Adventurers",
        short: "Training children and teens for God.",
        desc: "An active scouting-style club focused on physical skills, nature studies, camping, survival guides, and foundational Bible learning for ages 6-18.",
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="6 2 18 2 18 6 6 6"/><rect x="3" y="6" width="18" height="13" rx="2"/><line x1="12" y1="12" x2="12" y2="16"/></svg>'
    },
    {
        id: "women",
        title: "Women's Ministries",
        short: "Nurturing faith, family, and sisterhood.",
        desc: "Providing opportunities for spiritual growth, fellowship, and mentoring among women of all backgrounds. We host prayer circles, cooking workshops, and charity outreaches.",
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M5.5 21c0-4.5 3-7 6.5-7s6.5 2.5 6.5 7"/></svg>'
    },
    {
        id: "prayer",
        title: "Prayer Ministry",
        short: "Standing in the gap for our community.",
        desc: "Our prayer warriors maintain a chain of prayer. We gather for prayer requests submitted online or physically, hosting early morning devotions and specialized fasting sessions.",
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
    }
];

const DEFAULT_SERMONS = [
    { id: 1, title: "The Sanctuary & The Sanctuary Guard", speaker: "Pastor John Mwangi", date: "2026-07-11", passage: "Hebrews 8:1-5", category: "Sabbath Sermons" },
    { id: 2, title: "Finding Rest in a Restless Campus", speaker: "Pastor Sarah Namubiru", date: "2026-07-04", passage: "Matthew 11:28-30", category: "Sabbath Sermons" },
    { id: 3, title: "Unshakable Faith in Prophetic Times", speaker: "Elder Caleb Ndikumana", date: "2026-06-20", passage: "Daniel 2:44", category: "Week of Prayer" },
    { id: 4, title: "Stepping into the Waters of Covenant", speaker: "Pastor John Mwangi", date: "2026-06-13", passage: "Romans 6:3-4", category: "Bible Studies" }
];

const DEFAULT_EVENTS = [
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

// --- Database Engine (localStorage helper) ---
class DB {
    static get(key, defaultVal) {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : defaultVal;
    }
    static set(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    }
}

// --- App State ---
const state = {
    sermons: DB.get("sic_sermons", DEFAULT_SERMONS),
    events: DB.get("sic_events", DEFAULT_EVENTS),
    prayers: DB.get("sic_prayers", []),
    bibleStudies: DB.get("sic_bible_studies", []),
    donations: DB.get("sic_donations", []),
    logs: DB.get("sic_logs", [
        { time: new Date().toLocaleString(), msg: "Database initialized and loaded." }
    ])
};

// Log helper
function addLog(msg) {
    state.logs.unshift({
        time: new Date().toLocaleString(),
        msg: msg
    });
    DB.set("sic_logs", state.logs);
    renderLogs();
}

// --- Client-Side Routing ---
function handleRouting() {
    const hash = window.location.hash || "#home";
    const views = document.querySelectorAll(".page-view");
    const navLinks = document.querySelectorAll(".nav-link");

    let matched = false;
    views.forEach(view => {
        if (`#${view.id}` === hash) {
            view.classList.add("active");
            matched = true;
        } else {
            view.classList.remove("active");
        }
    });

    // Handle Nav link activation
    navLinks.forEach(link => {
        if (link.getAttribute("href") === hash) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Mobile nav auto-close
    const navBar = document.getElementById("navBar");
    if (navBar) navBar.classList.remove("active");
}

// --- Rendering View Components ---

// Daily Verse System
function setupVerseSystem() {
    const dailyVerse = document.getElementById("daily-verse");
    const dailyVerseRef = document.getElementById("daily-verse-ref");
    const newVerseBtn = document.getElementById("new-verse-btn");

    function renderRandomVerse() {
        const v = BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)];
        if (dailyVerse) dailyVerse.innerText = `"${v.text}"`;
        if (dailyVerseRef) dailyVerseRef.innerText = v.ref;
    }

    if (newVerseBtn) {
        newVerseBtn.addEventListener("click", renderRandomVerse);
    }
    renderRandomVerse();
}

// Home Previews
function renderHomePreviews() {
    // Latest Sermon preview
    const latestSermonContainer = document.getElementById("latest-sermon-container");
    if (latestSermonContainer && state.sermons.length > 0) {
        const s = state.sermons[0];
        latestSermonContainer.innerHTML = `
            <h3 class="margin-top-1">${s.title}</h3>
            <p class="text-muted font-size-sm">Speaker: ${s.speaker} | Passage: ${s.passage}</p>
            <p class="font-size-sm">Preached on: ${s.date}</p>
        `;
    }

    // Next Event preview
    const nextEventContainer = document.getElementById("next-event-container");
    if (nextEventContainer && state.events.length > 0) {
        const e = state.events[0];
        nextEventContainer.innerHTML = `
            <h3 class="margin-top-1">${e.title}</h3>
            <p class="text-muted font-size-sm">Date: ${e.date} | Location: ${e.location}</p>
            <p class="font-size-sm text-truncate">${e.desc}</p>
        `;
    }

    // Gallery Preview (first 4 items)
    const galleryPreviewContainer = document.getElementById("gallery-preview-container");
    if (galleryPreviewContainer) {
        galleryPreviewContainer.innerHTML = DEFAULT_GALLERY.slice(0, 4).map(item => `
            <div class="gallery-item">
                <div class="gallery-mock-img" style="background-image: url('${item.img}')">
                    <span class="badge" style="position:absolute; top:10px; left:10px;">${item.album}</span>
                </div>
                <div class="gallery-overlay">
                    <span class="gallery-album-name">${item.album}</span>
                    <span class="gallery-title">${item.title}</span>
                </div>
            </div>
        `).join("");
    }
}

// Leadership Grid
function renderLeadership() {
    const leaderGrid = document.getElementById("leadership-grid");
    if (leaderGrid) {
        leaderGrid.innerHTML = DEFAULT_LEADERS.map(l => `
            <div class="leader-card card">
                <div class="leader-avatar-mock">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                </div>
                <div class="leader-name">${l.name}</div>
                <div class="leader-role">${l.role}</div>
                <div class="leader-bio">${l.bio}</div>
            </div>
        `).join("");
    }
}

// Ministries Grid
function renderMinistries() {
    const minGrid = document.getElementById("ministries-grid");
    if (minGrid) {
        minGrid.innerHTML = DEFAULT_MINISTRIES.map(m => `
            <div class="card student-card" style="cursor: pointer;" onclick="openMinistryModal('${m.id}')">
                <div class="student-icon">${m.icon}</div>
                <h3>${m.title}</h3>
                <p>${m.short}</p>
                <span class="card-link text-gold">Learn More &rarr;</span>
            </div>
        `).join("");
    }
}

// Ministry Modal Details
window.openMinistryModal = function(id) {
    const m = DEFAULT_MINISTRIES.find(x => x.id === id);
    const modal = document.getElementById("ministry-modal");
    const body = document.getElementById("ministry-modal-body");
    
    if (m && modal && body) {
        body.innerHTML = `
            <div class="student-icon" style="margin-bottom:1rem;">${m.icon}</div>
            <h2>${m.title}</h2>
            <hr style="margin: 15px 0; border: 0; border-top: 1px solid var(--border-color);">
            <p style="font-size: 1.1rem; line-height: 1.8;">${m.desc}</p>
            <div class="margin-top-3">
                <a href="#bible-study" class="btn btn-primary" onclick="closeAllModals()">Join Bible Study Group</a>
                <a href="#contact" class="btn btn-outline" onclick="closeAllModals()">Get in Touch</a>
            </div>
        `;
        modal.classList.add("active");
    }
};

// Core Beliefs
function renderBeliefs() {
    const beliefGrid = document.getElementById("beliefs-grid");
    if (beliefGrid) {
        beliefGrid.innerHTML = DEFAULT_BELIEFS.map(b => `
            <div class="belief-card card">
                <h3>${b.title}</h3>
                <p>${b.desc}</p>
            </div>
        `).join("");
    }
}

// Sermons
function renderSermons(category = "all") {
    const grid = document.getElementById("sermons-grid");
    if (!grid) return;

    const filtered = category === "all" ? state.sermons : state.sermons.filter(s => s.category === category);
    
    grid.innerHTML = filtered.map(s => `
        <div class="card sermon-card">
            <span class="badge badge-accent">${s.category}</span>
            <h3 class="margin-top-2">${s.title}</h3>
            <p class="sermon-meta">Speaker: <strong>${s.speaker}</strong> | Text: ${s.passage}</p>
            <p class="font-size-sm">Delivered: ${s.date}</p>
            <div class="sermon-actions">
                <a href="#watch-live" class="btn btn-small btn-primary">Watch Sermon</a>
                <button class="btn btn-small btn-outline" onclick="alert('Download notes for: ${s.title.replace(/'/g, "\\'")}')">Notes PDF</button>
            </div>
        </div>
    `).join("");
}

// Events
function renderEvents() {
    const grid = document.getElementById("events-grid");
    if (!grid) return;

    grid.innerHTML = state.events.map(e => `
        <div class="card event-card">
            <div class="event-banner-placeholder">
                ${e.title}
                <span class="event-date-badge">${e.date}</span>
            </div>
            <h3>${e.title}</h3>
            <p class="text-muted font-size-sm">Venue: <strong>${e.location}</strong></p>
            <p class="margin-top-1">${e.desc}</p>
            <button class="btn btn-accent btn-small margin-top-2" onclick="openEventModal(${e.id}, '${e.title.replace(/'/g, "\\'")}')">Register for Event</button>
        </div>
    `).join("");
}

window.openEventModal = function(id, title) {
    const modal = document.getElementById("event-reg-modal");
    const titleLabel = document.getElementById("event-reg-title-name");
    const idInput = document.getElementById("event-reg-id");
    const successMsg = document.getElementById("event-reg-success");

    if (modal && titleLabel && idInput && successMsg) {
        idInput.value = id;
        titleLabel.innerText = `Registering for: ${title}`;
        successMsg.classList.add("hidden");
        modal.classList.add("active");
    }
};

// Gallery
function renderGallery(album = "all") {
    const grid = document.getElementById("gallery-grid");
    if (!grid) return;

    const filtered = album === "all" ? DEFAULT_GALLERY : DEFAULT_GALLERY.filter(g => g.album === album);

    grid.innerHTML = filtered.map(g => `
        <div class="gallery-item">
            <div class="gallery-mock-img" style="background-image: url('${g.img}')"></div>
            <div class="gallery-overlay">
                <span class="gallery-album-name">${g.album}</span>
                <span class="gallery-title">${g.title}</span>
            </div>
        </div>
    `).join("");
}

// Watch Live Chat interaction
function setupLiveChat() {
    const form = document.getElementById("chat-send-form");
    const input = document.getElementById("chat-message-input");
    const chatContainer = document.getElementById("chat-messages-container");

    if (form && input && chatContainer) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const msgText = input.value.trim();
            if (msgText) {
                const item = document.createElement("div");
                item.className = "chat-msg";
                item.innerHTML = `<span class="chat-user">You:</span><span class="chat-text">${msgText}</span>`;
                chatContainer.appendChild(item);
                chatContainer.scrollTop = chatContainer.scrollHeight;
                input.value = "";
            }
        });
    }
}

// Payment Dynamic Selector fields
function setupPaymentSelection() {
    const sel = document.getElementById("donate-method");
    const container = document.getElementById("dynamic-payment-fields");
    if (!sel || !container) return;

    const updateFields = () => {
        if (sel.value === "Mobile Money") {
            container.innerHTML = `
                <div class="payment-detail-box">
                    <p>Enter your 10-digit mobile wallet number below. A prompt will be sent to your device.</p>
                    <div class="form-group margin-top-1">
                        <label for="momo-number">Wallet Number</label>
                        <input type="tel" id="momo-number" required placeholder="e.g. 0770000000">
                    </div>
                </div>
            `;
        } else if (sel.value === "Bank Account") {
            container.innerHTML = `
                <div class="payment-detail-box">
                    <p>Please initiate a transfer from your bank app using the details provided on the right. Enter reference text below.</p>
                    <div class="form-group margin-top-1">
                        <label for="bank-ref">Transaction Reference ID</label>
                        <input type="text" id="bank-ref" required placeholder="Enter reference number">
                    </div>
                </div>
            `;
        } else if (sel.value === "PayPal") {
            container.innerHTML = `
                <div class="payment-detail-box">
                    <p>You will be redirected to PayPal sandbox. Enter your PayPal email below.</p>
                    <div class="form-group margin-top-1">
                        <label for="paypal-email">PayPal Email Address</label>
                        <input type="email" id="paypal-email" required placeholder="name@domain.com">
                    </div>
                </div>
            `;
        }
    };

    sel.addEventListener("change", updateFields);
    updateFields();
}

// --- Forms Handling ---
function setupFormListeners() {
    // Bible Study Form
    const studyForm = document.getElementById("bible-study-form");
    if (studyForm) {
        studyForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = {
                id: Date.now(),
                name: document.getElementById("study-name").value,
                email: document.getElementById("study-email").value,
                phone: document.getElementById("study-phone").value,
                country: document.getElementById("study-country").value,
                course: document.getElementById("study-course").value,
                status: "Pending Guides Allocation"
            };
            state.bibleStudies.push(data);
            DB.set("sic_bible_studies", state.bibleStudies);
            addLog(`New Bible study registered for ${data.name} (${data.course})`);
            
            // Show Success
            document.getElementById("bible-study-success").classList.remove("hidden");
            studyForm.reset();
            renderDashboard();
            setTimeout(() => {
                const msg = document.getElementById("bible-study-success");
                if (msg) msg.classList.add("hidden");
            }, 6000);
        });
    }

    // Prayer Requests Form
    const prayerForm = document.getElementById("prayer-request-form");
    if (prayerForm) {
        prayerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = {
                id: Date.now(),
                name: document.getElementById("prayer-name").value || "Anonymous",
                content: document.getElementById("prayer-content").value,
                confidential: document.getElementById("prayer-confidential").checked
            };
            state.prayers.push(data);
            DB.set("sic_prayers", state.prayers);
            addLog(`New prayer request submitted by ${data.name}`);

            document.getElementById("prayer-request-success").classList.remove("hidden");
            prayerForm.reset();
            renderDashboard();
            setTimeout(() => {
                const msg = document.getElementById("prayer-request-success");
                if (msg) msg.classList.add("hidden");
            }, 6000);
        });
    }

    // Donation Form
    const donationForm = document.getElementById("donation-form");
    if (donationForm) {
        donationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = {
                id: Date.now(),
                amount: parseFloat(document.getElementById("donate-amount").value),
                fund: document.getElementById("donate-fund").value,
                method: document.getElementById("donate-method").value,
                status: "Completed Stewardship"
            };
            state.donations.push(data);
            DB.set("sic_donations", state.donations);
            addLog(`Donation received: ${data.amount} UGX for ${data.fund}`);

            document.getElementById("donation-success").classList.remove("hidden");
            donationForm.reset();
            renderDashboard();
            setTimeout(() => {
                const msg = document.getElementById("donation-success");
                if (msg) msg.classList.add("hidden");
            }, 6000);
        });
    }

    // Event Registration Form inside modal
    const eventRegForm = document.getElementById("event-reg-form");
    if (eventRegForm) {
        eventRegForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const eventId = document.getElementById("event-reg-id").value;
            const event = state.events.find(x => x.id == eventId);
            const userName = document.getElementById("event-user-name").value;
            
            addLog(`User ${userName} registered for event: ${event ? event.title : eventId}`);
            
            const success = document.getElementById("event-reg-success");
            success.classList.remove("hidden");
            eventRegForm.reset();
            setTimeout(() => {
                closeAllModals();
            }, 2500);
        });
    }

    // Contact Form
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("contact-name").value;
            addLog(`Contact inquiry message received from ${name}`);
            
            const success = document.getElementById("contact-success");
            success.classList.remove("hidden");
            contactForm.reset();
            setTimeout(() => {
                if (success) success.classList.add("hidden");
            }, 6000);
        });
    }
}

// --- Admin Dashboard Panel Management ---
function setupAdminDashboard() {
    const adminNavTabs = document.getElementById("admin-nav-tabs");
    if (!adminNavTabs) return;

    adminNavTabs.addEventListener("click", (e) => {
        const btn = e.target.closest(".admin-tab-btn");
        if (!btn) return;

        // Deactivate old
        document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".admin-tab-content").forEach(c => c.classList.remove("active"));

        // Activate clicked
        btn.classList.add("active");
        const tabId = btn.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");
    });

    // Add event button dialog
    const addEventBtn = document.getElementById("admin-add-event-btn");
    if (addEventBtn) {
        addEventBtn.addEventListener("click", () => {
            const title = prompt("Enter Event Title:");
            if (!title) return;
            const date = prompt("Enter Event Date (e.g. 2026-09-12):");
            const location = prompt("Enter Location Venue:");
            const desc = prompt("Enter brief description:");
            
            const nextId = state.events.length > 0 ? Math.max(...state.events.map(ev => ev.id)) + 1 : 1;
            state.events.push({ id: nextId, title, date, location, desc });
            DB.set("sic_events", state.events);
            addLog(`Event "${title}" added to calendar.`);
            renderEvents();
            renderDashboard();
        });
    }

    // Add sermon button dialog
    const addSermonBtn = document.getElementById("admin-add-sermon-btn");
    if (addSermonBtn) {
        addSermonBtn.addEventListener("click", () => {
            const title = prompt("Enter Sermon Title:");
            if (!title) return;
            const speaker = prompt("Enter Speaker Name:");
            const date = prompt("Enter Preach Date:");
            const passage = prompt("Enter scripture passage:");
            const category = prompt("Choose Category (Sabbath Sermons / Week of Prayer / Bible Studies):") || "Sabbath Sermons";
            
            const nextId = state.sermons.length > 0 ? Math.max(...state.sermons.map(s => s.id)) + 1 : 1;
            state.sermons.unshift({ id: nextId, title, speaker, date, passage, category });
            DB.set("sic_sermons", state.sermons);
            addLog(`Sermon "${title}" added to archive.`);
            renderSermons();
            renderDashboard();
        });
    }
}

// Render dynamic lists inside Dashboard tabs
function renderDashboard() {
    // Stats calculation
    const totalDonations = state.donations.reduce((sum, item) => sum + item.amount, 0);
    const studyCount = state.bibleStudies.length;
    const prayerCount = state.prayers.length;

    const labelDonations = document.getElementById("stat-donations");
    if (labelDonations) labelDonations.innerText = `${totalDonations.toLocaleString()} UGX`;
    
    const labelStudies = document.getElementById("stat-studies");
    if (labelStudies) labelStudies.innerText = studyCount;

    const labelPrayers = document.getElementById("stat-prayers");
    if (labelPrayers) labelPrayers.innerText = prayerCount;

    // Render bible list table
    const bibleTableBody = document.getElementById("admin-bible-list");
    if (bibleTableBody) {
        if (state.bibleStudies.length === 0) {
            bibleTableBody.innerHTML = `<tr><td colspan="5" class="text-center">No registrations yet.</td></tr>`;
        } else {
            bibleTableBody.innerHTML = state.bibleStudies.map(item => `
                <tr>
                    <td><strong>${item.name}</strong></td>
                    <td>${item.email}<br>${item.phone}</td>
                    <td>${item.country}</td>
                    <td><span class="badge">${item.course}</span></td>
                    <td>
                        <button class="btn btn-small btn-outline" onclick="deleteStudy(${item.id})">Delete</button>
                    </td>
                </tr>
            `).join("");
        }
    }

    // Render prayer table list
    const prayerTableBody = document.getElementById("admin-prayer-list");
    if (prayerTableBody) {
        if (state.prayers.length === 0) {
            prayerTableBody.innerHTML = `<tr><td colspan="4" class="text-center">No prayer requests submitted yet.</td></tr>`;
        } else {
            prayerTableBody.innerHTML = state.prayers.map(item => `
                <tr>
                    <td><strong>${item.name}</strong></td>
                    <td>${item.content}</td>
                    <td>${item.confidential ? '<span class="badge badge-accent">CONFIDENTIAL</span>' : '<span class="badge">PUBLIC</span>'}</td>
                    <td>
                        <button class="btn btn-small btn-outline" onclick="deletePrayer(${item.id})">Delete</button>
                    </td>
                </tr>
            `).join("");
        }
    }

    // Render donations list table
    const donationsTableBody = document.getElementById("admin-donations-list");
    if (donationsTableBody) {
        if (state.donations.length === 0) {
            donationsTableBody.innerHTML = `<tr><td colspan="4" class="text-center">No contributions logged.</td></tr>`;
        } else {
            donationsTableBody.innerHTML = state.donations.map(item => `
                <tr>
                    <td><strong>${item.amount.toLocaleString()} UGX</strong></td>
                    <td>${item.fund}</td>
                    <td>${item.method}</td>
                    <td><span class="badge" style="background-color:var(--success-light); color:var(--success);">${item.status}</span></td>
                </tr>
            `).join("");
        }
    }

    // Render events list table
    const eventsTableBody = document.getElementById("admin-events-list");
    if (eventsTableBody) {
        eventsTableBody.innerHTML = state.events.map(item => `
            <tr>
                <td><strong>${item.title}</strong></td>
                <td>${item.date}</td>
                <td>${item.location}</td>
                <td>
                    <button class="btn btn-small btn-outline" onclick="deleteEvent(${item.id})">Remove</button>
                </td>
            </tr>
        `).join("");
    }

    // Render sermons list table
    const sermonsTableBody = document.getElementById("admin-sermons-list");
    if (sermonsTableBody) {
        sermonsTableBody.innerHTML = state.sermons.map(item => `
            <tr>
                <td><strong>${item.title}</strong></td>
                <td>${item.speaker}</td>
                <td>${item.date}</td>
                <td>
                    <button class="btn btn-small btn-outline" onclick="deleteSermon(${item.id})">Remove</button>
                </td>
            </tr>
        `).join("");
    }

    renderLogs();
}

function renderLogs() {
    const container = document.getElementById("activity-logs");
    if (container) {
        container.innerHTML = state.logs.map(l => `
            <div class="activity-item">
                <span class="activity-time">[${l.time}]</span>
                <span>${l.msg}</span>
            </div>
        `).join("");
    }
}

// Global actions for admin lists (invoked via HTML button click)
window.deleteStudy = function(id) {
    state.bibleStudies = state.bibleStudies.filter(x => x.id !== id);
    DB.set("sic_bible_studies", state.bibleStudies);
    addLog(`Deleted Bible Study registration ID: ${id}`);
    renderDashboard();
};

window.deletePrayer = function(id) {
    state.prayers = state.prayers.filter(x => x.id !== id);
    DB.set("sic_prayers", state.prayers);
    addLog(`Deleted Prayer Request ID: ${id}`);
    renderDashboard();
};

window.deleteEvent = function(id) {
    state.events = state.events.filter(x => x.id !== id);
    DB.set("sic_events", state.events);
    addLog(`Removed event ID: ${id}`);
    renderEvents();
    renderDashboard();
};

window.deleteSermon = function(id) {
    state.sermons = state.sermons.filter(x => x.id !== id);
    DB.set("sic_sermons", state.sermons);
    addLog(`Removed sermon ID: ${id}`);
    renderSermons();
    renderDashboard();
};

// --- General Dialog helpers ---
window.closeAllModals = function() {
    document.querySelectorAll(".modal").forEach(m => m.classList.remove("active"));
};

// --- Event Listeners Init ---
document.addEventListener("DOMContentLoaded", () => {
    // Client routing
    window.addEventListener("hashchange", handleRouting);
    handleRouting();

    // Menu toggle for mobile
    const navToggle = document.getElementById("navToggle");
    const navBar = document.getElementById("navBar");
    if (navToggle && navBar) {
        navToggle.addEventListener("click", () => {
            navBar.classList.toggle("active");
        });
    }

    // Modal closes
    const closeMin = document.getElementById("close-ministry-modal");
    if (closeMin) closeMin.addEventListener("click", closeAllModals);

    const closeEv = document.getElementById("close-event-modal");
    if (closeEv) closeEv.addEventListener("click", closeAllModals);

    // Filter clicks
    const sermonFilters = document.getElementById("sermon-filters-container");
    if (sermonFilters) {
        sermonFilters.addEventListener("click", (e) => {
            const btn = e.target.closest(".filter-btn");
            if (!btn) return;
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderSermons(btn.getAttribute("data-category"));
        });
    }

    const galleryFilters = document.getElementById("gallery-album-tabs");
    if (galleryFilters) {
        galleryFilters.addEventListener("click", (e) => {
            const btn = e.target.closest(".album-btn");
            if (!btn) return;
            document.querySelectorAll(".album-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderGallery(btn.getAttribute("data-album"));
        });
    }

    // Render operations
    setupVerseSystem();
    renderHomePreviews();
    renderLeadership();
    renderMinistries();
    renderBeliefs();
    renderSermons();
    renderEvents();
    renderGallery();
    
    // UI Helpers
    setupLiveChat();
    setupPaymentSelection();
    setupFormListeners();
    setupAdminDashboard();
    renderDashboard();
});
