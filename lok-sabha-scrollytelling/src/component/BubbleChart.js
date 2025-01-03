import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import phaseWiseVotingData from "../data/phaseWiseVotingData.csv";

const BubbleChart = () => {
  const svgRef = useRef();
  const descriptionRef = useRef();
  const [data, setData] = useState([]);

  const phaseDescriptions = {
  "Phase 1": "<strong> Phase 1 (April 19, 2024): </strong> 102 constituencies across 20 states, including Andhra Pradesh, Telangana, and Odisha, voted. This phase also included assembly elections in some states, marking a crucial start to the world's largest democratic exercise. The phase was marked by robust campaigning, focusing on issues like rural development, employment generation, and education. Voters from tribal regions and remote areas showcased significant enthusiasm, overcoming logistical challenges to participate. This phase also highlighted regional aspirations, with local parties playing a decisive role in influencing voter sentiments.",
  "Phase 2": "<strong> Phase 2 (April 26, 2024): </strong> 88 constituencies in 13 states, including Assam, Karnataka, and Tamil Nadu, went to polls. The phase was characterized by a high voter turnout in southern and northeastern states, showcasing the diversity of India's electorate. Key issues included agricultural reforms, flood management, and industrial growth. Tamil Nadu, with its dynamic political landscape, emerged as a significant battleground, reflecting its history of high political engagement and voter awareness.",
  "Phase 3": "<strong> Phase 3 (May 7, 2024): </strong> 94 constituencies in 14 states, including Gujarat, Kerala, and Maharashtra, participated. This phase witnessed intense campaigning by national and regional leaders, with Gujarat spotlighting economic development and Kerala focusing on healthcare and education reforms. Maharashtra, as an economic powerhouse, debated issues such as infrastructure development, farmer distress, and urban housing. This phase underscored the interplay between national policies and regional aspirations, with voters demanding accountability and visionary governance.",
  "Phase 4": "<strong> Phase 4 (May 13, 2024): </strong> 96 constituencies in 9 states, such as Madhya Pradesh, Rajasthan, and Uttar Pradesh, voted. The stakes were particularly high in this phase, with several high-profile candidates in the fray. Contentious issues such as water scarcity, caste dynamics, and women's empowerment took center stage. High-profile candidates and polarizing campaigns drew significant media and public attention. This phase highlighted the role of grassroots mobilization and local governance in shaping voter behavior.",
  "Phase 5": "<strong> Phase 5 (May 20, 2024): </strong> 49 constituencies in 7 states, including Bihar, Jharkhand, and West Bengal, were covered. The phase played a pivotal role in determining the balance of power, especially in eastern India. Key issues included unemployment, education access, and migration. Bihar and Jharkhand's political landscape reflected a blend of traditional alliances and emerging youth voices. West Bengal saw a fierce battle between established political forces and new challengers, emphasizing the significance of women voters and first-time participants.",
  "Phase 6": "<strong> Phase 6 (May 25, 2024): </strong> 58 constituencies in 8 states, including Haryana, Delhi, and Jammu & Kashmir, voted. Haryana's agrarian distress and Delhi's urban issues, such as pollution and affordable housing, took center stage. Jammu & Kashmir, participating under challenging circumstances, demonstrated the resilience of its voters amidst security concerns. The inclusion of the national capital amplified the strategic importance of this phase, with debates on governance, civic issues, and infrastructure dominating public discourse.",
  "Phase 7": "<strong> Phase 7 (June 1, 2024): </strong> 57 constituencies in 8 states, including Punjab, Himachal Pradesh, Uttar Pradesh, and Bihar, concluded the election process. Punjab's focus was on farmer welfare and industrial revival, while Himachal Pradesh deliberated on tourism and environmental conservation. Uttar Pradesh, with its massive electorate, saw a culmination of caste and community-driven narratives. This phase symbolized the end of an extensive electoral journey, with voters showcasing their trust in democracy through spirited participation. Campaigns reached their peak, leaving a lasting impact on the political landscape.",
  summarized: "<strong>Phases Overview:</strong> The 2024 Indian general election, held in seven phases from April 19 to June 1, was the largest in history, with over 900 million voters across 543 constituencies. Showcasing India's diverse electorate, it spanned urban centers, rural areas, tribal regions, and conflict zones. Starting with 102 constituencies in Phase 1, it traversed key battlegrounds like Gujarat, Uttar Pradesh, and West Bengal. Later phases highlighted urban and strategic constituencies in Haryana, Delhi, and Punjab. With record voter turnout, the results, declared on June 4, reflected the people's aspirations for the next five years of governance."
};

useEffect(() => {
  d3.csv(phaseWiseVotingData).then((csvData) => {
    const formattedData = csvData.map((d) => ({
      phase: d.phase,
      totalVotes: +d.totalVotes,
      voterTurnout: +d.voterTurnout,
      totalVotesPolled: +d.totalVotesPolled,
      constituencies: +d.constituencies
    }));
    setData(formattedData);
  });
}, []);


  useEffect(() => {
    const width = 900,
    height = 680,
    margin = { top: 100, right: 50, bottom: 50, left: 80 };
  
  const svg = d3
    .select(svgRef.current)
    .attr("width", width)
    .attr("height", height);
  

    svg.selectAll("*").remove();

    const bubbleRadiusBuffer = 50;

    const xScale = d3
      .scalePoint()
      .domain(data.map((d) => d.phase))
      .range([margin.left + bubbleRadiusBuffer, width - margin.right - bubbleRadiusBuffer]);

      const minimumTurnout = d3.min(data, (d) => d.voterTurnout);
      const maximumTurnout = d3.max(data, (d) => d.voterTurnout);
      
      const scaledMinimumTurnout = Math.max(0, Math.floor(minimumTurnout / 10) * 10);
      const scaledMaximumTurnout = Math.min(100, Math.ceil(maximumTurnout / 10) * 10);
      
      const yScale = d3
        .scaleLinear()
        .domain([scaledMinimumTurnout, scaledMaximumTurnout])
        .range([height - margin.bottom, margin.top]);
      
      const yAxis = d3.axisLeft(yScale).ticks((scaledMaximumTurnout - scaledMinimumTurnout));
      
      svg
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis)
        .selectAll("text")
        .style("font-size", "14px");
      

    const sizeScale = d3
      .scaleSqrt()
      .domain([d3.min(data, (d) => d.voterTurnout), d3.max(data, (d) => d.voterTurnout)])
      .range([15, 50]);


  const colorPalette = d3.scaleOrdinal()
  .domain(data.map(d => d.voterTurnout).sort((a, b) => a - b))
  .range(["#8EA6E1", "#FFCC80", "#FFD700", "#FF6347", "#9370DB", "#32CD32", "#1C1C1C"]);


    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("display", "none")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "6px")
      .style("border-radius", "4px")
      .style("max-width", "250px");


    const bubbles = svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => xScale(d.phase))
      .attr("cy", height - margin.bottom)
      .attr("r", 0)
      .attr("fill", (d) => colorPalette(d.voterTurnout))
      .attr("stroke", (d) => colorPalette(d.voterTurnout))
      .attr("stroke-width", 1.5);

    bubbles
      .transition()
      .delay((d, i) => i * 3000)
      .duration(1500)
      .attr("cy", (d) => yScale(d.voterTurnout))
      .attr("r", (d) => sizeScale(d.voterTurnout))
      .on("start", function(d) {
        const descriptionDiv = d3.select(descriptionRef.current);
        descriptionDiv.transition()
          .duration(500)
          .style("opacity", 0)
          .on("end", function() {
            descriptionDiv
              .html(phaseDescriptions[d.phase])
              .transition()
              .duration(500)
              .style("opacity", 1);
          });
      })
      .on("end", function(d, i) {
        if (i === data.length - 1) {
          setTimeout(() => {
            const descriptionDiv = d3.select(descriptionRef.current);
            descriptionDiv.transition()
              .duration(500)
              .style("opacity", 0)
              .on("end", function() {
                descriptionDiv
                  .html(phaseDescriptions.summarized)
                  .transition()
                  .duration(500)
                  .style("opacity", 1);
              });
          }, 4000);
        }
      });

      bubbles
      .on("mouseover", function (event, d) {
        d3.select(this)
          .attr("stroke-width", 3)
          .attr("opacity", 1)
          .style("cursor", "pointer");
        svg.selectAll("circle").filter((circle) => circle !== d).attr("opacity", 0.3);
    
        const descriptionDiv = d3.select(descriptionRef.current);
        descriptionDiv
          .transition()
          .duration(300)
          .style("opacity", 0)
          .on("end", function () {
            descriptionDiv
              .html(phaseDescriptions[d.phase])
              .transition()
              .duration(300)
              .style("opacity", 1);
          });
    
        tooltip
          .style("display", "block")
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY + "px")
          .html(`
            <strong>${d.phase}</strong><br>
            Total Votes: ${d.totalVotes.toLocaleString()}<br>
            Voter Turnout: ${d.voterTurnout}%<br>
            Total Votes Polled: ${d.totalVotesPolled.toLocaleString()}<br>
            Constituencies: ${d.constituencies}
          `);
      })
      .on("mouseout", function () {
        d3.selectAll("circle").attr("stroke-width", 1.5).attr("opacity", 0.8);
        const descriptionDiv = d3.select(descriptionRef.current);
        descriptionDiv
          .transition()
          .duration(300)
          .style("opacity", 0)
          .on("end", function () {
            descriptionDiv
              .html(phaseDescriptions.summarized)
              .transition()
              .duration(300)
              .style("opacity", 1);
          });
    
        tooltip.style("display", "none");
      });
    

    const xAxis = d3.axisBottom(xScale).tickSize(5);

    svg
  .append("g")
  .attr("transform", `translate(0, ${height - margin.bottom})`)
  .call(xAxis)
  .selectAll("text")
  .style("font-size", "14px");

svg
  .append("g")
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(yAxis)
  .selectAll("text")
  .style("font-size", "14px");

    svg
      .append("line")
      .attr("x1", margin.left)
      .attr("y1", height - margin.bottom)
      .attr("x2", width - margin.right)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "black");

    svg
      .append("line")
      .attr("x1", margin.left)
      .attr("y1", height - margin.bottom)
      .attr("x2", margin.left)
      .attr("y2", margin.top)
      .attr("stroke", "black"); 

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom + 50)
      .attr("text-anchor", "middle")
      .style("font-weight", "bold")
      .text("Election Phases");

    svg
      .append("text")
      .attr("x", -height / 2)
      .attr("y", margin.left - 50)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .style("font-weight", "bold")
      .text("Voter Turnout (%)");
  }, [data]);

  return (
    <><h9 style={{marginLeft: "50px"}}>Election Insights: Voter Turnout by Phase</h9>
    <div style={{ display: 'flex', width: '100%' }}>
      <svg ref={svgRef}></svg>
      <h10
        ref={descriptionRef}
        style={{
          width: '400px',
          paddingLeft: '5%',
          marginTop:'7%',
          fontSize: '14px',
          lineHeight: '1.5',
          opacity: 1,
          transition: 'opacity 0.5s'
        }}
      >

      </h10>
    </div></>
  );
};

export default BubbleChart;