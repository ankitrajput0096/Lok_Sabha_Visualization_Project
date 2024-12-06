import { color, zoom } from 'd3';
import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { Scrollama, Step } from 'react-scrollama';
import myImage2 from "../photos/Picture1.jpg"; 
import myImage1 from "../photos/Picture2.png"; 

const styles = {
  parent_container: {
    position: 'relative',
    width: '300px',
    height: '300px', 
    overflow: 'hidden', 
    border: '2px solid #ddd' 
  },
  imageCss: {
    position: 'absolute', 
    top: '50%',
    left: '50%',
    width: '150%', 
    height: 'auto', 
    transform: 'translate(-50%, -50%)', 
    objectFit: 'cover', 
    zoom: '150%'
  },
  graphicContainer: {
    padding: '0vh 4vw 0vh',
    display: 'flex',
    justifyContent: 'space-between',
    color: 'black'
  },
  graphic: {
    position: 'sticky',
    width: '100%',
    height: '70vh',
    top: '20vh',
    backgroundColor: '#aaa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', 
    '& img': {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      transition: 'transform 0.3s ease', 
      zoom: '250%'
    },
    '& img:hover': {
      transform: 'scale(1.1)',
    },
    '& p': {
      fontSize: '5rem',
      fontWeight: 700,
      textAlign: 'center',
      color: '#fff',
    },
  },
  scroller: {
    flexBasis: '0.1%',
  },
  step: {
    margin: '0 auto 3rem auto',
    padding: '180px 0',
    visibility: 'hidden',
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
    const { data } = e;
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

    const img = data === 10 || data === 0
      ? <img src={myImage1} alt="Description of the image" class="imageCss" />
      : <img src={myImage2} alt="Description of the image" class="imageCss" />;

    return (
      <div>
        <div className={classes.graphicContainer}>
          <div className={classes.scroller}>
            <Scrollama
              onStepEnter={this.onStepEnter}
              onStepExit={this.onStepExit}
              onStepProgress={this.onStepProgress}
              offset="0.3"
            >
              {steps.map(value => {
                const isVisible = value === data;
                const background = isVisible
                  ? `rgba(44,127,184, ${progress})`
                  : 'white';
                const visibility = isVisible ? 'visible' : 'hidden';
                return (
                  <Step data={value} key={value}>
                    <div className={classes.step} style={{ background }}>
                    </div>
                  </Step>
                );
              })}
            </Scrollama>
          </div>
          <div className={classes.graphic}>
          <div class="parent-container">
          {img}
          </div>


          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Demo);
