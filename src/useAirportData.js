/**
 * useAirportData.js
 *
 * Fetches data from a Google Sheet using the gviz/tq JSON API.
 * No API key required — sheet must be shared as "Anyone with the link can view".
 *
 * Column → Excel cell reference mapping (Agartala = row 2):
 *   col 0  = A  → S.No.
 *   col 1  = B  → Airport
 *   col 2  = C  → Type of Airport
 *   col 3  = D  → Watch Hour
 *   col 4  = E  → APD Name
 *   col 5  = F  → APD Phone Number
 *   col 6  = G  → APD Mail
 *   col 7  = H  → Terminal Manager Phone
 *   col 8  = I  → No. of Check-in Counters
 *   col 9  = J  → No. of CUSS Kiosks available
 *   col 10 = K  → ILBS Facility
 *   col 11 = L  → No. of Aero Bridges
 *   col 12 = M  → Child Care Rooms
 *   col 13 = N  → May I Help You Counters
 *   col 14 = O  → Accessible Facilities for PRM
 *   col 15 = P  → Reserved Lounges
 *   col 16 = Q  → Digi Yatra Facility
 *   col 17 = R  → Immigration Counters
 *   col 18 = S  → Immigration Manpower
 *   col 19 = T  → Custom Counters
 *   col 20 = U  → Custom Manpower
 *   col 21 = V  → APHO Facility
 *   col 22 = W  → Animal Quarantine Facility
 *   col 23 = X  → Plant Quarantine Facility
 *   col 24 = Y  → Sanitary Napkin Vending Machines
 *   col 25 = Z  → Solid Waste Management Facility
 *   col 26 = AA → MI Room
 *   col 27 = AB → BA Test Facility
 *   col 28 = AC → Number of Shifts in Terminal
 *   col 29 = AD → Runway Orientation
 *   col 30 = AE → RWY Dimension
 *   col 31 = AF → RWY Strip Dimension
 *   col 32 = AG → RESA
 *   col 33 = AH → Number of TWY
 *   col 34 = AI → Aircraft Stands with PBB
 *   col 35 = AJ → Total Aircraft Stands
 *   col 36 = AK → Approach Light Category
 *   col 37 = AL → Instrument Landing System
 *   col 38 = AM → LVP/LVTO
 *   col 39 = AN → Homing Aid
 *   col 40 = AO → IFR/VFR
 *   col 41 = AP → Night Landing
 *   col 42 = AQ → Critical Aircraft
 *   col 43 = AR → Declared Distances
 *   col 44 = AS → Instrument Approach
 *   col 45 = AT → Fire Category
 *   col 46 = AU → Date of Updation
 */

import { useState, useEffect } from 'react';

// ─── CONFIGURE THIS ────────────────────────────────────────────────────────────
// Paste your Google Sheet ID here (the long string from the sheet URL).
// The sheet must be shared: Share → Anyone with the link → Viewer
const SHEET_ID = '1aCYHMYry3cHj2pSLOhM6Oz0AXTu0LhG0RZq33kz4Wxg';
const SHEET_NAME = 'Sheet1'; // exact tab name
// ──────────────────────────────────────────────────────────────────────────────

// ─── HARDCODED HEADERS (in exact column order, A → AU) ────────────────────────
// The gviz/tq API's table.cols[i].label is NOT reliable — Google infers each
// column's type from its data, and for columns it can't confidently type as
// "string" (very common for things like "Runway Orientation" with values like
// "09/27", or any column with a blank cell near the top of the data), it
// silently returns an EMPTY label for that column. That produced keys like
// obj[""] instead of obj["Runway Orientation"], which is why some columns
// showed as blank in the UI even though the sheet clearly had data in them.
// Using a fixed array here guarantees every row is keyed correctly regardless
// of how gviz decides to type each column.
const HEADERS = [
  'S.No.',                                // A
  'Airport',                               // B
  'Type of Airport',                       // C
  'Watch Hour',                            // D
  'APD Name',                              // E
  'APD Phone Number',                      // F
  'APD Mail',                              // G
  'Terminal Manager Phone',                // H
  'No. of Check-in Counters',              // I
  'No. of CUSS Kiosks available',          // J
  'ILBS Facility',                         // K
  'No. of Aero Bridges',                   // L
  'Child Care Rooms',                      // M
  'May I Help You Counters',               // N
  'Accessible Facilities for PRM',         // O
  'Reserved Lounges',                      // P
  'Digi Yatra Facility',                   // Q
  'Immigration Counters',                  // R
  'Immigration Manpower',                  // S
  'Custom Counters',                       // T
  'Custom Manpower',                       // U
  'APHO Facility',                         // V
  'Animal Quarantine Facility',            // W
  'Plant Quarantine Facility',             // X
  'Sanitary Napkin Vending Machines',      // Y
  'Solid Waste Management Facility',       // Z
  'MI Room',                               // AA
  'BA Test Facility',                      // AB
  'Number of Shifts in Terminal',          // AC
  'Runway Orientation',                    // AD
  'RWY Dimension',                         // AE
  'RWY Strip Dimension',                   // AF
  'RESA',                                  // AG
  'Number of TWY',                         // AH
  'Aircraft Stands with PBB',              // AI
  'Total Aircraft Stands',                 // AJ
  'Approach Light Category',               // AK
  'Instrument Landing System',             // AL
  'LVP/LVTO',                              // AM
  'Homing Aid',                            // AN
  'IFR/VFR',                               // AO
  'Night Landing',                         // AP
  'Critical Aircraft',                     // AQ
  'Declared Distances',                    // AR
  'Instrument Approach',                   // AS
  'Fire Category',                         // AT
  'Date of Updation',                      // AU
];
// ──────────────────────────────────────────────────────────────────────────────

// Retry configuration
const MAX_RETRIES = 3;       // number of attempts after the first failure
const RETRY_DELAY_MS = 1500; // wait between retries (ms)

/** Build the gviz URL with a cache-busting timestamp so the browser/CDN
 *  never serves a stale 404 from a previous page load. */
function buildGvizUrl() {
  return (
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq` +
    `?tqx=out:json` +
    `&sheet=${encodeURIComponent(SHEET_NAME)}` +
    `&_cb=${Date.now()}`   // ← cache-buster
  );
}

/** Parse the gviz/tq response. Google wraps JSON in a callback; strip that. */
function parseGvizResponse(text) {
  // Response is: /*O_o*/\ngoogle.visualization.Query.setResponse({...});
  const json = text.replace(/^[^{]*/, '').replace(/\);?\s*$/, '');
  return JSON.parse(json);
}

/**
 * Convert a gviz row (array of cell objects) to a plain object
 * keyed by the (hardcoded) header names, in column order.
 */
function rowToObject(headers, row) {
  return headers.reduce((obj, header, i) => {
    const cell = row.c[i];
    // cell can be null, or { v: value, f: formatted }
    obj[header] = cell?.f ?? cell?.v ?? '';
    return obj;
  }, {});
}

/**
 * fetchWithRetry(signal)
 * Fetches the Google Sheet, retrying up to MAX_RETRIES times on any error
 * (including 404s that Google sometimes returns after a sheet update).
 * Respects an AbortSignal so the hook can cancel in-flight requests on unmount.
 */
async function fetchWithRetry(signal) {
  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    // Wait before each retry (not before the first attempt)
    if (attempt > 0) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }

    // Bail out immediately if the hook was unmounted while we were waiting
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');

    try {
      const res = await fetch(buildGvizUrl(), { signal });

      if (!res.ok) {
        // Treat 404/5xx as retryable; surface the status on the last attempt
        throw new Error(`HTTP ${res.status} — check SHEET_ID and sharing settings`);
      }

      return await res.text(); // success — return the raw text
    } catch (err) {
      // Don't retry if the component unmounted (AbortError)
      if (err.name === 'AbortError') throw err;
      lastError = err;
      // Loop continues → next attempt
    }
  }

  // All attempts exhausted
  throw lastError;
}

/**
 * useAirportData(airportName)
 * Returns { data, loading, error }
 * data is a plain object keyed by column header (e.g. data['APD Name'])
 */
export function useAirportData(airportName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchWithRetry(controller.signal)
      .then((text) => {
        const parsed = parseGvizResponse(text);
        const table = parsed.table;

        // Find the row where column B (index 1) matches airportName
        const match = table.rows.find((row) => {
          const airportCell = row.c[1];
          return (
            (airportCell?.v ?? '')
              .toString()
              .trim()
              .toLowerCase() === airportName.trim().toLowerCase()
          );
        });

        setData(match ? rowToObject(HEADERS, match) : null);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return; // component unmounted — ignore
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [airportName]);

  return { data, loading, error };
}

/**
 * useAllAirportsData()
 * Returns { data: Array<Object>, loading, error }
 */
export function useAllAirportsData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetchWithRetry(controller.signal)
      .then((text) => {
        const parsed = parseGvizResponse(text);
        const table = parsed.table;
        setData(table.rows.map((row) => rowToObject(HEADERS, row)));
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return; // component unmounted — ignore
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { data, loading, error };
}



// /**
//  * useAirportData.js
//  *
//  * Fetches data from a Google Sheet using the gviz/tq JSON API.
//  * No API key required — sheet must be shared as "Anyone with the link can view".
//  *
//  * Column → Excel cell reference mapping (Agartala = row 2):
//  *   col 0  = A  → S.No.
//  *   col 1  = B  → Airport
//  *   col 2  = C  → Type of Airport
//  *   col 3  = D  → Watch Hour
//  *   col 4  = E  → APD Name
//  *   col 5  = F  → APD Phone Number
//  *   col 6  = G  → APD Mail
//  *   col 7  = H  → Terminal Manager Phone
//  *   col 8  = I  → No. of Check-in Counters
//  *   col 9  = J  → No. of CUSS Kiosks available
//  *   col 10 = K  → ILBS Facility
//  *   col 11 = L  → No. of Aero Bridges
//  *   col 12 = M  → Child Care Rooms
//  *   col 13 = N  → May I Help You Counters
//  *   col 14 = O  → Accessible Facilities for PRM
//  *   col 15 = P  → Reserved Lounges
//  *   col 16 = Q  → Digi Yatra Facility
//  *   col 17 = R  → Immigration Counters
//  *   col 18 = S  → Immigration Manpower
//  *   col 19 = T  → Custom Counters
//  *   col 20 = U  → Custom Manpower
//  *   col 21 = V  → APHO Facility
//  *   col 22 = W  → Animal Quarantine Facility
//  *   col 23 = X  → Plant Quarantine Facility
//  *   col 24 = Y  → Sanitary Napkin Vending Machines
//  *   col 25 = Z  → Solid Waste Management Facility
//  *   col 26 = AA → MI Room
//  *   col 27 = AB → BA Test Facility
//  *   col 28 = AC → Number of Shifts in Terminal
//  *   col 29 = AD → Runway Orientation
//  *   col 30 = AE → RWY Dimension
//  *   col 31 = AF → RWY Strip Dimension
//  *   col 32 = AG → RESA
//  *   col 33 = AH → Number of TWY
//  *   col 34 = AI → Aircraft Stands with PBB
//  *   col 35 = AJ → Total Aircraft Stands
//  *   col 36 = AK → Approach Light Category
//  *   col 37 = AL → Instrument Landing System
//  *   col 38 = AM → LVP/LVTO
//  *   col 39 = AN → Homing Aid
//  *   col 40 = AO → IFR/VFR
//  *   col 41 = AP → Night Landing
//  *   col 42 = AQ → Critical Aircraft
//  *   col 43 = AR → Declared Distances
//  *   col 44 = AS → Instrument Approach
//  *   col 45 = AT → Fire Category
//  *   col 46 = AU → Date of Updation
//  */

// import { useState, useEffect } from 'react';

// // ─── CONFIGURE THIS ────────────────────────────────────────────────────────────
// // Paste your Google Sheet ID here (the long string from the sheet URL).
// // The sheet must be shared: Share → Anyone with the link → Viewer
// const SHEET_ID = '1aCYHMYry3cHj2pSLOhM6Oz0AXTu0LhG0RZq33kz4Wxg';
// const SHEET_NAME = 'Sheet1'; // exact tab name
// // ──────────────────────────────────────────────────────────────────────────────

// // Retry configuration
// const MAX_RETRIES = 3;       // number of attempts after the first failure
// const RETRY_DELAY_MS = 1500; // wait between retries (ms)

// /** Build the gviz URL with a cache-busting timestamp so the browser/CDN
//  *  never serves a stale 404 from a previous page load. */
// function buildGvizUrl() {
//   return (
//     `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq` +
//     `?tqx=out:json` +
//     `&sheet=${encodeURIComponent(SHEET_NAME)}` +
//     `&_cb=${Date.now()}`   // ← cache-buster
//   );
// }

// /** Parse the gviz/tq response. Google wraps JSON in a callback; strip that. */
// function parseGvizResponse(text) {
//   // Response is: /*O_o*/\ngoogle.visualization.Query.setResponse({...});
//   const json = text.replace(/^[^{]*/, '').replace(/\);?\s*$/, '');
//   return JSON.parse(json);
// }

// /**
//  * Convert a gviz row (array of cell objects) to a plain object
//  * keyed by the header row values.
//  */
// function rowToObject(headers, row) {
//   return headers.reduce((obj, header, i) => {
//     const cell = row.c[i];
//     // cell can be null, or { v: value, f: formatted }
//     obj[header] = cell?.f ?? cell?.v ?? '';
//     return obj;
//   }, {});
// }

// /**
//  * fetchWithRetry(signal)
//  * Fetches the Google Sheet, retrying up to MAX_RETRIES times on any error
//  * (including 404s that Google sometimes returns after a sheet update).
//  * Respects an AbortSignal so the hook can cancel in-flight requests on unmount.
//  */
// async function fetchWithRetry(signal) {
//   let lastError;

//   for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
//     // Wait before each retry (not before the first attempt)
//     if (attempt > 0) {
//       await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
//     }

//     // Bail out immediately if the hook was unmounted while we were waiting
//     if (signal.aborted) throw new DOMException('Aborted', 'AbortError');

//     try {
//       const res = await fetch(buildGvizUrl(), { signal });

//       if (!res.ok) {
//         // Treat 404/5xx as retryable; surface the status on the last attempt
//         throw new Error(`HTTP ${res.status} — check SHEET_ID and sharing settings`);
//       }

//       return await res.text(); // success — return the raw text
//     } catch (err) {
//       // Don't retry if the component unmounted (AbortError)
//       if (err.name === 'AbortError') throw err;
//       lastError = err;
//       // Loop continues → next attempt
//     }
//   }

//   // All attempts exhausted
//   throw lastError;
// }

// /**
//  * useAirportData(airportName)
//  * Returns { data, loading, error }
//  * data is a plain object keyed by column header (e.g. data['APD Name'])
//  */
// export function useAirportData(airportName) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const controller = new AbortController();
//     setLoading(true);
//     setError(null);

//     fetchWithRetry(controller.signal)
//       .then((text) => {
//         const parsed = parseGvizResponse(text);
//         const table = parsed.table;

//         // Header labels from row 0
//         const headers = table.cols.map((col) => col.label);

//         // Find the row where column B (index 1) matches airportName
//         const match = table.rows.find((row) => {
//           const airportCell = row.c[1];
//           return (
//             (airportCell?.v ?? '')
//               .toString()
//               .trim()
//               .toLowerCase() === airportName.trim().toLowerCase()
//           );
//         });

//         setData(match ? rowToObject(headers, match) : null);
//         setLoading(false);
//       })
//       .catch((err) => {
//         if (err.name === 'AbortError') return; // component unmounted — ignore
//         setError(err.message);
//         setLoading(false);
//       });

//     return () => controller.abort();
//   }, [airportName]);

//   return { data, loading, error };
// }

// /**
//  * useAllAirportsData()
//  * Returns { data: Array<Object>, loading, error }
//  */
// export function useAllAirportsData() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const controller = new AbortController();
//     setLoading(true);

//     fetchWithRetry(controller.signal)
//       .then((text) => {
//         const parsed = parseGvizResponse(text);
//         const table = parsed.table;
//         const headers = table.cols.map((col) => col.label);
//         setData(table.rows.map((row) => rowToObject(headers, row)));
//         setLoading(false);
//       })
//       .catch((err) => {
//         if (err.name === 'AbortError') return; // component unmounted — ignore
//         setError(err.message);
//         setLoading(false);
//       });

//     return () => controller.abort();
//   }, []);

//   return { data, loading, error };
// }
