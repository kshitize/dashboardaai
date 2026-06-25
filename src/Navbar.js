import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../src/images/logo.png";

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    fontFamily: "'Inter', sans-serif",
    background: "rgba(10, 22, 40, 0.97)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    padding: "0 24px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    textDecoration: "none",
  },
  logo: {
    height: "60px",
    width: "auto",
    objectFit: "contain",
    filter: "brightness(0) invert(1)",
  },
  divider: {
    width: "1px",
    height: "28px",
    background: "rgba(255,255,255,0.18)",
  },
  siteTitle: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "17px",
    fontWeight: 700,
    color: "#FFFFFF",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    lineHeight: 1,
    textDecoration: "none",
  },
  siteSub: {
    fontSize: "10px",
    fontWeight: 500,
    color: "rgba(255,255,255,0.4)",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginTop: "2px",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  badge: {
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#F5A623",
    background: "rgba(245,166,35,0.12)",
    border: "1px solid rgba(245,166,35,0.25)",
    borderRadius: "20px",
    padding: "4px 10px",
  },
};

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <NavLink to="/" style={styles.left}>
        <img src={logo} alt="AAI Logo" style={styles.logo} />
        <div style={styles.divider} />
        <div>
          <div style={styles.siteTitle}>AAI Airports</div>
          <div style={styles.siteSub}>Dashboard</div>
        </div>
      </NavLink>
    </nav>
  );
};

export default Navbar;
// import React from "react";
// import { NavLink } from "react-router-dom";
// import logo from "../src/images/logo.png";


// const Navbar = () => {
//   return (
//     <>
//       <section id="nav-bar">
//         <nav className="navbar navbar-expand-xl navbar-light bg-light ">
//           <NavLink className="nav-link navbar-brand" to="/">
//             <img src={logo} alt="AAI" />
//           </NavLink>
         
//         </nav>
//       </section>
//     </>
//   );
// };

// export default Navbar;
