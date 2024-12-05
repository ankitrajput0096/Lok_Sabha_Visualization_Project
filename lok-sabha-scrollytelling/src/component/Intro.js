// import React, { PureComponent } from 'react';
// import injectSheet from 'react-jss';
// import { Scrollama, Step } from 'react-scrollama';

// const styles = {
//   graphicContainer: {
//     padding: '7vh 4vw 7vh',
//     display: 'flex',
//     justifyContent: 'space-between',
//     color: 'black'
//   },
//   graphic: {
//     position: 'sticky',
//     height: '70vh',
//     display: 'flex',
//     alignItems: 'center',
//     overflow: 'hidden', // Ensure content does not overflow the container
//   },
//   scroller: {
//     flexBasis: '0.1%',
//   },
//   step: {
//     margin: '0 auto 3rem auto',
//     padding: '180px 0',
//     visibility: 'hidden',
//   }
// };

// class Demo extends PureComponent {
//   state = {
//     data: 0,
//     steps: [10],
//     progress: 0,
//   };

//   onStepEnter = e => {
//     const { data } = e;
//     this.setState({ data });
//   };

//   onStepExit = ({ direction, data }) => {
//     if (direction === 'up' && data === this.state.steps[0]) {
//       this.setState({ data: 0 });
//     }
//   };

//   onStepProgress = ({ progress }) => {
//     this.setState({ progress });
//   };

//   render() {
//     const { data, steps, progress } = this.state;
//     const { classes } = this.props;

//     const img = 
//     <div>
//       <h10> 
// The Lok Sabha elections 2024, a cornerstone of India’s democracy, will determine
//  the composition of the 18th Lok Sabha, the lower house of Parliament. Established 
//  in 1951-52 with India’s first general elections, the Lok Sabha represents the direct 
//  voice of over 900 million voters, making these elections the largest democratic exercise globally. 
//  The elections are conducted every five years, with the 2024 polls expected to be held in 7-8 
//  phases between April and May. The house comprises 543 elected members, with a majority threshold of 
//  272 seats required to form the government. Key players in the election include the 
//  Bharatiya Janata Party (BJP), led by Prime Minister Narendra Modi, the Indian National Congress (INC), and 
//  other influential regional parties like the Trinamool Congress (TMC), Dravida Munnetra Kazhagam (DMK), and 
//  Aam Aadmi Party (AAP). These elections are pivotal in shaping the country’s political landscape, reflecting 
//  its diversity and regional aspirations.</h10>
//  <br></br>
//  <br></br>
//       <h10> Managing such a vast electoral process is a herculean task overseen by the Election Commission of India (ECI), 
//         an autonomous body ensuring fair and transparent voting. Technology plays a crucial role, with tools like 
//         Electronic Voting Machines (EVMs), Voter-Verified Paper Audit Trails (VVPATs), and online voter services facilitating 
//         efficiency. Over a million polling stations are set up across the country, with special logistical arrangements for 
//         remote and challenging terrains. Millions of personnel, including polling officers and security forces, are deployed, 
//         and security is heightened in sensitive areas. Awareness campaigns like SVEEP encourage voter participation, 
//         ensuring inclusivity for all, including differently-abled and senior citizens. The Lok Sabha elections are a 
//         testament to the strength of India’s democratic fabric, showcasing a blend of tradition, modernity, and an unwavering 
//         commitment to empowering citizens through the electoral process.</h10>;
//         </div>;

//     return (
//       <div>
//         <div className={classes.graphicContainer}>
//           <div className={classes.scroller}>
//             <Scrollama
//               onStepEnter={this.onStepEnter}
//               onStepExit={this.onStepExit}
//               onStepProgress={this.onStepProgress}
//               offset="0.3"
//             >
//               {steps.map(value => {
//                 const isVisible = value === data;
//                 const background = isVisible
//                   ? `rgba(44,127,184, ${progress})`
//                   : 'white';
//                 const visibility = isVisible ? 'visible' : 'hidden';
//                 return (
//                   <Step data={value} key={value}>
//                     <div className={classes.step} style={{ background }}>
//                     </div>
//                   </Step>
//                 );
//               })}
//             </Scrollama>
//           </div>
//           <div className={classes.graphic}>
//           <div>
//           {img}
//           </div>


//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default injectSheet(styles)(Demo);

import { Opacity } from '@mui/icons-material';
import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { Scrollama, Step } from 'react-scrollama';

const styles = {
  graphicContainer: {
    padding: '7vh 4vw 7vh',
    display: 'flex',
    justifyContent: 'space-between',
    color: 'black',
  },
  graphic: {
    position: 'sticky',
    height: '90vh',
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent overlay
    zIndex: 1,
  },
  textOverlay: {
    position: 'relative',
    zIndex: 2,
    color: 'black',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'white', // White background for text
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for emphasis
    opacity: '0.8',
    margin: '70px',
    height: '25vh',

  },
  scroller: {
    flexBasis: '0.1%',
  },
  step: {
    margin: '0 auto 3rem auto',
    padding: '180px 0',
    visibility: 'hidden',
  },
};

class Demo extends PureComponent {
  state = {
    data: 0,
    steps: [10],
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

  onStepProgress = ({ progress }) => {
    this.setState({ progress });
  };

  render() {
    const { data, steps, progress } = this.state;
    const { classes } = this.props;

    const img = (
      <div className={classes.textOverlay}>
        <h10>
          The Lok Sabha elections 2024, a cornerstone of India’s democracy, will determine the
          composition of the 18th Lok Sabha, the lower house of Parliament. Established in 1951-52
          with India’s first general elections, the Lok Sabha represents the direct voice of over
          900 million voters, making these elections the largest democratic exercise globally. The
          elections are conducted every five years, with the 2024 polls expected to be held in 7-8
          phases between April and May. The house comprises 543 elected members, with a majority
          threshold of 272 seats required to form the government. Key players in the election
          include the Bharatiya Janata Party (BJP), led by Prime Minister Narendra Modi, the Indian
          National Congress (INC), and other influential regional parties like the Trinamool
          Congress (TMC), Dravida Munnetra Kazhagam (DMK), and Aam Aadmi Party (AAP). These
          elections are pivotal in shaping the country’s political landscape, reflecting its
          diversity and regional aspirations.
        </h10>
        {/* <br />
        <br />
        <h10>
          Managing such a vast electoral process is a herculean task overseen by the Election
          Commission of India (ECI), an autonomous body ensuring fair and transparent voting.
          Technology plays a crucial role, with tools like Electronic Voting Machines (EVMs),
          Voter-Verified Paper Audit Trails (VVPATs), and online voter services facilitating
          efficiency. Over a million polling stations are set up across the country, with special
          logistical arrangements for remote and challenging terrains. Millions of personnel,
          including polling officers and security forces, are deployed, and security is heightened
          in sensitive areas. Awareness campaigns like SVEEP encourage voter participation,
          ensuring inclusivity for all, including differently-abled and senior citizens. The Lok
          Sabha elections are a testament to the strength of India’s democratic fabric, showcasing a
          blend of tradition, modernity, and an unwavering commitment to empowering citizens through
          the electoral process.
        </h10> */}
      </div>
    );

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
              {steps.map((value) => {
                const isVisible = value === data;
                const background = isVisible
                  ? `rgba(44,127,184, ${progress})`
                  : 'white';
                const visibility = isVisible ? 'visible' : 'hidden';
                return (
                  <Step data={value} key={value}>
                    <div className={classes.step} style={{ background }} />
                  </Step>
                );
              })}
            </Scrollama>
          </div>
          <div
            className={classes.graphic}
            style={{
              backgroundImage: `url('https://www.hindustantimes.com/ht-img/img/2023/09/18/1600x900/INDIA-POLITICS-PARLIAMENT-0_1695024273930_1695024348494.jpg')`, // Replace with your image URL
            }}
          >
            <div className={classes.backgroundOverlay}></div>
            {img}
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Demo);
