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
import ChoroplethMap from "./component/ChoroplethMap";

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
        <section className="section BubbleChart scrolly" style={{ display:"flex" }}>
  <BubbleChartScrolly />
</section>

        <section className="section timeline">
          <Timeline />
        </section>
        <section className="section barchart">
          <BarChart />
        </section>
        <section className="section piechart">
          <PieChart />
        </section>
        <div className="App">
          <ImagesForMap />
        </div>
        <div className="App">
          <ScrollJackingComponent />
        </div>
        <section className="section thematicmap">
          <ChoroplethMap />
        </section>
        
        <section className="section thematicmap">
          <ThematicMap />
        </section>
      </main>

      <footer>
        <p>Lok Sabha Elections 2024 | Scrollytelling Visualization</p>
      </footer>
    </div>
  );
}

export default App;