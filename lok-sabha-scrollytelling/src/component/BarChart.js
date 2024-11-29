// import React, { useRef, useEffect, useState } from "react";
// import * as d3 from "d3";
// import React, { useRef, useEffect, useState } from "react";
// import * as d3 from "d3";
// import { Scrollama, Step } from "react-scrollama";
// // import ComparativeChart from "./ComparativeChart";

// export const ComparativeChart = () => {
//   const svgRef = useRef();
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsVisible(entry.isIntersecting);
//       },
//       { threshold: 0.1 }
//     );

//     if (svgRef.current) {
//       observer.observe(svgRef.current);
//     }

//     return () => {
//       if (svgRef.current) {
//         observer.unobserve(svgRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (isVisible) {
//       const comparativeData = [
//         { month: "Oct 2023", bjp: 37, indAlliance: 41, others: 22 },
//         { month: "May 2024", bjp: 40, indAlliance: 38, others: 22 },
//       ];

//       const margin = { top: 20, right: 150, bottom: 50, left: 40 };

//       const width = window.innerWidth * 0.45 - margin.left - margin.right;
//       const height = 300 - margin.top - margin.bottom;

//       d3.select(svgRef.current).selectAll("*").remove();

//       const svg = d3
//         .select(svgRef.current)
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", `translate(${margin.left},${margin.top})`);

//       const x0 = d3
//         .scaleBand()
//         .domain(comparativeData.map((d) => d.month))
//         .rangeRound([0, width])
//         .padding(0.2);

//       const x1 = d3
//         .scaleBand()
//         .domain(["BJP", "IND Alliance", "Others"])
//         .rangeRound([0, x0.bandwidth()])
//         .padding(0.05);

//       const y = d3.scaleLinear().domain([0, 50]).nice().rangeRound([height, 0]);

//       svg
//         .append("g")
//         .attr("transform", `translate(0,${height})`)
//         .call(d3.axisBottom(x0));

//       svg.append("g").call(d3.axisLeft(y));

//       const barsGroup = svg
//         .append("g")
//         .selectAll(".month-group")
//         .data(comparativeData)
//         .enter()
//         .append("g")
//         .attr("transform", (d) => `translate(${x0(d.month)}, 0)`);

//       barsGroup
//         .selectAll("rect")
//         .data((d) => [
//           { party: "BJP", value: d.bjp },
//           { party: "IND Alliance", value: d.indAlliance },
//           { party: "Others", value: d.others },
//         ])
//         .enter()
//         .append("rect")
//         .attr("x", (d) => x1(d.party))
//         .attr("y", (d) => y(d.value))
//         .attr("width", x1.bandwidth())
//         .attr("height", (d) => height - y(d.value))
//         .attr("fill", (d) =>
//           d.party === "BJP"
//             ? "#ff7f00"
//             : d.party === "IND Alliance"
//             ? "#1f77b4"
//             : "#6c757d"
//         );
//       const legend = svg
//         .append("g")
//         .attr("transform", `translate(${width + 30}, 20)`);

//       const legendData = [
//         { party: "BJP", color: "#ff7f00" },
//         { party: "IND Alliance", color: "#1f77b4" },
//         { party: "Others", color: "#6c757d" },
//       ];

//       legend
//         .selectAll(".legend-item")
//         .data(legendData)
//         .enter()
//         .append("g")
//         .attr("class", "legend-item")
//         .attr("transform", (d, i) => `translate(0, ${i * 30})`)
//         .each(function (d) {
//           d3.select(this)
//             .append("rect")
//             .attr("width", 20)
//             .attr("height", 20)
//             .attr("fill", d.color);

//           d3.select(this)
//             .append("text")
//             .attr("x", 25)
//             .attr("y", 15)
//             .style("font-size", "14px")
//             .text(d.party);
//         });
//     }
//   }, [isVisible]);

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//         padding: "20px",
//         maxWidth: "100%",
//         margin: "0 auto",
//       }}
//     >
//       <div style={{ flex: "0 0 50%" }}>
//         <svg ref={svgRef}></svg>
//       </div>
//       {isVisible && (
//         <div
//           style={{
//             flex: "0 0 45%",
//             padding: "20px",
//             backgroundColor: "white",
//             borderRadius: "8px",
//             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//             marginLeft: "20px",
//           }}
//         >
//           <h3 style={{ color: "#333", marginBottom: "15px", fontSize: "18px" }}>
//             Comparison of Oct 2023 and May 2024
//           </h3>
//           <p style={{ color: "#666", lineHeight: "1.4", fontSize: "14px" }}>
//             <div>
//               <p>
//                 Comparing the polling percentages between October 2023 and May
//                 2024, we can observe:
//               </p>
//               <ul>
//                 <li>BJP increased from 37% to 40%, showing a 3% gain.</li>
//                 <li>IND Alliance decreased from 41% to 38%, losing 3%.</li>
//                 <li>Others remained stable at 22%.</li>
//               </ul>
//               <p>
//                 This shift suggests a potential change in voter preferences over
//                 the 7-month period.
//               </p>
//             </div>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// const BarChart = () => {
//   const svgRef = useRef();
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });
//   const [partyVisibility, setPartyVisibility] = useState({
//     BJP: true,
//     "IND Alliance": true,
//     Others: true,
//   });
//   const [selectedMonths, setSelectedMonths] = useState([]);

//   const data = [
//     { month: "Oct 2023", bjp: 37, indAlliance: 41, others: 22 },
//     { month: "Nov 2023", bjp: 38, indAlliance: 40, others: 22 },
//     { month: "Dec 2023", bjp: 38, indAlliance: 40, others: 22 },
//     { month: "Jan 2024", bjp: 38, indAlliance: 42, others: 20 },
//     { month: "Feb 2024", bjp: 35, indAlliance: 45, others: 20 },
//     { month: "Mar 2024", bjp: 37, indAlliance: 43, others: 20 },
//     { month: "Apr 2024", bjp: 40, indAlliance: 38, others: 22 },
//     { month: "May 2024", bjp: 40, indAlliance: 38, others: 22 },
//     { month: "June 2024", bjp: 39, indAlliance: 39, others: 22 },
//   ];

//   function debounce(func, wait) {
//     let timeout;
//     return function executedFunction(...args) {
//       const later = () => {
//         clearTimeout(timeout);
//         func(...args);
//       };
//       clearTimeout(timeout);
//       timeout = setTimeout(later, wait);
//     };
//   }

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };
//     const debouncedHandleResize = debounce(handleResize, 100);
//     window.addEventListener("resize", debouncedHandleResize);
//     // window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", debouncedHandleResize);
//     // return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const margin = { top: 40, right: 150, bottom: 80, left: 60 };
//     const width = windowSize.width * 0.9 - margin.left - margin.right;
//     const height = 600 - margin.top - margin.bottom;

//     d3.select(svgRef.current).selectAll("*").remove();

//     const svg = d3
//       .select(svgRef.current)
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const filteredData =
//       selectedMonths.length > 0
//         ? data.filter((d) => selectedMonths.includes(d.month))
//         : data;

//     const x0 = d3
//       .scaleBand()
//       .domain(filteredData.map((d) => d.month))
//       .rangeRound([0, width])
//       .padding(0.2);

//     const x1 = d3
//       .scaleBand()
//       .domain(["BJP", "IND Alliance", "Others"])
//       .rangeRound([0, x0.bandwidth()])
//       .padding(0.05);

//     const y = d3.scaleLinear().domain([0, 50]).nice().rangeRound([height, 0]);

//     // Add gradient background
//     svg
//       .append("rect")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .attr("transform", `translate(${-margin.left},${-margin.top})`)
//       .attr("fill", "url(#gradient)");

//     // Define gradient
//     const gradient = svg
//       .append("defs")
//       .append("linearGradient")
//       .attr("id", "gradient")
//       .attr("x1", "0%")
//       .attr("y1", "0%")
//       .attr("x2", "100%")
//       .attr("y2", "100%");

//     gradient.append("stop").attr("offset", "0%").attr("stop-color", "#f3f3f3");

//     gradient
//       .append("stop")
//       .attr("offset", "100%")
//       .attr("stop-color", "#e6e6e6");

//     // Add styled X-axis
//     svg
//       .append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x0))
//       .selectAll(".tick text")
//       .style("text-anchor", "end")
//       .attr("dx", "-.8em")
//       .attr("dy", ".15em")
//       .attr("transform", "rotate(-45)")
//       .style("font-size", "12px")
//       .style("font-weight", "bold");

//     // Add X-axis label
//     svg
//       .append("text")
//       .attr(
//         "transform",
//         `translate(${width / 2}, ${height + margin.bottom - 10})`
//       )
//       .style("text-anchor", "middle")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .text("Months");

//     // Add styled Y-axis
//     svg
//       .append("g")
//       .call(d3.axisLeft(y))
//       .selectAll("text")
//       .style("font-size", "12px");

//     // Add Y-axis label
//     svg
//       .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left)
//       .attr("x", 0 - height / 2)
//       .attr("dy", "1em")
//       .style("text-anchor", "middle")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .text("Polling Percentage (%)");

//     // Add bars
//     const barsGroup = svg
//       .append("g")
//       .selectAll(".month-group")
//       .data(filteredData)
//       .enter()
//       .append("g")
//       .attr("transform", (d) => `translate(${x0(d.month)}, 0)`);

//     barsGroup
//       .selectAll("rect")
//       .data((d) => [
//         { party: "BJP", value: d.bjp },
//         { party: "IND Alliance", value: d.indAlliance },
//         { party: "Others", value: d.others },
//       ])
//       .enter()
//       .append("rect")
//       .attr("x", (d) => x1(d.party))
//       .attr("y", height)
//       .attr("width", x1.bandwidth())
//       .attr("height", 0)
//       .attr("fill", (d) =>
//         d.party === "BJP"
//           ? "#ff7f00"
//           : d.party === "IND Alliance"
//           ? "#1f77b4"
//           : "#6c757d"
//       )
//       .style("opacity", (d) => (partyVisibility[d.party] ? 1 : 0))
//       .transition()
//       .duration(1000)
//       .attr("y", (d) => y(d.value))
//       .attr("height", (d) => height - y(d.value));

//     // Add tooltip
//     const tooltip = d3
//       .select("body")
//       .append("div")
//       .attr("class", "tooltip")
//       .style("opacity", 0)
//       .style("position", "absolute")
//       .style("background-color", "rgba(0, 0, 0, 0.7)")
//       .style("color", "white")
//       .style("padding", "10px")
//       .style("border-radius", "5px");

//     barsGroup
//       .selectAll("rect")
//       .on("mouseover", function (event, d) {
//         d3.select(this).style("opacity", 0.7);
//         tooltip.transition().duration(200).style("opacity", 0.9);
//         tooltip
//           .html(`${d.party}: ${d.value}%`)
//           .style("left", event.pageX + 5 + "px")
//           .style("top", event.pageY - 28 + "px");
//       })
//       .on("mouseout", function () {
//         d3.select(this).style("opacity", (d) =>
//           partyVisibility[d.party] ? 1 : 0
//         );
//         tooltip.transition().duration(500).style("opacity", 0);
//       });

//     // Add legend
//     const legend = svg
//       .append("g")
//       .attr("transform", `translate(${width + 20}, 0)`);

//     const legendData = [
//       { party: "BJP", color: "#ff7f00" },
//       { party: "IND Alliance", color: "#1f77b4" },
//       { party: "Others", color: "#6c757d" },
//     ];

//     const legendItems = legend
//       .selectAll(".legend-item")
//       .data(legendData)
//       .enter()
//       .append("g")
//       .attr("class", "legend-item")
//       .attr("transform", (d, i) => `translate(0, ${i * 30})`);

//     legendItems
//       .append("rect")
//       .attr("width", 20)
//       .attr("height", 20)
//       .attr("fill", (d) => d.color)
//       .style("cursor", "pointer")
//       .style("stroke", (d) => (partyVisibility[d.party] ? "black" : "none"))
//       .style("stroke-width", (d) => (partyVisibility[d.party] ? "2px" : "0"))
//       .on("click", (event, d) => {
//         const newVisibility = {
//           ...partyVisibility,
//           [d.party]: !partyVisibility[d.party],
//         };
//         setPartyVisibility(newVisibility);

//         d3.select(event.target)
//           .style("stroke", newVisibility[d.party] ? "black" : "none")
//           .style("stroke-width", newVisibility[d.party] ? "2px" : "0");
//       });

//     legendItems
//       .append("text")
//       .attr("x", 25)
//       .attr("y", 15)
//       .style("font-size", "14px")
//       .text((d) => d.party);
//   }, [data, windowSize, partyVisibility, selectedMonths]);

//   const MonthSelector = () => (
//     <select
//       multiple
//       onChange={(e) =>
//         setSelectedMonths(
//           Array.from(e.target.selectedOptions, (option) => option.value)
//         )
//       }
//       value={selectedMonths}
//       style={{
//         margin: "10px 0",
//         minWidth: "200px",
//         padding: "5px",
//         borderRadius: "5px",
//         border: "1px solid #ccc",
//         backgroundColor: "#f8f8f8",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       {data.map((d) => (
//         <option key={d.month} value={d.month}>
//           {d.month}
//         </option>
//       ))}
//     </select>
//   );

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
//       <h2 style={{ color: "#333", marginBottom: "20px" }}>
//         Political Party Polling Percentages by month wise
//       </h2>
//       <MonthSelector />
//       <svg ref={svgRef} style={{ maxWidth: "100%", height: "auto" }}></svg>
//       {/* <div style={{ height: "100vh" }}></div> */}
//       {/* <ComparativeChart /> */}
//       <section className="section ComparativeChart">
//         <ComparativeChart />
//       </section>
//     </div>
//   );
// };

// export default BarChart;

// const ComparativeChart = ({ data }) => {
//   const svgRef = useRef();
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsVisible(entry.isIntersecting);
//       },
//       { threshold: 0.1 }
//     );
//     if (svgRef.current) {
//       observer.observe(svgRef.current);
//     }
//     return () => {
//       if (svgRef.current) {
//         observer.unobserve(svgRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (isVisible) {
//       const comparativeData = [
//         { month: "Oct 2023", bjp: 37, indAlliance: 41, others: 22 },
//         { month: "May 2024", bjp: 40, indAlliance: 38, others: 22 },
//       ];
//       const margin = { top: 20, right: 150, bottom: 50, left: 40 };
//       const width = window.innerWidth * 0.45 - margin.left - margin.right;
//       const height = 300 - margin.top - margin.bottom;

//       d3.select(svgRef.current).selectAll("*").remove();

//       const svg = d3
//         .select(svgRef.current)
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", `translate(${margin.left},${margin.top})`);

//       const x0 = d3
//         .scaleBand()
//         .domain(comparativeData.map((d) => d.month))
//         .rangeRound([0, width])
//         .padding(0.2);

//       const x1 = d3
//         .scaleBand()
//         .domain(["BJP", "IND Alliance", "Others"])
//         .rangeRound([0, x0.bandwidth()])
//         .padding(0.05);

//       const y = d3.scaleLinear().domain([0, 50]).nice().rangeRound([height, 0]);

//       svg
//         .append("g")
//         .attr("transform", `translate(0,${height})`)
//         .call(d3.axisBottom(x0));
//       svg.append("g").call(d3.axisLeft(y));

//       const barsGroup = svg
//         .append("g")
//         .selectAll(".month-group")
//         .data(comparativeData)
//         .enter()
//         .append("g")
//         .attr("transform", (d) => `translate(${x0(d.month)}, 0)`);

//       barsGroup
//         .selectAll("rect")
//         .data((d) => [
//           { party: "BJP", value: d.bjp },
//           { party: "IND Alliance", value: d.indAlliance },
//           { party: "Others", value: d.others },
//         ])
//         .enter()
//         .append("rect")
//         .attr("x", (d) => x1(d.party))
//         .attr("y", (d) => y(d.value))
//         .attr("width", x1.bandwidth())
//         .attr("height", (d) => height - y(d.value))
//         .attr("fill", (d) =>
//           d.party === "BJP"
//             ? "#ff7f00"
//             : d.party === "IND Alliance"
//             ? "#1f77b4"
//             : "#6c757d"
//         );

//       const legend = svg
//         .append("g")
//         .attr("transform", `translate(${width + 30}, 20)`);

//       const legendData = [
//         { party: "BJP", color: "#ff7f00" },
//         { party: "IND Alliance", color: "#1f77b4" },
//         { party: "Others", color: "#6c757d" },
//       ];

//       legend
//         .selectAll(".legend-item")
//         .data(legendData)
//         .enter()
//         .append("g")
//         .attr("class", "legend-item")
//         .attr("transform", (d, i) => `translate(0, ${i * 30})`)
//         .each(function (d) {
//           d3.select(this)
//             .append("rect")
//             .attr("width", 20)
//             .attr("height", 20)
//             .attr("fill", d.color);

//           d3.select(this)
//             .append("text")
//             .attr("x", 25)
//             .attr("y", 15)
//             .style("font-size", "14px")
//             .text(d.party);
//         });
//     }
//   }, [isVisible]);

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//         padding: "20px",
//         maxWidth: "100%",
//         margin: "0 auto",
//       }}
//     >
//       <div style={{ flex: "0 0 50%" }}>
//         <svg ref={svgRef}></svg>
//       </div>
//     </div>
//   );
// };

// import "../App.css";

// export const ComparativeChart = ({ data }) => {
//   const svgRef = useRef();

//   useEffect(() => {
//     const margin = { top: 20, right: 150, bottom: 50, left: 40 };
//     const width = window.innerWidth * 0.45 - margin.left - margin.right;
//     const height = 300 - margin.top - margin.bottom;

//     d3.select(svgRef.current).selectAll("*").remove();

//     const svg = d3
//       .select(svgRef.current)
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const x0 = d3
//       .scaleBand()
//       .domain(data.map((d) => d.month))
//       .rangeRound([0, width])
//       .padding(0.2);

//     const x1 = d3
//       .scaleBand()
//       .domain(["BJP", "IND Alliance", "Others"])
//       .rangeRound([0, x0.bandwidth()])
//       .padding(0.05);

//     const y = d3.scaleLinear().domain([0, 50]).nice().rangeRound([height, 0]);

//     svg
//       .append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x0));

//     svg.append("g").call(d3.axisLeft(y));

//     const barsGroup = svg
//       .append("g")
//       .selectAll(".month-group")
//       .data(data)
//       .enter()
//       .append("g")
//       .attr("transform", (d) => `translate(${x0(d.month)}, 0)`);

//     barsGroup
//       .selectAll("rect")
//       .data((d) => [
//         { party: "BJP", value: d.bjp },
//         { party: "IND Alliance", value: d.indAlliance },
//         { party: "Others", value: d.others },
//       ])
//       .enter()
//       .append("rect")
//       .attr("x", (d) => x1(d.party))
//       .attr("y", (d) => y(d.value))
//       .attr("width", x1.bandwidth())
//       .attr("height", (d) => height - y(d.value))
//       .attr("fill", (d) =>
//         d.party === "BJP"
//           ? "#ff7f00"
//           : d.party === "IND Alliance"
//           ? "#1f77b4"
//           : "#6c757d"
//       );

//     const legend = svg
//       .append("g")
//       .attr("transform", `translate(${width + 30}, 20)`);

//     const legendData = [
//       { party: "BJP", color: "#ff7f00" },
//       { party: "IND Alliance", color: "#1f77b4" },
//       { party: "Others", color: "#6c757d" },
//     ];

//     legend
//       .selectAll(".legend-item")
//       .data(legendData)
//       .enter()
//       .append("g")
//       .attr("class", "legend-item")
//       .attr("transform", (d, i) => `translate(0, ${i * 30})`)
//       .each(function (d) {
//         d3.select(this)
//           .append("rect")
//           .attr("width", 20)
//           .attr("height", 20)
//           .attr("fill", d.color);

//         d3.select(this)
//           .append("text")
//           .attr("x", 25)
//           .attr("y", 15)
//           .style("font-size", "14px")
//           .text(d.party);
//       });
//   }, [data]);

//   return <svg ref={svgRef}></svg>;
// };

// const ScrollyContainer = ({ data, events }) => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const scrollyRef = useRef(null);

//   const onStepEnter = ({ data }) => {
//     setCurrentStep(data);
//   };

//   return (
//     <div ref={scrollyRef} style={{ display: "flex" }}>
//       <div
//         style={{
//           position: "sticky",
//           top: 0,
//           width: "50%",
//           height: "100vh",
//         }}
//       >
//         <ComparativeChart data={data.slice(0, currentStep + 2)} />
//       </div>
//       <div style={{ width: "50%" }}>
//         <Scrollama onStepEnter={onStepEnter} offset={0.5}>
//           {events.map((event, index) => (
//             <Step data={index} key={index}>
//               {/* <div style={{ margin: "20vh 0", padding: "1rem" }}> */}
//               <div
//                 style={{
//                   marginBottom: "20px",
//                   padding: "20px",
//                   backgroundColor: "#f9f9f9",
//                   borderRadius: "8px",
//                   boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <h3>{event.month}</h3>
//                 <p>{event.description}</p>
//               </div>
//             </Step>
//           ))}
//         </Scrollama>
//       </div>
//     </div>
//   );
// };

// const BarChart = () => {
//   const svgRef = useRef();
//   const [selectAll, setSelectAll] = useState(false);
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });
//   const [partyVisibility, setPartyVisibility] = useState({
//     BJP: true,
//     "IND Alliance": true,
//     Others: true,
//   });
//   const [selectedMonths, setSelectedMonths] = useState([]);

//   const data = [
//     { month: "Oct 2023", bjp: 37, indAlliance: 41, others: 22 },
//     { month: "Nov 2023", bjp: 38, indAlliance: 40, others: 22 },
//     { month: "Dec 2023", bjp: 38, indAlliance: 40, others: 22 },
//     { month: "Jan 2024", bjp: 38, indAlliance: 42, others: 20 },
//     { month: "Feb 2024", bjp: 35, indAlliance: 45, others: 20 },
//     { month: "Mar 2024", bjp: 37, indAlliance: 43, others: 20 },
//     { month: "Apr 2024", bjp: 40, indAlliance: 38, others: 22 },
//     { month: "May 2024", bjp: 40, indAlliance: 38, others: 22 },
//   ];

//   const events = [
//     {
//       month: "Oct 2023",
//       description:
//         "The IND Alliance launched a nationwide outreach program, gaining an early lead with 41% support compared to BJP's 37%. This initiative focused on addressing local issues and engaging with communities, setting a strong foundation for their campaign. The Others category maintained a steady 22% support, indicating a significant portion of undecided or third-party voters.",
//     },
//     {
//       month: "Nov 2023",
//       description:
//         "BJP announced major infrastructure projects, slightly increasing their support to 38% while IND Alliance dropped to 40%. This strategic move by BJP aimed to boost economic growth and create jobs, resonating with voters who prioritized development. The Others category remained unchanged at 22%, suggesting that these infrastructure announcements did not significantly sway undecided voters.",
//     },
//     {
//       month: "Dec 2023",
//       description:
//         "BJP's strong performance in the winter session of Parliament helped maintain their 38% support. The IND Alliance held steady at 40%, while Others remained at 22%. This month was characterized by intense parliamentary debates and policy discussions, with both major parties trying to showcase their governance capabilities.",
//     },
//     {
//       month: "Jan 2024",
//       description:
//         "The Ram Mandir inauguration took place on January 22, a significant event in Indian politics. BJP's support remained steady at 38%, while IND Alliance saw an increase to 42%. This suggests that while the Ram Mandir inauguration was a major event for BJP, the IND Alliance may have effectively countered with their own narrative or capitalized on other issues. The Others category decreased slightly to 20%, indicating some consolidation of votes towards the major parties.",
//     },
//     {
//       month: "Feb 2024",
//       description:
//         "IND Alliance held a mega rally in Delhi, leading to a significant surge in their support to 45%, while BJP dropped to 35%. This month marked a turning point in the campaign, with IND Alliance's message strongly resonating with voters. The Others category remained at 20%, suggesting that the IND Alliance's gains came primarily at the expense of BJP.",
//     },
//     {
//       month: "Mar 2024",
//       description:
//         "BJP government presented an interim budget, helping them recover some ground to 37%, though IND Alliance maintained a lead at 43%. The budget likely included populist measures aimed at regaining voter support. Others remained stable at 20%, indicating that the budget didn't significantly impact the third-party or undecided voters.",
//     },
//     {
//       month: "Apr 2024",
//       description:
//         "BJP launched an aggressive campaign blitz in crucial states, resulting in a substantial gain to 40% support, while IND Alliance dropped to 38%. This month saw intense campaigning from both parties, with BJP's efforts proving particularly effective. The Others category increased slightly to 22%, possibly due to some voters becoming disillusioned with both major parties.",
//     },
//     {
//       month: "May 2024",
//       description:
//         "Both BJP and IND Alliance made their final appeals to voters before the elections, with support levels stabilizing at 40% for BJP and 38% for IND Alliance. The Others category remained at 22%. This final month saw both parties pulling out all stops in their campaign efforts, resulting in a neck-and-neck race heading into the elections.",
//     },
//   ];

//   function debounce(func, wait) {
//     let timeout;
//     return function executedFunction(...args) {
//       const later = () => {
//         clearTimeout(timeout);
//         func(...args);
//       };
//       clearTimeout(timeout);
//       timeout = setTimeout(later, wait);
//     };
//   }

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };
//     const debouncedHandleResize = debounce(handleResize, 100);
//     window.addEventListener("resize", debouncedHandleResize);
//     // window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", debouncedHandleResize);
//     // return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const margin = { top: 40, right: 150, bottom: 80, left: 60 };
//     const width = windowSize.width * 0.9 - margin.left - margin.right;
//     const height = 600 - margin.top - margin.bottom;

//     d3.select(svgRef.current).selectAll("*").remove();

//     const svg = d3
//       .select(svgRef.current)
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const filteredData =
//       selectedMonths.length > 0
//         ? data.filter((d) => selectedMonths.includes(d.month))
//         : data;

//     const x0 = d3
//       .scaleBand()
//       .domain(filteredData.map((d) => d.month))
//       .rangeRound([0, width])
//       .padding(0.2);

//     const x1 = d3
//       .scaleBand()
//       .domain(["BJP", "IND Alliance", "Others"])
//       .rangeRound([0, x0.bandwidth()])
//       .padding(0.05);

//     const y = d3.scaleLinear().domain([0, 50]).nice().rangeRound([height, 0]);

//     // Add gradient background
//     svg
//       .append("rect")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .attr("transform", `translate(${-margin.left},${-margin.top})`)
//       .attr("fill", "url(#gradient)");

//     // Define gradient
//     const gradient = svg
//       .append("defs")
//       .append("linearGradient")
//       .attr("id", "gradient")
//       .attr("x1", "0%")
//       .attr("y1", "0%")
//       .attr("x2", "100%")
//       .attr("y2", "100%");

//     gradient.append("stop").attr("offset", "0%").attr("stop-color", "#f3f3f3");

//     gradient
//       .append("stop")
//       .attr("offset", "100%")
//       .attr("stop-color", "#e6e6e6");

//     // Add styled X-axis
//     svg
//       .append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x0))
//       .selectAll(".tick text")
//       .style("text-anchor", "end")
//       .attr("dx", "-.8em")
//       .attr("dy", ".15em")
//       .attr("transform", "rotate(-45)")
//       .style("font-size", "12px")
//       .style("font-weight", "bold");

//     // Add X-axis label
//     svg
//       .append("text")
//       .attr(
//         "transform",
//         `translate(${width / 2}, ${height + margin.bottom - 10})`
//       )
//       .style("text-anchor", "middle")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .text("Months");

//     // Add styled Y-axis
//     svg
//       .append("g")
//       .call(d3.axisLeft(y))
//       .selectAll("text")
//       .style("font-size", "12px");

//     // Add Y-axis label
//     svg
//       .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left)
//       .attr("x", 0 - height / 2)
//       .attr("dy", "1em")
//       .style("text-anchor", "middle")
//       .style("font-size", "14px")
//       .style("font-weight", "bold")
//       .text("Polling Percentage (%)");

//     // Add bars
//     const barsGroup = svg
//       .append("g")
//       .selectAll(".month-group")
//       .data(filteredData)
//       .enter()
//       .append("g")
//       .attr("transform", (d) => `translate(${x0(d.month)}, 0)`);

//     barsGroup
//       .selectAll("rect")
//       .data((d) => [
//         { party: "BJP", value: d.bjp },
//         { party: "IND Alliance", value: d.indAlliance },
//         { party: "Others", value: d.others },
//       ])
//       .enter()
//       .append("rect")
//       .attr("x", (d) => x1(d.party))
//       .attr("y", height)
//       .attr("width", x1.bandwidth())
//       .attr("height", 0)
//       .attr("fill", (d) =>
//         d.party === "BJP"
//           ? "#ff7f00"
//           : d.party === "IND Alliance"
//           ? "#1f77b4"
//           : "#6c757d"
//       )
//       .style("opacity", (d) => (partyVisibility[d.party] ? 1 : 0))
//       .transition()
//       .duration(1000)
//       .attr("y", (d) => y(d.value))
//       .attr("height", (d) => height - y(d.value));

//     // Add tooltip
//     const tooltip = d3
//       .select("body")
//       .append("div")
//       .attr("class", "tooltip")
//       .style("opacity", 0)
//       .style("position", "absolute")
//       .style("background-color", "rgba(0, 0, 0, 0.7)")
//       .style("color", "white")
//       .style("padding", "10px")
//       .style("border-radius", "5px");

//     barsGroup
//       .selectAll("rect")
//       .on("mouseover", function (event, d) {
//         d3.select(this).style("opacity", 0.7);
//         tooltip.transition().duration(200).style("opacity", 0.9);
//         tooltip
//           .html(`${d.party}: ${d.value}%`)
//           .style("left", event.pageX + 5 + "px")
//           .style("top", event.pageY - 28 + "px");
//       })
//       .on("mouseout", function () {
//         d3.select(this).style("opacity", (d) =>
//           partyVisibility[d.party] ? 1 : 0
//         );
//         tooltip.transition().duration(500).style("opacity", 0);
//       });

//     // Add legend
//     const legend = svg
//       .append("g")
//       .attr("transform", `translate(${width + 20}, 0)`);

//     const legendData = [
//       { party: "BJP", color: "#ff7f00" },
//       { party: "IND Alliance", color: "#1f77b4" },
//       { party: "Others", color: "#6c757d" },
//     ];

//     const legendItems = legend
//       .selectAll(".legend-item")
//       .data(legendData)
//       .enter()
//       .append("g")
//       .attr("class", "legend-item")
//       .attr("transform", (d, i) => `translate(0, ${i * 30})`);

//     legendItems
//       .append("rect")
//       .attr("width", 20)
//       .attr("height", 20)
//       .attr("fill", (d) => d.color)
//       .style("cursor", "pointer")
//       .style("stroke", (d) => (partyVisibility[d.party] ? "black" : "none"))
//       .style("stroke-width", (d) => (partyVisibility[d.party] ? "2px" : "0"))
//       .on("click", (event, d) => {
//         const newVisibility = {
//           ...partyVisibility,
//           [d.party]: !partyVisibility[d.party],
//         };
//         setPartyVisibility(newVisibility);

//         d3.select(event.target)
//           .style("stroke", newVisibility[d.party] ? "black" : "none")
//           .style("stroke-width", newVisibility[d.party] ? "2px" : "0");
//       });

//     legendItems
//       .append("text")
//       .attr("x", 25)
//       .attr("y", 15)
//       .style("font-size", "14px")
//       .text((d) => d.party);
//   }, [data, windowSize, partyVisibility, selectedMonths, selectAll]);

//   const MonthSelector = () => (
//     <div>
//       <label style={{ display: "block", marginBottom: "5px" }}>
//         <input
//           type="checkbox"
//           checked={selectAll}
//           onChange={(e) => {
//             setSelectAll(e.target.checked);
//             if (e.target.checked) {
//               setSelectedMonths(data.map((d) => d.month));
//             } else {
//               setSelectedMonths([]);
//             }
//           }}
//         />
//         Select All Months
//       </label>
//       <select
//         multiple
//         onChange={(e) => {
//           const selected = Array.from(
//             e.target.selectedOptions,
//             (option) => option.value
//           );
//           setSelectedMonths(selected);
//           setSelectAll(selected.length === data.length);
//         }}
//         value={selectedMonths}
//         style={{
//           marginTop: "20px",
//           minWidth: "200px",
//           padding: "10px",
//           borderRadius: "5px",
//           border: "1px solid #ccc",
//           backgroundColor: "#f8f8f8",
//           fontFamily: "Arial, sans-serif",
//         }}
//       >
//         {data.map((d) => (
//           <option key={d.month} value={d.month}>
//             {d.month}
//           </option>
//         ))}
//       </select>
//     </div>
//   );

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
//       <h2 style={{ color: "#333", marginBottom: "20px" }}>
//         Political Party Polling Percentages
//       </h2>
//       <MonthSelector />
//       <svg ref={svgRef} style={{ maxWidth: "100%", height: "auto" }}></svg>
//       {/* <div style={{ height: "100vh" }}></div> */}
//       <ScrollyContainer data={data} events={events} />
//       {/* <ComparativeChart /> */}
//     </div>
//   );
// };

// export default BarChart;

import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
// import ComparativeChart from "./ComparativeChart";

// export const ComparativeChart = () => {
//   const svgRef = useRef();
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsVisible(entry.isIntersecting);
//       },
//       { threshold: 0.1 }
//     );

//     if (svgRef.current) {
//       observer.observe(svgRef.current);
//     }

//     return () => {
//       if (svgRef.current) {
//         observer.unobserve(svgRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (isVisible) {
//       const comparativeData = [
//         { month: "Oct 2023", bjp: 37, indAlliance: 41, others: 22 },
//         { month: "May 2024", bjp: 40, indAlliance: 38, others: 22 },
//       ];

//       const margin = { top: 20, right: 150, bottom: 50, left: 40 };

//       const width = window.innerWidth * 0.45 - margin.left - margin.right;
//       const height = 300 - margin.top - margin.bottom;

//       d3.select(svgRef.current).selectAll("*").remove();

//       const svg = d3
//         .select(svgRef.current)
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", `translate(${margin.left},${margin.top})`);

//       const x0 = d3
//         .scaleBand()
//         .domain(comparativeData.map((d) => d.month))
//         .rangeRound([0, width])
//         .padding(0.2);

//       const x1 = d3
//         .scaleBand()
//         .domain(["BJP", "IND Alliance", "Others"])
//         .rangeRound([0, x0.bandwidth()])
//         .padding(0.05);

//       const y = d3.scaleLinear().domain([0, 50]).nice().rangeRound([height, 0]);

//       svg
//         .append("g")
//         .attr("transform", `translate(0,${height})`)
//         .call(d3.axisBottom(x0));

//       svg.append("g").call(d3.axisLeft(y));

//       const barsGroup = svg
//         .append("g")
//         .selectAll(".month-group")
//         .data(comparativeData)
//         .enter()
//         .append("g")
//         .attr("transform", (d) => `translate(${x0(d.month)}, 0)`);

//       barsGroup
//         .selectAll("rect")
//         .data((d) => [
//           { party: "BJP", value: d.bjp },
//           { party: "IND Alliance", value: d.indAlliance },
//           { party: "Others", value: d.others },
//         ])
//         .enter()
//         .append("rect")
//         .attr("x", (d) => x1(d.party))
//         .attr("y", (d) => y(d.value))
//         .attr("width", x1.bandwidth())
//         .attr("height", (d) => height - y(d.value))
//         .attr("fill", (d) =>
//           d.party === "BJP"
//             ? "#ff7f00"
//             : d.party === "IND Alliance"
//             ? "#1f77b4"
//             : "#6c757d"
//         );
//       const legend = svg
//         .append("g")
//         .attr("transform", `translate(${width + 30}, 20)`);

//       const legendData = [
//         { party: "BJP", color: "#ff7f00" },
//         { party: "IND Alliance", color: "#1f77b4" },
//         { party: "Others", color: "#6c757d" },
//       ];

//       legend
//         .selectAll(".legend-item")
//         .data(legendData)
//         .enter()
//         .append("g")
//         .attr("class", "legend-item")
//         .attr("transform", (d, i) => `translate(0, ${i * 30})`)
//         .each(function (d) {
//           d3.select(this)
//             .append("rect")
//             .attr("width", 20)
//             .attr("height", 20)
//             .attr("fill", d.color);

//           d3.select(this)
//             .append("text")
//             .attr("x", 25)
//             .attr("y", 15)
//             .style("font-size", "14px")
//             .text(d.party);
//         });
//     }
//   }, [isVisible]);

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//         padding: "20px",
//         maxWidth: "100%",
//         margin: "0 auto",
//       }}
//     >
//       <div style={{ flex: "0 0 50%" }}>
//         <svg ref={svgRef}></svg>
//       </div>
//       {isVisible && (
//         <div
//           style={{
//             flex: "0 0 45%",
//             padding: "20px",
//             backgroundColor: "white",
//             borderRadius: "8px",
//             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//             marginLeft: "20px",
//           }}
//         >
//           <h3 style={{ color: "#333", marginBottom: "15px", fontSize: "18px" }}>
//             Comparison of Oct 2023 and May 2024
//           </h3>
//           <p style={{ color: "#666", lineHeight: "1.4", fontSize: "14px" }}>
//             <div>
//               <p>
//                 Comparing the polling percentages between October 2023 and May
//                 2024, we can observe:
//               </p>
//               <ul>
//                 <li>BJP increased from 37% to 40%, showing a 3% gain.</li>
//                 <li>IND Alliance decreased from 41% to 38%, losing 3%.</li>
//                 <li>Others remained stable at 22%.</li>
//               </ul>
//               <p>
//                 This shift suggests a potential change in voter preferences over
//                 the 7-month period.
//               </p>
//             </div>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// import { Scrollama, Step } from "react-scrollama";

// const ComparativeChart = ({ data }) => {
//   const svgRef = useRef();

//   useEffect(() => {
//     const margin = { top: 20, right: 150, bottom: 50, left: 40 };
//     const width = window.innerWidth * 0.45 - margin.left - margin.right;
//     const height = 300 - margin.top - margin.bottom;

//     d3.select(svgRef.current).selectAll("*").remove();

//     const svg = d3
//       .select(svgRef.current)
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const x0 = d3
//       .scaleBand()
//       .domain(data.map((d) => d.month))
//       .rangeRound([0, width])
//       .padding(0.2);

//     const x1 = d3
//       .scaleBand()
//       .domain(["BJP", "IND Alliance", "Others"])
//       .rangeRound([0, x0.bandwidth()])
//       .padding(0.05);

//     const y = d3.scaleLinear().domain([0, 50]).nice().rangeRound([height, 0]);

//     svg
//       .append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x0));

//     svg.append("g").call(d3.axisLeft(y));

//     const barsGroup = svg
//       .append("g")
//       .selectAll(".month-group")
//       .data(data)
//       .enter()
//       .append("g")
//       .attr("transform", (d) => `translate(${x0(d.month)}, 0)`);

//     barsGroup
//       .selectAll("rect")
//       .data((d) => [
//         { party: "BJP", value: d.bjp },
//         { party: "IND Alliance", value: d.indAlliance },
//         { party: "Others", value: d.others },
//       ])
//       .enter()
//       .append("rect")
//       .attr("x", (d) => x1(d.party))
//       .attr("y", (d) => y(d.value))
//       .attr("width", x1.bandwidth())
//       .attr("height", (d) => height - y(d.value))
//       .attr("fill", (d) =>
//         d.party === "BJP"
//           ? "#ff7f00"
//           : d.party === "IND Alliance"
//           ? "#1f77b4"
//           : "#6c757d"
//       );

//     const legend = svg
//       .append("g")
//       .attr("transform", `translate(${width + 30}, 20)`);

//     const legendData = [
//       { party: "BJP", color: "#ff7f00" },
//       { party: "IND Alliance", color: "#1f77b4" },
//       { party: "Others", color: "#6c757d" },
//     ];

//     legend
//       .selectAll(".legend-item")
//       .data(legendData)
//       .enter()
//       .append("g")
//       .attr("class", "legend-item")
//       .attr("transform", (d, i) => `translate(0, ${i * 30})`)
//       .each(function (d) {
//         d3.select(this)
//           .append("rect")
//           .attr("width", 20)
//           .attr("height", 20)
//           .attr("fill", d.color);

//         d3.select(this)
//           .append("text")
//           .attr("x", 25)
//           .attr("y", 15)
//           .style("font-size", "14px")
//           .text(d.party);
//       });
//   }, [data]);

//   return <svg ref={svgRef}></svg>;
// };

import { InView } from "react-intersection-observer";

// const ComparativeChart = ({ data }) => {
//   const svgRef = useRef();
//   const { ref, inView } = useInView({
//     threshold: 0.1,
//   });

//   useEffect(() => {
//     if (inView) {
//       const margin = { top: 20, right: 150, bottom: 50, left: 40 };
//       const width = window.innerWidth * 0.45 - margin.left - margin.right;
//       const height = 300 - margin.top - margin.bottom;

//       d3.select(svgRef.current).selectAll("*").remove();

//       const svg = d3
//         .select(svgRef.current)
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", `translate(${margin.left},${margin.top})`);

//       const x0 = d3
//         .scaleBand()
//         .domain(data.map((d) => d.month))
//         .rangeRound([0, width])
//         .padding(0.2);

//       const x1 = d3
//         .scaleBand()
//         .domain(["BJP", "IND Alliance", "Others"])
//         .rangeRound([0, x0.bandwidth()])
//         .padding(0.05);

//       const y = d3.scaleLinear().domain([0, 50]).nice().rangeRound([height, 0]);

//       svg
//         .append("g")
//         .attr("transform", `translate(0,${height})`)
//         .call(d3.axisBottom(x0));
//       svg.append("g").call(d3.axisLeft(y));

//       const barsGroup = svg
//         .append("g")
//         .selectAll(".month-group")
//         .data(data)
//         .enter()
//         .append("g")
//         .attr("transform", (d) => `translate(${x0(d.month)}, 0)`);

//       barsGroup
//         .selectAll("rect")
//         .data((d) => [
//           { party: "BJP", value: d.bjp },
//           { party: "IND Alliance", value: d.indAlliance },
//           { party: "Others", value: d.others },
//         ])
//         .enter()
//         .append("rect")
//         .attr("x", (d) => x1(d.party))
//         .attr("y", (d) => y(d.value))
//         .attr("width", x1.bandwidth())
//         .attr("height", (d) => height - y(d.value))
//         .attr("fill", (d) =>
//           d.party === "BJP"
//             ? "#ff7f00"
//             : d.party === "IND Alliance"
//             ? "#1f77b4"
//             : "#6c757d"
//         );

//       const legend = svg
//         .append("g")
//         .attr("transform", `translate(${width + 30}, 20)`);

//       const legendData = [
//         { party: "BJP", color: "#ff7f00" },
//         { party: "IND Alliance", color: "#1f77b4" },
//         { party: "Others", color: "#6c757d" },
//       ];

//       legend
//         .selectAll(".legend-item")
//         .data(legendData)
//         .enter()
//         .append("g")
//         .attr("class", "legend-item")
//         .attr("transform", (d, i) => `translate(0, ${i * 30})`)
//         .each(function (d) {
//           d3.select(this)
//             .append("rect")
//             .attr("width", 20)
//             .attr("height", 20)
//             .attr("fill", d.color);

//           d3.select(this)
//             .append("text")
//             .attr("x", 25)
//             .attr("y", 15)
//             .style("font-size", "14px")
//             .text(d.party);
//         });
//     }
//   }, [inView, data]);

//   return (
//     <div
//       ref={ref}
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//         padding: "20px",
//         maxWidth: "100%",
//         margin: "0 auto",
//       }}
//     >
//       <div style={{ flex: "0 0 50%" }}>
//         <svg ref={svgRef}></svg>
//       </div>
//     </div>
//   );
// };

// const ScrollyContainer = ({ data, events }) => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const scrollyRef = useRef(null);

//   const onStepEnter = ({ data }) => {
//     setCurrentStep(data);
//   };

//   return (
//     <div ref={scrollyRef} style={{ display: "flex" }}>
//       <div
//         style={{
//           position: "sticky",
//           top: 0,
//           width: "50%",
//           height: "100vh",
//         }}
//       >
//         <ComparativeChart data={data.slice(0, currentStep + 2)} />
//       </div>
//       <div style={{ width: "50%" }}>
//         <Scrollama onStepEnter={onStepEnter} offset={0.5}>
//           {events.map((event, index) => (
//             <Step data={index} key={index}>
//               {/* <div style={{ margin: "20vh 0", padding: "1rem" }}> */}
//               <div
//                 style={{
//                   marginBottom: "20px",
//                   padding: "20px",
//                   backgroundColor: "#f9f9f9",
//                   borderRadius: "8px",
//                   boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <h3>{event.month}</h3>
//                 <p>{event.description}</p>
//               </div>
//             </Step>
//           ))}
//         </Scrollama>
//       </div>
//     </div>
//   );
// };

// const ScrollyContainer = ({ data, events }) => {
//   return (
//     <div style={{ display: "flex" }}>
//       <div
//         style={{ position: "sticky", top: 0, width: "50%", height: "100vh" }}
//       >
//         <ComparativeChart data={data} />
//       </div>
//       <div style={{ width: "50%", overflowY: "scroll", height: "100vh" }}>
//         {events.map((event, index) => (
//           <div
//             key={index}
//             style={{
//               marginBottom: "20px",
//               padding: "20px",
//               backgroundColor: "#f9f9f9",
//               borderRadius: "8px",
//               boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <h3>{event.month}</h3>
//             <p>{event.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const ComparativeChart = ({ visibleMonths }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 150, bottom: 50, left: 40 };
    const width = window.innerWidth * 0.45 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up scales
    const x0 = d3
      .scaleBand()
      .domain(visibleMonths.map((d) => d.month))
      .rangeRound([0, width])
      .padding(0.2);

    const x1 = d3
      .scaleBand()
      .domain(["BJP", "IND Alliance", "Others"])
      .rangeRound([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3.scaleLinear().domain([0, 50]).nice().rangeRound([height, 0]);

    // Draw axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x0));
    svg.append("g").call(d3.axisLeft(y));

    // Create bars
    const barsGroup = svg
      .append("g")
      .selectAll(".month-group")
      .data(visibleMonths)
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

    // Create legend
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
  }, [visibleMonths]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "20px",
        maxWidth: "100%",
      }}
    >
      <div style={{ flex: "0 0 50%" }}>
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

// const ScrollyContainer = ({ data, events }) => {
//   const [currentStep, setCurrentStep] = useState(0);

//   const onStepEnter = ({ data }) => {
//     setCurrentStep(data);
//   };

//   // Get visible months based on current step
//   const visibleMonths = data.slice(0, currentStep + 2);
//   console.log(visibleMonths);

//   return (
//     <div style={{ display: "flex" }}>
//       <div
//         style={{ position: "sticky", top: 0, width: "50%", height: "100vh" }}
//       >
//         <ComparativeChart visibleMonths={visibleMonths} />
//       </div>

//       <div style={{ width: "50%", overflowY: "scroll", height: "100vh" }}>
//         {events.map((event, index) => (
//           <div
//             key={index}
//             style={{
//               marginBottom: "20px",
//               padding: "20px",
//               backgroundColor: "#f9f9f9",
//               borderRadius: "8px",
//               boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <h3>{event.month}</h3>
//             <p>{event.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const ScrollyContainer = ({ data, events }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const onStepEnter = ({ data }) => {
    setCurrentStep(data);
  };

  // Get visible months based on current step
  const visibleMonths = data.slice(0, currentStep + 2); // Include current month

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{ position: "sticky", top: 0, width: "50%", height: "100vh" }}
      >
        <ComparativeChart visibleMonths={visibleMonths} />
      </div>

      <div style={{ width: "50%", overflowY: "scroll", height: "100vh" }}>
        {events.map((event, index) => (
          <div
            key={index}
            style={{
              marginBottom: "20px",
              padding: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{event.month}</h3>
            <p>{event.description}</p>
            {/* Use Intersection Observer to trigger onStepEnter */}
            <InView
              onChange={(inView) => inView && onStepEnter({ data: index })}
            >
              <div style={{ height: "10px" }} />{" "}
              {/* Placeholder for triggering */}
            </InView>
          </div>
        ))}
      </div>
    </div>
  );
};

const BarChart = () => {
  const svgRef = useRef();
  const [selectAll, setSelectAll] = useState(false);
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
  ];

  const events = [
    {
      month: "Oct 2023",
      description:
        "The IND Alliance launched a nationwide outreach program, gaining an early lead with 41% support compared to BJP's 37%. This initiative focused on addressing local issues and engaging with communities, setting a strong foundation for their campaign. The Others category maintained a steady 22% support, indicating a significant portion of undecided or third-party voters.",
    },
    {
      month: "Nov 2023",
      description:
        "BJP announced major infrastructure projects, slightly increasing their support to 38% while IND Alliance dropped to 40%. This strategic move by BJP aimed to boost economic growth and create jobs, resonating with voters who prioritized development. The Others category remained unchanged at 22%, suggesting that these infrastructure announcements did not significantly sway undecided voters.",
    },
    {
      month: "Dec 2023",
      description:
        "BJP's strong performance in the winter session of Parliament helped maintain their 38% support. The IND Alliance held steady at 40%, while Others remained at 22%. This month was characterized by intense parliamentary debates and policy discussions, with both major parties trying to showcase their governance capabilities.",
    },
    {
      month: "Jan 2024",
      description:
        "The Ram Mandir inauguration took place on January 22, a significant event in Indian politics. BJP's support remained steady at 38%, while IND Alliance saw an increase to 42%. This suggests that while the Ram Mandir inauguration was a major event for BJP, the IND Alliance may have effectively countered with their own narrative or capitalized on other issues. The Others category decreased slightly to 20%, indicating some consolidation of votes towards the major parties.",
    },
    {
      month: "Feb 2024",
      description:
        "IND Alliance held a mega rally in Delhi, leading to a significant surge in their support to 45%, while BJP dropped to 35%. This month marked a turning point in the campaign, with IND Alliance's message strongly resonating with voters. The Others category remained at 20%, suggesting that the IND Alliance's gains came primarily at the expense of BJP.",
    },
    {
      month: "Mar 2024",
      description:
        "BJP government presented an interim budget, helping them recover some ground to 37%, though IND Alliance maintained a lead at 43%. The budget likely included populist measures aimed at regaining voter support. Others remained stable at 20%, indicating that the budget didn't significantly impact the third-party or undecided voters.",
    },
    {
      month: "Apr 2024",
      description:
        "BJP launched an aggressive campaign blitz in crucial states, resulting in a substantial gain to 40% support, while IND Alliance dropped to 38%. This month saw intense campaigning from both parties, with BJP's efforts proving particularly effective. The Others category increased slightly to 22%, possibly due to some voters becoming disillusioned with both major parties.",
    },
    {
      month: "May 2024",
      description:
        "Both BJP and IND Alliance made their final appeals to voters before the elections, with support levels stabilizing at 40% for BJP and 38% for IND Alliance. The Others category remained at 22%. This final month saw both parties pulling out all stops in their campaign efforts, resulting in a neck-and-neck race heading into the elections.",
    },
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

    // const x0 = d3
    //   .scaleBand()
    //   .domain((comparativeData && comparativeData.map((d) => d.month)) || [])
    //   .rangeRound([0, width])
    //   .padding(0.2);

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
  }, [data, windowSize, partyVisibility, selectedMonths, selectAll]);

  const MonthSelector = () => (
    <div>
      <label style={{ display: "block", marginBottom: "5px" }}>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={(e) => {
            setSelectAll(e.target.checked);
            if (e.target.checked) {
              setSelectedMonths(data.map((d) => d.month));
            } else {
              setSelectedMonths([]);
            }
          }}
        />
        Select All Months
      </label>
      <select
        multiple
        onChange={(e) => {
          const selected = Array.from(
            e.target.selectedOptions,
            (option) => option.value
          );
          setSelectedMonths(selected);
          setSelectAll(selected.length === data.length);
        }}
        value={selectedMonths}
        style={{
          marginTop: "20px",
          minWidth: "200px",
          padding: "10px",
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
    </div>
  );

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>
        Political Party Polling Percentages
      </h2>
      <MonthSelector />
      <svg ref={svgRef} style={{ maxWidth: "100%", height: "auto" }}></svg>
      {/* <div style={{ height: "100vh" }}></div> */}
      <ScrollyContainer data={data} events={events} />
      {/* <ComparativeChart /> */}
    </div>
  );
};

export default BarChart;
