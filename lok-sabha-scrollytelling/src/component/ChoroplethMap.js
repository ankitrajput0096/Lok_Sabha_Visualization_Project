import { color } from 'd3';
import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { Scrollama, Step } from 'react-scrollama';
import ThematicMap from './ThematicMap';
const styles = {
  graphicContainer: {
    padding: '10vh 2vw 10vh',
    display: 'flex',
    justifyContent: 'space-between',
  },
  graphic: {
    flexBasis: '60%',
    position: 'sticky',
    width: '100%',
    height: '40vh',
    top: '20vh',
    backgroundColor: '#aaa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& p': {
      fontSize: '5rem',
      fontWeight: 700,
      textAlign: 'center',
      color: '#fff',
    },
  },
  // css for left box
  scroller: {
    flexBasis: '15%',
  },
  step: {
    margin: '0 auto 3rem auto',
    border: '5px solid',
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
    steps: [1, 2, 3, 4, 5, 6, 7],
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


    const phases = [
      "Phase I (April 19)",
      "Phase I (April 19)",
      "Phase II (April 26)",
      "Phase III (May 7)",
      "Phase IV (May 13)",
      "Phase V (May 20)",
      "Phase VI (May 25)",
      "Phase VII (June 1)",
      "All Winners",
    ];

    let selectedPhase = phases[data];

    const phasesText = [
`
Highlights: Re-polling was necessitated in certain areas due to incidents of violence and technical issues. For instance, 11 polling stations in Inner Manipur underwent re-polling on April 22, and eight stations in Arunachal Pradesh on April 24. 
`,
`
Highlights: Re-polling was necessitated in certain areas due to incidents of violence and technical issues. For instance, 11 polling stations in Inner Manipur underwent re-polling on April 22, and eight stations in Arunachal Pradesh on April 24. 
`,
`
Highlights: Notable candidates included Rahul Gandhi and Hema Malini. Re-polling occurred in select areas due to disruptions; for example, a polling station in Chamarajanagar, Karnataka, on April 29, and six stations in Outer Manipur on April 30. 
`,
`
Highlights: Prime Minister Narendra Modi cast his vote in this phase in Gujarat. The voter turnout was approximately 65.68%, with 17.24 crore citizens eligible to vote. 
`,
`
Highlights: This phase included key regions such as parts of Uttar Pradesh and Bihar. Voter participation was robust, reflecting the electorate's engagement. 
`,
`
Highlights: Voting took place in significant areas, including parts of Rajasthan and Madhya Pradesh. Despite high temperatures, voter turnout remained steady. 
`,
`
Highlights: Delhi was among the regions that voted in this phase. The Election Commission implemented measures to ensure smooth polling amid the summer heat. 
`,
`
Highlights: This final phase covered areas in Punjab and parts of Uttar Pradesh. Re-polling was ordered in two booths in West Bengal due to reported irregularities.
`];

let selectedPhaseText = phasesText[data];


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


          <div className={classes.graphic}>
            <p>I love cars {data}</p>
            {/* <ThematicMap selectedPhase={selectedPhase} /> */}
          </div>

          <div className={classes.scroller}>
            <Scrollama
              onStepEnter={this.onStepEnter}
              onStepExit={this.onStepExit}
              progress
              onStepProgress={this.onStepProgress}
              offset="400px"
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
                    <div className={classes.step}>
                      {/* <p>step value: {value}</p> */}
                      {description}
                    </div>
                  </Step>
                );
              })}   
            </Scrollama>
          </div>





        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Demo);