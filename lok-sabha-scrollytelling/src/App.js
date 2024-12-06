import React from "react";
import "./App.css";
import BubbleChart from "./component/BubbleChart";
import PieChart from "./component/PieChart";
import Timeline from "./component/Timeline";
import BubbleChartScrolly from "./component/BubbleChartScrolly"
import useScrollAnimations from "./hooks/useScrollAnimations";
import BarChart from "./component/BarChart"
import ScrollJackingComponent from "./component/ScrollSwitchView";
import ImagesForMap from "./component/MapImage";
import ImagesOFCartoon from "./component/CartoonImage";
import ImagesForMap2 from "./component/MapImage2";
import ChoroplethMap from "./component/ScrollSwitchView2";
import Footer from "./component/Footer";
import Introduction from "./component/Intro";
import Conclusion from "./component/conclusion";

function App() {
  useScrollAnimations();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lok Sabha Elections 2024</h1>
      </header>

      <div className="">
          <Introduction />
        </div>
      <main>
        <section className="section BubbleChart" style={{marginTop:"5%"}}>
          <BubbleChart />
        </section>
        <div className="">
          <BubbleChartScrolly />
        </div>
        <section className="section timeline-section">
          <Timeline />
        </section>
        <div className="">
          <BarChart />
        </div>
        <div className="">
          <ImagesOFCartoon />
        </div>
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
          <Conclusion />
        </div>
        <div className="">
          <ImagesForMap2 />
        </div>

      <footer>
          <Footer/>
      </footer>
    </div>
  );
}

export default App;