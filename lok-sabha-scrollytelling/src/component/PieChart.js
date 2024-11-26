import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Typography, Select, MenuItem, Paper, Box } from "@mui/material";

const PieChart = () => {
  const ref = useRef();
  const [stateData, setStateData] = useState("India");

  const data = {
    India: [
      { party: "BJP", votes: 300 },
      { party: "Congress", votes: 150 },
      { party: "Others", votes: 90 },
    ],
    Kerala: [
      { party: "Congress", votes: 120 },
      { party: "BJP", votes: 20 },
      { party: "Others", votes: 60 },
    ],
    "Tamil Nadu": [
      { party: "DMK", votes: 200 },
      { party: "Congress", votes: 80 },
      { party: "Others", votes: 20 },
    ],
  };

  useEffect(() => {
    const svg = d3.select(ref.current).attr("width", 500).attr("height", 500);

    const renderPie = (data) => {
      svg.selectAll("*").remove();

      const radius = 200;
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const pie = d3.pie().value((d) => d.votes);
      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      svg
        .append("g")
        .attr("transform", "translate(250,250)")
        .selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .style("transition", "transform 0.2s ease")
        .append("title")
        .text((d) => `${d.data.party}: ${d.data.votes} votes`);
    };

    renderPie(data[stateData]);
  }, [stateData]);

  return (
    <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#f0f4f8" }}>
      <Typography variant="h5" gutterBottom>
        Voter Share Analysis - Lok Sabha 2024
      </Typography>
      <Typography>
        Select a region to view the distribution of votes among major political parties.
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Select value={stateData} onChange={(e) => setStateData(e.target.value)}>
          <MenuItem value="India">India</MenuItem>
          <MenuItem value="Kerala">Kerala</MenuItem>
          <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
        </Select>
      </Box>
      <svg ref={ref}></svg>
    </Paper>
  );
};

export default PieChart;
