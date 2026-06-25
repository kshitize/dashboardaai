import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import data from "./Airportsfilter.json";

/* ─── inline styles (no extra CSS file needed) ─────────────────────────────── */
const styles = {
  page: {
    fontFamily: "'Inter', sans-serif",
    background: "#F0F4FA",
    minHeight: "100vh",
  },
  hero: {
    background: "linear-gradient(135deg, #0A1628 0%, #0D2247 60%, #1A3A6B 100%)",
    padding: "56px 24px 64px",
    position: "relative",
    overflow: "hidden",
  },
  heroDiagonals: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "repeating-linear-gradient(120deg, transparent, transparent 60px, rgba(255,255,255,0.03) 60px, rgba(255,255,255,0.03) 61px)",
    pointerEvents: "none",
  },
  heroLabel: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "15px",
    fontWeight: 700,
    letterSpacing: "4px",
    color: "#F5A623",
    textTransform: "uppercase",
    marginBottom: "12px",
    display: "block",
  },
  heroTitle: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "clamp(36px, 6vw, 64px)",
    fontWeight: 700,
    color: "#FFFFFF",
    lineHeight: 1.05,
    marginBottom: "8px",
    letterSpacing: "-0.5px",
  },
  heroSub: {
    color: "rgba(255,255,255,0.5)",
    fontSize: "15px",
    marginBottom: "36px",
    letterSpacing: "0.2px",
  },
  searchWrap: {
    maxWidth: "480px",
    position: "relative",
  },
  searchInput: {
    width: "100%",
    padding: "14px 20px 14px 48px",
    border: "none",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(8px)",
    color: "#FFFFFF",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    transition: "background 0.2s",
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "rgba(255,255,255,0.4)",
    fontSize: "18px",
    pointerEvents: "none",
  },
  statsRow: {
    display: "flex",
    gap: "32px",
    marginTop: "40px",
    flexWrap: "wrap",
  },
  stat: {
    color: "rgba(255,255,255,0.9)",
  },
  statNum: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "28px",
    fontWeight: 700,
    lineHeight: 1,
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: "11px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.45)",
    marginTop: "2px",
  },
  body: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px 80px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: "12px",
    marginBottom: "28px",
  },
  sectionTitle: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "22px",
    fontWeight: 700,
    color: "#0A1628",
    letterSpacing: "0.5px",
  },
  sectionCount: {
    fontSize: "13px",
    color: "#8A9BB5",
    fontWeight: 500,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#FFFFFF",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(10,22,40,0.07)",
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
  },
  cardImgWrap: {
    position: "relative",
    height: "160px",
    overflow: "hidden",
    background: "#0D2247",
  },
  cardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.3s ease",
  },
  cardImgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(10,22,40,0.65) 0%, transparent 60%)",
  },
  cardImgLabel: {
    position: "absolute",
    bottom: "12px",
    left: "14px",
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "20px",
    fontWeight: 700,
    color: "#FFFFFF",
    letterSpacing: "1px",
    lineHeight: 1,
  },
  cardAccent: {
    height: "3px",
    background: "linear-gradient(90deg, #2B7FD4, #F5A623)",
  },
  cardBody: {
    padding: "16px 18px 18px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  cardTitle: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "17px",
    fontWeight: 700,
    color: "#0A1628",
    letterSpacing: "0.3px",
    margin: 0,
  },
  cardMeta: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "#8A9BB5",
  },
  metaDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "#F5A623",
    flexShrink: 0,
  },
  cardFooter: {
    marginTop: "auto",
    paddingTop: "12px",
    borderTop: "1px solid #F0F4FA",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  updatedBadge: {
    fontSize: "11px",
    color: "#8A9BB5",
    letterSpacing: "0.2px",
  },
  arrowBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#2B7FD4",
    letterSpacing: "0.3px",
    textTransform: "uppercase",
    textDecoration: "none",
    transition: "gap 0.15s",
  },
  emptyState: {
    textAlign: "center",
    padding: "64px 20px",
    color: "#8A9BB5",
  },
  emptyIcon: {
    fontSize: "40px",
    marginBottom: "16px",
  },
  emptyTitle: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "20px",
    fontWeight: 700,
    color: "#0A1628",
    marginBottom: "8px",
  },
};

/* ─── Card component ────────────────────────────────────────────────────────── */
const AirportCard = ({ val }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 32px rgba(10,22,40,0.13)"
          : "0 2px 12px rgba(10,22,40,0.07)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* image */}
      <div style={styles.cardImgWrap}>
        <img
          src={require(`${val.image}`)}
          style={{
            ...styles.cardImg,
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
          alt={val.name}
        />
        <div style={styles.cardImgOverlay} />
        <div style={styles.cardImgLabel}>
          {val.name.split(" ")[0].toUpperCase()}
        </div>
      </div>

      {/* accent bar */}
      <div style={styles.cardAccent} />

      {/* body */}
      <div style={styles.cardBody}>
        <h3 style={styles.cardTitle}>{val.name.toUpperCase()}</h3>

        <div style={styles.cardFooter}>
          <span style={styles.updatedBadge}>
            Updated {val.dateofupdation}
          </span>
          <NavLink to={`/${val.link}`} style={styles.arrowBtn}>
            View details
            <span style={{ fontSize: "16px", lineHeight: 1 }}>→</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

/* ─── Home page ─────────────────────────────────────────────────────────────── */
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = data.filter((val) =>
    searchTerm === ""
      ? true
      : val.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>AAI Airports Dashboard</title>
        <meta name="description" content="Airports Authority of India – Airport Information Dashboard" />
        <link rel="canonical" href="/" />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div style={styles.page}>

        {/* ── Hero ── */}
        <div style={styles.hero}>
          <div style={styles.heroDiagonals} />
          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>

            <span style={styles.heroLabel}>Airports Authority of India</span>
            <h1 style={styles.heroTitle}>
              Airport<br />Dashboard
            </h1>
            <p style={styles.heroSub}>
              Operational data across AAI-managed airports
            </p>

            {/* search */}
            <div style={styles.searchWrap}>
              <span style={styles.searchIcon}>⌕</span>
              <input
                type="text"
                style={styles.searchInput}
                placeholder="Search airports…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={(e) => (e.target.style.background = "rgba(255,255,255,0.16)")}
                onBlur={(e) => (e.target.style.background = "rgba(255,255,255,0.1)")}
              />
            </div>

            {/* stats */}
            <div style={styles.statsRow}>
              <div style={styles.stat}>
                <div style={styles.statNum}>{data.length}</div>
                <div style={styles.statLabel}>Airports</div>
              </div>
              </div>
          </div>
        </div>

        {/* ── Grid ── */}
        <div style={styles.body}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTitle}>All Airports</span>
            <span style={styles.sectionCount}>
              {filtered.length} of {data.length}
            </span>
          </div>

          {filtered.length > 0 ? (
            <div style={styles.grid}>
              {filtered.map((val) => (
                <AirportCard key={val.id} val={val} />
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>✈</div>
              <div style={styles.emptyTitle}>No airports found</div>
              <p>Try a different search term.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import data from "./Airportsfilter.json";

// const Home = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   return (
//     <>
//       <Helmet>
//         <title>Home</title>
//         <meta name="description" content="AAI Airports" />
//         <link rel="canonical" href="/" />
//       </Helmet>

//       <br />
//       <section id="header">
//         <div className="container-fluid nav_bg">
//           <div className="row">
//             <div className="col-12 mx-auto">
//               <div className="row">
//                 <div className="col-lg-6 order-1 order-lg-2 header-img">
//                   <div className="input-group mb-3">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Airport Name"
//                       aria-label="Username"
//                       aria-describedby="basic-addon1"
//                       onChange={(event) => setSearchTerm(event.target.value)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="my-5">
//           <h1 className="text-center">AIRPORTS</h1>
//           <div className="container-fluid mb-5">
//             <div className="row">
//               <div className="col-10 mx-auto">
//                 <div className="row gy-4">
//                   {data
//                     .filter((val) => {
//                       if (searchTerm === "") {
//                         return val;
//                       } else if (
//                         val.name
//                           .toLowerCase()
//                           .includes(searchTerm.toLowerCase())
//                       ) {
//                         return val;
//                       }
//                     })
//                     .map((val) => {
//                       return (
//                         <div className="col-md-4 col-10 mx-auto" key={val.id}>
//                           <div className="card">
//                             <img
//                               src={require(`${val.image}`)}
//                               className="card-img-top img-thumbnail img-responsive"
//                               alt="coimbatore airport"
//                             />
//                             <div className="card-body">
//                               <h5 className="card-title">
//                                 {val.name.toUpperCase()}
//                               </h5>
//                               <p className="card-text">
//                                 Updated on {val.dateofupdation}
//                               </p>
//                               <NavLink
//                                 to={`/${val.link}`}
//                                 className="btn btn-primary"
//                               >
//                                 More Info...
//                               </NavLink>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}

//                   <br />

//                   <br />

//                   <br />
//                   <br />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;
