import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Education", "Certifications", "Contact"];

const SKILLS = {
  "Data Analysis & Processing": ["SQL", "Python", "Pandas", "NumPy", "Scikit-learn", "R", "Data Profiling", "EDA", "Data Validation", "Data Reconciliation"],
  "Data Engineering & Migration": ["ETL/ELT Pipelines", "Data Mapping", "Data Modeling", "Data Migration", "Data Transformation", "Data Quality Frameworks"],
  "Databases & Platforms": ["Oracle", "SQL Server", "MySQL", "Snowflake", "PostgreSQL"],
  "Cloud & Big Data": ["AWS S3", "AWS Lambda", "Microsoft Azure", "Hadoop", "Spark", "Redshift", "Glue"],
  "Visualization & Reporting": ["Power BI", "Tableau", "Excel", "Pivot Tables", "Dashboards"],
  "Tools & DevOps": ["Docker", "GitHub", "Jupyter Notebook", "Azure DevOps", "JIRA", "Bash"],
};

const EXPERIENCES = [
  {
    role: "Data Analyst",
    company: "Tata Consultancy Services",
    client: "Baker Hughes, USA",
    period: "Jun 2022 – Aug 2024",
    color: "#1a56db",
    bullets: [
      "Performed detailed data analysis using Python (Pandas, NumPy) and SQL to support large-scale data transformation and migration initiatives, improving data accuracy and reporting efficiency.",
      "Analyzed complex data structures across source and target systems and developed source-to-target data mapping documents using SQL, ensuring seamless integration.",
      "Wrote and optimized complex queries for data validation, reconciliation, and impact analysis, reducing discrepancies and improving data reliability.",
      "Conducted system reconciliation between legacy and cloud platforms (AWS, Snowflake) using SQL and Python, ensuring high data integrity during migration.",
      "Worked with REST APIs to extract and integrate data, handling authentication and pagination to ensure complete and accurate data retrieval.",
      "Identified data gaps, inconsistencies, and quality issues using data profiling frameworks, implementing cleansing strategies aligned with data governance standards.",
      "Supported ETL validation, data migration testing, and production verification using Python, SQL, and big data tools (Hadoop, Spark).",
      "Developed dashboards and reports using Tableau and created metadata documentation and regulatory reporting artifacts.",
    ],
  },
  {
    role: "Data Analyst",
    company: "Tata Consultancy Services",
    client: "British Telecommunications, UK",
    period: "Oct 2021 – Jun 2022",
    color: "#0e9f6e",
    bullets: [
      "Delivered financial and billing data analysis using SQL Server and Excel, improving accuracy of revenue reporting and supporting regulatory compliance in a telecom domain.",
      "Structured and optimized relational data models using SQL Server, enabling efficient handling of high-volume transactional billing data.",
      "Leveraged advanced Excel functions to perform trend analysis, detect anomalies, and support financial reconciliation, enhancing audit readiness.",
      "Performed cross-system data validation between billing, payment, and reporting layers, ensuring consistency of financial records.",
      "Applied data governance practices and data quality standards to monitor data integrity, reducing inconsistencies in customer billing information.",
      "Assisted in data integration and ETL workflows using Azure-based pipelines and Snowflake, supporting scalable reporting.",
      "Designed Power BI dashboards and contributed to the Billing Revenue Assurance Module to track KPIs and revenue leakage.",
    ],
  },
];

const PROJECTS = [
  {
    title: "ClaimSense – Insurance Claims Denial Platform",
    subtitle: "Story of Millions in Denied Claims",
    tags: ["Python", "ML", "Flask", "Scikit-learn", "Pandas"],
    color: "#1a56db",
    icon: "🏥",
    demo: "https://capstone-project-1-tliu.onrender.com/",
    github: "https://github.com/Hariniguna2000",
    description: "End-to-end healthcare claims analytics platform using Machine Learning to predict claim outcomes and reduce insurance claim denials.",
    bullets: [
      "Built Logistic Regression and Random Forest models achieving high accuracy through feature engineering and model optimization.",
      "Designed an interactive Flask-based web app with dashboards, patient claim search, real-time risk assessment, and automated alert workflows.",
      "Performed healthcare data analysis, statistical testing, and visualization to identify denial patterns and improve operational efficiency.",
    ],
  },
  {
    title: "Readmit AI",
    subtitle: "Healthcare Readmission Risk Predictor",
    tags: ["Python", "Google AI Studio", "Deep Learning", "Scikit-learn"],
    color: "#7e3af2",
    icon: "🩺",
    demo: null,
    github: "https://github.com/Hariniguna2000",
    description: "AI-powered healthcare analytics application to predict 30-day patient readmission risk, delivering real-time predictions and data-driven clinical insights.",
    bullets: [
      "Developed and evaluated ML models (Logistic Regression, Deep Learning) using Accuracy, Precision, Recall, F1-Score, and ROC-AUC metrics.",
      "Performed end-to-end data cleaning, EDA, and feature engineering using Python, Pandas, and Scikit-learn across multi-dimensional patient datasets.",
      "Translated model outputs into actionable stakeholder-ready reporting dashboards bridging ML predictions and enterprise KPI workflows.",
    ],
  },
  {
    title: "Youth Tobacco Survey Visualization",
    subtitle: "Public Health Analytics Dashboard",
    tags: ["Power BI", "Python", "Pandas", "Power Query"],
    color: "#0e9f6e",
    icon: "📊",
    demo: null,
    github: "https://github.com/Hariniguna2000",
    description: "Interactive Power BI dashboards analyzing tobacco usage patterns across age, gender, and geography for public health stakeholders.",
    bullets: [
      "Designed executive-ready KPI visualizations from multi-dimensional survey data for non-technical public health stakeholders.",
      "Performed data cleaning and transformation using Python (Pandas) and Power Query (M), resolving inconsistencies across 10,000+ survey records.",
      "Built a star-schema data model in Power BI enabling slice-and-dice reporting across 5+ filters without performance degradation.",
    ],
  },
  {
    title: "Insurance Claims Denial Analysis",
    subtitle: "Predictive Denial Pattern Detection",
    tags: ["Python", "ML", "Tableau", "Prompt Engineering"],
    color: "#e3a008",
    icon: "📋",
    demo: null,
    github: "https://github.com/Hariniguna2000",
    description: "Processed multi-billion-record insurance datasets to build supervised classification models predicting denial patterns.",
    bullets: [
      "Processed multi-billion-record datasets across payer, provider, and treatment dimensions with supervised classification models.",
      "Built interactive Tableau dashboards exposing financial drivers behind claim denials for non-technical stakeholders.",
      "Enabled evidence-based denial reduction initiatives through strategic prioritization of high-risk cost drivers.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Postgraduate Diploma — Data Analytics for Business",
    institution: "St. Clair College",
    location: "Windsor, ON",
    period: "Sep 2024 – Apr 2026",
    gpa: "3.8 / 4.0",
    icon: "🎓",
  },
  {
    degree: "Bachelor of Computer Applications",
    institution: "Madras University",
    location: "Chennai, India",
    period: "Aug 2018 – May 2021",
    gpa: "7.7 / 10",
    icon: "🏛️",
  },
];

const CERTS = [
  { name: "Generative AI Fundamentals", issuer: "Databricks", icon: "🤖" },
  { name: "Multi AI Agents with CrewAI", issuer: "DeepLearning.AI", icon: "🧠" },
  { name: "Claude Code in Action", issuer: "Anthropic", icon: "⚡" },
  { name: "Python Bootcamp", issuer: "Udemy", icon: "🐍" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimSection({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
    setMenuOpen(false);
  };

  const styles = {
    root: {
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#f8f9fc",
      color: "#1a1f2e",
      minHeight: "100vh",
    },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: scrolled ? "1px solid #e5e9f2" : "1px solid transparent",
      transition: "all 0.3s ease",
      padding: "0 2rem",
    },
    navInner: {
      maxWidth: 1100, margin: "0 auto",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 64,
    },
    logo: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: 20, fontWeight: 700,
      color: "#1a56db", letterSpacing: "-0.5px",
      cursor: "pointer",
    },
    navLinks: {
      display: "flex", gap: 4, listStyle: "none", margin: 0, padding: 0,
    },
    navLink: (isActive) => ({
      padding: "6px 14px", borderRadius: 20,
      fontSize: 14, fontWeight: 500, cursor: "pointer",
      color: isActive ? "#1a56db" : "#4b5563",
      background: isActive ? "#eff4ff" : "transparent",
      border: "none", transition: "all 0.2s",
    }),
    hero: {
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 50%, #f0fdf4 100%)",
      padding: "6rem 2rem 4rem",
      position: "relative", overflow: "hidden",
    },
    heroInner: { maxWidth: 1100, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: "4rem", flexWrap: "wrap" },
    heroLeft: { flex: "1 1 340px" },
    heroTag: {
      display: "inline-block",
      background: "#eff4ff", color: "#1a56db",
      fontSize: 13, fontWeight: 600, letterSpacing: "0.05em",
      padding: "6px 16px", borderRadius: 20, marginBottom: 20,
    },
    heroName: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
      fontWeight: 700, lineHeight: 1.1,
      color: "#0f172a", marginBottom: 16,
      letterSpacing: "-1px",
    },
    heroSub: { fontSize: 18, color: "#4b5563", lineHeight: 1.6, marginBottom: 32, maxWidth: 480 },
    btnRow: { display: "flex", gap: 12, flexWrap: "wrap" },
    btnPrimary: {
      background: "#1a56db", color: "#fff",
      border: "none", borderRadius: 10, padding: "12px 28px",
      fontSize: 15, fontWeight: 600, cursor: "pointer",
      transition: "transform 0.15s, box-shadow 0.15s",
      boxShadow: "0 4px 14px rgba(26,86,219,0.3)",
    },
    btnOutline: {
      background: "transparent", color: "#1a56db",
      border: "2px solid #1a56db", borderRadius: 10, padding: "12px 28px",
      fontSize: 15, fontWeight: 600, cursor: "pointer",
      transition: "all 0.15s",
    },
    heroRight: {
      flex: "1 1 280px", display: "flex", justifyContent: "center",
    },
    avatar: {
      width: 240, height: 240, borderRadius: "50%",
      background: "linear-gradient(135deg, #1a56db 0%, #7e3af2 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 72, fontWeight: 700, color: "#fff",
      fontFamily: "'Playfair Display', serif",
      boxShadow: "0 20px 60px rgba(26,86,219,0.25)",
      position: "relative",
    },
    statsRow: {
      display: "flex", gap: 24, marginTop: 40, flexWrap: "wrap",
    },
    statBox: {
      background: "#fff", borderRadius: 12,
      padding: "16px 24px", border: "1px solid #e5e9f2",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    },
    statNum: { fontSize: 26, fontWeight: 700, color: "#1a56db", lineHeight: 1 },
    statLabel: { fontSize: 12, color: "#6b7280", marginTop: 4, fontWeight: 500 },
    section: {
      padding: "5rem 2rem",
      maxWidth: 1100, margin: "0 auto",
    },
    sectionLabel: {
      fontSize: 13, fontWeight: 700, letterSpacing: "0.1em",
      color: "#1a56db", textTransform: "uppercase", marginBottom: 8,
    },
    sectionTitle: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
      fontWeight: 700, color: "#0f172a", marginBottom: 16, lineHeight: 1.2,
    },
    divider: { width: 48, height: 4, background: "#1a56db", borderRadius: 2, marginBottom: 40 },
    card: {
      background: "#fff", borderRadius: 16,
      border: "1px solid #e5e9f2",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      padding: "1.75rem",
    },
    skillGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: 20,
    },
    skillCard: {
      background: "#fff", borderRadius: 14,
      border: "1px solid #e5e9f2",
      padding: "1.5rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
    skillCat: { fontSize: 13, fontWeight: 700, color: "#1a56db", marginBottom: 12, letterSpacing: "0.04em" },
    tagRow: { display: "flex", flexWrap: "wrap", gap: 8 },
    tag: {
      background: "#f0f4ff", color: "#1a56db",
      fontSize: 12, fontWeight: 600,
      padding: "5px 12px", borderRadius: 20,
      border: "1px solid #dbeafe",
    },
    timeline: { position: "relative", paddingLeft: 32 },
    timelineLine: {
      position: "absolute", left: 11, top: 8, bottom: 8,
      width: 2, background: "linear-gradient(to bottom, #1a56db, #7e3af2)",
      borderRadius: 1,
    },
    timelineDot: (color) => ({
      position: "absolute", left: 0, top: 24,
      width: 22, height: 22, borderRadius: "50%",
      background: color, border: "3px solid #fff",
      boxShadow: `0 0 0 2px ${color}`,
    }),
    expCard: {
      background: "#fff", borderRadius: 14,
      border: "1px solid #e5e9f2",
      padding: "1.5rem 1.75rem",
      marginBottom: 28,
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      position: "relative",
    },
    projGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: 24,
    },
    projCard: {
      background: "#fff", borderRadius: 16,
      border: "1px solid #e5e9f2",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      overflow: "hidden",
      display: "flex", flexDirection: "column",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    projHeader: (color) => ({
      padding: "1.5rem",
      background: `${color}0d`,
      borderBottom: `1px solid ${color}22`,
    }),
    projIcon: { fontSize: 32, marginBottom: 10 },
    projTitle: { fontSize: 17, fontWeight: 700, color: "#0f172a", marginBottom: 4 },
    projSub: { fontSize: 13, color: "#6b7280" },
    projBody: { padding: "1.25rem 1.5rem", flex: 1 },
    projDesc: { fontSize: 14, color: "#4b5563", lineHeight: 1.65, marginBottom: 12 },
    projBullets: { paddingLeft: 16, margin: 0 },
    projBullet: { fontSize: 13, color: "#4b5563", marginBottom: 6, lineHeight: 1.5 },
    projFooter: { padding: "1rem 1.5rem", borderTop: "1px solid #f3f4f6", display: "flex", gap: 10 },
    linkBtn: (color) => ({
      flex: 1, padding: "8px 0", borderRadius: 8, fontSize: 13, fontWeight: 600,
      cursor: "pointer", border: `1.5px solid ${color}`,
      color: color, background: "transparent",
      textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
      transition: "all 0.15s",
    }),
    linkBtnFilled: (color) => ({
      flex: 1, padding: "8px 0", borderRadius: 8, fontSize: 13, fontWeight: 600,
      cursor: "pointer", border: `1.5px solid ${color}`,
      color: "#fff", background: color,
      textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
      transition: "all 0.15s",
    }),
    eduGrid: {
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20,
    },
    eduCard: {
      background: "#fff", borderRadius: 16, padding: "1.75rem",
      border: "1px solid #e5e9f2", boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    },
    certGrid: {
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16,
    },
    certCard: {
      background: "#fff", borderRadius: 14, padding: "1.25rem 1.5rem",
      border: "1px solid #e5e9f2", display: "flex", alignItems: "center", gap: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
    contactSection: {
      background: "linear-gradient(135deg, #1a56db 0%, #7e3af2 100%)",
      borderRadius: 24, padding: "3rem", textAlign: "center",
      color: "#fff",
    },
    footer: {
      textAlign: "center", padding: "2rem",
      fontSize: 13, color: "#9ca3af",
      borderTop: "1px solid #e5e9f2",
    },
  };

  return (
    <div style={styles.root}>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #f8f9fc; }
        li { list-style: none; }
        a { text-decoration: none; }
        .proj-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1) !important; }
        .btn-p:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(26,86,219,0.4) !important; }
        .btn-o:hover { background: #eff4ff !important; }
        .nav-btn:hover { background: #eff4ff !important; color: #1a56db !important; }
        .link-btn:hover { background: #eff4ff; }
        .link-btn-f:hover { opacity: 0.88; }
      `}</style>

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logo} onClick={() => scrollTo("About")}>HG.</div>
          <ul style={styles.navLinks}>
            {NAV_LINKS.map(l => (
              <li key={l}>
                <button className="nav-btn" style={styles.navLink(active === l)} onClick={() => scrollTo(l)}>{l}</button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section id="about" style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.heroLeft}>
            <span style={styles.heroTag}>📍 Nova Scotia, Canada</span>
            <h1 style={styles.heroName}>Harini<br />Gunasekaran</h1>
            <p style={styles.heroSub}>
              Data Analyst skilled in SQL, ETL validation, data migration, and cloud analytics across Oracle, Snowflake, and AWS — turning complex datasets into decisions.
            </p>
            <div style={styles.btnRow}>
              <button className="btn-p" style={styles.btnPrimary} onClick={() => scrollTo("Contact")}>Get in Touch</button>
              <button className="btn-o" style={styles.btnOutline} onClick={() => scrollTo("Projects")}>View Projects</button>
              <a href="https://www.linkedin.com/in/harini-gunasekaran-0147531aa/" target="_blank" rel="noreferrer"
                style={{ ...styles.btnOutline, display: "flex", alignItems: "center", gap: 6, border: "2px solid #0077b5", color: "#0077b5" }}>
                LinkedIn ↗
              </a>
              <a href="https://github.com/Hariniguna2000" target="_blank" rel="noreferrer"
                style={{ ...styles.btnOutline, display: "flex", alignItems: "center", gap: 6, border: "2px solid #24292e", color: "#24292e" }}>
                GitHub ↗
              </a>
            </div>
            <div style={styles.statsRow}>
              {[["2.5+", "Years Experience"], ["3", "Enterprise Clients"], ["4+", "ML Projects"], ["3.8", "GPA"]].map(([n, l]) => (
                <div key={l} style={styles.statBox}>
                  <div style={styles.statNum}>{n}</div>
                  <div style={styles.statLabel}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={styles.heroRight}>
            <div style={styles.avatar}>HG</div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ background: "#fff", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimSection>
            <div style={styles.sectionLabel}>What I Work With</div>
            <h2 style={styles.sectionTitle}>Technical Skills</h2>
            <div style={styles.divider} />
            <div style={styles.skillGrid}>
              {Object.entries(SKILLS).map(([cat, items], i) => (
                <AnimSection key={cat} delay={i * 80}>
                  <div style={styles.skillCard}>
                    <div style={styles.skillCat}>{cat}</div>
                    <div style={styles.tagRow}>
                      {items.map(t => <span key={t} style={styles.tag}>{t}</span>)}
                    </div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ background: "#f8f9fc", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimSection>
            <div style={styles.sectionLabel}>Career Journey</div>
            <h2 style={styles.sectionTitle}>Professional Experience</h2>
            <div style={styles.divider} />
            <div style={styles.timeline}>
              <div style={styles.timelineLine} />
              {EXPERIENCES.map((exp, i) => (
                <AnimSection key={i} delay={i * 120}>
                  <div style={{ position: "relative", marginBottom: 32 }}>
                    <div style={styles.timelineDot(exp.color)} />
                    <div style={styles.expCard}>
                      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                        <div>
                          <div style={{ fontSize: 17, fontWeight: 700, color: "#0f172a" }}>{exp.role}</div>
                          <div style={{ fontSize: 14, color: exp.color, fontWeight: 600, marginTop: 2 }}>{exp.company} — {exp.client}</div>
                        </div>
                        <span style={{ background: `${exp.color}15`, color: exp.color, fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, height: "fit-content" }}>{exp.period}</span>
                      </div>
                      <ul style={{ paddingLeft: 18, marginTop: 12 }}>
                        {exp.bullets.map((b, j) => (
                          <li key={j} style={{ fontSize: 14, color: "#4b5563", marginBottom: 8, lineHeight: 1.6, listStyle: "disc" }}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ background: "#fff", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimSection>
            <div style={styles.sectionLabel}>Portfolio Highlights</div>
            <h2 style={styles.sectionTitle}>Academic Projects</h2>
            <div style={styles.divider} />
            <div style={styles.projGrid}>
              {PROJECTS.map((p, i) => (
                <AnimSection key={i} delay={i * 100}>
                  <div className="proj-card" style={styles.projCard}>
                    <div style={styles.projHeader(p.color)}>
                      <div style={styles.projIcon}>{p.icon}</div>
                      <div style={styles.projTitle}>{p.title}</div>
                      <div style={styles.projSub}>{p.subtitle}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                        {p.tags.map(t => (
                          <span key={t} style={{ background: `${p.color}18`, color: p.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <div style={styles.projBody}>
                      <p style={styles.projDesc}>{p.description}</p>
                      <ul style={styles.projBullets}>
                        {p.bullets.map((b, j) => (
                          <li key={j} style={{ ...styles.projBullet, listStyle: "disc" }}>{b}</li>
                        ))}
                      </ul>
                    </div>
                    <div style={styles.projFooter}>
                      {p.demo && (
                        <a href={p.demo} target="_blank" rel="noreferrer" className="link-btn-f" style={styles.linkBtnFilled(p.color)}>
                          🚀 Live Demo
                        </a>
                      )}
                      <a href={p.github} target="_blank" rel="noreferrer" className="link-btn" style={styles.linkBtn("#24292e")}>
                        ⬡ GitHub
                      </a>
                    </div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ background: "#f8f9fc", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimSection>
            <div style={styles.sectionLabel}>Academic Background</div>
            <h2 style={styles.sectionTitle}>Education</h2>
            <div style={styles.divider} />
            <div style={styles.eduGrid}>
              {EDUCATION.map((e, i) => (
                <AnimSection key={i} delay={i * 120}>
                  <div style={styles.eduCard}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>{e.icon}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 6, lineHeight: 1.3 }}>{e.degree}</div>
                    <div style={{ fontSize: 14, color: "#1a56db", fontWeight: 600, marginBottom: 4 }}>{e.institution}</div>
                    <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>{e.location}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ background: "#eff4ff", color: "#1a56db", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>{e.period}</span>
                      <span style={{ background: "#f0fdf4", color: "#0e9f6e", fontSize: 13, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>GPA: {e.gpa}</span>
                    </div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" style={{ background: "#fff", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimSection>
            <div style={styles.sectionLabel}>Continuous Learning</div>
            <h2 style={styles.sectionTitle}>Certifications</h2>
            <div style={styles.divider} />
            <div style={styles.certGrid}>
              {CERTS.map((c, i) => (
                <AnimSection key={i} delay={i * 80}>
                  <div style={styles.certCard}>
                    <span style={{ fontSize: 32 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 3 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: "#1a56db", fontWeight: 600 }}>{c.issuer}</div>
                    </div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "#f8f9fc", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <AnimSection>
            <div style={styles.contactSection}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12, opacity: 0.8 }}>Let's Connect</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, marginBottom: 16 }}>Ready to Work Together?</h2>
              <p style={{ fontSize: 16, opacity: 0.85, lineHeight: 1.7, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
                Open to Data Analyst roles in Canada. Let's talk about how I can turn your data into decisions.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="mailto:harinigunasekaran24@gmail.com" style={{ background: "#fff", color: "#1a56db", padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 6 }}>
                  ✉️ harinigunasekaran24@gmail.com
                </a>
                <a href="tel:+17828992409" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15, border: "1.5px solid rgba(255,255,255,0.4)" }}>
                  📞 +1-782-899-2409
                </a>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
                <a href="https://www.linkedin.com/in/harini-gunasekaran-0147531aa/" target="_blank" rel="noreferrer"
                  style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "10px 22px", borderRadius: 8, fontWeight: 600, fontSize: 14, border: "1.5px solid rgba(255,255,255,0.3)" }}>
                  LinkedIn ↗
                </a>
                <a href="https://github.com/Hariniguna2000" target="_blank" rel="noreferrer"
                  style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "10px 22px", borderRadius: 8, fontWeight: 600, fontSize: 14, border: "1.5px solid rgba(255,255,255,0.3)" }}>
                  GitHub ↗
                </a>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2025 Harini Gunasekaran · Built with React · NS, Canada
      </footer>
    </div>
  );
}
