// import React, { useState } from 'react';
// import { Grommet, Anchor, Box, Button, Grid, Text,Form,RangeInput,Select ,CheckBox} from "grommet";
// import InputColor from 'react-input-color';


// function Coreography()  {
//     const [birinciled_x, setBirinciled_x] = useState(0);
//     const [birinciled_y, setBirinciled_y] = useState(0);
//     const [ikinciled_x, setIkinciled_x] = useState(0);
//     const [ikinciled_y, setIkinciled_y] = useState(0);
//     const [color1, setColor1] = React.useState({});
//     const [color2, setColor2] = React.useState({});
//     const [birinciLedSaniyedeTekrar, setBirinciLedSaniyedeTekrar] = React.useState('medium');
//     const [checked1, setChecked1] = React.useState(true);
    
//         return(
//         <div>
            
//             <Box
//                 pad="xxsmall"
//                 align="center"
//                 background={{ color: "light-2", opacity: "strong" }}
//                 round
//                 gap="small">
//                 <Form
//                     onReset={event => console.log(event)}>
//                         1. LED rengi 
//                             <InputColor initialHexColor="#5e72e4" onChange={setColor1} placement="right" /><br />
//                         1. led'in saniyede kaç defa yanıp döneceini giriniz<br/>
//                             <Select size="small" options={['1', '2', '3']} value={birinciLedSaniyedeTekrar} onChange={({ option }) => setBirinciLedSaniyedeTekrar(option)} />
//                             <CheckBox checked={checked1} label="Lazer" onChange={(event) => setChecked1(event.target.checked)}
//     />
//                         <br />
//                         1.led x ekseni {birinciled_x} derece
//                             <RangeInput value={birinciled_x} onChange={(event)=>{setBirinciled_x(event.target.value)}} />
//                         1.led y ekseni {birinciled_y} derece
//                             <RangeInput value={birinciled_y} onChange={(event)=>{setBirinciled_y(event.target.value)}} />
//                         2. led rengi
//                             <InputColor initialHexColor="#5e72e4" onChange={setColor2} placement="right" /><br />
//                         2.led x ekseni {ikinciled_x} derece
//                             <RangeInput value={ikinciled_x} onChange={(event)=>{setIkinciled_x(event.target.value)}} />
//                         2.led y ekseni {ikinciled_y} derecAe
//                             <RangeInput value={ikinciled_y} onChange={(event)=>{setIkinciled_y(event.target.value)}} />
                        
//                 </Form>
//             </Box>
//         </div>
//         );     
    
// }
// export default Coreography
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  LatestSales,
  UsersByDevice,
  LatestProducts,
} from './';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Coreography = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={6}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales />
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice />
        </Grid>
        <Grid
          item
          lg={12}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestProducts />
        </Grid>
        
      </Grid>
    </div>
  );
};

export default Coreography;
