import { color, zoom } from 'd3';
import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { Scrollama, Step } from 'react-scrollama';
import myImage2 from "../photos/Picture1.jpg"; // Adjust the path to the image
import myImage1 from "../photos/Picture2.png"; // Adjust the path to the image

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
    color: 'black'
  },
  graphic: {
    position: 'sticky',
    width: '100%',
    height: '70vh',
    top: '20vh',
    //backgroundColor: '#aaa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Ensure content does not overflow the container
    '& img': {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain', // Ensure the image scales while maintaining aspect ratio
      transition: 'transform 0.3s ease', // Smooth zoom transition
      zoom: '250%'
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
The Lok Sabha elections 2024, a cornerstone of India’s democracy, will determine
 the composition of the 18th Lok Sabha, the lower house of Parliament. Established 
 in 1951-52 with India’s first general elections, the Lok Sabha represents the direct 
 voice of over 900 million voters, making these elections the largest democratic exercise globally. 
 The elections are conducted every five years, with the 2024 polls expected to be held in 7-8 
 phases between April and May. The house comprises 543 elected members, with a majority threshold of 
 272 seats required to form the government. Key players in the election include the 
 Bharatiya Janata Party (BJP), led by Prime Minister Narendra Modi, the Indian National Congress (INC), and 
 other influential regional parties like the Trinamool Congress (TMC), Dravida Munnetra Kazhagam (DMK), and 
 Aam Aadmi Party (AAP). These elections are pivotal in shaping the country’s political landscape, reflecting 
 its diversity and regional aspirations.</h10>
 <br></br>
 <br></br>
      <h10> Managing such a vast electoral process is a herculean task overseen by the Election Commission of India (ECI), 
        an autonomous body ensuring fair and transparent voting. Technology plays a crucial role, with tools like 
        Electronic Voting Machines (EVMs), Voter-Verified Paper Audit Trails (VVPATs), and online voter services facilitating 
        efficiency. Over a million polling stations are set up across the country, with special logistical arrangements for 
        remote and challenging terrains. Millions of personnel, including polling officers and security forces, are deployed, 
        and security is heightened in sensitive areas. Awareness campaigns like SVEEP encourage voter participation, 
        ensuring inclusivity for all, including differently-abled and senior citizens. The Lok Sabha elections are a 
        testament to the strength of India’s democratic fabric, showcasing a blend of tradition, modernity, and an unwavering 
        commitment to empowering citizens through the electoral process.</h10>;
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
