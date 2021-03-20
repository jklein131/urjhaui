import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { environment } from './enviroments/enviroment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: '',
    // color: theme.palette.text.secondary,
  },
}));


const filter = createFilterOptions();

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

export default function GenericJobSelector  ({setvalue, value, error}) {
  var [options, setOptions] = React.useState([])
  
  React.useEffect(()=> {
    environment.fetch('jobs').then(res => 
    res.json()).then((jobs) => {
    setOptions(jobs)
  })
  },[])

  return <Autocomplete
      id="jobselect-box-demo"
      options={options}
      getOptionLabel={(option) => option === "" ? "" : option.name}
      value={value === undefined ? "" : value}
      onChange={
        (event, newValue) => {
          setvalue(newValue)
        }
      }
      style={{ width: "auto" }}
      renderInput={(params) => <TextField required {...params} error={error} helperText={error} label={"Select Job"} variant="outlined" />}
    />
}