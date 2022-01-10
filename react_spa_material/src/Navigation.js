import React, { Component } from "react";
import { environment } from "./enviroments/enviroment"; 

import Badge from '@material-ui/core/Badge';
import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import AlarmIcon from '@material-ui/icons/Alarm';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Link from '@material-ui/core/Link';
import { withStyles,makeStyles, createMuiTheme} from '@material-ui/core/styles';
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Input } from "@material-ui/core";
import { BlockPicker } from 'react-color';
import ResponsiveDialog from './Profile'
import JhaJobSelect from './JhaJobSelect'
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { red } from '@material-ui/core/colors';

const colorRed = red[500];

//   <ul className="header">
//             <li><NavLink exact to="/">Home</NavLink></li>
//             <li><NavLink to="/stuff">Stuff</NavLink></li>
//             <li><NavLink to="/contact">Contact</NavLink></li>
//         </ul>

const styles = makeStyles((theme) => ({
  button: {
    // background: theme.palette.secondary.main,
    // color: theme.palette.text.primary,
  },
}))

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  link : {
    color:"white", 
    marginLeft:"15px"
  },
  checkoutbutton: {
    marginTop:"15px",
    marginLeft:"10px",
    marginRight:"10px"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: 0,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
    marginLeft: 0,
  },
}));

function Navigation ({children, jha, setJHA, user, signOut, color, setColor, setProfile}) {
  const [forms, setForms] = React.useState([]);
  React.useEffect(() => {
    environment.fetch( 'formtemplates')
    .then(res => res.json())
    .then((data) => {
     setForms(data)
    }).catch((err) => (console.log("error",err)))
  },[]);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpenCart] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenCart(true);
  };
 const clearJHA = () => {
   setJHA({})
 }
 const [resetOpen, setResetOpen] = React.useState(false);

  const handleClickOpen = () => {
    setResetOpen(true);
  };

  const handleClose = () => {
    setResetOpen(false);
  };

  var shoppingLocation = "#/jhashopping"
  if (jha.type === "positions") {
    shoppingLocation = "#/phashopping"
  }
  var thisType = "JHA"
    if (jha.type !== undefined) {
      if (jha.type === "jha") {
        thisType = "JHA"
      } else { 
        thisType = "PHA"
      }
    }


  const handleDrawerClose = () => {
    setOpenCart(false);
  };
  const checkoutJHA = (event) => {
    console.log("JHA", jha)
    if ((jha.type !== "positions") && (jha.jobselect === "" || jha.jobselect === undefined || jha.jobselect === null)) {
      setJHA(t => {
        const newMessageObj = { ...t, "jobselecterror": "Required" };
        console.log(newMessageObj)
        return newMessageObj
      })
      event.preventDefault()
      return
    }
    if  (jha.activity === "" || jha.activity === undefined || jha.activity === null) {
      setJHA(t => {
        const newMessageObj = { ...t, "activityerror": "Required" };
        console.log(newMessageObj)
        return newMessageObj
      })
      event.preventDefault()
      return
    }
    if (jha.description === "" || jha.description === undefined || jha.description === null) {
      setJHA(t => {
        const newMessageObj = { ...t, "descriptionerror": "Required" };
        console.log(newMessageObj)
        return newMessageObj
      })
      event.preventDefault()
      return
    }
    //clear errors
    setJHA(t => {
      const newMessageObj = { ...t, "descriptionerror": "", "activityerror":"", "jobselecterror":""};
      console.log(newMessageObj)
      return newMessageObj
    })
    handleDrawerClose()
  }
  const preventDefault = (event) => event.preventDefault();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
        <div style={{flex: 1}}>
        <Link style={{color:"white"}}  href="#/" >
        <Typography variant="h6" noWrap>
            YourJHA
          </Typography>
          </Link>
          

          
          </div> 
          <Link style={{color:"white"}} className={classes.link} href="#/jha-dashboard" >
            JHA
          </Link>
          <Link style={{color:"white"}} className={classes.link} href="#/positions-dashboard" >
            PHA
          </Link>
          <Link style={{color:"white"}} className={classes.link} href="#/library" >
            LIBRARY
          </Link>
          <Link style={{color:"white"}} className={classes.link} href="#/admin/jobs/" >
            JOBS
          </Link>
          <Link style={{color:"white"}} className={classes.link} href="#/dashboard" >
            ANALYTICS
          </Link>
          
         
          
          <FadeMenu  jha={jha} user={ user}  signOut={signOut} color={color} setColor={setColor} setProfile={setProfile} ></FadeMenu>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
      <Badge badgeContent={jha.selected && jha.selected.length ? jha.selected.length :0 } color={"error"}>
        <ShoppingCartIcon color={"secondary"} />
      </Badge>
        
          </IconButton >
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
   
            edge="start"
            className={classes.menuButton}
          >
            <NotificationsIcon color={"secondary"} />
          </IconButton> */}
          
      
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        
        <Divider />
        <Button variant={"contained"} href="#/checkout" className={classes.checkoutbutton} onClick={checkoutJHA} color="primary">Checkout {thisType}</Button>
        <Button variant={"outlined"} className={classes.checkoutbutton} onClick={handleClickOpen} color="primary">Empty Cart</Button>
       
          <div>
        <Dialog
          open={resetOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Would you like to clear your cart?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Clearing your cart will remove all current tasks from the {thisType} and start a new one. 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Do Nothing
            </Button>
            <Button onClick={()=>{ clearJHA();  handleClose()} } variant={"contained"} color="primary" autoFocus>
              Empty Cart
            </Button>
          </DialogActions>
        </Dialog>
      </div>

        <br></br>
        <JhaJobSelect JHA={jha} setJHA={setJHA}></JhaJobSelect>
        <br></br>
        {(jha.selected && jha.selected.length > 0) ? <React.Fragment>
           {jha.selected.map((data, index) => {
          console.log(data)
            return <ListItem button key={"cart"+data.data._id}>
              <ListItemIcon key={"icon"+data.data._id}><InboxIcon /></ListItemIcon>
              <ListItemText primary={data.data.task} secondary={data.data.hazard}/>
            </ListItem>
        })}<br></br>
        <Button variant={"outlined"} href={shoppingLocation} onClick={handleDrawerClose} color="primary">Continue Shopping!</Button>
         
        </React.Fragment>: 
        <div style={{textAlign:"center"}}>
        <Typography  type="h6">You have no items in your cart. </Typography>
        <br></br>
        {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
<Button variant={"outlined"} href={shoppingLocation} onClick={handleDrawerClose} color="primary">Start Shopping!</Button>
<br></br>
<br></br>
</div>}
        <Divider />
  
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
       {children}
      </main>
    </div>
  );
}

 function FadeMenu({jha, user, signOut, color, setColor, setProfile}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(user)
  return (
    <div>

      <Button style={{marginLeft: "15px"}} color={"default"} variant="contained"  aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
      {user.displayName}
      </Button>
      

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <ResponsiveDialog color={color} setProfile={setProfile} setColor={setColor} forceOpen={false} click={handleClose}></ResponsiveDialog>
        <MenuItem key={"logoug"} onClick={()=>{handleClose(); signOut()}}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
 
export default Navigation;