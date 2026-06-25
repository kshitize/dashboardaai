import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { BsTelephone } from "react-icons/bs";
import { FiMail } from "react-icons/fi";

const ChennaiAirport = () => {
    
  return (
    <>
      <Helmet>
        <title>Chennai Airport</title>
        <meta
          name="description"
          content="Find out information regarding Lost and Found (L&F) at Coimbatore International Airport."
        />
        <link rel="canonical" href="/lostandfound" />
      </Helmet>
      <section id="header">
         <div className="card">
        <div className="card-body">
          <h5 className="card-title">Shri. C.V. Deepak, Airport Director</h5>
          <p className="card-text">
          <BsTelephone/><a href="tel:+4422560551">44-22560551</a>
          </p>
          <p className="card-text">
          <FiMail/>apdchennai@aai.aero
          </p>
        </div>
      </div>

             

        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <strong>Immigration</strong>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>Manpower Posted</strong> 42<br/>
                <strong>Manpower Required</strong> 50<br/>
                <strong>Immigration Counters Departure</strong> 10<br/>
                <strong>Immigration Counters Arrival</strong> 10<br/>
                <strong>Area occupied by Counters in Arrival</strong> 100sqm<br/>
                <strong>Area occupied by Counters in Departure</strong> 800sqm<br/>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <strong>Customs</strong>
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
              <strong>Manpower Posted</strong> 42<br/>
                <strong>Manpower Required</strong> 50<br/>
                <strong>Customs Counters Departure</strong> 10<br/>
                <strong>Customs Counters Arrival</strong> 10<br/>
                <strong>Area occupied by Counters in Arrival</strong> 100sqm<br/>
                <strong>Area occupied by Counters in Departure</strong> 800sqm<br/>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                <strong>CISF</strong>
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
              <strong>Manpower Posted</strong> 42<br/>
                <strong>Manpower Required</strong> 50<br/>
        
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChennaiAirport;
