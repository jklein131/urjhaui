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


function ComboBox({label, JHA, setJHA}) {
  var [options, setOptions] = React.useState([])
  
  React.useEffect(()=> {
    environment.fetch('jobs').then(res => 
    res.json()).then((jobs) => {
    setOptions(jobs)
  })
},[])
  return (
    <div> <Autocomplete
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option === "" ? "" : option.name}
      value={JHA.jobselect === undefined ? "" : JHA.jobselect}
      onChange={
        (event, newValue) => {
          setJHA(t => {
            const newMessageObj = { ...t, "jobselect": newValue };
            return newMessageObj
          })
        }
      }
      style={{ width: "auto" }}
      renderInput={(params) => <TextField required {...params} error={false || (JHA !== undefined && (JHA.jobselect == "" || JHA.jobselect === undefined) && JHA.jobselecterror !== undefined)} label={label} variant="outlined" />}
    />
    {JHA !== undefined && JHA.jobselecterror}
    </div>

  );
}

function FreeSoloCreateOption({label, JHA, setJHA}) {
  const [activity, setActivity] = React.useState([]);
  React.useEffect(()=> {
    environment.fetch('activity').then(res => 
      res.json()).then((activitiesC) => {
        setActivity(activitiesC)
      })
  },[])

  var updateV = (val) => {setJHA(t => {
    const newMessageObj = { ...t, "activity": val };
    return newMessageObj
  });
  }

  return (
    <div>
      <div>
      {JHA.activity == undefined ? "" : JHA.activity.name}
    </div>
    <Autocomplete
      value={JHA.activity == undefined ? "" : JHA.activity}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          console.log("option 1")
          updateV(newValue);
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          // we also need to create this new value on the server. 
          console.log("option 2")
          var uploadPayload = {
            name: newValue.inputValue,
            description: "",
          }

      environment.fetch('activity',
    {
      method: 'POST',
      body: JSON.stringify(uploadPayload),
      headers: {
        'Accept': 'application/json',
        "content-type": "application/json",
      }
    }).then(res => 
      res.json()).then((activitiesC) => {
        setActivity([...activity, activitiesC])
        updateV( activitiesC);
      })
        } else {
          console.log("option 3")
          updateV(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            name: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={activity}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(option) => option.name}
      style={{ width: 'auto' }}
      freeSolo
      renderInput={(params) => (
          
        <div> 
          <TextField required helperText={JHA.activityerror} {...params} error={false || (JHA !== undefined && (JHA.activity === "" || JHA.activity === undefined) && JHA.activityerror !== undefined)} label={label} variant="outlined" />
          
        </div>

      )}
    />
    </div>
  );
}

function FreeSoloCreateOptionDialog({label, JHA, setJHA}) {
  const [value, setValue] = React.useState(null);
  const [customvalue, setCValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [activity, setActivity] = React.useState([]);
  React.useEffect(()=> {
    environment.fetch('activity').then(res => 
      res.json()).then((activitiesC) => {
        setActivity(activitiesC)
      })
  },[])
  const [dialogValue, setDialogValue] = React.useState({
    name: '',
    year: '',
  });
  const handleClose = () => {
    setDialogValue({
      name: '',
      year: '',
    });

    toggleOpen(false);
  };

 

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      name: dialogValue.name,
      year: dialogValue.description,
    });
    var uploadPayload = {
      name: dialogValue.name,
      description: dialogValue.description,
    }
    environment.fetch('activity',
    {
      method: 'POST',
      body: JSON.stringify(uploadPayload),
      headers: {
        'Accept': 'application/json',
        "content-type": "application/json",
      }
    }).then(res => 
      res.json()).then((activitiesC) => {
        setActivity([...activity, activitiesC])
        setJHA(t => {
          const newMessageObj = { ...t, "activity": activitiesC };
          return newMessageObj
        })
      })

    handleClose();
  };

  return (
    <div>
      <Autocomplete
        value={JHA.activity === undefined ? "" : JHA.activity}
        required
        onChange={(event, newValue) => {
          console.log(newValue)
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue,
              });
              setJHA(t => {
                const newMessageObj = { ...t, "activity": newValue };
                return newMessageObj
              })
            });
            return;
          }

          if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue.inputValue,
            });
            setJHA(t => {
              const newMessageObj = { ...t, "activity": newValue.inputValue };
              return newMessageObj
            })
            return;
          }

          setValue(newValue);
          setJHA(t => {
            const newMessageObj = { ...t, "activity": newValue };
            return newMessageObj
          })
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={activity}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        renderOption={(option) => option.name}
        style={{ width: "auto" }}
        freeSolo
        renderInput={(params) => (
          
          <div> 
            <TextField required helperText={JHA.activityerror} {...params} error={false || (JHA !== undefined && (JHA.activity === "" || JHA.activity === undefined) && JHA.activityerror !== undefined)} label={label} variant="outlined" />
            
          </div>

        )}
      />
      {JHA !== undefined && JHA.activityerror}
      <br></br>
      <br></br>
            {/* <TextField variant="outlined" label="Activity Description" style={{ width: 500 }} value={JHA.activitydesc === undefined ? "" : JHA.activitydesc } onChange={(event, nv) => {
             console.log(JHA, nv, event)
             setJHA(t => {
                const newMessageObj = { ...t, "activitydesc_override": nv };
                return newMessageObj
              })
            }} multiline></TextField> */}

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add a new Activity</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any Activity in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
             
              id="name"
              value={dialogValue.title}
              onChange={(event) => setDialogValue({ ...dialogValue, title: event.target.value })}
              label="title"
              type="text"
            />
            <br></br>
            <br></br>
            <TextField
              id="name"
              value={dialogValue.description}
              onChange={(event) => setDialogValue({ ...dialogValue, description: event.target.value })}
              label="Description"
              placeholder="Write a short description of the activity here"
              multiline
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default function JhaJobSelect({JHA, setJHA}) {
  const classes = useStyles();

  return (

      <Grid container spacing={3}>
        <Grid item xs={12}>
        
          <Paper className={classes.paper}>
            <Typography variant="h5">Create JHA</Typography> 
            <Typography variant="body1">Select a Job and Activity to get started! </Typography> 
            <br></br>
            <br></br>
            <ComboBox JHA={JHA} setJHA={setJHA} label="Select Job"></ComboBox>
            <br></br>
            <br></br>

            <FreeSoloCreateOption JHA={JHA} setJHA={setJHA} label="Select Activity"></FreeSoloCreateOption>
            <br></br>
            {/* <Button
                  variant="contained"
                  color="secondary"
                  // onClick={}
                  className={classes.button}
                >
                  Learn More about the JHA
                  </Button> */}
          </Paper>
          <br></br>
        </Grid>
      </Grid>
     
  );
} 