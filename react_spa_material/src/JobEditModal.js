import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Initicon from 'react-initicon';
import IconButton from '@material-ui/core/IconButton';
import Icon from './Icon'
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { environment } from "./enviroments/enviroment"; 

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

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function JobEditModal({job, setJob, renderbutton = r => (<IconButton onClick={r}><EditIcon ></EditIcon></IconButton>)}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [reqi, setreqi] = React.useState(false);
  reqi
  const [localJob, setLocalJob] = React.useState(job ? job : {});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    if (!localJob.name || ! localJob.street) {
      setreqi("required field")
      return
    } 
    console.log(localJob)
    if ("_id" in localJob) {
      environment.fetch('jobs/'+localJob._id, {
        method: 'PATCH',
        body: JSON.stringify(localJob),
        headers: {
          'Accept': 'application/json',
          "content-type": "application/json",
        }
      }).then((res) => res.json()).then((data)=> {setJob(data); setOpen(false)})
    } else {
      environment.fetch('jobs', {
        method: 'POST',
        body: JSON.stringify(localJob),
        headers: {
          'Accept': 'application/json',
          "content-type": "application/json",
        }
      }).then((res) => res.json()).then((data)=> {setJob(data);  setOpen(false)})
    }
    
    
    
    // save job to the API, adn get the return value. 
    // if success, return to the client. 
    
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit Job</h2>
      <form>
        <div style={{textAlign:"center", width:"auto"}}>
      <Icon  name={localJob.name} size={250}></Icon>
      </div>
      <br></br>
<TextField id="job-name" label="Job Name" variant="outlined" helperText={reqi} required={true} value={localJob.name} onChange={(event)=>(setLocalJob({...localJob, name: event.target.value}))}/>
<br></br>
<br></br>
<TextField id="job-street" label="Location" variant="outlined" helperText={reqi} required={true} value={localJob.street} onChange={(event)=>(setLocalJob({...localJob, street: event.target.value}))}/>
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
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
