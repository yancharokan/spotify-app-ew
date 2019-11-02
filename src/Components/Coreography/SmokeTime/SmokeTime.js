import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
  root: {
    width: 800,
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function SmokeTime() {
  const classes = useStyles();
  const [value, setValue] = React.useState([20, 37]);
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = event => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        
      <Typography id="input-slider" gutterBottom>
        Sis Zamanını Ayarla
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <SmokingRoomsIcon />
        </Grid>
        <Grid item xs>
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
