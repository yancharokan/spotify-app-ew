import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

class Editor extends Component{
    render(){
        return(
                
        )
    

        }
}

mapStateToProps = state => {
    return{
    pozition_stamp: state.pozition_stamp
    }
}
mapDispatchToProps = dispatch =>{
    return{
    setPozitionStamp: pozition_stamp =>
        dispatch({type: actionTypes.NOW_POZITION_STAMP,pozition_stamp})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor)