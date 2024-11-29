import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
// import ComparativeChart from "./ComparativeChart";

export const ComparativeChart = () => {
  const svgRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => {
      if (svgRef.current) {
        observer.unobserve(svgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const comparativeData = [
        { month: "Oct 2023", bjp: 37, indAlliance: 41, others: 22 },
        { month: "May 2024", bjp: 40, indAlliance: 38, others: 22 },
      ];

      const margin = { top: 20, right: 150, bottom: 50, left: 40 };

      const width = window.innerWidth * 0.45 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      d3.select(svgRef.current).selectAll("*").remove();

      const svg = d3
        .select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x0 = d3
        .scaleBand()
        .domain(comparativeData.map((d) => d.month))
        .rangeRound([0, width])
        .padding(0.2);

      const x1 = d3
        .scaleBand()
        .domain(["BJP", "IND Alliance", "Others"])
        .rangeRound([0, x0.bandwidth()])
        .padding(0.05);

      const y = d3.scaleLinear().domain([0, 50]).nice().rangeRound([height, 0]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x0));

      svg.append("g").call(d3.axisLeft(y));

      const barsGroup = svg
        .append("g")
        .selectAll(".month-group")
        .data(comparativeData)
        .enter()
        .append("g")
        .attr("transform", (d) => `translate(${x0(d.month)}, 0)`);

      barsGroup
        .selectAll("rect")
        .data((d) => [
          { party: "BJP", value: d.bjp },
          { party: "IND Alliance", value: d.indAlliance },
          { party: "Others", value: d.others },
        ])
        .enter()
        .append("rect")
        .attr("x", (d) => x1(d.party))
        .attr("y", (d) => y(d.value))
        .attr("width", x1.bandwidth())
        .attr("height", (d) => height - y(d.value))
        .attr("fill", (d) =>
          d.party === "BJP"
            ? "#ff7f00"
            : d.party === "IND Alliance"
            ? "#1f77b4"
            : "#6c757d"
        );
      const legend = svg
        .append("g")
        .attr("transform", `translate(${width + 30}, 20)`);

      const legendData = [
        { party: "BJP", color: "#ff7f00" },
        { party: "IND Alliance", color: "#1f77b4" },
        { party: "Others", color: "#6c757d" },
      ];

      legend
        .selectAll(".legend-item")
        .data(legendData)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 30})`)
        .each(function (d) {
          d3.select(this)
            .append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", d.color);

          d3.select(this)
            .append("text")
            .attr("x", 25)
            .attr("y", 15)
            .style("font-size", "14px")
            .text(d.party);
        });
    }
  }, [isVisible]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "20px",
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <div style={{ flex: "0 0 50%" }}>
        <svg ref={svgRef}></svg>
      </div>
      {isVisible && (
        <div
          style={{
            flex: "0 0 45%",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginLeft: "20px",
          }}
        >
          <h3 style={{ color: "#333", marginBottom: "15px", fontSize: "18px" }}>
            Comparison of Oct 2023 and May 2024
          </h3>
          <p style={{ color: "#666", lineHeight: "1.4", fontSize: "14px" }}>
            <div>
              <p>
                Comparing the polling percentages between October 2023 and May
                2024, we can observe:
              </p>
              <ul>
                <li>BJP increased from 37% to 40%, showing a 3% gain.</li>
                <li>IND Alliance decreased from 41% to 38%, losing 3%.</li>
                <li>Others remained stable at 22%.</li>
              </ul>
              <p>
                This shift suggests a potential change in voter preferences over
                the 7-month period.
              </p>
            </div>
          </p>
        </div>
      )}
    </div>
  );
};

const BarChart = () => {
  const svgRef = useRef();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [partyVisibility, setPartyVisibility] = useState({
    BJP: true,
    "IND Alliance": true,
    Others: true,
  });
  const [selectedMonths, setSelectedMonths] = useState([]);

  const data = [
    { month: "Oct 2023", bjp: 37, indAlliance: 41, others: 22 },
    { month: "Nov 2023", bjp: 38, indAlliance: 40, others: 22 },
    { month: "Dec 2023", bjp: 38, indAlliance: 40, others: 22 },
    { month: "Jan 2024", bjp: 38, indAlliance: 42, others: 20 },
    { month: "Feb 2024", bjp: 35, indAlliance: 45, others: 20 },
    { month: "Mar 2024", bjp: 37, indAlliance: 43, others: 20 },
    { month: "Apr 2024", bjp: 40, indAlliance: 38, others: 22 },
    { month: "May 2024", bjp: 40, indAlliance: 38, others: 22 },
    { month: "June 2024", bjp: 39, indAlliance: 39, others: 22 },
  ];

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    const debouncedHandleResize = debounce(handleResize, 100);
    window.addEventListener("resize", debouncedHandleResize);
    // window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
    // return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const margin = { top: 40, right: 150, bottom: 80, left: 60 };
    const width = windowSize.width * 0.9 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const filteredData =
      selectedMonths.length > 0
        ? data.filter((d) => selectedMonths.includes(d.month))
        : data;

    const x0 = d3
      .scaleBand()
      .domain(filteredData.map((d) => d.month))
      .rangeRound([0, width])
      .padding(0.2);

    const x1 = d3
      .scaleBand()
      .domain(["BJP", "IND Alliance", "Others"])
      .rangeRound([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3.scaleLinear().domain([0, 50]).nice().rangeRound([height, 0]);

    // Add gradient background
    svg
      .append("rect")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("transform", `translate(${-margin.left},${-margin.top})`)
      .attr("fill", "url(#gradient)");

    // Define gradient
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#f3f3f3");

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#e6e6e6");

    // Add styled X-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x0))
      .selectAll(".tick text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)")
      .style("font-size", "12px")
      .style("font-weight", "bold");

    // Add X-axis label
    svg
      .append("text")
      .attr(
        "transform",
        `translate(${width / 2}, ${height + margin.bottom - 10})`
      )
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text("Months");

    // Add styled Y-axis
    svg
      .append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "12px");

    // Add Y-axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text("Polling Percentage (%)");

    // Add bars
    const barsGroup = svg
      .append("g")
      .selectAll(".month-group")
      .data(filteredData)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${x0(d.month)}, 0)`);

    barsGroup
      .selectAll("rect")
      .data((d) => [
        { party: "BJP", value: d.bjp },
        { party: "IND Alliance", value: d.indAlliance },
        { party: "Others", value: d.others },
      ])
      .enter()
      .append("rect")
      .attr("x", (d) => x1(d.party))
      .attr("y", height)
      .attr("width", x1.bandwidth())
      .attr("height", 0)
      .attr("fill", (d) =>
        d.party === "BJP"
          ? "#ff7f00"
          : d.party === "IND Alliance"
          ? "#1f77b4"
          : "#6c757d"
      )
      .style("opacity", (d) => (partyVisibility[d.party] ? 1 : 0))
      .transition()
      .duration(1000)
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => height - y(d.value));

    // Add tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "rgba(0, 0, 0, 0.7)")
      .style("color", "white")
      .style("padding", "10px")
      .style("border-radius", "5px");

    barsGroup
      .selectAll("rect")
      .on("mouseover", function (event, d) {
        d3.select(this).style("opacity", 0.7);
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`${d.party}: ${d.value}%`)
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", (d) =>
          partyVisibility[d.party] ? 1 : 0
        );
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Add legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width + 20}, 0)`);

    const legendData = [
      { party: "BJP", color: "#ff7f00" },
      { party: "IND Alliance", color: "#1f77b4" },
      { party: "Others", color: "#6c757d" },
    ];

    const legendItems = legend
      .selectAll(".legend-item")
      .data(legendData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 30})`);

    legendItems
      .append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", (d) => d.color)
      .style("cursor", "pointer")
      .style("stroke", (d) => (partyVisibility[d.party] ? "black" : "none"))
      .style("stroke-width", (d) => (partyVisibility[d.party] ? "2px" : "0"))
      .on("click", (event, d) => {
        const newVisibility = {
          ...partyVisibility,
          [d.party]: !partyVisibility[d.party],
        };
        setPartyVisibility(newVisibility);

        d3.select(event.target)
          .style("stroke", newVisibility[d.party] ? "black" : "none")
          .style("stroke-width", newVisibility[d.party] ? "2px" : "0");
      });

    legendItems
      .append("text")
      .attr("x", 25)
      .attr("y", 15)
      .style("font-size", "14px")
      .text((d) => d.party);
  }, [data, windowSize, partyVisibility, selectedMonths]);

  const MonthSelector = () => (
    <select
      multiple
      onChange={(e) =>
        setSelectedMonths(
          Array.from(e.target.selectedOptions, (option) => option.value)
        )
      }
      value={selectedMonths}
      style={{
        margin: "10px 0",
        minWidth: "200px",
        padding: "5px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        backgroundColor: "#f8f8f8",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {data.map((d) => (
        <option key={d.month} value={d.month}>
          {d.month}
        </option>
      ))}
    </select>
  );

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>
        Political Party Polling Percentages by month wise
      </h2>
      <MonthSelector />
      <svg ref={svgRef} style={{ maxWidth: "100%", height: "auto" }}></svg>
      {/* <div style={{ height: "100vh" }}></div> */}
      {/* <ComparativeChart /> */}
      <section className="section ComparativeChart">
        <ComparativeChart />
      </section>
    </div>
  );
};

export default BarChart;
