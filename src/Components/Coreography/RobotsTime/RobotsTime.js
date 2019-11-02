import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Timer from '@material-ui/icons/Timer';

const useStyles = makeStyles({
    root: {
      width: 300,
    },
  });
  
  function valuetext(value) {
    return `${value}°C`;
  }
  
export default function RobotsTime() {

  const classes = useStyles();
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Robotun Hareket Zaman Dilimini Seçiniz
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Timer />
        </Grid>
        <Grid item xs>
        <Typography id="range-slider" gutterBottom>
        </Typography>
        <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
        />
        </Grid>
      </Grid>
    </div>
  );
}