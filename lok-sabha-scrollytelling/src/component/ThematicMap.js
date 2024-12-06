import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Papa from "papaparse";
import { Paper, Typography, Box, Grid } from "@mui/material";
import indiaGeoJSON from "../assets/states.geojson";
import phasesCSV from "../data/preprocessedStateWinnerDataForChoroplethMap.csv";

const ChoroplethMap = ({ selectedPhase }) => {
  const svgRef = useRef();
  const [phases, setPhases] = useState({});

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
    BRS: "#9C27B0",
    DMK: "#6C27B0",
    Independent: "#607D8B",
    AAP: "#00BCD4",
  };

  const normalizeStateName = (name) => name?.trim().toLowerCase();

  useEffect(() => {
    Papa.parse(phasesCSV, {
      download: true,
      header: true,
      complete: (result) => {
        const phasesData = result.data.reduce((acc, row) => {
          const { phase, state, winner } = row;
          if (!acc[phase]) acc[phase] = { states: [], winners: {} };
          acc[phase].states.push(state);
          acc[phase].winners[state] = winner;
          return acc;
        }, {});
        setPhases(phasesData);
      },
    });
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    const projection = d3
      .geoMercator()
      .scale(700)
      .center([78.9629, 15.5937])
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    d3.json(indiaGeoJSON).then((geoData) => {
      svg
        .selectAll("path")
        .data(geoData.features)
        .join("path")
        .attr("d", path)
        .attr("fill", "#E0E0E0")
        .attr("stroke", "#000")
        .attr("stroke-width", 0.5)
        .attr("data-state", (d) => normalizeStateName(d.properties.ST_NM))
        .append("title");
    });
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const phaseData = phases[selectedPhase];
    const highlightedStates = (phaseData?.states || []).map(normalizeStateName);
    const winners = phaseData?.winners || {};

    // Update colors dynamically
    svg.selectAll("path").each(function () {
      const stateElement = d3.select(this);
      const stateName = stateElement.attr("data-state");
      const matchingState = Object.keys(winners).find(
        (key) => normalizeStateName(key) === stateName
      );
      const party = matchingState ? winners[matchingState] : null;

      stateElement
        .attr("fill", party ? partyColors[party] : "#E0E0E0")
        .select("title")
        .text(
          `${matchingState || "Unknown"}: ${party || "No data"}`
        );
    });
  }, [selectedPhase, phases]);

  let thePhase = undefined;
  if (selectedPhase !== undefined) {
    thePhase = ": " + selectedPhase;
  }

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography
        variant="h6"
        gutterBottom
        style={{ marginLeft: "100px", marginTop: "60px" }}
      >
        <h9>Lok Sabha Elections 2024{thePhase}</h9>
      </Typography>
      <svg ref={svgRef} width="800" height="500"></svg>
      <Box sx={{ marginTop: 0, marginLeft: "50px" }}>
        <h10>Party Color Legend:</h10>
        <Grid container spacing={1}>
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
                    width: 15,
                    height: 15,
                    backgroundColor: color,
                    border: "1px solid #000",
                  }}
                ></Box>
                <p style={{ color: "black", fontSize: "10px" }}>{party}</p>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default ChoroplethMap;
