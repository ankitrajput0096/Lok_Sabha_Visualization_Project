import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Typography, Paper } from "@mui/material";

const Timeline = () => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current).attr("width", 800).attr("height", 200);

    const events = [
      { date: "2024-01-15", event: "Election Dates Announced" },
      { date: "2024-02-20", event: "Controversial Policy Rolled Back" },
      { date: "2024-03-10", event: "Opposition Alliance Formed" },
      { date: "2024-04-15", event: "High-Profile Rally in UP" },
      { date: "2024-05-23", event: "Results Declared" },
    ];

    const xScale = d3.scaleTime()
      .domain([new Date("2024-01-01"), new Date("2024-06-01")])
      .range([50, 750]);

    svg.append("g").attr("transform", "translate(0, 150)").call(d3.axisBottom(xScale).ticks(5));

    svg.selectAll("circle")
      .data(events)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(new Date(d.date)))
      .attr("cy", 100)
      .attr("r", 8)
      .attr("fill", "blue")
      .style("transition", "r 0.3s ease")
      .append("title")
      .text((d) => `${d.date}: ${d.event}`);

    svg.selectAll("text")
      .data(events)
      .enter()
      .append("text")
      .attr("x", (d) => xScale(new Date(d.date)))
      .attr("y", 90)
      .text((d) => d.event)
      .attr("font-size", "12px")
      .attr("text-anchor", "middle")
      .style("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", 1);
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#fff8e1" }}>
      <Typography variant="h5" gutterBottom>
        Timeline of Key Events - Lok Sabha 2024
      </Typography>
      <Typography>
        Explore the sequence of significant events that influenced the election outcome.
      </Typography>
      <svg ref={ref}></svg>
    </Paper>
  );
};

export default Timeline;
