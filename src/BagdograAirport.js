import React from "react";
import { Helmet } from "react-helmet-async";
import { BsTelephone } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { useAirportData } from "./useAirportData";

const BagdograAirport = () => {
  const { data: d, loading, error } = useAirportData("Bagdogra");

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
            Check the <code>SHEET_ID</code> in <code>useAirportData.js</code> and
            ensure the sheet is shared as "Anyone with the link can view".
          </small>
        </div>
      </section>
    );
  }

  if (!d) {
    return (
      <section id="header" className="container py-4">
        <div className="alert alert-warning">
          No row found for "Bagdogra" in the Google Sheet.
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>Bagdogra Airport</title>
        <meta
          name="description"
          content="Airport information for Agartala (Maharaja Bir Bikram Airport)."
        />
        <link rel="canonical" href="/bagdograAirport" />
      </Helmet>

      <section id="header" className="container py-4">

        {/* ── Airport Director Card ──────────────────────────────────────────
            E2  → APD Name
            F2  → APD Phone Number
            H2  → Terminal Manager Phone
            G2  → APD Mail
            C2  → Type of Airport
            D2  → Watch Hour
        ─────────────────────────────────────────────────────────────────── */}
        <div className="card shadow-lg border-0 rounded-4 mb-4">
          <div className="card-body p-4">

            <h2 className="text-primary fw-bold mb-1">
              Bagdogra Airport
            </h2>

            <h4 className="card-title fw-bold mb-2">
              {d["APD Name"] || "—"}  {/* E2 */}
            </h4>

            <p className="text-muted mb-3">Airport Director</p>

            <div className="d-flex flex-wrap gap-2 mb-3">
              {d["APD Phone Number"] && (                             /* F2 */
                <a
                  href={`tel:${d["APD Phone Number"]}`}
                  className="btn btn-outline-primary"
                >
                  <BsTelephone className="me-2" />
                  Airport Director: {d["APD Phone Number"]}
                </a>
              )}

              {d["Terminal Manager Phone"] && (                       /* H2 */
                <a
                  href={`tel:${d["Terminal Manager Phone"]}`}
                  className="btn btn-outline-success"
                >
                  <BsTelephone className="me-2" />
                  Terminal Manager: {d["Terminal Manager Phone"]}
                </a>
              )}
            </div>

            {d["APD Mail"] && (                                       /* G2 */
              <p className="mb-3">
                <FiMail className="me-2 text-danger" />
                <a
                  href={`mailto:${d["APD Mail"]}`}
                  className="text-decoration-none"
                >
                  {d["APD Mail"]}
                </a>
              </p>
            )}

            <div className="d-flex gap-2 flex-wrap">
              {d["Type of Airport"] && (                              /* C2 */
                <span className="badge bg-primary p-2">
                  {d["Type of Airport"]}
                </span>
              )}
              {d["Watch Hour"] && (                                   /* D2 */
                <span className="badge bg-success p-2">
                  Watch Hour: {d["Watch Hour"]}
                </span>
              )}
            </div>

          </div>
        </div>

        {/* ── Accordion ─────────────────────────────────────────────────── */}
        <div className="accordion shadow-sm" id="accordionAirport">

          {/* ── Terminal Facilities ───────────────────────────────────────
              I2  → No. of Check-in Counters
              J2  → No. of CUSS Kiosks available
              K2  → ILBS Facility
              L2  → No. of Aero Bridges
              M2  → Child Care Rooms
              N2  → May I Help You Counters
              O2  → Accessible Facilities for PRM
              P2  → Reserved Lounges
              Q2  → Digi Yatra Facility
              R2  → Immigration Counters
              S2  → Immigration Manpower
              T2  → Custom Counters
              U2  → Custom Manpower
              V2  → APHO Facility
              W2  → Animal Quarantine Facility
              X2  → Plant Quarantine Facility
              Y2  → Sanitary Napkin Vending Machines
              Z2  → Solid Waste Management Facility
              AA2 → MI Room
              AB2 → BA Test Facility
              AC2 → Number of Shifts in Terminal
          ──────────────────────────────────────────────────────────────── */}
          <div className="accordion-item border-0 rounded-4 overflow-hidden mb-3 shadow-sm">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-semibold fs-5"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTerminal"
                aria-expanded="false"
                aria-controls="collapseTerminal"
              >
                Terminal Facilities
              </button>
            </h2>
            <div
              id="collapseTerminal"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionAirport"
            >
              <div className="accordion-body">

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>No. of Check-in Counters</span>
                  <strong>{d["No. of Check-in Counters"] || "—"}</strong>         {/* I2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>No. of CUSS Kiosks Available</span>
                  <strong>{d["No. of CUSS Kiosks available"] || "—"}</strong>     {/* J2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>ILBS Facility</span>
                  <strong>{d["ILBS Facility"] || "—"}</strong>                    {/* K2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>No. of Aero Bridges</span>
                  <strong>{d["No. of Aero Bridges"] || "—"}</strong>              {/* L2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Child Care Rooms</span>
                  <strong>{d["Child Care Rooms"] || "—"}</strong>                 {/* M2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>May I Help You Counters</span>
                  <strong>{d["May I Help You Counters"] || "—"}</strong>          {/* N2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Accessible Facilities for PRM</span>
                  <strong>{d["Accessible Facilities for PRM"] || "—"}</strong>    {/* O2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Reserved Lounges</span>
                  <strong>{d["Reserved Lounges"] || "—"}</strong>                 {/* P2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Digi Yatra Facility</span>
                  <strong>{d["Digi Yatra Facility"] || "—"}</strong>              {/* Q2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Immigration Counters</span>
                  <strong>{d["Immigration Counters"] || "—"}</strong>             {/* R2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Immigration Manpower</span>
                  <strong>{d["Immigration Manpower"] || "—"}</strong>             {/* S2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Custom Counters</span>
                  <strong>{d["Custom Counters"] || "—"}</strong>                  {/* T2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Custom Manpower</span>
                  <strong>{d["Custom Manpower"] || "—"}</strong>                  {/* U2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>APHO Facility</span>
                  <strong>{d["APHO Facility"] || "—"}</strong>                    {/* V2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Animal Quarantine Facility</span>
                  <strong>{d["Animal Quarantine Facility"] || "—"}</strong>       {/* W2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Plant Quarantine Facility</span>
                  <strong>{d["Plant Quarantine Facility"] || "—"}</strong>        {/* X2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Sanitary Napkin Vending Machines</span>
                  <strong>{d["Sanitary Napkin Vending Machines"] || "—"}</strong> {/* Y2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Solid Waste Management Facility</span>
                  <strong>{d["Solid Waste Management Facility"] || "—"}</strong>  {/* Z2  */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>MI Room</span>
                  <strong>{d["MI Room"] || "—"}</strong>                          {/* AA2 */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>BA Test Facility</span>
                  <strong>{d["BA Test Facility"] || "—"}</strong>                 {/* AB2 */}
                </div>

                <div className="d-flex justify-content-between py-2">
                  <span>Number of Shifts in Terminal</span>
                  <strong>{d["Number of Shifts in Terminal"] || "—"}</strong>     {/* AC2 */}
                </div>

              </div>
            </div>
          </div>

          {/* ── Airside Information ───────────────────────────────────────
              AD2 → Runway Orientation
              AE2 → RWY Dimension
              AF2 → RWY Strip Dimension
              AG2 → RESA
              AH2 → Number of TWY
              AI2 → Aircraft Stands with PBB
              AJ2 → Total Aircraft Stands
              AK2 → Approach Light Category
              AL2 → Instrument Landing System
              AM2 → LVP/LVTO
              AN2 → Homing Aid
              AO2 → IFR/VFR
              AP2 → Night Landing
              AQ2 → Critical Aircraft
              AR2 → Declared Distances
              AS2 → Instrument Approach
              AT2 → Fire Category
          ──────────────────────────────────────────────────────────────── */}
          <div className="accordion-item border-0 rounded-4 overflow-hidden shadow-sm">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-semibold fs-5"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseAirside"
                aria-expanded="false"
                aria-controls="collapseAirside"
              >
                Airside Information
              </button>
            </h2>
            <div
              id="collapseAirside"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionAirport"
            >
              <div className="accordion-body">

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Runway Orientation</span>
                  <strong>{d["Runway Orientation"] || "—"}</strong>               {/* AD2 */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>RWY Dimension</span>
                  <strong>{d["RWY Dimension"] || "—"}</strong>                    {/* AE2 */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>RWY Strip Dimension</span>
                  <strong>{d["RWY Strip Dimension"] || "—"}</strong>              {/* AF2 */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>RESA</span>
                  <strong>{d["RESA"] || "—"}</strong>                             {/* AG2 */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Number of TWY</span>
                  <strong>{d["Number of TWY"] || "—"}</strong>                    {/* AH2 */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Aircraft Stands with PBB</span>
                  <strong>{d["Aircraft Stands with PBB"] || "—"}</strong>         {/* AI2 */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Total Aircraft Stands</span>
                  <strong>{d["Total Aircraft Stands"] || "—"}</strong>            {/* AJ2 */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Approach Light Category</span>
                  <strong>{d["Approach Light Category"] || "—"}</strong>          {/* AK2 */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Instrument Landing System</span>
                  <strong>{d["Instrument Landing System"] || "—"}</strong>        {/* AL2 */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>LVP/LVTO</span>
                  <strong>{d["LVP/LVTO"] || "—"}</strong>                         {/* AM2 */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Homing Aid</span>
                  <strong>{d["Homing Aid"] || "—"}</strong>                       {/* AN2 */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>IFR/VFR</span>
                  <strong>{d["IFR/VFR"] || "—"}</strong>                          {/* AO2 */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Night Landing</span>
                  <strong>{d["Night Landing"] || "—"}</strong>                    {/* AP2 */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Critical Aircraft</span>
                  <strong>{d["Critical Aircraft"] || "—"}</strong>                {/* AQ2 */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Declared Distances</span>
                  <strong>{d["Declared Distances"] || "—"}</strong>               {/* AR2 */}
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Instrument Approach</span>
                  <div className="text-end">
                    {d["Instrument Approach"]                                     /* AS2 */
                      ? d["Instrument Approach"].split("\n").map((line, i) => (
                          <div key={i}><strong>{line}</strong></div>
                        ))
                      : <strong>—</strong>
                    }
                  </div>
                </div>

                <div className="d-flex justify-content-between py-2">
                  <span>Fire Category</span>
                  <strong>{d["Fire Category"] || "—"}</strong>                    {/* AT2 */}
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default BagdograAirport;