import React from "react";
import { Helmet } from "react-helmet-async";
import { BsTelephone } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { useAirportData } from "./useAirportData";

// ── Small helper: one row in the info table ────────────────────────────────
// Handles multi-line cell values from the Google Sheet (entered via
// Enter / Alt+Enter) by splitting on newlines and rendering each line
// separately, instead of letting HTML collapse them into a single line.
const InfoRow = ({ label, value, last = false }) => {
  const lines = value
    ? String(value)
        .split(/\r?\n/)
        .filter((line) => line.trim() !== "")
    : [];

  return (
    <div className={`row g-2 py-2 ${last ? "" : "border-bottom"}`}>
      <div className="col-12 col-md-4 fw-semibold text-start">
        {label}
      </div>
      <div className="col-12 col-md-8 text-start text-break">
        {lines.length > 0
          ? lines.map((line, i) => <div key={i}>{line}</div>)
          : "—"}
      </div>
    </div>
  );
};

// ── Main reusable component ────────────────────────────────────────────────
// Props:
//   airportName  – must match exactly the value in column B of the Google Sheet
//                 e.g. "Agartala", "Chennai", "Kolkata"
//   canonicalUrl – the route path, e.g. "/agartalaAirport"
//   description  – optional meta description string
const AirportPage = ({ airportName, canonicalUrl, description }) => {
  const { data: d, loading, error } = useAirportData(airportName);

  if (loading) {
    return (
      <section id="header" className="container py-4 text-center text-muted">
        <div className="spinner-border spinner-border-sm me-2" role="status" />
        Loading airport data…
      </section>
    );
  }

  if (error) {
    return (
      <section id="header" className="container py-4">
        <div className="alert alert-danger">
          Could not load data: {error}
          <br />
          <small>
            Check the <code>SHEET_ID</code> in <code>useAirportData.js</code>{" "}
            and ensure the sheet is shared as "Anyone with the link can view".
          </small>
        </div>
      </section>
    );
  }

  if (!d) {
    return (
      <section id="header" className="container py-4">
        <div className="alert alert-warning">
          No row found for "{airportName}" in the Google Sheet.
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{d["Airport"] || "—"} Airport</title>
        <meta
          name="description"
          content={description || `Airport information for ${airportName}.`}
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <section id="header" className="container py-4">
        {/* ── Airport Director Card ─────────────────────────────────────── */}
        <div className="card shadow-lg border-0 rounded-4 mb-4">
          <div className="card-body p-4">
            <h2 className="text-primary fw-bold mb-1">
              {d["Airport"] || "—"} AIRPORT
            </h2>

            <h4 className="card-title fw-bold mb-2">
              APD Name: {d["APD Name"] || "—"}
            </h4>

            <p className="text-muted mb-3">
              Updated on: {d["Date of Updation"] || "—"}
            </p>

            <div className="d-flex flex-wrap gap-2 mb-3">
              {d["APD Phone Number"] && (
                <a
                  href={`tel:${d["APD Phone Number"]}`}
                  className="btn btn-outline-primary"
                >
                  <BsTelephone className="me-2" />
                  Airport Director: {d["APD Phone Number"]}
                </a>
              )}
              {d["Terminal Manager Phone"] && (
                <a
                  href={`tel:${d["Terminal Manager Phone"]}`}
                  className="btn btn-outline-success"
                >
                  <BsTelephone className="me-2" />
                  Terminal Manager: {d["Terminal Manager Phone"]}
                </a>
              )}
            </div>

            {d["APD Mail"] && (
              <p className="mb-3">
                <FiMail className="me-2 text-danger" />
                <a href={`mailto:${d["APD Mail"]}`} className="text-decoration-none">
                  {d["APD Mail"]}
                </a>
              </p>
            )}

            <div className="d-flex gap-2 flex-wrap">
              {d["Type of Airport"] && (
                <span className="badge bg-primary p-2">{d["Type of Airport"]}</span>
              )}
              {d["Watch Hour"] && (
                <span className="badge bg-success p-2">
                  Watch Hour: {d["Watch Hour"]}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Accordion ─────────────────────────────────────────────────── */}
        <div className="accordion shadow-sm" id={`accordionAirport-${airportName}`}>
          {/* ── Terminal Facilities ──────────────────────────────────────── */}
          <div className="accordion-item border-0 rounded-4 overflow-hidden mb-3 shadow-sm">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-semibold fs-5"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapseTerminal-${airportName}`}
                aria-expanded="false"
                aria-controls={`collapseTerminal-${airportName}`}
              >
                Terminal Information
              </button>
            </h2>
            <div
              id={`collapseTerminal-${airportName}`}
              className="accordion-collapse collapse"
              data-bs-parent={`#accordionAirport-${airportName}`}
            >
              <div className="accordion-body">
                <InfoRow
                  label="No. of Check-in Counters"
                  value={d["No. of Check-in Counters"]}
                />
                <InfoRow
                  label="No. of CUSS Kiosks Available"
                  value={d["No. of CUSS Kiosks available"]}
                />
                <InfoRow label="ILBS Facility" value={d["ILBS Facility"]} />
                <InfoRow
                  label="No. of Aero Bridges"
                  value={d["No. of Aero Bridges"]}
                />
                <InfoRow label="Child Care Rooms" value={d["Child Care Rooms"]} />
                <InfoRow
                  label="May I Help You Counters"
                  value={d["May I Help You Counters"]}
                />
                <InfoRow
                  label="Accessible Facilities for PRM"
                  value={d["Accessible Facilities for PRM"]}
                />
                <InfoRow
                  label="Reserved Lounges"
                  value={d["Reserved Lounges"]}
                />
                <InfoRow
                  label="Digi Yatra Facility"
                  value={d["Digi Yatra Facility"]}
                />
                <InfoRow
                  label="Immigration Counters"
                  value={d["Immigration Counters"]}
                />
                <InfoRow
                  label="Immigration Manpower"
                  value={d["Immigration Manpower"]}
                />
                <InfoRow label="Custom Counters" value={d["Custom Counters"]} />
                <InfoRow label="Custom Manpower" value={d["Custom Manpower"]} />
                <InfoRow label="APHO Facility" value={d["APHO Facility"]} />
                <InfoRow
                  label="Animal Quarantine Facility"
                  value={d["Animal Quarantine Facility"]}
                />
                <InfoRow
                  label="Plant Quarantine Facility"
                  value={d["Plant Quarantine Facility"]}
                />
                <InfoRow
                  label="Sanitary Napkin Vending Machines"
                  value={d["Sanitary Napkin Vending Machines"]}
                />
                <InfoRow
                  label="Solid Waste Management Facility"
                  value={d["Solid Waste Management Facility"]}
                />
                <InfoRow label="MI Room" value={d["MI Room"]} />
                <InfoRow label="BA Test Facility" value={d["BA Test Facility"]} />
                <InfoRow
                  label="Number of Shifts in Terminal"
                  value={d["Number of Shifts in Terminal"]}
                  last
                />
              </div>
            </div>
          </div>

          {/* ── Airside Information ──────────────────────────────────────── */}
          <div className="accordion-item border-0 rounded-4 overflow-hidden shadow-sm">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-semibold fs-5"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapseAirside-${airportName}`}
                aria-expanded="false"
                aria-controls={`collapseAirside-${airportName}`}
              >
                Airside Information
              </button>
            </h2>
            <div
              id={`collapseAirside-${airportName}`}
              className="accordion-collapse collapse"
              data-bs-parent={`#accordionAirport-${airportName}`}
            >
              <div className="accordion-body">
                <InfoRow
                  label="Runway Orientation"
                  value={d["Runway Orientation"]}
                />
                <InfoRow label="RWY Dimension" value={d["RWY Dimension"]} />
                <InfoRow
                  label="RWY Strip Dimension"
                  value={d["RWY Strip Dimension"]}
                />
                <InfoRow label="RESA" value={d["RESA"]} />
                <InfoRow label="Number of TWY" value={d["Number of TWY"]} />
                <InfoRow
                  label="Aircraft Stands with PBB"
                  value={d["Aircraft Stands with PBB"]}
                />
                <InfoRow
                  label="Total Aircraft Stands"
                  value={d["Total Aircraft Stands"]}
                />
                <InfoRow
                  label="Approach Light Category"
                  value={d["Approach Light Category"]}
                />
                <InfoRow
                  label="Instrument Landing System"
                  value={d["Instrument Landing System"]}
                />
                <InfoRow label="LVP/LVTO" value={d["LVP/LVTO"]} />
                <InfoRow label="Homing Aid" value={d["Homing Aid"]} />
                <InfoRow label="IFR/VFR" value={d["IFR/VFR"]} />
                <InfoRow label="Night Landing" value={d["Night Landing"]} />
                <InfoRow
                  label="Critical Aircraft"
                  value={d["Critical Aircraft"]}
                />
                <InfoRow
                  label="Declared Distances"
                  value={d["Declared Distances"]}
                />
                <InfoRow
                  label="Instrument Approach"
                  value={d["Instrument Approach"]}
                />
                <InfoRow label="Fire Category" value={d["Fire Category"]} last />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AirportPage;

// import React from "react";
// import { Helmet } from "react-helmet-async";
// import { BsTelephone } from "react-icons/bs";
// import { FiMail } from "react-icons/fi";
// import { useAirportData } from "./useAirportData";

// // ── Small helper: one row in the info table ────────────────────────────────
// const InfoRow = ({ label, value, last = false }) => (
//   <div className={`row g-2 py-2 ${last ? "" : "border-bottom"}`}>
//     <div className="col-12 col-md-4 fw-semibold text-start">
//       {label}
//     </div>
//     <div className="col-12 col-md-8 text-start text-break">
//       {value || "—"}
//     </div>
//   </div>
// );

// // ── Main reusable component ────────────────────────────────────────────────
// // Props:
// //   airportName  – must match exactly the value in column B of the Google Sheet
// //                 e.g. "Agartala", "Chennai", "Kolkata"
// //   canonicalUrl – the route path, e.g. "/agartalaAirport"
// //   description  – optional meta description string
// const AirportPage = ({ airportName, canonicalUrl, description }) => {
//   const { data: d, loading, error } = useAirportData(airportName);

//   if (loading) {
//     return (
//       <section id="header" className="container py-4 text-center text-muted">
//         <div className="spinner-border spinner-border-sm me-2" role="status" />
//         Loading airport data…
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section id="header" className="container py-4">
//         <div className="alert alert-danger">
//           Could not load data: {error}
//           <br />
//           <small>
//             Check the <code>SHEET_ID</code> in <code>useAirportData.js</code>{" "}
//             and ensure the sheet is shared as "Anyone with the link can view".
//           </small>
//         </div>
//       </section>
//     );
//   }

//   if (!d) {
//     return (
//       <section id="header" className="container py-4">
//         <div className="alert alert-warning">
//           No row found for "{airportName}" in the Google Sheet.
//         </div>
//       </section>
//     );
//   }

//   return (
//     <>
//       <Helmet>
//         <title>{d["Airport"] || "—"} Airport</title>
//         <meta
//           name="description"
//           content={description || `Airport information for ${airportName}.`}
//         />
//         <link rel="canonical" href={canonicalUrl} />
//       </Helmet>

//       <section id="header" className="container py-4">
//         {/* ── Airport Director Card ─────────────────────────────────────── */}
//         <div className="card shadow-lg border-0 rounded-4 mb-4">
//           <div className="card-body p-4">
//             <h2 className="text-primary fw-bold mb-1">
//               {d["Airport"] || "—"} AIRPORT
//             </h2>

//             <h4 className="card-title fw-bold mb-2">
//               APD Name: {d["APD Name"] || "—"}
//             </h4>

//             <p className="text-muted mb-3">
//               Updated on: {d["Date of Updation"] || "—"}
//             </p>

//             <div className="d-flex flex-wrap gap-2 mb-3">
//               {d["APD Phone Number"] && (
//                 <a
//                   href={`tel:${d["APD Phone Number"]}`}
//                   className="btn btn-outline-primary"
//                 >
//                   <BsTelephone className="me-2" />
//                   Airport Director: {d["APD Phone Number"]}
//                 </a>
//               )}
//               {d["Terminal Manager Phone"] && (
//                 <a
//                   href={`tel:${d["Terminal Manager Phone"]}`}
//                   className="btn btn-outline-success"
//                 >
//                   <BsTelephone className="me-2" />
//                   Terminal Manager: {d["Terminal Manager Phone"]}
//                 </a>
//               )}
//             </div>

//             {d["APD Mail"] && (
//               <p className="mb-3">
//                 <FiMail className="me-2 text-danger" />
//                 <a href={`mailto:${d["APD Mail"]}`} className="text-decoration-none">
//                   {d["APD Mail"]}
//                 </a>
//               </p>
//             )}

//             <div className="d-flex gap-2 flex-wrap">
//               {d["Type of Airport"] && (
//                 <span className="badge bg-primary p-2">{d["Type of Airport"]}</span>
//               )}
//               {d["Watch Hour"] && (
//                 <span className="badge bg-success p-2">
//                   Watch Hour: {d["Watch Hour"]}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ── Accordion ─────────────────────────────────────────────────── */}
//         <div className="accordion shadow-sm" id={`accordionAirport-${airportName}`}>
//           {/* ── Terminal Facilities ──────────────────────────────────────── */}
//           <div className="accordion-item border-0 rounded-4 overflow-hidden mb-3 shadow-sm">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button collapsed fw-semibold fs-5"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target={`#collapseTerminal-${airportName}`}
//                 aria-expanded="false"
//                 aria-controls={`collapseTerminal-${airportName}`}
//               >
//                 Terminal Facilities
//               </button>
//             </h2>
//             <div
//               id={`collapseTerminal-${airportName}`}
//               className="accordion-collapse collapse"
//               data-bs-parent={`#accordionAirport-${airportName}`}
//             >
//               <div className="accordion-body">
//                 <InfoRow
//                   label="No. of Check-in Counters"
//                   value={d["No. of Check-in Counters"]}
//                 />
//                 <InfoRow
//                   label="No. of CUSS Kiosks Available"
//                   value={d["No. of CUSS Kiosks available"]}
//                 />
//                 <InfoRow label="ILBS Facility" value={d["ILBS Facility"]} />
//                 <InfoRow
//                   label="No. of Aero Bridges"
//                   value={d["No. of Aero Bridges"]}
//                 />
//                 <InfoRow label="Child Care Rooms" value={d["Child Care Rooms"]} />
//                 <InfoRow
//                   label="May I Help You Counters"
//                   value={d["May I Help You Counters"]}
//                 />
//                 <InfoRow
//                   label="Accessible Facilities for PRM"
//                   value={d["Accessible Facilities for PRM"]}
//                 />
//                 <InfoRow
//                   label="Reserved Lounges"
//                   value={d["Reserved Lounges"]}
//                 />
//                 <InfoRow
//                   label="Digi Yatra Facility"
//                   value={d["Digi Yatra Facility"]}
//                 />
//                 <InfoRow
//                   label="Immigration Counters"
//                   value={d["Immigration Counters"]}
//                 />
//                 <InfoRow
//                   label="Immigration Manpower"
//                   value={d["Immigration Manpower"]}
//                 />
//                 <InfoRow label="Custom Counters" value={d["Custom Counters"]} />
//                 <InfoRow label="Custom Manpower" value={d["Custom Manpower"]} />
//                 <InfoRow label="APHO Facility" value={d["APHO Facility"]} />
//                 <InfoRow
//                   label="Animal Quarantine Facility"
//                   value={d["Animal Quarantine Facility"]}
//                 />
//                 <InfoRow
//                   label="Plant Quarantine Facility"
//                   value={d["Plant Quarantine Facility"]}
//                 />
//                 <InfoRow
//                   label="Sanitary Napkin Vending Machines"
//                   value={d["Sanitary Napkin Vending Machines"]}
//                 />
//                 <InfoRow
//                   label="Solid Waste Management Facility"
//                   value={d["Solid Waste Management Facility"]}
//                 />
//                 <InfoRow label="MI Room" value={d["MI Room"]} />
//                 <InfoRow label="BA Test Facility" value={d["BA Test Facility"]} />
//                 <InfoRow
//                   label="Number of Shifts in Terminal"
//                   value={d["Number of Shifts in Terminal"]}
//                   last
//                 />
//               </div>
//             </div>
//           </div>

//           {/* ── Airside Information ──────────────────────────────────────── */}
//           <div className="accordion-item border-0 rounded-4 overflow-hidden shadow-sm">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button collapsed fw-semibold fs-5"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target={`#collapseAirside-${airportName}`}
//                 aria-expanded="false"
//                 aria-controls={`collapseAirside-${airportName}`}
//               >
//                 Airside Information
//               </button>
//             </h2>
//             <div
//               id={`collapseAirside-${airportName}`}
//               className="accordion-collapse collapse"
//               data-bs-parent={`#accordionAirport-${airportName}`}
//             >
//               <div className="accordion-body">
//                 <InfoRow
//                   label="Runway Orientation"
//                   value={d["Runway Orientation"]}
//                 />
//                 <InfoRow label="RWY Dimension" value={d["RWY Dimension"]} />
//                 <InfoRow
//                   label="RWY Strip Dimension"
//                   value={d["RWY Strip Dimension"]}
//                 />
//                 <InfoRow label="RESA" value={d["RESA"]} />
//                 <InfoRow label="Number of TWY" value={d["Number of TWY"]} />
//                 <InfoRow
//                   label="Aircraft Stands with PBB"
//                   value={d["Aircraft Stands with PBB"]}
//                 />
//                 <InfoRow
//                   label="Total Aircraft Stands"
//                   value={d["Total Aircraft Stands"]}
//                 />
//                 <InfoRow
//                   label="Approach Light Category"
//                   value={d["Approach Light Category"]}
//                 />
//                 <InfoRow
//                   label="Instrument Landing System"
//                   value={d["Instrument Landing System"]}
//                 />
//                 <InfoRow label="LVP/LVTO" value={d["LVP/LVTO"]} />
//                 <InfoRow label="Homing Aid" value={d["Homing Aid"]} />
//                 <InfoRow label="IFR/VFR" value={d["IFR/VFR"]} />
//                 <InfoRow label="Night Landing" value={d["Night Landing"]} />
//                 <InfoRow
//                   label="Critical Aircraft"
//                   value={d["Critical Aircraft"]}
//                 />
//                 <InfoRow
//                   label="Declared Distances"
//                   value={d["Declared Distances"]}
//                 />

//                 <div className="row g-2 py-2 border-bottom">
//                   <div className="col-12 col-md-4 fw-semibold text-start">
//                     Instrument Approach
//                   </div>
//                   <div className="col-12 col-md-8 text-start text-break">
//                     {d["Instrument Approach"]
//                       ? d["Instrument Approach"].split("\n").map((line, i) => (
//                           <div key={i}>{line}</div>
//                         ))
//                       : "—"}
//                   </div>
//                 </div>

//                 <InfoRow label="Fire Category" value={d["Fire Category"]} last />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default AirportPage;

// import React from "react";
// import { Helmet } from "react-helmet-async";
// import { BsTelephone } from "react-icons/bs";
// import { FiMail } from "react-icons/fi";
// import { useAirportData } from "./useAirportData";

// // ── Small helper: one row in the info table ────────────────────────────────
// const InfoRow = ({ label, value, last = false }) => (
//   <div className={`d-flex justify-content-between ${last ? "" : "border-bottom"} py-2`}>
//     <span>{label}</span>
//     <strong>{value || "—"}</strong>
//   </div>
// );

// // ── Main reusable component ────────────────────────────────────────────────
// // Props:
// //   airportName  – must match exactly the value in column B of the Google Sheet
// //                  e.g. "Agartala", "Chennai", "Kolkata"
// //   canonicalUrl – the route path, e.g. "/agartalaAirport"
// //   description  – optional meta description string

// const AirportPage = ({ airportName, canonicalUrl, description }) => {
//   const { data: d, loading, error } = useAirportData(airportName);

//   if (loading) {
//     return (
//       <section id="header" className="container py-4 text-center text-muted">
//         <div className="spinner-border spinner-border-sm me-2" role="status" />
//         Loading airport data…
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section id="header" className="container py-4">
//         <div className="alert alert-danger">
//           Could not load data: {error}
//           <br />
//           <small>
//             Check the <code>SHEET_ID</code> in <code>useAirportData.js</code> and
//             ensure the sheet is shared as "Anyone with the link can view".
//           </small>
//         </div>
//       </section>
//     );
//   }

//   if (!d) {
//     return (
//       <section id="header" className="container py-4">
//         <div className="alert alert-warning">
//           No row found for "{airportName}" in the Google Sheet.
//         </div>
//       </section>
//     );
//   }

//   return (
//     <>
//       <Helmet>
//         <title>{d["Airport"] || "—"} Airport</title>
//         <meta
//           name="description"
//           content={description || `Airport information for ${airportName}.`}
//         />
//         <link rel="canonical" href={canonicalUrl} />
//       </Helmet>

//       <section id="header" className="container py-4">

//         {/* ── Airport Director Card ─────────────────────────────────────── */}
//         <div className="card shadow-lg border-0 rounded-4 mb-4">
//           <div className="card-body p-4">

//             <h2 className="text-primary fw-bold mb-1">
//               {d["Airport"] || "—"} AIRPORT
//             </h2>

//             <h4 className="card-title fw-bold mb-2">
//               APD Name: {d["APD Name"] || "—"}
//             </h4>

//             <p className="text-muted mb-3">
//               Updated on: {d["Date of Updation"] || "—"}
//             </p>

//             <div className="d-flex flex-wrap gap-2 mb-3">
//               {d["APD Phone Number"] && (
//                 <a href={`tel:${d["APD Phone Number"]}`} className="btn btn-outline-primary">
//                   <BsTelephone className="me-2" />
//                   Airport Director: {d["APD Phone Number"]}
//                 </a>
//               )}
//               {d["Terminal Manager Phone"] && (
//                 <a href={`tel:${d["Terminal Manager Phone"]}`} className="btn btn-outline-success">
//                   <BsTelephone className="me-2" />
//                   Terminal Manager: {d["Terminal Manager Phone"]}
//                 </a>
//               )}
//             </div>

//             {d["APD Mail"] && (
//               <p className="mb-3">
//                 <FiMail className="me-2 text-danger" />
//                 <a href={`mailto:${d["APD Mail"]}`} className="text-decoration-none">
//                   {d["APD Mail"]}
//                 </a>
//               </p>
//             )}

//             <div className="d-flex gap-2 flex-wrap">
//               {d["Type of Airport"] && (
//                 <span className="badge bg-primary p-2">{d["Type of Airport"]}</span>
//               )}
//               {d["Watch Hour"] && (
//                 <span className="badge bg-success p-2">Watch Hour: {d["Watch Hour"]}</span>
//               )}
//             </div>

//           </div>
//         </div>

//         {/* ── Accordion ─────────────────────────────────────────────────── */}
//         {/* Use a unique accordion id per airport to avoid conflicts if multiple
//             AirportPage instances ever exist on the same page */}
//         <div className="accordion shadow-sm" id={`accordionAirport-${airportName}`}>

//           {/* ── Terminal Facilities ──────────────────────────────────────── */}
//           <div className="accordion-item border-0 rounded-4 overflow-hidden mb-3 shadow-sm">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button collapsed fw-semibold fs-5"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target={`#collapseTerminal-${airportName}`}
//                 aria-expanded="false"
//                 aria-controls={`collapseTerminal-${airportName}`}
//               >
//                 Terminal Facilities
//               </button>
//             </h2>
//             <div
//               id={`collapseTerminal-${airportName}`}
//               className="accordion-collapse collapse"
//               data-bs-parent={`#accordionAirport-${airportName}`}
//             >
//               <div className="accordion-body">
//                 <InfoRow label="No. of Check-in Counters"        value={d["No. of Check-in Counters"]} />
//                 <InfoRow label="No. of CUSS Kiosks Available"    value={d["No. of CUSS Kiosks available"]} />
//                 <InfoRow label="ILBS Facility"                   value={d["ILBS Facility"]} />
//                 <InfoRow label="No. of Aero Bridges"             value={d["No. of Aero Bridges"]} />
//                 <InfoRow label="Child Care Rooms"                value={d["Child Care Rooms"]} />
//                 <InfoRow label="May I Help You Counters"         value={d["May I Help You Counters"]} />
//                 <InfoRow label="Accessible Facilities for PRM"   value={d["Accessible Facilities for PRM"]} />
//                 <InfoRow label="Reserved Lounges"                value={d["Reserved Lounges"]} />
//                 <InfoRow label="Digi Yatra Facility"             value={d["Digi Yatra Facility"]} />
//                 <InfoRow label="Immigration Counters"            value={d["Immigration Counters"]} />
//                 <InfoRow label="Immigration Manpower"            value={d["Immigration Manpower"]} />
//                 <InfoRow label="Custom Counters"                 value={d["Custom Counters"]} />
//                 <InfoRow label="Custom Manpower"                 value={d["Custom Manpower"]} />
//                 <InfoRow label="APHO Facility"                   value={d["APHO Facility"]} />
//                 <InfoRow label="Animal Quarantine Facility"      value={d["Animal Quarantine Facility"]} />
//                 <InfoRow label="Plant Quarantine Facility"       value={d["Plant Quarantine Facility"]} />
//                 <InfoRow label="Sanitary Napkin Vending Machines" value={d["Sanitary Napkin Vending Machines"]} />
//                 <InfoRow label="Solid Waste Management Facility" value={d["Solid Waste Management Facility"]} />
//                 <InfoRow label="MI Room"                         value={d["MI Room"]} />
//                 <InfoRow label="BA Test Facility"                value={d["BA Test Facility"]} />
//                 <InfoRow label="Number of Shifts in Terminal"    value={d["Number of Shifts in Terminal"]} last />
//               </div>
//             </div>
//           </div>

//           {/* ── Airside Information ──────────────────────────────────────── */}
//           <div className="accordion-item border-0 rounded-4 overflow-hidden shadow-sm">
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button collapsed fw-semibold fs-5"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target={`#collapseAirside-${airportName}`}
//                 aria-expanded="false"
//                 aria-controls={`collapseAirside-${airportName}`}
//               >
//                 Airside Information
//               </button>
//             </h2>
//             <div
//               id={`collapseAirside-${airportName}`}
//               className="accordion-collapse collapse"
//               data-bs-parent={`#accordionAirport-${airportName}`}
//             >
//               <div className="accordion-body">
//                 <InfoRow label="Runway Orientation"        value={d["Runway Orientation"]} />
//                 <InfoRow label="RWY Dimension"             value={d["RWY Dimension"]} />
//                 <InfoRow label="RWY Strip Dimension"       value={d["RWY Strip Dimension"]} />
//                 <InfoRow label="RESA"                      value={d["RESA"]} />
//                 <InfoRow label="Number of TWY"             value={d["Number of TWY"]} />
//                 <InfoRow label="Aircraft Stands with PBB"  value={d["Aircraft Stands with PBB"]} />
//                 <InfoRow label="Total Aircraft Stands"     value={d["Total Aircraft Stands"]} />
//                 <InfoRow label="Approach Light Category"   value={d["Approach Light Category"]} />
//                 <InfoRow label="Instrument Landing System" value={d["Instrument Landing System"]} />
//                 <InfoRow label="LVP/LVTO"                  value={d["LVP/LVTO"]} />
//                 <InfoRow label="Homing Aid"                value={d["Homing Aid"]} />
//                 <InfoRow label="IFR/VFR"                   value={d["IFR/VFR"]} />
//                 <InfoRow label="Night Landing"             value={d["Night Landing"]} />
//                 <InfoRow label="Critical Aircraft"         value={d["Critical Aircraft"]} />
//                 <InfoRow label="Declared Distances"        value={d["Declared Distances"]} />

//                 {/* Instrument Approach can be multi-line */}
//                 <div className="d-flex justify-content-between border-bottom py-2">
//                   <span>Instrument Approach</span>
//                   <div className="text-end">
//                     {d["Instrument Approach"]
//                       ? d["Instrument Approach"].split("\n").map((line, i) => (
//                           <div key={i}><strong>{line}</strong></div>
//                         ))
//                       : <strong>—</strong>
//                     }
//                   </div>
//                 </div>

//                 <InfoRow label="Fire Category" value={d["Fire Category"]} last />
//               </div>
//             </div>
//           </div>

//         </div>
//       </section>
//     </>
//   );
// };

// export default AirportPage;