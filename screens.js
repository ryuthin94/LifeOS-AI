const icons = {
  auth: "sparkles",
  home: "layout-dashboard",
  ai: "bot",
  calendar: "calendar-days",
  tasks: "check-circle-2",
  goals: "target",
  memory: "archive",
  health: "activity",
  finance: "wallet",
  learning: "graduation-cap",
  social: "users",
  explore: "map",
  analytics: "bar-chart-3",
  profile: "user-round",
  settings: "settings",
};

const navs = {
  auth: ["sparkles", "circle", "circle", "circle", "arrow-right"],
  home: ["layout-dashboard", "bot", "calendar-days", "check-circle-2", "user-round"],
  ai: ["layout-dashboard", "bot", "mic", "history", "user-round"],
  calendar: ["layout-dashboard", "calendar-days", "clock", "plus", "user-round"],
  tasks: ["layout-dashboard", "check-circle-2", "sparkles", "archive", "user-round"],
  goals: ["layout-dashboard", "target", "route", "trending-up", "user-round"],
  memory: ["layout-dashboard", "archive", "image", "file-text", "user-round"],
  health: ["layout-dashboard", "activity", "moon", "heart-pulse", "user-round"],
  finance: ["layout-dashboard", "wallet", "receipt", "piggy-bank", "user-round"],
  learning: ["layout-dashboard", "book-open", "brain", "message-circle", "user-round"],
  social: ["layout-dashboard", "users", "heart-handshake", "cake", "user-round"],
  explore: ["layout-dashboard", "map", "calendar-heart", "compass", "user-round"],
  analytics: ["layout-dashboard", "bar-chart-3", "pie-chart", "line-chart", "user-round"],
  profile: ["layout-dashboard", "trophy", "settings", "shield", "user-round"],
  settings: ["layout-dashboard", "bell", "brain", "database", "help-circle"],
};

function icon(name, size = 17) {
  return `<i data-lucide="${name}" width="${size}" height="${size}"></i>`;
}

function status() {
  return `<div class="status"><span>9:41</span><div class="status-icons"><span class="signal"></span><span class="wifi"></span><span class="battery"></span></div></div>`;
}

function topbar(title, subtitle, category) {
  return `<div class="topbar"><div class="title-block"><h2>${title}</h2><p>${subtitle}</p></div><button class="icon-btn">${icon(icons[category] || "sparkles")}</button></div>`;
}

function nav(category, active = 1) {
  const items = navs[category] || navs.home;
  return `<div class="nav">${items.map((item, index) => `<button class="${index === active ? "active" : ""}">${icon(item, 18)}</button>`).join("")}</div>`;
}

function card(title, text, iconName = "sparkles", extra = "") {
  return `<div class="card glass"><div class="metric"><div><h3>${title}</h3><p>${text}</p></div><div class="orb-icon">${icon(iconName)}</div></div>${extra}</div>`;
}

function list(items) {
  return `<div class="list">${items.map((item) => `<div class="list-item"><div class="orb-icon">${icon(item.icon || "circle")}</div><div class="meta"><strong>${item.title}</strong><span>${item.sub}</span></div>${item.side ? `<span>${item.side}</span>` : ""}</div>`).join("")}</div>`;
}

function bars(values = [42, 68, 52, 88, 60, 74, 95]) {
  return `<div class="bars">${values.map((v) => `<span style="height:${v}%"></span>`).join("")}</div>`;
}

function progress(value) {
  return `<div class="progress"><span style="width:${value}%"></span></div>`;
}

function calendarGrid(active = 17) {
  return `<div class="calendar-grid">${Array.from({ length: 35 }, (_, i) => `<div class="date-cell ${i + 1 === active ? "active" : ""}">${i + 1}</div>`).join("")}</div>`;
}

function phone(screen) {
  return `<article class="phone-wrap"><div class="screen-title">${screen.title}<span>${screen.group}</span></div><div class="phone"><div class="screen">${status()}<div class="content">${screen.body}</div></div></div></article>`;
}

function standardScreen(group, category, title, subtitle, body, active = 1) {
  return { group, title, body: `${topbar(title, subtitle, category)}<div class="scroll">${body}</div>${nav(category, active)}` };
}

function authScreen(title, body) {
  return { group: "Auth", title, body: `${body}${nav("auth", 4)}` };
}

const onboardingCopy = [
  ["Your Life, Orchestrated", "LifeOS AI connects schedule, memory, wellness, money, learning, and goals into one calm command center."],
  ["Daily Intelligence", "Wake up to a briefing that understands your priorities, context, energy, and relationships."],
  ["Memory That Works", "Capture photos, files, voice notes, and decisions into a private timeline you can search naturally."],
  ["Proactive Planning", "Let AI suggest the next best action across tasks, events, habits, and long-term goals."],
  ["Private By Design", "Granular permissions, encrypted vaults, and clear data controls keep you in charge."],
];

const screens = [
  authScreen("Splash Screen", `<div class="splash-logo"><div><div class="logo-mark"><strong>AI</strong></div><h2>LifeOS AI</h2><p class="small">Your premium personal operating system</p></div></div><div class="loading-state glass"><div><div class="thinking-dots"><span></span><span></span><span></span></div><h3>Syncing your day</h3><p class="small">Loading encrypted workspace</p></div></div>`),
  ...onboardingCopy.map((copy, i) => authScreen(`Onboarding ${i + 1}`, `<div class="topbar"><button class="icon-btn">${icon("chevron-left")}</button><span class="chip">${i + 1} / 5</span></div><div class="scroll"><div class="onboarding-art glass"></div><div class="hero-card glass"><h2>${copy[0]}</h2><p class="small">${copy[1]}</p><div class="chip-row" style="margin-top:18px"><span class="chip active">Continue</span><span class="chip">Skip</span></div></div></div>`)),
  authScreen("Sign Up", `${topbar("Create Account", "Start your LifeOS workspace", "auth")}<div class="scroll"><div class="input">${icon("mail")} Email address</div><div class="input">${icon("lock")} Password</div><div class="input">${icon("fingerprint")} Face ID optional</div>${card("Premium trial", "14 days of LifeOS Pro included.", "badge-check")}<button class="primary-btn">Create LifeOS</button></div>`),
  authScreen("Login", `${topbar("Welcome Back", "Continue your private command center", "auth")}<div class="scroll"><div class="input">${icon("mail")} maya@lifeos.ai</div><div class="input">${icon("lock")} Password</div><button class="primary-btn">Login</button><button class="ghost-btn">Continue with Apple</button>${card("Secure session", "Face ID and device trust enabled.", "shield-check")}</div>`),
  authScreen("Forgot Password", `${topbar("Reset Access", "We will send a private recovery link", "auth")}<div class="scroll"><div class="input">${icon("mail")} Email address</div><button class="primary-btn">Send Recovery Link</button><div class="empty-state glass">${icon("inbox", 32)}<div><h3>Check your inbox</h3><p class="small">Recovery links expire after 15 minutes.</p></div></div></div>`),
  authScreen("Create Profile", `${topbar("Create Profile", "Personalize your assistant", "profile")}<div class="scroll"><div class="card glass" style="text-align:center"><div class="avatar" style="margin:0 auto 12px">M</div><h3>Maya Chen</h3><p class="small">Founder, product strategist</p></div><div class="input">${icon("briefcase")} Current focus</div><div class="input">${icon("map-pin")} Bangkok, Thailand</div><button class="primary-btn">Save Profile</button></div>`),
  authScreen("Permissions", `${topbar("Permissions", "Choose what LifeOS can connect", "settings")}<div class="scroll">${list([{icon:"calendar-days",title:"Calendar",sub:"Read and suggest schedule changes",side:"On"},{icon:"heart-pulse",title:"Health",sub:"Sleep, activity, mood summaries",side:"On"},{icon:"wallet",title:"Finance",sub:"Budget insights only",side:"Ask"},{icon:"map",title:"Location",sub:"Nearby recommendations",side:"Off"}])}<button class="primary-btn">Finish Setup</button></div>`),

  standardScreen("Home", "home", "Dashboard", "Wednesday, Jun 24", `<div class="hero-card glass"><div class="metric"><div><h3>Life Score</h3><p>AI sees a focused morning and lighter evening.</p><div class="big-number">86</div></div><div class="ring" data-value="86%"></div></div></div><div class="grid-2">${card("Focus", "3h 40m deep work", "zap")}${card("Energy", "High until 3 PM", "battery-charging")}</div>${list([{icon:"calendar",title:"Investor prep",sub:"10:30 AM with Jules"},{icon:"check-circle",title:"Ship onboarding polish",sub:"Priority task"},{icon:"heart",title:"Walk after lunch",sub:"Wellness nudge"}])}`, 0),
  standardScreen("Home", "home", "AI Briefing", "Generated 7:05 AM", `<div class="hero-card glass"><h3>Morning Brief</h3><p class="small">You have 4 meetings, 2 high-focus tasks, and one friend birthday. The riskiest conflict is the 2 PM budget review.</p></div>${list([{icon:"sun",title:"Best work window",sub:"9:20 AM to 11:45 AM"},{icon:"alert-triangle",title:"Schedule risk",sub:"Move finance review by 30 min"},{icon:"cake",title:"Relationship cue",sub:"Send Nina a birthday note"}])}<button class="primary-btn">Apply Suggestions</button>`, 0),
  standardScreen("Home", "home", "Widgets", "Custom command center", `<div class="grid-2">${card("Weather", "29C, clear night", "cloud-sun")}${card("Cashflow", "$4.2k left", "wallet")}${card("Sleep", "7h 18m", "moon")}${card("Reading", "22 min today", "book-open")}</div><div class="empty-state glass">${icon("plus-circle",32)}<div><h3>Add Widget</h3><p class="small">Drag premium modules into your dashboard.</p></div></div>`, 0),
  standardScreen("Home", "home", "Notifications", "Priority filtered", `${list([{icon:"sparkles",title:"AI found a lighter route",sub:"Leave 12 minutes later"},{icon:"receipt",title:"Subscription renews tomorrow",sub:"Figma Pro, $15"},{icon:"message-circle",title:"Alex replied",sub:"Networking follow up"},{icon:"shield-alert",title:"Login blocked",sub:"New device attempt stopped"}])}<div class="error-state glass">${icon("wifi-off",32)}<div><h3>One source offline</h3><p class="small">Bank feed will retry when connected.</p></div></div>`, 0),
  standardScreen("Home", "home", "Search", "Ask across everything", `<div class="input">${icon("search")} Search memories, tasks, events...</div><div class="chip-row"><span class="chip active">All</span><span class="chip">Files</span><span class="chip">People</span><span class="chip">Money</span></div>${list([{icon:"file-text",title:"Visa document scan",sub:"Memory Vault"},{icon:"target",title:"Launch LifeOS beta",sub:"Goal roadmap"},{icon:"users",title:"Coffee with Aria",sub:"Contact memory"}])}`, 0),

  standardScreen("AI Assistant", "ai", "Chat", "LifeOS is online", `<div class="chat-area"><div class="bubble">Good morning, Maya. Your calendar has a 42 minute focus gap before the investor call.</div><div class="bubble me">Draft a sharper agenda.</div><div class="bubble">Done. I also found two relevant notes from last week's strategy review.</div></div><div class="composer">${icon("plus")}<span>Message LifeOS AI</span>${icon("send")}</div>`, 1),
  standardScreen("AI Assistant", "ai", "Voice Mode", "Listening with context", `<div class="voice-orb">${icon("mic", 42)}</div><div class="card glass" style="text-align:center"><h3>Speak naturally</h3><p class="small">Voice waves represent premium live transcription and assistant response animation.</p></div>${list([{icon:"volume-2",title:"Voice: Nova",sub:"Warm, concise"},{icon:"languages",title:"Language",sub:"English and Thai"}])}`, 2),
  standardScreen("AI Assistant", "ai", "AI Thinking", "Reasoning visually", `<div class="hero-card glass" style="text-align:center"><div class="thinking-dots"><span></span><span></span><span></span></div><h3>Modeling your day</h3><p class="small">Checking schedule, tasks, energy, and commitments.</p></div><div class="loading-state glass"><div><div class="loading-line"></div><div class="loading-line"></div><div class="loading-line"></div><p class="small">Premium loading state</p></div></div>`, 1),
  standardScreen("AI Assistant", "ai", "Image Upload", "Analyze visuals", `<div class="upload-zone glass">${icon("image-plus",34)}<div><h3>Drop an image</h3><p class="small">Receipts, whiteboards, documents, and screenshots.</p></div></div>${list([{icon:"image",title:"whiteboard-plan.jpg",sub:"Ready for extraction"},{icon:"sparkles",title:"AI summary",sub:"3 tasks and 1 milestone detected"}])}`, 1),
  standardScreen("AI Assistant", "ai", "File Upload", "Private document context", `<div class="upload-zone glass">${icon("file-up",34)}<div><h3>Upload files</h3><p class="small">PDF, DOCX, CSV, and notes stay in your vault.</p></div></div>${list([{icon:"file-text",title:"Q3-plan.pdf",sub:"Encrypted, indexed"},{icon:"table",title:"Budget.xlsx",sub:"Insights available"}])}`, 1),
  standardScreen("AI Assistant", "ai", "Chat History", "Previous conversations", `${list([{icon:"message-square",title:"Weekly planning",sub:"Today, 8:10 AM"},{icon:"message-square",title:"Budget cleanup",sub:"Yesterday"},{icon:"message-square",title:"Course study plan",sub:"Monday"}])}<div class="empty-state glass">${icon("archive",32)}<div><h3>Archived chats</h3><p class="small">No archived conversations yet.</p></div></div>`, 3),

  standardScreen("Calendar", "calendar", "Month View", "June 2026", `${calendarGrid(24)}${list([{icon:"calendar-check",title:"Product review",sub:"10:00 AM"},{icon:"plane",title:"Singapore flight",sub:"Friday"}])}`, 1),
  standardScreen("Calendar", "calendar", "Week View", "Jun 22 - 28", `<div class="chip-row"><span class="chip">Mon</span><span class="chip">Tue</span><span class="chip active">Wed</span><span class="chip">Thu</span><span class="chip">Fri</span></div><div class="timeline">${list([{icon:"clock",title:"09:00 Deep work",sub:"Roadmap polish"},{icon:"users",title:"11:30 Partner call",sub:"Zoom"},{icon:"dumbbell",title:"18:00 Recovery",sub:"Light workout"}])}</div>`, 1),
  standardScreen("Calendar", "calendar", "Day View", "Today", `<div class="hero-card glass"><h3>AI-balanced day</h3><p class="small">Two focus blocks, three meetings, one recovery window.</p>${progress(68)}</div><div class="timeline">${list([{title:"08:30 Breakfast review",sub:"Personal"},{title:"10:00 Design critique",sub:"Work"},{title:"14:00 Finance review",sub:"Move suggested"}])}</div>`, 2),
  standardScreen("Calendar", "calendar", "Event Details", "Investor prep", `<div class="hero-card glass"><h3>Investor Prep</h3><p class="small">10:30 - 11:15 AM with Jules and Amara</p><div class="chip-row" style="margin-top:14px"><span class="chip active">Join</span><span class="chip">Notes</span></div></div>${list([{icon:"map-pin",title:"Location",sub:"Arc Studio, Room 4"},{icon:"file-text",title:"Attached notes",sub:"Deck outline and KPI sheet"}])}`, 3),
  standardScreen("Calendar", "calendar", "AI Suggestions", "Schedule optimization", `${card("Move finance review", "Shift from 2:00 PM to 3:15 PM to protect focus recovery.", "wand-sparkles")} ${card("Batch messages", "Create a 20 minute communication block after lunch.", "inbox")}<button class="primary-btn">Apply All</button>`, 1),

  standardScreen("Tasks", "tasks", "Task List", "11 open tasks", `${list([{icon:"circle",title:"Polish onboarding",sub:"High priority, 45 min",side:"P1"},{icon:"circle",title:"Review budget model",sub:"Due today",side:"P1"},{icon:"circle",title:"Book dentist",sub:"Personal",side:"P3"}])}<button class="primary-btn">Add Task</button>`, 1),
  standardScreen("Tasks", "tasks", "Task Details", "Polish onboarding", `<div class="hero-card glass"><h3>Polish onboarding</h3><p class="small">Tighten premium transition states and add permission copy.</p>${progress(45)}</div>${list([{icon:"calendar",title:"Due",sub:"Today, 4:00 PM"},{icon:"sparkles",title:"AI estimate",sub:"42 minutes with current focus"}])}`, 1),
  standardScreen("Tasks", "tasks", "Smart Priorities", "AI ranked", `<div class="grid-2">${card("P1", "2 critical", "flame")}${card("P2", "4 important", "arrow-up")}</div>${list([{icon:"zap",title:"Do now",sub:"Budget model risk is time sensitive"},{icon:"clock",title:"Defer",sub:"Reading notes can move to Friday"}])}`, 2),
  standardScreen("Tasks", "tasks", "Completed Tasks", "This week", `${list([{icon:"check",title:"Publish beta invite",sub:"Completed today"},{icon:"check",title:"Send mentor update",sub:"Completed yesterday"},{icon:"check",title:"Clean inbox",sub:"Completed Monday"}])}<div class="empty-state glass">${icon("party-popper",32)}<div><h3>Momentum streak</h3><p class="small">24 completions this week.</p></div></div>`, 3),

  standardScreen("Goals", "goals", "Goals Overview", "4 active goals", `<div class="grid-2">${card("Launch Beta", "68% complete", "rocket", progress(68))}${card("Run 10K", "41% complete", "activity", progress(41))}</div>${list([{icon:"target",title:"Financial runway",sub:"6 month target"},{icon:"book-open",title:"AI strategy course",sub:"Module 4 of 9"}])}`, 1),
  standardScreen("Goals", "goals", "Goal Detail", "Launch Beta", `<div class="hero-card glass"><h3>Launch LifeOS Beta</h3><p class="small">Invite 500 early users and ship premium onboarding.</p>${progress(68)}</div>${list([{icon:"check",title:"Landing waitlist",sub:"Done"},{icon:"circle",title:"Design QA",sub:"Due Friday"},{icon:"circle",title:"Onboarding copy",sub:"AI drafting"}])}`, 1),
  standardScreen("Goals", "goals", "Milestones", "Road to launch", `<div class="timeline">${list([{title:"Prototype complete",sub:"May 18"},{title:"Private alpha",sub:"June 10"},{title:"Public beta",sub:"July 12"},{title:"Paid pilot",sub:"August 01"}])}</div>`, 2),
  standardScreen("Goals", "goals", "AI Roadmap", "Recommended next moves", `${card("Tighten activation", "Focus on first 7 minute experience before adding integrations.", "route")} ${card("Recruit segment", "Target founders with calendar and finance overload.", "users")}<button class="primary-btn">Add To Plan</button>`, 2),
  standardScreen("Goals", "goals", "Progress Timeline", "Signals over time", `<div class="hero-card glass"><h3>Velocity</h3>${bars([25,38,44,62,57,78,84])}</div>${list([{icon:"trending-up",title:"Best week",sub:"18% progress gained"},{icon:"sparkles",title:"AI note",sub:"Momentum improved after task batching"}])}`, 3),

  standardScreen("Memory Vault", "memory", "Memory Timeline", "Private life archive", `<div class="timeline">${list([{icon:"image",title:"Whiteboard snapshot",sub:"Today"},{icon:"mic",title:"Voice note: product idea",sub:"Yesterday"},{icon:"file-text",title:"Visa document",sub:"Jun 18"}])}</div>`, 1),
  standardScreen("Memory Vault", "memory", "Search Memories", "Natural language vault", `<div class="input">${icon("search")} Find the note about runway</div>${list([{icon:"file-search",title:"Runway planning note",sub:"Matched finance and goals"},{icon:"mic",title:"Voice note transcript",sub:"Mentions investor prep"}])}`, 1),
  standardScreen("Memory Vault", "memory", "Memory Detail", "Whiteboard snapshot", `<div class="photo-tile" style="min-height:180px"></div>${card("Extracted insight", "AI found 5 action items and 2 unresolved questions.", "sparkles")}<button class="primary-btn">Create Tasks</button>`, 1),
  standardScreen("Memory Vault", "memory", "Photos", "Captured moments", `<div class="photo-grid"><div class="photo-tile"></div><div class="photo-tile"></div><div class="photo-tile"></div><div class="photo-tile"></div></div>${card("Smart album", "Workshops, receipts, and travel are auto-grouped.", "images")}`, 2),
  standardScreen("Memory Vault", "memory", "Documents", "Encrypted library", `${list([{icon:"file-text",title:"Passport scan",sub:"Identity vault"},{icon:"file-spreadsheet",title:"June budget",sub:"Finance source"},{icon:"file-lock",title:"Insurance policy",sub:"Private"}])}<div class="error-state glass">${icon("shield-alert",32)}<div><h3>Locked document</h3><p class="small">Face ID required to preview.</p></div></div>`, 3),
  standardScreen("Memory Vault", "memory", "Voice Notes", "Audio memories", `${list([{icon:"mic",title:"Launch idea",sub:"2:14 transcript ready"},{icon:"mic",title:"Therapy reflection",sub:"Private tag"},{icon:"mic",title:"Book notes",sub:"7 key ideas"}])}<button class="primary-btn">Record Note</button>`, 4),

  standardScreen("Health", "health", "Dashboard", "Wellness score 82", `<div class="hero-card glass"><div class="metric"><div><h3>Body Battery</h3><p>Strong recovery with late afternoon dip.</p><div class="big-number">82</div></div><div class="ring" data-value="82%"></div></div></div><div class="grid-2">${card("Sleep", "7h 18m", "moon")}${card("Steps", "8,420", "footprints")}</div>`, 1),
  standardScreen("Health", "health", "Sleep", "Last night", `<div class="hero-card glass"><h3>Sleep Stages</h3>${bars([70,35,82,48,74,58,89])}</div>${list([{icon:"moon",title:"Deep sleep",sub:"1h 42m"},{icon:"alarm-clock",title:"Wake window",sub:"7:00 - 7:20 AM"}])}`, 2),
  standardScreen("Health", "health", "Activity", "Today", `<div class="grid-2">${card("Move", "640 kcal", "flame")}${card("Exercise", "38 min", "dumbbell")}</div><div class="hero-card glass"><h3>Weekly Activity</h3>${bars([44,66,40,80,55,71,88])}</div>`, 1),
  standardScreen("Health", "health", "Heart Rate", "Live range", `<div class="hero-card glass"><h3>Heart Rate</h3><div class="big-number">68 bpm</div>${bars([40,48,46,62,72,54,50])}</div>${card("Recovery", "Resting rate is 4 bpm below baseline.", "heart-pulse")}`, 3),
  standardScreen("Health", "health", "Mood", "Emotional check-in", `<div class="chip-row"><span class="chip">Calm</span><span class="chip active">Focused</span><span class="chip">Tired</span><span class="chip">Social</span></div>${card("AI Reflection", "Mood improves after outdoor walks and task batching.", "brain")}<button class="primary-btn">Log Mood</button>`, 1),
  standardScreen("Health", "health", "Wellness Report", "Weekly summary", `<div class="hero-card glass"><h3>Report</h3><p class="small">Sleep consistency rose 12%. Stress peaks before finance work. Add breathing block before reviews.</p></div>${list([{icon:"trending-up",title:"Improved",sub:"Activity and bedtime"},{icon:"alert-circle",title:"Watch",sub:"Thursday stress spike"}])}`, 1),

  standardScreen("Finance", "finance", "Overview", "Net worth +4.2%", `<div class="hero-card glass"><h3>Total Balance</h3><div class="big-number">$42,860</div>${bars([42,46,53,58,61,70,76])}</div><div class="grid-2">${card("Spent", "$2,140", "receipt")}${card("Saved", "$820", "piggy-bank")}</div>`, 1),
  standardScreen("Finance", "finance", "Expenses", "June spending", `${list([{icon:"shopping-bag",title:"Groceries",sub:"$420"},{icon:"plane",title:"Travel",sub:"$680"},{icon:"coffee",title:"Coffee",sub:"$86"}])}${card("AI Alert", "Coffee and rideshare are 18% above baseline.", "sparkles")}`, 2),
  standardScreen("Finance", "finance", "Income", "Monthly inflow", `<div class="hero-card glass"><h3>Income</h3><div class="big-number">$8,400</div>${progress(72)}</div>${list([{icon:"briefcase",title:"Salary",sub:"$6,800"},{icon:"sparkles",title:"Consulting",sub:"$1,600"}])}`, 1),
  standardScreen("Finance", "finance", "Budgets", "Smart envelopes", `${list([{icon:"utensils",title:"Food",sub:"$420 / $650"},{icon:"home",title:"Rent",sub:"$1,900 / $1,900"},{icon:"palette",title:"Fun",sub:"$210 / $300"}])}<button class="primary-btn">Rebalance</button>`, 3),
  standardScreen("Finance", "finance", "Savings", "Future funds", `<div class="grid-2">${card("Runway", "$18.4k", "shield")}${card("Travel", "$2.1k", "plane")}</div>${card("Goal pace", "You are 9 days ahead of the savings target.", "trending-up", progress(64))}`, 4),
  standardScreen("Finance", "finance", "Bills", "Upcoming payments", `${list([{icon:"wifi",title:"Internet",sub:"Tomorrow, $64"},{icon:"credit-card",title:"Amex",sub:"Jun 29, $840"},{icon:"music",title:"Spotify",sub:"Jul 01, $12"}])}<div class="empty-state glass">${icon("check-circle",32)}<div><h3>No overdue bills</h3><p class="small">Everything is current.</p></div></div>`, 2),

  standardScreen("Learning", "learning", "Dashboard", "Growth plan", `<div class="hero-card glass"><h3>Learning Streak</h3><div class="big-number">18 days</div>${progress(78)}</div><div class="grid-2">${card("Reading", "22 min", "book-open")}${card("Recall", "91%", "brain")}</div>`, 1),
  standardScreen("Learning", "learning", "Courses", "Active programs", `${list([{icon:"graduation-cap",title:"AI Strategy",sub:"Module 4 of 9"},{icon:"code-2",title:"SwiftUI Motion",sub:"Lesson 12"},{icon:"line-chart",title:"Finance Modeling",sub:"Practice due"}])}`, 1),
  standardScreen("Learning", "learning", "Reading", "Knowledge shelf", `${list([{icon:"book-open",title:"The Beginning of Infinity",sub:"31% read"},{icon:"book-open",title:"Designing Data-Intensive Apps",sub:"Chapter 5"},{icon:"book-open",title:"Poor Charlie's Almanack",sub:"Notes ready"}])}`, 2),
  standardScreen("Learning", "learning", "Flashcards", "Spaced repetition", `<div class="hero-card glass"><h3>What is activation energy?</h3><p class="small">Tap to reveal answer</p></div><div class="chip-row"><span class="chip">Again</span><span class="chip active">Good</span><span class="chip">Easy</span></div>${card("Due today", "42 cards across 3 decks.", "layers")}`, 2),
  standardScreen("Learning", "learning", "AI Tutor", "Contextual coach", `<div class="chat-area"><div class="bubble">Explain transformers using product strategy metaphors.</div><div class="bubble me">Make it concise.</div><div class="bubble">Think of attention as a roadmap deciding which customer signals matter right now.</div></div><div class="composer">${icon("brain")}<span>Ask tutor</span>${icon("send")}</div>`, 4),

  standardScreen("Social", "social", "Contacts", "Personal CRM", `${list([{icon:"user",title:"Nina Park",sub:"Birthday today"},{icon:"user",title:"Alex Rivera",sub:"Follow up Friday"},{icon:"user",title:"Jules Tan",sub:"Investor prep"}])}<button class="primary-btn">Add Contact</button>`, 1),
  standardScreen("Social", "social", "Relationship Insights", "AI remembers context", `${card("Reach out", "You have not spoken with Aria in 37 days.", "heart-handshake")} ${card("Conversation cue", "Ask Jules about the Singapore pilot.", "message-circle")}`, 2),
  standardScreen("Social", "social", "Birthdays", "Important dates", `${list([{icon:"cake",title:"Nina Park",sub:"Today"},{icon:"gift",title:"Sam Lee",sub:"July 04"},{icon:"party-popper",title:"Ava King",sub:"July 22"}])}<button class="primary-btn">Draft Messages</button>`, 3),
  standardScreen("Social", "social", "Networking", "Warm pipeline", `<div class="hero-card glass"><h3>Networking Health</h3><div class="big-number">74</div>${progress(74)}</div>${list([{icon:"coffee",title:"Book coffee",sub:"Amara, next week"},{icon:"send",title:"Send update",sub:"Mentor group"}])}`, 4),

  standardScreen("Explore", "explore", "Local Opportunities", "Near Bangkok", `<div class="map-card card glass"><span class="map-pin" style="left:62%;top:36%"></span><span class="map-pin" style="left:28%;top:58%"></span></div>${list([{icon:"briefcase",title:"Founder dinner",sub:"1.4 km away"},{icon:"sparkles",title:"AI lab demo",sub:"Tonight"}])}`, 1),
  standardScreen("Explore", "explore", "Events", "Curated for you", `${list([{icon:"calendar-heart",title:"Design Leaders Night",sub:"Friday 7 PM"},{icon:"music",title:"Rooftop Jazz",sub:"Saturday"},{icon:"mic-2",title:"AI Policy Talk",sub:"Next Tuesday"}])}`, 2),
  standardScreen("Explore", "explore", "Scholarships", "Learning funding", `${list([{icon:"award",title:"Women in AI Grant",sub:"Deadline Jul 15"},{icon:"graduation-cap",title:"Founder Fellowship",sub:"Applications open"},{icon:"badge-dollar-sign",title:"Research stipend",sub:"Match: 82%"}])}`, 3),
  standardScreen("Explore", "explore", "Nearby Recommendations", "Smart local layer", `<div class="map-card card glass"><span class="map-pin" style="left:48%;top:44%"></span><span class="map-pin" style="left:74%;top:62%"></span></div>${list([{icon:"coffee",title:"Quiet cafe",sub:"Good for deep work"},{icon:"leaf",title:"Evening walk",sub:"Low traffic route"}])}`, 4),

  standardScreen("Analytics", "analytics", "Productivity", "Focus patterns", `<div class="hero-card glass"><h3>Deep Work</h3>${bars([40,52,88,73,61,44,70])}</div>${card("AI insight", "Meetings before noon reduce task completion by 23%.", "sparkles")}`, 1),
  standardScreen("Analytics", "analytics", "Habits", "Consistency map", `${calendarGrid(24)}${card("Streak", "Meditation 12 days, reading 18 days.", "flame")}`, 1),
  standardScreen("Analytics", "analytics", "Finance", "Money signals", `<div class="hero-card glass"><h3>Spend Trend</h3>${bars([76,68,58,62,49,42,38])}</div>${card("Forecast", "End month $310 under budget.", "trending-down")}`, 2),
  standardScreen("Analytics", "analytics", "Learning", "Knowledge velocity", `<div class="hero-card glass"><h3>Recall Score</h3><div class="big-number">91%</div>${progress(91)}</div>${list([{icon:"book-open",title:"Read",sub:"4.2 hours this week"},{icon:"brain",title:"Cards mastered",sub:"128"}])}`, 3),
  standardScreen("Analytics", "analytics", "Health", "Wellness trends", `<div class="hero-card glass"><h3>Sleep vs Focus</h3>${bars([56,64,72,69,82,58,76])}</div>${card("Correlation", "7h+ sleep lifts focus score by 16%.", "heart-pulse")}`, 4),
  standardScreen("Analytics", "analytics", "Weekly Reports", "Executive summary", `<div class="hero-card glass"><h3>Week 26</h3><p class="small">Productivity up, spending down, sleep stable. Social outreach needs attention.</p></div>${list([{icon:"check-circle",title:"Wins",sub:"Beta roadmap moved 18%"},{icon:"alert-circle",title:"Watch",sub:"Two relationships cooling"}])}`, 1),

  standardScreen("Profile", "profile", "User Profile", "Maya Chen", `<div class="card glass" style="text-align:center"><div class="avatar" style="margin:0 auto 12px">M</div><h3>Maya Chen</h3><p class="small">Founder in Bangkok. Building calmly.</p></div>${list([{icon:"mail",title:"maya@lifeos.ai",sub:"Verified"},{icon:"map-pin",title:"Bangkok",sub:"Home base"}])}`, 4),
  standardScreen("Profile", "profile", "Achievements", "Momentum badges", `<div class="grid-2">${card("18", "Learning streak", "trophy")}${card("42", "Tasks shipped", "medal")}${card("6", "Goals advanced", "target")}${card("91%", "Recall score", "brain")}</div>`, 1),
  standardScreen("Profile", "profile", "Settings", "Account controls", `${list([{icon:"bell",title:"Notifications",sub:"Priority only"},{icon:"palette",title:"Appearance",sub:"Dark glass"},{icon:"brain",title:"AI Preferences",sub:"Concise coach"}])}`, 2),
  standardScreen("Profile", "profile", "Connected Apps", "Integrations", `${list([{icon:"calendar",title:"Apple Calendar",sub:"Connected"},{icon:"activity",title:"Apple Health",sub:"Connected"},{icon:"wallet",title:"Bank feed",sub:"Needs refresh"}])}<div class="error-state glass">${icon("plug-zap",32)}<div><h3>Refresh required</h3><p class="small">Reconnect finance to restore live budgets.</p></div></div>`, 3),
  standardScreen("Profile", "profile", "Subscription", "LifeOS Pro", `<div class="hero-card glass"><h3>LifeOS Pro</h3><div class="big-number">$19</div><p class="small">per month, renews July 24</p></div>${list([{icon:"sparkles",title:"Unlimited AI",sub:"Included"},{icon:"archive",title:"Memory Vault",sub:"500 GB encrypted"}])}`, 2),
  standardScreen("Profile", "profile", "Privacy", "Data boundaries", `${list([{icon:"lock",title:"Vault encryption",sub:"Enabled"},{icon:"eye-off",title:"Sensitive mode",sub:"Hide private cards"},{icon:"clock",title:"Retention",sub:"Manual delete anytime"}])}<button class="primary-btn">Privacy Review</button>`, 3),
  standardScreen("Profile", "profile", "Security", "Device trust", `${list([{icon:"fingerprint",title:"Face ID",sub:"Enabled"},{icon:"smartphone",title:"This iPhone",sub:"Trusted"},{icon:"shield-alert",title:"Blocked login",sub:"Yesterday, unknown device"}])}<button class="ghost-btn">View Audit Log</button>`, 3),

  standardScreen("Settings", "settings", "Appearance", "Visual system", `<div class="chip-row"><span class="chip active">Dark</span><span class="chip">Dim</span><span class="chip">OLED</span></div><div class="grid-2">${card("Glass", "High blur", "layers")}${card("Motion", "Premium", "sparkles")}</div>`, 0),
  standardScreen("Settings", "settings", "Notifications", "Attention filters", `${list([{icon:"sparkles",title:"AI Digest",sub:"Morning and evening"},{icon:"bell",title:"Priority alerts",sub:"On"},{icon:"volume-x",title:"Quiet hours",sub:"10 PM - 7 AM"}])}`, 1),
  standardScreen("Settings", "settings", "AI Preferences", "Assistant behavior", `${list([{icon:"message-circle",title:"Style",sub:"Concise and strategic"},{icon:"brain",title:"Memory use",sub:"Ask before sensitive context"},{icon:"wand-sparkles",title:"Autonomy",sub:"Suggest, do not act"}])}`, 2),
  standardScreen("Settings", "settings", "Data Management", "Storage and export", `<div class="hero-card glass"><h3>Vault Storage</h3><div class="big-number">182 GB</div>${progress(36)}</div>${list([{icon:"download",title:"Export data",sub:"ZIP, JSON, PDF"},{icon:"trash-2",title:"Delete category",sub:"Requires confirmation"}])}`, 3),
  standardScreen("Settings", "settings", "Backup", "Encrypted snapshots", `${list([{icon:"cloud",title:"iCloud backup",sub:"Today, 6:10 AM"},{icon:"hard-drive",title:"Local backup",sub:"Weekly"},{icon:"refresh-cw",title:"Restore point",sub:"Jun 20"}])}<button class="primary-btn">Back Up Now</button>`, 3),
  standardScreen("Settings", "settings", "Help Center", "Support and guidance", `<div class="input">${icon("search")} Search help</div>${list([{icon:"help-circle",title:"Getting started",sub:"7 articles"},{icon:"shield",title:"Privacy guide",sub:"Plain-language controls"},{icon:"message-circle",title:"Contact support",sub:"Usually replies in 2h"}])}`, 4),
];

const board = document.getElementById("screenBoard");
board.innerHTML = screens.map(phone).join("");

document.querySelector(".dashboard-preview").innerHTML = `${status()}<div class="content">${topbar("Dashboard", "Wednesday, Jun 24", "home")}<div class="scroll"><div class="hero-card glass"><div class="metric"><div><h3>Life Score</h3><p>Calm morning. High focus window open.</p><div class="big-number">86</div></div><div class="ring" data-value="86%"></div></div></div><div class="grid-2">${card("Focus", "3h 40m", "zap")}${card("Energy", "High", "battery-charging")}</div>${list([{icon:"calendar",title:"Investor prep",sub:"10:30 AM"},{icon:"check-circle",title:"Ship onboarding",sub:"Priority task"}])}</div>${nav("home", 0)}</div>`;

lucide.createIcons();
