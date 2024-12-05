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
    width: '300px',
    height: '300px',
    overflow: 'hidden',
    border: '2px solid #ddd',
  },
  imageCss: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '150%',
    height: 'auto',
    transform: 'translate(-50%, -50%) scale(0.9)', // Default scale
    objectFit: 'cover',
    opacity: 0, // Start fully transparent
    transition: 'opacity 0.5s ease, transform 0.5s ease', // Smooth fade and scale
  },
  imageActive: {
    opacity: 1, // Fully visible when active
    transform: 'translate(-50%, -50%) scale(1)', // Normal scale when active
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  scroller: {
    flexBasis: '35%',
  },
  step: {
    margin: '0 auto 3rem auto',
    padding: '180px 0',
    //border: '5px solid',
    '& p': {
      textAlign: 'center',
      padding: '1rem',
      fontSize: '1.3rem',
      margin: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
};

class Demo extends PureComponent {
  state = {
    data: 0,
    steps: [10, 20, 30],
    progress: 0,
  };

  onStepEnter = (e) => {
    const { data } = e;
    this.setState({ data });
  };

  onStepExit = ({ direction, data }) => {
    if (direction === 'up' && data === this.state.steps[0]) {
      this.setState({ data: 0 });
    }
  };

  render() {
    const { data, steps } = this.state;
    const { classes } = this.props;

    const images = {
      10: myImage3,
      20: myImage4,
      30: myImage5,
    };

    return (
      <div>
        <div className={classes.graphicContainer}>
          <div className={classes.scroller}>
            <Scrollama
              onStepEnter={this.onStepEnter}
              onStepExit={this.onStepExit}
              offset="0.6"
            >
              {steps.map((value) => (
                <Step data={value} key={value}>
                  <div
                    className={classes.step}
                    style={{
                      color: value === data ? 'rgba(44,127,184, 1)' : 'white',
                    }}
                  >
                    {/* Description text */}
                    {value === 10 && (
                      <h10>
                        Record Voter Turnout: Approximately 642 million voters participated
                        in the election, marking the highest voter turnout in India's history.
                      </h10>
                    )}
                    {value === 20 && (
                      <h10>
                        BJP's Loss of Single-Party Majority: The Bharatiya Janata Party (BJP),
                        led by Prime Minister Narendra Modi, secured 240 seats.
                        </h10>
                    )}
                    {value === 30 && (
                      <h10>
                        Introduction of 'Vote-from-Home' Facility: For the first time in a Lok
                        Sabha election, the Election Commission implemented a 'vote-from-home'
                        option.
                        </h10>
                    )}
                  </div>
                </Step>
              ))}
            </Scrollama>
          </div>
          <div className={classes.graphic}>
            {steps.map((value) => (
              <img
                key={value}
                src={images[value]}
                alt={`Step ${value}`}
                className={`${classes.imageCss} ${
                  value === data ? classes.imageActive : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Demo);
