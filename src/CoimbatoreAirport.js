import React from "react";
import { Helmet } from "react-helmet-async";
import { BsTelephone } from "react-icons/bs";
import { FiMail } from "react-icons/fi";

const CoimbatoreAirport = () => {
  return (
    <>
      <Helmet>
        <title>Coimbatore Airport</title>
        <meta
          name="description"
          content="Find out information regarding Lost and Found (L&F) at Coimbatore International Airport."
        />
        <link rel="canonical" href="/lostandfound" />
      </Helmet>

      <section id="header" className="container py-4">

        {/* Airport Director Card */}
        <div className="card shadow-lg border-0 rounded-4 mb-4">
          <div className="card-body p-4">

            <h2 className="text-primary fw-bold mb-1">
              Coimbatore International Airport
            </h2>

            <h4 className="card-title fw-bold mb-2">
              Shri. Mohammad Arif
            </h4>

            <p className="text-muted mb-3">Airport Director</p>

            <div className="d-flex flex-wrap gap-2 mb-3">
              <a
                href="tel:+4222592155"
                className="btn btn-outline-primary"
              >
                <BsTelephone className="me-2" />
                Airport Director: 0422-2592155
              </a>

              <a
                href="tel:+919442191902"
                className="btn btn-outline-success"
              >
                <BsTelephone className="me-2" />
                Terminal Manager: 9442191902
              </a>
            </div>

            <p className="mb-3">
              <FiMail className="me-2 text-danger" />
              <a
                href="mailto:apdcoimbatore@aai.aero"
                className="text-decoration-none"
              >
                apdcoimbatore@aai.aero
              </a>
            </p>

            <div className="d-flex gap-2 flex-wrap">
              <span className="badge bg-primary p-2">
                International Airport
              </span>

              <span className="badge bg-success p-2">
                Watch Hour: H24
              </span>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="accordion shadow-sm" id="accordionExample">

          {/* Terminal */}
          <div className="accordion-item border-0 rounded-4 overflow-hidden mb-3 shadow-sm">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-semibold fs-5"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Terminal Facilities
              </button>
            </h2>

            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Total No. of Check-in Counters</span>
                  <strong>29</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>No. of CUSS Kiosks available</span>
                  <strong>10</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>ILBS Facility</span>
                  <strong>No</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>No. of Boarding Gates</span>
                  <strong>9</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>No. of Aero Bridges</span>
                  <strong>4</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Child Care Rooms</span>
                  <strong>4</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>May I Help You Counters</span>
                  <strong>3</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Accessible Facilities for PRM</span>
                  <strong>Available</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Reserved Lounges</span>
                  <strong>4</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Digi Yatra Facility</span>
                  <strong>Available</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Immigration Counters</span>
                  <strong>20</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Immigration Manpower</span>
                  <strong>30</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Custom Counters</span>
                  <strong>3</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Custom Manpower</span>
                  <strong>14</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>APHO Facility</span>
                  <strong>Available</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Animal Quarantine Facility</span>
                  <strong>Not Available</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Plant Quarantine Facility</span>
                  <strong>Available</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Sanitary Napkin Vending Machines</span>
                  <strong>2</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Solid Waste Management Facility</span>
                  <strong>Yes</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>MI Room</span>
                  <strong>Available</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>BA Test Facility</span>
                  <strong>Available</strong>
                </div>

                <div className="d-flex justify-content-between py-2">
                  <span>Number of Shifts in Terminal</span>
                  <strong>3</strong>
                </div>

              </div>
            </div>
          </div>

          {/* Airside */}
          <div className="accordion-item border-0 rounded-4 overflow-hidden shadow-sm">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-semibold fs-5"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Airside Information
              </button>
            </h2>

            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Runway Orientation</span>
                  <strong>05/23</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>RWY Dimension</span>
                  <strong>2990 × 45 m</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>RWY Strip Dimension</span>
                  <strong>3110 × 150 m</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>RESA</span>
                  <strong>240 × 90 m</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Number of TWY</span>
                  <strong>5</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Aircraft Stands with PBB</span>
                  <strong>4</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Total Aircraft Stands</span>
                  <strong>14</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Approach Light Category</span>
                  <strong>05-SALS / 23-CAT I</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Instrument Landing System</span>
                  <strong>CAT I</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>LVP/LVTO</span>
                  <strong>Available</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Homing Aid</span>
                  <strong>DVOR & NDB</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>IFR/VFR</span>
                  <strong>IFR</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Night Landing</span>
                  <strong>Available</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Critical Aircraft</span>
                  <strong>A321</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                  <span>Declared Distances</span>
                  <strong>TORA/TODA/ASDA/LDA 2990m</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom py-2">
                <span>Instrument Approach</span>
                  <div className="text-end">
                    <div><strong>VOR Procedure RWY 05</strong></div>
                    <div><strong>RNP Y Procedure RWY 23</strong></div>
                    <div><strong>ILS or LOC (Y) Procedure RWY 23</strong></div>
                    <div><strong>ILS or LOC (Z) Procedure RWY 23</strong></div>
                    <div><strong>VOR Procedure RWY 23</strong></div>
                  </div>
                </div>

                <div className="d-flex justify-content-between py-2">
                  <span>Fire Category</span>
                  <strong>CAT-7</strong>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default CoimbatoreAirport;