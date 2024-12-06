// import React from "react";
// import boothImage from "../images/booth.jpg";
// import pollingImage from "../images/polling.jpg";

// const BubbleChartScrolly = () => {
//   return (
//       <div style={{display:"flex"}}>
//         <img src={boothImage} alt="Voters in Queue" style={{display:"flex",width:"45%", height:"100vh", marginRight:"40px",marginLeft:"40px"}}/>
//         <img src={pollingImage} alt="Electronic Voting Machine" style={{display:"flex",width:"45%", height:"100vh", marginLeft:"40px"}}/>
//       </div>
//   );
// };

// export default BubbleChartScrolly;

import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { Scrollama, Step } from 'react-scrollama';
import boothImage from "../photos/photo23.jpg";
import pollingImage from "../photos/photo24.avif";

const styles = {
  parent_container: {
    position: 'relative',
    width: '300px', /* Set the desired width of the parent container */
    height: '300px', /* Set the desired height of the parent container */
    overflow: 'hidden', /* Prevent the image from overflowing */
    border: '2px solid #ddd' /* Optional: add a border to see boundaries */
  },
  imageCss: {
    position: 'absolute', /* Positioning the image inside the container */
    top: '50%',
    left: '50%',
    width: '150%', /* Increase width to zoom */
    height: 'auto', /* Maintain aspect ratio */
    transform: 'translate(-50%, -50%)', /* Center the image */
    objectFit: 'cover', /* Ensures image covers the container */
    zoom: '150%'
  },
  graphicContainer: {
    padding: '0vh 4vw 0vh',
    display: 'flex',
    justifyContent: 'space-between',
  },
  graphic: {
    flexBasis: '52%',
    position: 'sticky',
    width: '100%',
    height: '60vh',
    top: '20vh',
    //backgroundColor: '#aaa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Ensure content does not overflow the container
    '& img': {
      borderRadius: '20px', /* Smooth corners */
      maxWidth: '110%',
      maxHeight: '110%',
      objectFit: 'contain', // Ensure the image scales while maintaining aspect ratio
      transition: 'transform 0.3s ease', // Smooth zoom transition
      zoom: '280%'
    },
    '& img:hover': {
      transform: 'scale(1.1)', // Slightly enlarge the image on hover
    },
    '& p': {
      fontSize: '5rem',
      fontWeight: 700,
      textAlign: 'center',
      color: '#fff',
    },
  },
  // css for left box
  scroller: {
    flexBasis: '35%',
  },
  step: {
    margin: '0 auto 3rem auto',
    padding: '180px 0',
    // border: '5px solid',
    '& p': {
      textAlign: 'center',
      padding: '1rem',
      fontSize: '1.8rem',
      margin: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  }
};

class Demo extends PureComponent {
  state = {
    data: 0,
    steps: [10, 20],
    progress: 0,
  };

  onStepEnter = e => {
    const { data, entry, direction} = e;
    this.setState({ data });
  };

  onStepExit = ({ direction, data }) => {
    if (direction === 'up' && data === this.state.steps[0]) {
      this.setState({ data: 0 });
    }
  };

  onStepProgress = ({ progress }) => {
    this.setState({ progress });
  };



  render() {
    const { data, steps, progress } = this.state;
    const { classes } = this.props;

    let img = <img src={boothImage} alt="Description of the image" class="imageCss"/>;
    if(data === 0 || data === 10) {
      img = <img src={boothImage} alt="Description of the image" class="imageCss"/>;
    } else if(data === 20) {
      img = <img src={pollingImage} alt="Description of the image" class="imageCss"/>;
    }
    else 
    {
      img = <img src={pollingImage} alt="Description of the image" class="imageCss"/>;
    }

    let description = <h10>The elections highlighted India's democratic inclusivity, as voters from various backgrounds actively took part. A striking image of a women casting their vote at a nearby polling booth underscores the accessibility and effectiveness of the electoral process. This scene embodies the dynamic and diverse engagement that characterizes Indian democracy, ensuring every individual plays a role in shaping the country's future.</h10>;
    if(data === 0 || data === 10) {
      description = <h10>The elections highlighted India's democratic inclusivity, as voters from various backgrounds actively took part. A striking image of a women casting their vote at a nearby polling booth underscores the accessibility and effectiveness of the electoral process. This scene embodies the dynamic and diverse engagement that characterizes Indian democracy, ensuring every individual plays a role in shaping the country's future.</h10>;
    } else if(data === 20) {
      description = <h10>The 2024 Indian Parliament elections, held in seven phases, underscored the nation's steadfast commitment to democracy, with numerous constituencies participating in each phase. This image embodies the essence of democratic spirit, featuring a young women voter proudly displaying their Indian voter ID's—a powerful symbol of women's empowerment in the country.</h10>
    }
    else {
      description = <h10>The 2024 Indian Parliament elections, held in seven phases, underscored the nation's steadfast commitment to democracy, with numerous constituencies participating in each phase. This image embodies the essence of democratic spirit, featuring a young women voter proudly displaying their Indian voter ID's—a powerful symbol of women's empowerment in the country.</h10>
    }

    return (
      <div>
        <div className={classes.graphicContainer}>
          <div className={classes.scroller}>
            <Scrollama
              onStepEnter={this.onStepEnter}
              onStepExit={this.onStepExit}
              progress
              onStepProgress={this.onStepProgress}
              offset="0.6"
            >
              {steps.map(value => {
                const isVisible = value === data;
                const backgroundColor = isVisible
                  ? `black`
                  : 'white';

                // const background = isVisible
                // ? `white`
                // : 'white';

                const visibility = isVisible ? 'visible' : 'hidden';
                return (
                  <Step data={value} key={value}>

                    {/* css for the left box can be changes here */}
                    <div className={classes.step} style={
                        
                        { color: backgroundColor,
                         }
                        
                        
                        }>
                      {description}
                    </div>
                  </Step>
                );
              })}
            </Scrollama>
          </div>
          <div className={classes.graphic}>
            {img}
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Demo);
