import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Typography, Select, MenuItem, Paper, Box } from "@mui/material";

const dataReader = async () => {
  const fileName = './LS_2024.csv';

  try {
    const data = await d3.csv(fileName);
    const cleanData = [];
    data.forEach((d) => {
      let state = d.STATE;
      let party = d.PARTY;
      let votes = +d.TOTALVOTES;
      let winner = +d.WINNER;
      cleanData.push({ state, party, votes, winner });
    });

    let aggregatedData = cleanData.reduce((acc, datapt) => {
      const key = `${datapt.state}-${datapt.party}`;
      if (!acc[key]) {
        acc[key] = {
          state: datapt.state,
          party: datapt.party,
          votes: 0,
          winner: datapt.winner
        };
      }
      acc[key].votes += datapt.votes;

      return acc;
    }, {});

    aggregatedData = Object.values(aggregatedData)
      .sort((a, b) => a.state.localeCompare(b.state))
      .reduce((sortedObj, datapt) => {
        const key = `${datapt.state}-${datapt.party}`;
        sortedObj[key] = datapt;
        return sortedObj;
      }, {});

    console.log("AGG", aggregatedData)

    let partyWiseData = cleanData.reduce((acc, datapt) => {
      const { party, votes} = datapt;

      if (!acc[party]) {
        acc[party] = {
          party,
          votes: 0,
        };
      }
      acc[party].votes += votes;

      return acc;
    }, {});

    partyWiseData = Object.values(partyWiseData);
    console.log("Party-wise Aggregation:", partyWiseData);

    const stateWiseData = Object.values(aggregatedData).reduce((acc, datapt) => {
      if (!acc[datapt.state]) {
        acc[datapt.state] = [];
      }
      acc[datapt.state].push({
        party: datapt.party,
        votes: datapt.votes,
        winner: datapt.winner
      });
      return acc;
    }, {});

    stateWiseData.India = partyWiseData;
    console.log(stateWiseData);
    return stateWiseData;
  } catch (error) {
    console.error("Error processing CSV data:", error);
  }
};

const PieChart = () => {
  const ref = useRef();
  const [stateData, setStateData] = useState("India");
  const [stateWiseData, setStateWiseData] = useState({});
  const [stateInfo, setStateInfo] = useState("");

  useEffect(() => {
    dataReader().then((data) => {
      setStateWiseData(data);
    });
  }, []);

  useEffect(() => {
    if (!stateWiseData[stateData]) return;

    const svg = d3.select(ref.current).attr("width", 1000).attr("height", 510);

    const renderPie = (data) => {
      svg.selectAll("*").remove();

      const radius = 200;
      const color = d3.scaleOrdinal(
        [...d3.schemeCategory10, ...d3.schemeTableau10, ...d3.schemeSet2, ...d3.schemeSet3, ...d3.schemePastel1, ...d3.schemePastel2]
          .flat()
          .slice(0, 100)
      );

      const pie = d3.pie().value((d) => d.votes);
      const pieData = pie(data);
      const arc = d3.arc().innerRadius(0).outerRadius(radius);
      const arcHover = d3.arc().innerRadius(0).outerRadius(radius + 10);

      const tooltip = d3
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("background", "white")
        .style("border", "1px solid #ccc")
        .style("padding", "5px")
        .style("border-radius", "5px")
        .style("display", "none");

      const chartGroup = svg
        .append("g")
        .attr("transform", "translate(250,250)");

      chartGroup
        .selectAll("path")
        .data(pieData)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .style("cursor", "pointer")
        .on("mouseover", function (event, d) {
          d3.select(this).transition().duration(200).attr("d", arcHover);
          tooltip
            .style("display", "block")
            .html(`<strong>${d.data.party}</strong><br>Votes: ${d.data.votes}`);
        })
        .on("mousemove", (event) => {
          tooltip
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`);
        })
        .on("mouseout", function () {
          d3.select(this).transition().duration(200).attr("d", arc);
          tooltip.style("display", "none");
        });

      const legend = svg.append("g").attr("transform", "translate(500, 50)");

      legend
        .selectAll("rect")
        .data(pieData)
        .enter()
        .append("rect")
        .attr("x", (d, i) => Math.floor(i / 20) * 100)
        .attr("y", (d, i) => (i % 20) * 20)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", (d, i) => color(i));

      legend
        .selectAll("text")
        .data(pieData)
        .enter()
        .append("text")
        .attr("x", (d, i) => Math.floor(i / 20) * 100 + 20)
        .attr("y", (d, i) => (i % 20) * 20 + 12)
        .text((d) => d.data.party)
        .style("font-size", "12px")
        .style("fill", "#333");

      setStateInfo(`Showing results for: ${stateData}. Total Votes: ${data.reduce((sum, d) => sum + d.votes, 0)}`);
    };

    renderPie(stateWiseData[stateData]);
  }, [stateData, stateWiseData]);

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
          {Object.keys(stateWiseData).map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </Box>
      
      <Box sx={{ marginTop: 2, textAlign: "right" }}>
        <Typography variant="h6">{stateInfo}</Typography>
      </Box>
      
      <svg ref={ref}></svg>
    </Paper>
  );
};

export default PieChart;
