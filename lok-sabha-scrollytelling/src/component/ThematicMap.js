// import React, { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";
// import { Paper, Typography, Box, Select, MenuItem, Grid } from "@mui/material";
// import indiaGeoJSON from "../assets/states.geojson";

// const ChoroplethMap = () => {
//   const svgRef = useRef();
//   const [selectedPhase, setSelectedPhase] = useState(""); // Selected election phase or "All Winners"

//   // Election phase data with winning parties for states
//   const phases = {
//     "Phase I (April 19)": {
//       states: [
//         "Arunachal Pradesh",
//         "Assam",
//         "Bihar",
//         "Chhattisgarh",
//         "Jammu & Kashmir",
//         "Manipur",
//         "Meghalaya",
//         "Mizoram",
//         "Nagaland",
//         "Sikkim",
//         "Tripura",
//         "Uttarakhand",
//         "West Bengal",
//         "Andaman & Nicobar Islands",
//         "Lakshadweep",
//         "Dadra and Nagar Haveli and Daman and Diu",
//       ],
//       winners: {
//         "Arunachal Pradesh": "BJP",
//         Assam: "BJP",
//         Bihar: "RJD",
//         Chhattisgarh: "INC",
//         "Jammu & Kashmir": "JKPDP",
//         Manipur: "BJP",
//         Meghalaya: "NPP",
//         Mizoram: "MNF",
//         Nagaland: "NDPP",
//         Sikkim: "SKM",
//         Tripura: "BJP",
//         Uttarakhand: "BJP",
//         "West Bengal": "AITC",
//         "Andaman & Nicobar Islands": "BJP",
//         Lakshadweep: "NCP",
//         "Dadra and Nagar Haveli and Daman and Diu": "BJP",
//       },
//     },
//     "Phase II (April 26)": {
//       states: [
//         "Assam",
//         "Bihar",
//         "Chhattisgarh",
//         "Karnataka",
//         "Maharashtra",
//         "Manipur",
//         "Odisha",
//         "Uttar Pradesh",
//         "West Bengal",
//         "Jharkhand",
//         "Jammu & Kashmir",
//       ],
//       winners: {
//         Assam: "BJP",
//         Bihar: "RJD",
//         Chhattisgarh: "INC",
//         Karnataka: "INC",
//         Maharashtra: "BJP",
//         Manipur: "BJP",
//         Odisha: "BJD",
//         "Uttar Pradesh": "BJP",
//         "West Bengal": "AITC",
//         Jharkhand: "JMM",
//         "Jammu & Kashmir": "JKPDP",
//       },
//     },
//     "Phase III (May 7)": {
//       states: [
//         "Assam",
//         "Bihar",
//         "Chhattisgarh",
//         "Goa",
//         "Gujarat",
//         "Karnataka",
//         "Madhya Pradesh",
//         "Maharashtra",
//         "Uttar Pradesh",
//         "West Bengal",
//         "Dadra and Nagar Haveli and Daman and Diu",
//         "Jammu & Kashmir",
//       ],
//       winners: {
//         Assam: "BJP",
//         Bihar: "RJD",
//         Chhattisgarh: "INC",
//         Goa: "BJP",
//         Gujarat: "BJP",
//         Karnataka: "INC",
//         "Madhya Pradesh": "BJP",
//         Maharashtra: "BJP",
//         "Uttar Pradesh": "BJP",
//         "West Bengal": "AITC",
//         "Dadra and Nagar Haveli and Daman and Diu": "BJP",
//         "Jammu & Kashmir": "JKPDP",
//       },
//     },
//     "Phase IV (May 13)": {
//       states: [
//         "Andhra Pradesh",
//         "Bihar",
//         "Jharkhand",
//         "Madhya Pradesh",
//         "Maharashtra",
//         "Odisha",
//         "Telangana",
//         "Uttar Pradesh",
//         "West Bengal",
//         "Jammu & Kashmir",
//       ],
//       winners: {
//         "Andhra Pradesh": "YSRCP",
//         Bihar: "RJD",
//         Jharkhand: "JMM",
//         "Madhya Pradesh": "BJP",
//         Maharashtra: "BJP",
//         Odisha: "BJD",
//         Telangana: "BRS",
//         "Uttar Pradesh": "BJP",
//         "West Bengal": "AITC",
//         "Jammu & Kashmir": "JKPDP",
//       },
//     },
//     "Phase V (May 20)": {
//       states: [
//         "Bihar",
//         "Jharkhand",
//         "Maharashtra",
//         "Odisha",
//         "Uttar Pradesh",
//         "West Bengal",
//         "Jammu & Kashmir",
//         "Ladakh",
//       ],
//       winners: {
//         Bihar: "RJD",
//         Jharkhand: "JMM",
//         Maharashtra: "BJP",
//         Odisha: "BJD",
//         "Uttar Pradesh": "BJP",
//         "West Bengal": "AITC",
//         "Jammu & Kashmir": "JKPDP",
//         Ladakh: "Independent",
//       },
//     },
//     "Phase VI (May 25)": {
//       states: [
//         "Bihar",
//         "Haryana",
//         "Jharkhand",
//         "Odisha",
//         "Uttar Pradesh",
//         "West Bengal",
//         "Delhi",
//       ],
//       winners: {
//         Bihar: "RJD",
//         Haryana: "BJP",
//         Jharkhand: "JMM",
//         Odisha: "BJD",
//         "Uttar Pradesh": "BJP",
//         "West Bengal": "AITC",
//         Delhi: "AAP",
//       },
//     },
//     "Phase VII (June 1)": {
//       states: [
//         "Bihar",
//         "Jharkhand",
//         "Madhya Pradesh",
//         "Punjab",
//         "Uttar Pradesh",
//         "West Bengal",
//         "Chandigarh",
//       ],
//       winners: {
//         Bihar: "RJD",
//         Jharkhand: "JMM",
//         "Madhya Pradesh": "BJP",
//         Punjab: "AAP",
//         "Uttar Pradesh": "BJP",
//         "West Bengal": "AITC",
//         Chandigarh: "BJP",
//       },
//     },
//   };

//   // Combined winners across all states
//   const allWinners = Object.keys(phases).reduce((acc, phase) => {
//     const phaseWinners = phases[phase].winners || {};
//     return { ...acc, ...phaseWinners };
//   }, {});

//   // Colors for parties
//   const partyColors = {
//     BJP: "#FF5722",
//     INC: "#2196F3",
//     RJD: "#4CAF50",
//     AITC: "#FFC107",
//     BJD: "#8E44AD",
//     JKPDP: "#E74C3C",
//     NPP: "#34495E",
//     MNF: "#1ABC9C",
//     NDPP: "#9B59B6",
//     SKM: "#2ECC71",
//     NCP: "#F39C12",
//     JMM: "#16A085",
//     YSRCP: "#2980B9",
//     BRS: "#9C27B0",
//     Independent: "#607D8B",
//     AAP: "#00BCD4",
//   };

//   const normalizeStateName = (name) => name?.trim().toLowerCase();

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);
//     const width = 800;
//     const height = 600;

//     svg.selectAll("*").remove();

//     const projection = d3
//       .geoMercator()
//       .scale(1000)
//       .center([78.9629, 22.5937])
//       .translate([width / 2, height / 2]);

//     const path = d3.geoPath().projection(projection);

//     let highlightedStates = [];
//     let winners = {};

//     if (selectedPhase === "All Winners") {
//       winners = allWinners; // Highlight all states with their winning parties
//       highlightedStates = Object.keys(allWinners).map(normalizeStateName);
//     } else if (selectedPhase) {
//       const phaseData = phases[selectedPhase] || {};
//       highlightedStates = (phaseData.states || []).map(normalizeStateName);
//       winners = phaseData.winners || {};
//     }

//     d3.json(indiaGeoJSON).then((geoData) => {
//       svg
//         .selectAll("path")
//         .data(geoData.features)
//         .join("path")
//         .attr("d", path)
//         .attr("fill", (d) => {
//           const stateName = normalizeStateName(d.properties.ST_NM);
//           if (highlightedStates.includes(stateName)) {
//             const party = winners[d.properties.ST_NM];
//             return partyColors[party] || "#FFEB3B"; // Party color or fallback
//           }
//           return "#E0E0E0"; // Default gray for unhighlighted states
//         })
//         .attr("stroke", "#000")
//         .attr("stroke-width", 0.5)
//         .append("title")
//         .text(
//           (d) =>
//             `${d.properties?.ST_NM || "Unknown"}: ${
//               winners[d.properties.ST_NM] || "No data"
//             }`
//         );
//     });
//   }, [selectedPhase]);

//   return (
//     <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#f9f9f9" }}>
//       <Typography variant="h5" gutterBottom>
//         Lok Sabha Elections 2024: Phase-wise Map
//       </Typography>
//       <Typography>Select a phase or view winners across India:</Typography>
//       <Box sx={{ margin: "16px 0" }}>
//         <Select
//           value={selectedPhase}
//           onChange={(e) => setSelectedPhase(e.target.value)}
//           displayEmpty
//           fullWidth
//         >
//           <MenuItem value="">None</MenuItem>
//           {Object.keys(phases).map((phase) => (
//             <MenuItem key={phase} value={phase}>
//               {phase}
//             </MenuItem>
//           ))}
//           <MenuItem value="All Winners">All Winners</MenuItem>
//         </Select>
//       </Box>
//       <svg ref={svgRef} width="800" height="600"></svg>
//       <Box sx={{ marginTop: 4 }}>
//         <Typography variant="h6">Party Color Legend:</Typography>
//         <Grid container spacing={2}>
//           {Object.entries(partyColors).map(([party, color]) => (
//             <Grid item xs={6} md={3} key={party}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: 20,
//                     height: 20,
//                     backgroundColor: color,
//                     border: "1px solid #000",
//                   }}
//                 ></Box>
//                 <Typography>{party}</Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Paper>
//   );
// };

// export default ChoroplethMap;



import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Paper, Typography, Box, Grid } from "@mui/material";
import indiaGeoJSON from "../assets/states.geojson";

const ChoroplethMap = ({ selectedPhase }) => {
  const svgRef = useRef();

 // Election phase data with winning parties for states
 const phases = {
  "Phase I (April 19)": {
    states: [
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Jammu & Kashmir",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Sikkim",
      "Tripura",
      "Uttarakhand",
      "West Bengal",
      "Andaman & Nicobar Islands",
      "Lakshadweep",
      "Dadra and Nagar Haveli and Daman and Diu",
    ],
    winners: {
      "Arunachal Pradesh": "BJP",
      Assam: "BJP",
      Bihar: "RJD",
      Chhattisgarh: "INC",
      "Jammu & Kashmir": "JKPDP",
      Manipur: "BJP",
      Meghalaya: "NPP",
      Mizoram: "MNF",
      Nagaland: "NDPP",
      Sikkim: "SKM",
      Tripura: "BJP",
      Uttarakhand: "BJP",
      "West Bengal": "AITC",
      "Andaman & Nicobar Islands": "BJP",
      Lakshadweep: "NCP",
      "Dadra and Nagar Haveli and Daman and Diu": "BJP",
    },
  },
  "Phase II (April 26)": {
    states: [
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Karnataka",
      "Maharashtra",
      "Manipur",
      "Odisha",
      "Uttar Pradesh",
      "West Bengal",
      "Jharkhand",
      "Jammu & Kashmir",
    ],
    winners: {
      Assam: "BJP",
      Bihar: "RJD",
      Chhattisgarh: "INC",
      Karnataka: "INC",
      Maharashtra: "BJP",
      Manipur: "BJP",
      Odisha: "BJD",
      "Uttar Pradesh": "BJP",
      "West Bengal": "AITC",
      Jharkhand: "JMM",
      "Jammu & Kashmir": "JKPDP",
    },
  },
  "Phase III (May 7)": {
    states: [
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Karnataka",
      "Madhya Pradesh",
      "Maharashtra",
      "Uttar Pradesh",
      "West Bengal",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Jammu & Kashmir",
    ],
    winners: {
      Assam: "BJP",
      Bihar: "RJD",
      Chhattisgarh: "INC",
      Goa: "BJP",
      Gujarat: "BJP",
      Karnataka: "INC",
      "Madhya Pradesh": "BJP",
      Maharashtra: "BJP",
      "Uttar Pradesh": "BJP",
      "West Bengal": "AITC",
      "Dadra and Nagar Haveli and Daman and Diu": "BJP",
      "Jammu & Kashmir": "JKPDP",
    },
  },
  "Phase IV (May 13)": {
    states: [
      "Andhra Pradesh",
      "Bihar",
      "Jharkhand",
      "Madhya Pradesh",
      "Maharashtra",
      "Odisha",
      "Telangana",
      "Uttar Pradesh",
      "West Bengal",
      "Jammu & Kashmir",
    ],
    winners: {
      "Andhra Pradesh": "YSRCP",
      Bihar: "RJD",
      Jharkhand: "JMM",
      "Madhya Pradesh": "BJP",
      Maharashtra: "BJP",
      Odisha: "BJD",
      Telangana: "BRS",
      "Uttar Pradesh": "BJP",
      "West Bengal": "AITC",
      "Jammu & Kashmir": "JKPDP",
    },
  },
  "Phase V (May 20)": {
    states: [
      "Bihar",
      "Jharkhand",
      "Maharashtra",
      "Odisha",
      "Uttar Pradesh",
      "West Bengal",
      "Jammu & Kashmir",
      "Ladakh",
    ],
    winners: {
      Bihar: "RJD",
      Jharkhand: "JMM",
      Maharashtra: "BJP",
      Odisha: "BJD",
      "Uttar Pradesh": "BJP",
      "West Bengal": "AITC",
      "Jammu & Kashmir": "JKPDP",
      Ladakh: "Independent",
    },
  },
  "Phase VI (May 25)": {
    states: [
      "Bihar",
      "Haryana",
      "Jharkhand",
      "Odisha",
      "Uttar Pradesh",
      "West Bengal",
      "Delhi",
    ],
    winners: {
      Bihar: "RJD",
      Haryana: "BJP",
      Jharkhand: "JMM",
      Odisha: "BJD",
      "Uttar Pradesh": "BJP",
      "West Bengal": "AITC",
      Delhi: "AAP",
    },
  },
  "Phase VII (June 1)": {
    states: [
      "Bihar",
      "Jharkhand",
      "Madhya Pradesh",
      "Punjab",
      "Uttar Pradesh",
      "West Bengal",
      "Chandigarh",
    ],
    winners: {
      Bihar: "RJD",
      Jharkhand: "JMM",
      "Madhya Pradesh": "BJP",
      Punjab: "AAP",
      "Uttar Pradesh": "BJP",
      "West Bengal": "AITC",
      Chandigarh: "BJP",
    },
  },
};
  // Combined winners across all states
  const allWinners = Object.keys(phases).reduce((acc, phase) => {
    const phaseWinners = phases[phase].winners || {};
    return { ...acc, ...phaseWinners };
  }, {});

  // Colors for parties
  const partyColors = {
    BJP: "#FF5722",
    INC: "#2196F3",
    RJD: "#4CAF50",
    AITC: "#FFC107",
    BJD: "#8E44AD",
    JKPDP: "#E74C3C",
    NPP: "#34495E",
    MNF: "#1ABC9C",
    NDPP: "#9B59B6",
    SKM: "#2ECC71",
    NCP: "#F39C12",
    JMM: "#16A085",
    YSRCP: "#2980B9",
    BRS: "#9C27B0",
    Independent: "#607D8B",
    AAP: "#00BCD4",
  };

  const normalizeStateName = (name) => name?.trim().toLowerCase();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    svg.selectAll("*").remove();

    const projection = d3
      .geoMercator()
      .scale(1000)
      .center([78.9629, 22.5937])
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    let highlightedStates = [];
    let winners = {};

    if (selectedPhase === "All Winners") {
      winners = allWinners; // Highlight all states with their winning parties
      highlightedStates = Object.keys(allWinners).map(normalizeStateName);
    } else if (phases[selectedPhase]) {
      const phaseData = phases[selectedPhase];
      highlightedStates = (phaseData.states || []).map(normalizeStateName);
      winners = phaseData.winners || {};
    }

    d3.json(indiaGeoJSON).then((geoData) => {
      svg
        .selectAll("path")
        .data(geoData.features)
        .join("path")
        .attr("d", path)
        .attr("fill", (d) => {
          const stateName = normalizeStateName(d.properties.ST_NM);
          if (highlightedStates.includes(stateName)) {
            const party = winners[d.properties.ST_NM];
            return partyColors[party] || "#FFEB3B"; // Party color or fallback
          }
          return "#E0E0E0"; // Default gray for unhighlighted states
        })
        .attr("stroke", "#000")
        .attr("stroke-width", 0.5)
        .append("title")
        .text(
          (d) =>
            `${d.properties?.ST_NM || "Unknown"}: ${
              winners[d.properties.ST_NM] || "No data"
            }`
        );
    });
  }, [selectedPhase]);

  return (
    <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h5" gutterBottom>
        Lok Sabha Elections 2024: Phase-wise Map
      </Typography>
      <svg ref={svgRef} width="800" height="600"></svg>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Party Color Legend:</Typography>
        <Grid container spacing={2}>
          {Object.entries(partyColors).map(([party, color]) => (
            <Grid item xs={6} md={3} key={party}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    backgroundColor: color,
                    border: "1px solid #000",
                  }}
                ></Box>
                <p style={{ color: 'black', fontSize: '10px' }}>{party}</p>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default ChoroplethMap;
