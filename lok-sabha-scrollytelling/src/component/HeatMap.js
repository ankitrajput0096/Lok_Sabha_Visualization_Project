import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Typography, Paper } from "@mui/material";

const HeatMap = () => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current).attr("width", 800).attr("height", 400);

    const data = [
      { state: "Uttar Pradesh", party: "BJP", seats: 80, color: "#FF5722" },
      { state: "Kerala", party: "Congress", seats: 20, color: "#03A9F4" },
      { state: "Tamil Nadu", party: "DMK", seats: 39, color: "#FF9800" },
      // Add more states...
    ];

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (_, i) => i * 80)
      .attr("y", (d) => 400 - d.seats * 4)
      .attr("width", 70)
      .attr("height", (d) => d.seats * 4)
      .attr("fill", (d) => d.color)
      .style("transition", "height 0.3s ease")
      .append("title")
      .text((d) => `${d.state}: ${d.party} (${d.seats} seats)`);
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#ffe0b2" }}>
      <Typography variant="h5" gutterBottom>
        Heatmap - State-Wise Seat Distribution
      </Typography>
      <Typography>
        A visual representation of seat distribution among major parties in key states.
      </Typography>
      <svg ref={ref}></svg>
    </Paper>
  );
};

export default HeatMap;
