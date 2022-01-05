

import React from 'react';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Initicon from 'react-initicon';
import IconButton from '@material-ui/core/IconButton';
import Icon from './Icon'
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { environment } from "./enviroments/enviroment"; 
import JhaRacSelect from './jha/JhaRacSelect';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const filter = createFilterOptions();
function FreeSoloCreateOption({sections, section, setSection = () => (null)}) {

  return (
    <div>
      <div>
    </div>
    <Autocomplete
      value={section}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          console.log("option 1", newValue)
          setSection(newValue);
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          // we also need to create this new value on the server. 
          console.log("option 2", newValue.inputValue)
            setSection(newValue.inputValue);
        } else {
          console.log("option 3")
          setSection(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push( params.inputValue );
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      // handleHomeEndKeys
      id="choose-sections"
      options={Object.keys(sections)}
      getOptionLabel={(option) => {
        console.log("option", option)
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option;
      }}
      renderOption={(option) => option}
      style={{ width: 'auto' }}
      freeSolo
      renderInput={(params) => (
        <div> 
          <TextField required {...params} label={"Select Section"} variant="outlined" />
          
        </div>
      )}
    />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal:{
    position:'absolute',
    top:'10%',
    left:'10%',
    overflowY:'scroll',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height:'100%',
    width:'90%',
    maxWidth:800,
    maxHeight: 1000,
    display:'block'
  },
  header: {
    padding: '12px 0',
    borderBottom: '1px solid darkgrey'
  },
  content: {
    padding: 12,
    overflowY: 'scroll'
  },
  inputb:{
    width: '100%',
  }
}));

export default function JhaEditModal({positions, sections, hazard, setHazard, renderbutton = r => (<IconButton onClick={r}><EditIcon ></EditIcon></IconButton>)}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [reqi, setreqi] = React.useState(false);
  const [localJob, setLocalJob] = React.useState(hazard ? hazard : {});
  const handleOpen = () => {
    setLocalJob(hazard ? hazard : {})
    console.log(sections)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    if (!localJob.task || ! localJob.hazards || ! localJob.controls) {
      setreqi("required field")
      return
    }
    console.log(localJob)
    var p = null; 
    if (positions) {
      p = "positions"
    }
    if ("_id" in localJob) {
      environment.fetch('hazards/'+localJob._id, {
        method: 'PATCH',
        body: JSON.stringify({...localJob, category :localJob.section, type: p}),
        headers: {
          'Accept': 'application/json',
          "content-type": "application/json",
        }
      }).then((res) => res.json()).then((data)=> {setHazard(data); setOpen(false)})
    } else {
      environment.fetch('hazards', {
        method: 'POST',
        body: JSON.stringify({...localJob, category :localJob.section, type: p}),
        headers: {
          'Accept': 'application/json',
          "content-type": "application/json",
        }
      }).then((res) => res.json()).then((data)=> {setHazard(data);  setOpen(false)})
    }
    
    
    
    // save job to the API, adn get the return value. 
    // if success, return to the client. 
    
  };
  const body = (
    <div style={modalStyle} className={classes.modal}>
      <h2 id="simple-modal-title">Edit Hazard</h2>
      <form onSubmit={(e)=>e.preventDefault()} >
        <div style={{textAlign:"center", width:"auto"}}>
      {/* <Icon  name={localJob.name} size={250}></Icon> */}
      </div>
      <br></br>
<TextField id="job-name" label="Task" className={classes.inputb} multiline={true} variant="outlined" helperText={reqi} required={true} value={localJob.task} onChange={(event)=>(setLocalJob({...localJob, task: event.target.value}))}/>
<br></br>
<br></br>
<TextField id="job-street" label="Hazards" className={classes.inputb} multiline={true} variant="outlined" helperText={reqi} required={true} value={localJob.hazards} onChange={(event)=>(setLocalJob({...localJob, hazards: event.target.value}))}/>
  <br></br>
  <br></br>
  <TextField id="job-street" label="Controls" className={classes.inputb} multiline={true} variant="outlined" helperText={reqi} required={true} value={localJob.controls} onChange={(event)=>(setLocalJob({...localJob, controls: event.target.value}))}/>
  <br></br>
  <br></br>
  <FreeSoloCreateOption sections={sections} section={localJob.section} setSection={(s)=>(
    setLocalJob({...localJob, section: s})
  )}></FreeSoloCreateOption>
  RAC: <JhaRacSelect RAC={localJob.rac} setRAC={(event)=> {
        setLocalJob({...localJob, rac: event.target.value})
  }}></JhaRacSelect>
  <br></br>
  <br></br>
<Button variant="contained" color="primary" onClick={handleSave} >
                        {/* <i className="fas fa-download"/> */}
                        Save
                    </Button>&nbsp;
                    <Button variant="contained" onClick={handleClose} >
                        {/* <i className="fas fa-download"/> */}
                        Cancel
                    </Button>

</form>
    </div>
  );

  return (
    <div>
      {renderbutton(handleOpen) }
      
      
      <Modal
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
