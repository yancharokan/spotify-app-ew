import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import { Box, Tab, Tabs, Text ,Grommet, Grid} from 'grommet';
import Secici from '../Secici/Secici'

import { grommet } from "grommet/themes";


class Editor extends Component{
    constructor(props){
        super(props);
        this.state={
            saniye:0,
            selectedIndex:0,
            secenek:0,
            
        }
        
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
        console.log(' toplamsure:  '+toplamsure)

        const createTable = (sefer) => {
          let table=[]
          for (let i=0 ;i<=sefer; i++){
            table.push(
    
            <Tab  plain={true} title={'-'+i+'-'}>
               <Grid   areas={[
                        { name: 'oan', start: [1, 1], end: [1, 1] },
                        { name: 'onceki', start: [0, 1], end: [0, 1] },
                        { name: 'sonraki', start: [2, 1], end: [2, 1] }
    
                      ]}
                      columns={['1/3', '1/3','1/3']}
                      rows={['', 'auto']}
                      gap='small'
                    >
            <Box  
            gridArea='oan'
             background='brand'
              margin='medium'
              pad='medium'
            >
            <div>
            <Secici></Secici>
            </div>
            <Text>{i}</Text>
            </Box>
            <Box 
              gridArea='onceki'
              background='brand'
              margin='medium'
              pad='medium'
            >
            <Text>{i-1}</Text>
             
            </Box>
            <Box 
              gridArea='sonraki'
              background='brand'
              margin='medium'
              pad='medium'
            >
            <Text>{i+1}</Text>
            </Box>
            </Grid>
          </Tab>
          )
          } return table
        }
        //let mainContent=(toplamsure? toplamsure:0);
      let maincost =(
        'telefondan şarkı seç bakalım'
      )
          
        
        if (toplamsure){
        maincost=(   
          <Grommet theme={grommet} full>
          <Box fill={true}>
          <Tabs flex alignSelf='center' background='brand' activeIndex={oAnlıkSure} onActive={i=>this.props.zamanagit("e",(1-(toplamsure-i)/toplamsure)*100)}>
            
            {createTable(toplamsure)}              
          </Tabs>
          </Box>
        </Grommet> )
        }

        //let duzenleyici001 = toplamsure === 0 ? 'telefonunuzdan şarkıseç': {duzenleici}
         
        return(
        <div>  
          {maincost}      
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