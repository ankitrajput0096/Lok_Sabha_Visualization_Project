import React from "react";
import "./App.css";
import BubbleChart from "./component/BubbleChart";
import PieChart from "./component/PieChart";
import ThematicMap from "./component/ThematicMap";
import Timeline from "./component/Timeline";
import BubbleChartScrolly from "./component/BubbleChartScrolly"
import useScrollAnimations from "./hooks/useScrollAnimations";
import BarChart from "./component/BarChart";
import ScrollJackingComponent from "./component/ScrollSwitchView";
import ImagesForMap from "./component/MapImage";
import ImagesForMap2 from "./component/MapImage2";
import ChoroplethMap from "./component/ScrollSwitchView2";

function App() {
  useScrollAnimations();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lok Sabha Elections 2024</h1>
        <nav>
          <button
            onClick={() =>
              document
                .querySelector(".BubbleChart")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            BubbleChart
          </button>
          <button
            onClick={() =>
              document
                .querySelector(".timeline")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Timeline
          </button>
          <button
            onClick={() =>
              document
                .querySelector(".barchart")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            BarChart
          </button>
          <button
            onClick={() =>
              document
                .querySelector(".piechart")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Pie Chart
          </button>
          <button
            onClick={() =>
              document
                .querySelector(".thematicmap")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Thematic Map
          </button>
        </nav>
      </header>

      <main>
        <section className="section BubbleChart" style={{marginTop:"5%"}}>
          <BubbleChart />
        </section>
        <div className="">
          <BubbleChartScrolly />
        </div>
        <section className="section timeline">
          <Timeline />
        </section>
        <section className="section barchart">
          <BarChart />
        </section>
        <section className="section piechart">
          <PieChart />
        </section>
      </main>
      <div className="">
          <ImagesForMap />
        </div>
        <div className="">
          <ScrollJackingComponent />
        </div>
      <div className="">
          <ChoroplethMap />
        </div>
        <div className="">
          <ImagesForMap2 />
        </div>

      <footer>
        <p>Lok Sabha Elections 2024 | Scrollytelling Visualization</p>
      </footer>
    </div>
  );
}

export default App;