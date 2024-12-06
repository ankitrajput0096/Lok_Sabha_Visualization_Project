import React, { PureComponent } from "react";
import injectSheet from "react-jss";
import { Scrollama, Step } from "react-scrollama";
import * as d3 from "d3";
import monthWiseData from "../data/monthWiseData.csv";

const styles = {
  graphicContainer: {
    padding: "7vh 4vw 7vh",
    justifyContent: "space-between",
    display: "flex",
  },
  graphic: {
    flexBasis: "70%",
    position: "sticky",
    width: "100%",
    height: "75vh",
    top: "20vh",
    paddingLeft: "5%",
    paddingTop: "9%",
  },
  scroller: {
    flexBasis: "30%",
    paddingLeft: "20px",
  },
  step: {
    margin: "0 auto 3rem auto",
    padding: "180px 0",
    "& p": {
      textAlign: "center",
      padding: "1rem",
      fontSize: "1.3rem",
      margin: 0,
    },
    "&:last-child": {
      marginBottom: "200px",
    },
  },
};

class Demo extends PureComponent {
  state = {
    currentStep: 0,
    steps: [0, 10, 20, 30, 40, 50, 60, 70],
    events: [],
  };
  svgRef = React.createRef();
  chartData = [];
  // Fetch CSV file data in componentDidMount
  componentDidMount() {
    this.createChart();

    // Load the CSV data from the public/data folder
    d3.csv(monthWiseData)
      .then((data) => {
        console.log("Data", data);
        // Process the data into the desired format
        const events = data.map((item) => ({
          month: item["month"],
          BJP: Number(item["BJP"]),
          "IND Alliance": Number(item["IND Alliance"]),
          Others: Number(item["Others"]),
        }));

        // Update the state with the processed data
        this.setState({ events }, () => {
          this.updateChart(0); // Ensure the first month is displayed by default
        });
      })
      .catch((error) => {
        console.error("Error loading the CSV file:", error);
      });
  }

  onStepEnter = (e) => {
    const { data } = e;
    this.updateChart(data);
    this.setState({ currentStep: data });
  };

  createChart() {
    const margin = { top: 40, right: 30, bottom: 80, left: 60 };
    const width = 850 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    this.width = width;
    this.height = height;

    this.x = d3.scaleBand().range([0, width]).padding(0.05);
    this.y = d3.scaleLinear().domain([0, 50]).range([height, 0]);

    this.svg = d3
      .select(this.svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X-axis
    this.xAxisGroup = this.svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(this.x).tickSize(0))
      .style("font-size", "14px");

    // Style x-axis ticks
    this.xAxisGroup
      .selectAll("text")
      .style("font-size", "14px") // Increase font size for x-axis ticks
      .style("font-weight", "bold"); // Make x-axis ticks bold

    // Y-axis
    this.svg
      .append("g")
      .call(d3.axisLeft(this.y))
      .selectAll("text")
      .style("font-size", "14px"); // Increase font size for y-axis ticks

    // X-axis label
    this.svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + 45) // Adjusted position for better alignment
      .attr("text-anchor", "middle")
      .style("font-size", "14px") // Increased font size
      .style("font-weight", "bold") // Made text bold
      .text("Pre-Poll Survey Timeline");

    // Y-axis label
    this.svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -45)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "14px") // Increased font size
      .style("font-weight", "bold") // Made text bold
      .text("Polling Percentage (%)");

    // Legend data
    const legendData = [
      { party: "BJP", color: "#ff7f00" },
      { party: "IND Alliance", color: "#1f77b4" },
      { party: "Others", color: "#6c757d" },
    ];

    // Add legend group
    const legend = this.svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - 70}, ${-margin.top})`); // Top-right corner

    // Add legend items
    legend
      .selectAll(".legend-item")
      .data(legendData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`) // Vertical spacing
      .each(function (d) {
        const item = d3.select(this);
        // Add legend color box
        item
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 14)
          .attr("height", 14)
          .attr("fill", d.color);

        // Add legend text
        item
          .append("text")
          .attr("x", 20)
          .attr("y", 10)
          .attr("text-anchor", "start")
          .style("font-size", "14px")
          .text(d.party);
      });
  }

  updateChart(step) {
    let visibleEvents;

    if (step === 0) {
      // Show only the first event as the default for step 0
      visibleEvents = [this.state.events[0]];
      console.log("Events", visibleEvents);
      console.log("Normal Events", this.state.events);
    } else {
      // Determine which events to show based on the current step
      visibleEvents = this.state.events.slice(0, Math.floor(step / 10) + 1);
    }

    this.x.domain(visibleEvents.map((d) => d.month));

    // Update x-axis
    this.xAxisGroup
      .transition()
      .duration(500)
      .call(d3.axisBottom(this.x).tickSize(5));

    const parties = ["BJP", "IND Alliance", "Others"];
    const colors = {
      BJP: "#ff7f00",
      "IND Alliance": "#1f77b4",
      Others: "#6c757d",
    };

    // Remove old bars
    this.svg.selectAll(".bar-group").remove();

    // Create tooltip div
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("display", "none")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "6px")
      .style("border-radius", "4px")
      .style("box-shadow", "0 2px 5px rgba(0, 0, 0, 0.2)")
      .style("font-size", "14px")
      .style("pointer-events", "none");

    // Add bars with tooltip functionality
    const groups = this.svg
      .selectAll(".bar-group")
      .data(visibleEvents, (d) => d.month)
      .enter()
      .append("g")
      .attr("class", "bar-group")
      .attr("transform", (d) => `translate(${this.x(d.month)},0)`);

    groups
      .selectAll("rect")
      .data((d) =>
        parties.map((party) => ({ party, value: d[party], month: d.month }))
      )
      .enter()
      .append("rect")
      .attr("x", (d, i) => (this.x.bandwidth() / parties.length) * i)
      .attr("y", this.height)
      .attr("width", this.x.bandwidth() / parties.length - 5)
      .attr("height", 0)
      .attr("fill", (d) => colors[d.party])
      .on("mouseover", function (event, d) {
        // Show tooltip
        tooltip.style("display", "block").html(`
      <strong>${d.party}</strong><br>
      Percentage: ${d.value}%
    `);
        // Highlight bar
        d3.select(this).attr("stroke", "black").attr("stroke-width", 2);
      })
      .on("mousemove", function (event) {
        // Position tooltip near cursor
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY}px`);
      })
      .on("mouseout", function () {
        // Hide tooltip
        tooltip.style("display", "none");
        // Remove bar highlight
        d3.select(this).attr("stroke", null);
      })
      .transition()
      .duration(500)
      .attr("y", (d) => this.y(d.value))
      .attr("height", (d) => this.height - this.y(d.value));
  }

  render() {
    const { currentStep, steps } = this.state;
    const { classes } = this.props;

    let description = (
      <p>
        The IND Alliance launched a nationwide outreach program, gaining an
        early lead with 41% support compared to BJP's 37%. This initiative
        focused on addressing local issues and engaging with communities,
        setting a strong foundation for their campaign. The Others category
        maintained a steady 22% support, indicating a significant portion of
        undecided or third-party voters.
      </p>
    );

    if (currentStep === 0) {
      description = (
        <p>
          The IND Alliance launched a nationwide outreach program, gaining an
          early lead with 41% support compared to BJP's 37%. This initiative
          focused on addressing local issues and engaging with communities,
          setting a strong foundation for their campaign. The Others category
          maintained a steady 22% support, indicating a significant portion of
          undecided or third-party voters.
        </p>
      );
    } else if (currentStep === 10) {
      description = (
        <p>
          BJP announced major infrastructure projects, slightly increasing their
          support to 38% while IND Alliance dropped to 40%. This strategic move
          by BJP aimed to boost economic growth and create jobs, resonating with
          voters who prioritized development. The Others category remained
          unchanged at 22%, suggesting that these infrastructure announcements
          did not significantly sway undecided voters.
        </p>
      );
    } else if (currentStep === 20) {
      description = (
        <p>
          BJP's strong performance in the winter session of Parliament helped
          maintain their 38% support. The IND Alliance held steady at 40%, while
          Others remained at 22%. This month was characterized by intense
          parliamentary debates and policy discussions, with both major parties
          trying to showcase their governance capabilities.
        </p>
      );
    } else if (currentStep === 30) {
      description = (
        <p>
          The Ram Mandir inauguration took place on January 22, a significant
          event in Indian politics. BJP's support remained steady at 38%, while
          IND Alliance saw an increase to 42%. This suggests that while the Ram
          Mandir inauguration was a major event for BJP, the IND Alliance may
          have effectively countered with their own narrative or capitalized on
          other issues. The Others category decreased slightly to 20%,
          indicating some consolidation of votes towards the major parties.
        </p>
      );
    } else if (currentStep === 40) {
      description = (
        <p>
          IND Alliance held a mega rally in Delhi, leading to a significant
          surge in their support to 45%, while BJP dropped to 35%. This month
          marked a turning point in the campaign, with IND Alliance's message
          strongly resonating with voters. The Others category remained at 20%,
          suggesting that the IND Alliance's gains came primarily at the expense
          of BJP.
        </p>
      );
    } else if (currentStep === 50) {
      description = (
        <p>
          BJP government presented an interim budget, helping them recover some
          ground to 37%, though IND Alliance maintained a lead at 43%. The
          budget likely included populist measures aimed at regaining voter
          support. Others remained stable at 20%, indicating that the budget
          didn't significantly impact the third-party or undecided voters.
        </p>
      );
    } else if (currentStep === 60) {
      description = (
        <p>
          BJP launched an aggressive campaign blitz in crucial states, resulting
          in a substantial gain to 40% support, while IND Alliance dropped to
          38%. This month saw intense campaigning from both parties, with BJP's
          efforts proving particularly effective. The Others category increased
          slightly to 22%, possibly due to some voters becoming disillusioned
          with both major parties.
        </p>
      );
    } else if (currentStep === 70) {
      description = (
        <p>
          Both BJP and IND Alliance made their final appeals to voters before
          the elections, with support levels stabilizing at 40% for BJP and 38%
          for IND Alliance. The Others category remained at 22%. This final
          month saw both parties pulling out all stops in their campaign
          efforts, resulting in a neck-and-neck race heading into the elections.
        </p>
      );
    } else {
      description = (
        <p>
          Both BJP and IND Alliance made their final appeals to voters before
          the elections, with support levels stabilizing at 40% for BJP and 38%
          for IND Alliance. The Others category remained at 22%. This final
          month saw both parties pulling out all stops in their campaign
          efforts, resulting in a neck-and-neck race heading into the elections.
        </p>
      );
    }

    return (
      <div>
        <div className={classes.graphicContainer}>
          <div className={classes.graphic}>
            <h10> Shaping India's 2024 Parliamentary Mandate</h10>
            <svg ref={this.svgRef}></svg>
          </div>
          <h10 className={classes.scroller}>
            <Scrollama onStepEnter={this.onStepEnter} offset={0.6}>
              {steps.map((value, index) => (
                <Step data={value} key={value}>
                  <div className="text-left">
                    <div className={classes.step}>{description}</div>
                  </div>
                </Step>
              ))}
            </Scrollama>
          </h10>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Demo);
