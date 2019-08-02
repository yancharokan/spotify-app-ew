import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import { Box, Tab, Tabs, Text, Image , Grid, RoutedButton} from 'grommet';
import { Apps } from 'grommet-icons';
//import SandboxComponent from './SandboxComponent';


const SandboxComponent = props => (
  <Grid>
    <Box align='start'>
      <RoutedButton icon={<Apps />} path='/' hoverIndicator={true} />
    </Box>
    <Box {...props} />
  </Grid>
);

SandboxComponent.defaultProps = {
  align: 'center',
  pad: 'large',
};


class Editor extends Component{
    constructor(props){
        super(props);
        this.state={
            saniye:0,
            selectedIndex:0,
            secenek:0
            
        }
        
    }

    createTable = sefer => {
      let table=[];
      for (let i=0 ;i<=sefer; i++){
        table.push(
        <Tab title={i}>
        <Box
          margin='small'
          pad='small'
        >
        <Text>{i}</Text>
        </Box>
      </Tab>
      )
      } return table
    }
    
    milisToMinutesAndSeconds = mil => {
        let minutes = Math.floor(mil / 60000);
        let seconds = ((mil % 60000) / 1000).toFixed(0);
        let toplamsnye = Math.floor((Number(minutes)*60)+Number(seconds));
        return toplamsnye
    };

    

    render(){
        let toplamsure=this.milisToMinutesAndSeconds(this.props.durationStamps)
        let oAnlıkSure=this.milisToMinutesAndSeconds(this.props.pozition_stamp)
        //let mainContent=(toplamsure? toplamsure:0);
         
        return(
        <div>
        <SandboxComponent>
          <Tabs height='medium' flex="shrink" alignSelf='center' activeIndex={oAnlıkSure} onActive={i=>this.props.zamanagit("e",(1-(toplamsure-i)/toplamsure)*100)}>
            {this.createTable(toplamsure)}
          </Tabs>
        </SandboxComponent>
      
        
        </div>
            )
        }
}

const mapStateToProps = state => {
    return{
    pozition_stamp: state.pozition_stamp,
    durationStamps: state.durationStamps
    }
}
const mapDispatchToProps = dispatch =>{
    return{
    setPozitionStamp: pozition_stamp =>
        dispatch({type: actionTypes.NOW_POZITION_STAMP,pozition_stamp})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor)