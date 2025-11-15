import React, { useState } from "react";

const FREE_CATEGORIES = [
  {
    id: "general",
    name: "General Parenting",
    description: "Everyday parenting, family routines, practical tips.",
    free: true
  },
  {
    id: "faith-kids",
    name: "Faith & Kids",
    description: "Helping children know and love God in simple ways.",
    free: true
  },
  {
    id: "school-behaviour",
    name: "School & Behaviour",
    description: "Classroom issues, friends, bullying, discipline.",
    free: true
  },
  {
    id: "tech",
    name: "Kids & Technology",
    description: "Screens, phones, games, internet safety.",
    free: true
  },
  {
    id: "health-emotions",
    name: "Health & Emotions",
    description: "Worries, anger, shyness, sleep and more.",
    free: true
  }
];

const PREMIUM_CATEGORIES = [
  {
    id: "hard-questions",
    name: "Hard Questions Kids Ask",
    description:
      "Deep or confusing questions children bring about God, life and the world.",
    premium: true
  },
  {
    id: "serious-concerns",
    name: "Serious Parent Concerns",
    description: "Heavier topics that need extra care and privacy.",
    premium: true
  },
  {
    id: "teens",
    name: "Raising Teens Faithfully",
    description: "Identity, friends, boundaries, faith and big emotions.",
    premium: true
  },
  {
    id: "special-needs",
    name: "Special Needs Parenting",
    description:
      "Support, encouragement and wisdom for parents of special needs children.",
    premium: true
  },
  {
    id: "marriage-parenting",
    name: "Marriage & Parenting Corner",
    description: "Balancing marriage, communication and raising kids together.",
    premium: true
  },
  {
    id: "single-parents",
    name: "Single Parents Support Hub",
    description: "A kind place for single mums and dads.",
    premium: true
  },
  {
    id: "workshops",
    name: "Premium Workshops",
    description: "Special sessions, teaching notes and replays (future).",
    premium: true
  },
  {
    id: "library",
    name: "Digital Library",
    description:
      "Downloadable guides, worksheets and family resources (future).",
    premium: true
  }
];

// 🔐 SECRET ADMIN CODE
const ADMIN_SECRET = "CKADMIN2025";

function App() {
  const [user, setUser] = useState({
    displayName: "Guest Parent",
    isPremium: false,
    isAdmin: false,
    freeTopicsCreated: 0
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState("general");
  const [threads, setThreads] = useState([
    {
      id: 1,
      categoryId: "general",
      title: "Welcome to the Curious Kids Parent Forum",
      body:
        "This is a gentle, adult-only space. Please keep conversations kind, private and respectful. Children should not use this forum.",
      author: "Moderator",
      createdAt: new Date().toISOString(),
      isPremiumOnly: false
    },
    {
      id: 2,
      categoryId: "faith-kids",
      title: "How do you answer 'Where is God?'",
      body:
        "Many children ask if God is in the sky, in the church or in the toilet because of funny things at home. How have you explained God's presence simply?",
      author: "Moderator",
      createdAt: new Date().toISOString(),
      isPremiumOnly: false
    }
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [message, setMessage] = useState("");
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // 🧿 Secret admin tap counter
  const [logoTaps, setLogoTaps] = useState(0);

  // ⭐ Categories
  const categories = [...FREE_CATEGORIES, ...PREMIUM_CATEGORIES];
  const selectedCategory =
    categories.find((c) => c.id === selectedCategoryId) || categories[0];

  const visibleThreads = threads.filter(
    (t) => t.categoryId === selectedCategoryId
  );

  // ⭐ Upgrade
  function handleUpgrade() {
    setUser((prev) => ({ ...prev, isPremium: true }));
    setMessage(
      "You are now viewing the forum as a Premium Parent (simulation only)."
    );
  }

  // ⭐ Change Name
  function handleLoginNameChange() {
    const name = prompt("Enter a display name (e.g. Victoria's Mum):", "");
    if (!name) return;
    setUser((prev) => ({
      ...prev,
      displayName: name.trim() || prev.displayName
    }));
  }

  // ⭐ Hidden admin unlock via logo
  function handleSecretLogoClick() {
    const newCount = logoTaps + 1;
    setLogoTaps(newCount);

    if (newCount >= 5) {
      const code = prompt("Enter admin code:");
      if (code === ADMIN_SECRET) {
        setUser((prev) => ({ ...prev, isAdmin: true }));
        setShowAdminPanel(true);
        setMessage("Admin mode enabled (secret login).");
      } else {
        setMessage("Incorrect admin code.");
      }
      setLogoTaps(0);
    }
  }

  // ⭐ Admin clear
  function clearAllThreads() {
    if (!window.confirm("Clear all threads? This cannot be undone (demo only)."))
      return;

    setThreads([]);
    setMessage("All threads cleared on this demo forum.");
  }

  // ⭐ Posting rules
  function canPostInCategory(category) {
    if (category.premium && !user.isPremium) return false;
    return true;
  }

  // ⭐ Create Thread
  function handleCreateThread(e) {
    e.preventDefault();
    setMessage("");

    if (!newTitle.trim() || !newBody.trim()) {
      setMessage("Please add a short title and a few more words in your post.");
      return;
    }

    if (!canPostInCategory(selectedCategory)) {
      setMessage(
        "This room is for Premium Parents only. Please upgrade to post here."
      );
      return;
    }

    if (!user.isPremium && user.freeTopicsCreated >= 1) {
      setMessage(
        "Free parents can start 1 topic in this demo. Upgrade to share more."
      );
      return;
    }

    const newThread = {
      id: Date.now(),
      categoryId: selectedCategory.id,
      title: newTitle.trim(),
      body: newBody.trim(),
      author: user.displayName || "Parent",
      createdAt: new Date().toISOString(),
      isPremiumOnly: !!selectedCategory.premium
    };

    setThreads((prev) => [...prev, newThread]);
    setNewTitle("");
    setNewBody("");

    setUser((prev) => ({
      ...prev,
      freeTopicsCreated: prev.isPremium
        ? prev.freeTopicsCreated
        : prev.freeTopicsCreated + 1
    }));

    setMessage("Your topic has been added.");
  }

  return (
    <div className="pf-root">
      <header className="pf-header">
        <div className="pf-header-left">
          
          {/* SECRET ADMIN TAP AREA */}
          <div className="pf-logo" onClick={handleSecretLogoClick}>CK</div>

          <div>
            <div className="pf-title">Curious Kids Parent Forum</div>
            <div className="pf-subtitle">
              Safe, adult-only conversations. Children should not use this forum.
            </div>
          </div>
        </div>

        <div className="pf-header-right">
          <div className="pf-user">
            <span className="pf-user-name">{user.displayName}</span>

            {user.isPremium ? (
              <span className="pf-badge pf-badge-premium">Premium Parent</span>
            ) : (
              <span className="pf-badge pf-badge-free">Free Parent</span>
            )}

            {user.isAdmin && (
              <span className="pf-badge pf-badge-admin">Admin</span>
            )}
          </div>

          <div className="pf-actions">
            <button
              type="button"
              className="pf-btn pf-btn-ghost"
              onClick={handleLoginNameChange}
            >
              Change Name
            </button>

            {!user.isPremium && (
              <button
                type="button"
                className="pf-btn pf-btn-primary"
                onClick={handleUpgrade}
              >
                Upgrade – $4.99/month (demo)
              </button>
            )}

            {/* ADMIN BUTTON REMOVED */}
            {user.isAdmin && (
              <button
                type="button"
                className="pf-btn pf-btn-danger pf-btn-small"
                onClick={clearAllThreads}
              >
                Clear Threads
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Rest of the UI unchanged (threads, forms, categories, etc.) */}
      {/* ⭐ ⭐ ⭐ */}
      {/* I intentionally keep the rest identical to your working version. */}

      <main className="pf-main">
        <aside className="pf-sidebar">
          <div className="pf-section-label">Free Rooms</div>
          <ul className="pf-cat-list">
            {FREE_CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <button
                  type="button"
                  className={
                    "pf-cat-btn" +
                    (selectedCategoryId === cat.id
                      ? " pf-cat-btn-active"
                      : "")
                  }
                  onClick={() => setSelectedCategoryId(cat.id)}
                >
                  <div className="pf-cat-name">{cat.name}</div>
                  <div className="pf-cat-tag pf-cat-tag-free">Free</div>
                  <div className="pf-cat-desc">{cat.description}</div>
                </button>
              </li>
            ))}
          </ul>

          <div className="pf-section-label">Premium Rooms</div>
          <ul className="pf-cat-list">
            {PREMIUM_CATEGORIES.map((cat) => {
              const locked = !user.isPremium;
              const active = selectedCategoryId === cat.id;

              return (
                <li key={cat.id}>
                  <button
                    type="button"
                    className={
                      "pf-cat-btn" +
                      (active ? " pf-cat-btn-active" : "") +
                      (locked ? " pf-cat-btn-locked" : "")
                    }
                    onClick={() => {
                      if (locked) {
                        setMessage(
                          "This room is for Premium Parents. Upgrade to enter."
                        );
                      } else {
                        setSelectedCategoryId(cat.id);
                      }
                    }}
                  >
                    <div className="pf-cat-name">
                      {cat.name}
                      {locked && <span className="pf-lock"> 🔒</span>}
                    </div>
                    <div className="pf-cat-tag pf-cat-tag-premium">
                      Premium Only
                    </div>
                    <div className="pf-cat-desc">{cat.description}</div>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="pf-note">
            <strong>Note:</strong> This is a demo forum. Threads are stored only
            in this browser.
          </div>
        </aside>

        <section className="pf-content">
          <div className="pf-content-header">
            <h1>{selectedCategory.name}</h1>
            <p className="pf-content-description">
              {selectedCategory.description}
            </p>
          </div>

          {message && <div className="pf-alert">{message}</div>}

          <div className="pf-threads">
            {visibleThreads.length === 0 ? (
              <div className="pf-empty">
                No topics here yet. Be the first to start a conversation.
              </div>
            ) : (
              visibleThreads
                .slice()
                .reverse()
                .map((t) => (
                  <article key={t.id} className="pf-thread-card">
                    <header className="pf-thread-header">
                      <h2>{t.title}</h2>
                      <div className="pf-thread-meta">
                        <span>By {t.author}</span>
                        <span>
                          {new Date(t.createdAt).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short"
                          })}
                        </span>
                        {t.isPremiumOnly && (
                          <span className="pf-thread-pill">Premium Room</span>
                        )}
                      </div>
                    </header>
                    <p className="pf-thread-body">{t.body}</p>
                  </article>
                ))
            )}
          </div>

          <div className="pf-new-thread">
            <h2>Start a new topic</h2>

            {!canPostInCategory(selectedCategory) ? (
              <div className="pf-upgrade-box">
                <p>
                  This room is for <strong>Premium Parents</strong> only.
                </p>
                {!user.isPremium && (
                  <button
                    type="button"
                    className="pf-btn pf-btn-primary"
                    onClick={handleUpgrade}
                  >
                    Upgrade – $4.99/month
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleCreateThread} className="pf-form">
                <div className="pf-form-row">
                  <label>
                    Short title
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. My child asked if God is in the toilet"
                    />
                  </label>
                </div>

                <div className="pf-form-row">
                  <label>
                    Your post
                    <textarea
                      value={newBody}
                      onChange={(e) => setNewBody(e.target.value)}
                      placeholder="Share your question or struggle."
                      rows={4}
                    />
                  </label>
                </div>

                <div className="pf-form-footer">
                  {!user.isPremium && (
                    <div className="pf-form-hint">
                      Free parents can post 1 topic. Upgrade to post more.
                    </div>
                  )}
                  <button type="submit" className="pf-btn pf-btn-primary">
                    Post Topic
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="pf-footer">
        © {new Date().getFullYear()} Curious Kids Q&A – Parent Forum Demo.
      </footer>
    </div>
  );
}

export default App;
