import React from "react";
import "./App.css";
import HeatMap from "./component/HeatMap";
import PieChart from "./component/PieChart";
import ThematicMap from "./component/ThematicMap";
import Timeline from "./component/Timeline";
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
                .querySelector(".heatmap")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Heatmap
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
        <section className="section heatmap">
          <HeatMap />
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
        <div className="App">
          <ImagesForMap2 />
        </div>
      </main>

      <footer>
        <p>Lok Sabha Elections 2024 | Scrollytelling Visualization</p>
      </footer>
    </div>
  );
}

export default App;