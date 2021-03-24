import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Initicon from 'react-initicon';
import IconButton from '@material-ui/core/IconButton';
import Icon from './Icon'
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

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

export default function JobEditModal({job}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit Job</h2>
      <form>
        <div style={{textAlign:"center", width:"auto"}}>
      <Icon  name={"job name"} size={250}></Icon>
      </div>
      <br></br>
<TextField id="outlined-basic" label="Job Name" variant="outlined" />
<br></br>
<br></br>
<TextField id="outlined-basic" label="Location" variant="outlined" />
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
      <IconButton onClick={handleOpen}><EditIcon ></EditIcon></IconButton>
      
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
