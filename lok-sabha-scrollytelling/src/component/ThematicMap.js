import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Typography, Paper, Box } from "@mui/material";
import indiaGeoJSON from "../assets/states.geojson";

const ThematicMap = () => {
  const ref = useRef();

  // Winning party data for each state
  const partyData = {
    "Andhra Pradesh": { party: "YSRCP", color: "#00BCD4" },
    "Arunachal Pradesh": { party: "BJP", color: "#FF5722" },
    Assam: { party: "BJP", color: "#FF5722" },
    Bihar: { party: "RJD", color: "#8E24AA" },
    Chhattisgarh: { party: "Congress", color: "#2196F3" },
    Goa: { party: "BJP", color: "#FF5722" },
    Gujarat: { party: "BJP", color: "#FF5722" },
    Haryana: { party: "BJP", color: "#FF5722" },
    "Himachal Pradesh": { party: "Congress", color: "#2196F3" },
    Jharkhand: { party: "JMM", color: "#4CAF50" },
    Karnataka: { party: "Congress", color: "#03A9F4" },
    Kerala: { party: "Congress", color: "#03A9F4" },
    "Madhya Pradesh": { party: "BJP", color: "#FF5722" },
    Maharashtra: { party: "Shiv Sena (Shinde)", color: "#FFC107" },
    Manipur: { party: "BJP", color: "#FF5722" },
    Meghalaya: { party: "NPP", color: "#795548" },
    Mizoram: { party: "MNF", color: "#8BC34A" },
    Nagaland: { party: "NDPP", color: "#673AB7" },
    Odisha: { party: "BJD", color: "#00BCD4" },
    Punjab: { party: "AAP", color: "#4CAF50" },
    Rajasthan: { party: "Congress", color: "#2196F3" },
    Sikkim: { party: "SKM", color: "#8E24AA" },
    "Tamil Nadu": { party: "DMK", color: "#FF9800" },
    Telangana: { party: "BRS", color: "#E91E63" },
    Tripura: { party: "BJP", color: "#FF5722" },
    "Uttar Pradesh": { party: "BJP", color: "#FF5722" },
    Uttarakhand: { party: "BJP", color: "#FF5722" },
    "West Bengal": { party: "TMC", color: "#8BC34A" },
  
    // Union Territories
    "Andaman and Nicobar Islands": { party: "BJP", color: "#FF5722" },
    Chandigarh: { party: "BJP", color: "#FF5722" },
    "Dadra and Nagar Haveli and Daman and Diu": { party: "BJP", color: "#FF5722" },
    Delhi: { party: "AAP", color: "#4CAF50" },
    Jammu: { party: "BJP", color: "#FF5722" },
    Kashmir: { party: "NC", color: "#795548" },
    Lakshadweep: { party: "NCP", color: "#9C27B0" },
    Puducherry: { party: "Congress", color: "#03A9F4" },
  };

  useEffect(() => {
    const width = 800;
    const height = 600;

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    const projection = d3
      .geoMercator()
      .scale(1000)
      .center([78.9629, 22.5937])
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    d3.json(indiaGeoJSON).then((geoData) => {
      svg
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", (d) => {
          const stateName = d.properties.NAME_1;
          return partyData[stateName] ? partyData[stateName].color : "#E0E0E0";
        })
        .attr("stroke", "#000")
        .attr("stroke-width", 0.5)
        .style("transition", "fill 0.3s ease")
        .append("title")
        .text((d) => {
          const stateName = d.properties.NAME_1;
          const partyInfo = partyData[stateName];
          return partyInfo
            ? `${stateName}: ${partyInfo.party} (${partyInfo.seats} seats)`
            : `${stateName}: No Data`;
        });
    });
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#f0f8ff" }}>
      <Typography variant="h5" gutterBottom>
        Choropleth Map of India - Lok Sabha 2024
      </Typography>
      <Typography>
        Explore which political party won in each state and how many seats they secured.
      </Typography>
      <svg ref={ref}></svg>
    </Paper>
  );
};

export default ThematicMap;


