import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { Scrollama, Step } from 'react-scrollama';
import boothImage from "../photos/photo23.jpg";
import pollingImage from "../photos/photo24.avif";

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
  },
  graphic: {
    flexBasis: '52%',
    position: 'sticky',
    width: '100%',
    height: '60vh',
    top: '20vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', 
    '& img': {
      borderRadius: '20px',
      maxWidth: '110%',
      maxHeight: '110%',
      objectFit: 'contain', 
      transition: 'transform 0.3s ease', 
      zoom: '280%'
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
    flexBasis: '35%',
  },
  step: {
    margin: '0 auto 3rem auto',
    padding: '180px 0',

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

                const visibility = isVisible ? 'visible' : 'hidden';
                return (
                  <Step data={value} key={value}>
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
