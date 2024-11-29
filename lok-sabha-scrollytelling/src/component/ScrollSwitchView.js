// import { color } from 'd3';
import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { Scrollama, Step } from 'react-scrollama';
import myImage3 from "../photos/Picture4.jpg"; // Adjust the path to the image
import myImage4 from "../photos/photo6.jpg"; // Adjust the path to the image
import myImage5 from "../photos/photo10.jpg"; // Adjust the path to the image

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
    padding: '7vh 4vw 7vh',
    display: 'flex',
    justifyContent: 'space-between',
  },
  graphic: {
    flexBasis: '60%',
    position: 'sticky',
    width: '100%',
    height: '55vh',
    top: '20vh',
    backgroundColor: '#aaa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Ensure content does not overflow the container
    '& img': {
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
    steps: [10, 20, 30],
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

    let img = <img src={myImage3} alt="Description of the image" class="imageCss"/>;
    if(data === 0 || data === 10) {
      img = <img src={myImage3} alt="Description of the image" class="imageCss"/>;
    } else if(data === 20) {
      img = <img src={myImage4} alt="Description of the image" class="imageCss"/>;
    } else {
      img = <img src={myImage5} alt="Description of the image" class="imageCss"/>;
    }

    let description = <p>Record Voter Turnout: Approximately 642 million voters participated in the election, marking the highest voter turnout in India's history. Notably, 312 million of these were women, reflecting a significant increase in female electoral participation. </p>
    if(data === 0 || data === 10) {
      description = <p>Record Voter Turnout: Approximately 642 million voters participated in the election, marking the highest voter turnout in India's history. Notably, 312 million of these were women, reflecting a significant increase in female electoral participation. </p>
    } else if(data === 20) {
      description = <p>BJP's Loss of Single-Party Majority: The Bharatiya Janata Party (BJP), led by Prime Minister Narendra Modi, secured 240 seats, down from 303 in the 2019 election. This loss resulted in the BJP falling short of the 272-seat threshold required for a single-party majority, necessitating reliance on coalition partners within the National Democratic Alliance (NDA) to form the government.</p>;
    } else {
      description = <p>Introduction of 'Vote-from-Home' Facility: For the first time in a Lok Sabha election, the Election Commission of India implemented a 'vote-from-home' option for voters aged 85 and above, as well as for persons with disabilities. This initiative aimed to enhance electoral participation among these groups by providing greater accessibility.</p>;
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
                  ? `rgba(44,127,184, ${progress})`
                  : 'white';

                // const background = isVisible
                // ? `white`
                // : 'white';

                const visibility = isVisible ? 'visible' : 'hidden';
                return (
                  <Step data={value} key={value}>

                    {/* css for the left box can be changes here */}
                    <div className={classes.step} style={
                        
                        { color: backgroundColor, }
                        
                        
                        }>
                      {/* <p>step value: {value}</p> */}
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