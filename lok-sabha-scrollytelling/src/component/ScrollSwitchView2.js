import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { Scrollama, Step } from 'react-scrollama';
import ThematicMap from './ThematicMap';

const styles = {
  graphicContainer: {
    padding: '7vh 4vw 7vh',
    display: 'flex',
    justifyContent: 'space-between',
  },
  graphic: {
    flexBasis: '60%',
    position: 'sticky',
    width: '100%',
    height: '75vh',
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
    '& p': {
      textAlign: 'center',
      padding: '1rem',
      fontSize: '1.3rem',
      margin: 0,
    },
    '&:last-child': {
      marginBottom: '200px',
    },
  },
};

class Demo extends PureComponent {
  state = {
    data: 0,
    steps: [1, 2, 3, 4, 5, 6, 7],
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

    const phases = [
      'Phase I (April 19)',
      'Phase II (April 26)',
      'Phase III (May 7)',
      'Phase IV (May 13)',
      'Phase V (May 20)',
      'Phase VI (May 25)',
      'Phase VII (June 1)',
    ];

    return (
      <div>
        <div className={classes.graphicContainer}>
          {/* ThematicMap remains steady and updates the selectedPhase */}
          <div className={classes.graphic}>
            <ThematicMap selectedPhase={phases[data - 1]} />
          </div>

          <div className={classes.scroller}>
            <Scrollama
              onStepEnter={this.onStepEnter}
              onStepExit={this.onStepExit}
              offset="0.5"
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
                    {value === 1 && (
                     <h10>
                        Highlights: Re-polling was necessitated in certain areas due to
                        incidents of violence and technical issues. For instance, 11 polling
                        stations in Inner Manipur underwent re-polling on April 22.
                        </h10>
                    )}
                    {value === 2 && (
                         <h10>
                        Highlights: Notable candidates included Rahul Gandhi and Hema Malini.
                        Re-polling occurred in select areas due to disruptions; for example, a
                        polling station in Chamarajanagar, Karnataka, on April 29, and six
                        stations in Outer Manipur on April 30.
                        </h10>
                    )}
                    {value === 3 && (
                          <h10>
                        Highlights: Prime Minister Narendra Modi cast his vote in this phase
                        in Gujarat. The voter turnout was approximately 65.68%, with 17.24
                        crore citizens eligible to vote.
                        </h10>
                    )}
                    {value === 4 && (
                          <h10>
                        Highlights: This phase included key regions such as parts of Uttar
                        Pradesh and Bihar. Voter participation was robust, reflecting the
                        electorate engagement.
                        </h10>
                    )}
                    {value === 5 && (
                         <h10>
                        Highlights: Voting took place in significant areas, including parts of
                        Rajasthan and Madhya Pradesh. Despite high temperatures, voter turnout
                        remained steady.
                        </h10>
                    )}
                    {value === 6 && (
                             <h10>
                        Highlights: Delhi was among the regions that voted in this phase. The
                        Election Commission implemented measures to ensure smooth polling amid
                        the summer heat.
                        </h10>
                    )}
                    {value === 7 && (
                          <h10>
                        Highlights: This final phase covered areas in Punjab and parts of
                        Uttar Pradesh. Re-polling was ordered in two booths in West Bengal due
                        to reported irregularities.
                      </h10>
                    )}
                  </div>
                </Step>
              ))}
            </Scrollama>
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Demo);
