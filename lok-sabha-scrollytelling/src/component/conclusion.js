import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { Scrollama, Step } from 'react-scrollama';

const styles = {
  graphicContainer: {
    padding: '0vh 4vw 0vh',
    display: 'flex',
    justifyContent: 'space-between',
    color: 'black'
  },
  graphic: {
    position: 'sticky',
    //height: '70vh',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden', // Ensure content does not overflow the container
  },
  scroller: {
    flexBasis: '0.1%',
  },
  step: {
    margin: '0 auto 3rem auto',
    padding: '180px 0',
    visibility: 'hidden',
  }
};

class Demo extends PureComponent {
  state = {
    data: 0,
    steps: [10],
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

    const img = 
    <div>
      <h10> 
      The 2024 Lok Sabha elections in India, conducted in seven phases from April to June, saw intense competition among 
      political parties. Initially, the BJP faced setbacks, particularly in northern states like Uttar Pradesh, where its 
      seat count dropped from 64 in 2019 to 33, with the opposition alliance led by the Samajwadi Party making significant 
      gains. However, the BJP staged a remarkable comeback in the later phases, leveraging welfare schemes, national security 
      narratives, and strong grassroots campaigns. The party secured major wins in states like Maharashtra and other key regions, 
      ultimately winning 240 seats. With its National Democratic Alliance (NDA) partners, the coalition amassed 293 seats, surpassing 
      the majority mark of 272. Prominent leaders, including Prime Minister Narendra Modi, retained their constituencies, solidifying 
      the BJP’s leadership and marking Modi's third consecutive term as Prime Minister. This election reaffirmed Modi's enduring 
      influence in Indian politics and the BJP's ability to navigate challenges to maintain dominance.</h10>
 <br></br>
 <br></br>
        </div>;

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
          <div>
          {img}
          </div>


          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Demo);
