import React from "react";
import boothImage from "../images/booth.jpg";
import pollingImage from "../images/polling.jpg";

const BubbleChartScrolly = () => {
  return (
      <div style={{display:"flex"}}>
        <img src={boothImage} alt="Voters in Queue" style={{display:"flex",width:"45%", height:"100vh", marginRight:"40px",marginLeft:"40px"}}/>
        <img src={pollingImage} alt="Electronic Voting Machine" style={{display:"flex",width:"45%", height:"100vh", marginLeft:"40px"}}/>
      </div>
  );
};

export default BubbleChartScrolly;
