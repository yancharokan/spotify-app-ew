import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Highlight from '@material-ui/icons/Highlight';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    width: 800,
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function BlinkerTime() {
  const classes = useStyles();
  const [value, setValue] = React.useState([22, 59]);
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = event => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 359) {
      setValue(359);
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        
      <Typography id="input-slider" gutterBottom>
        Flaşör Zamanını Ayarla
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Highlight />
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
