import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    // '&:focus': {
    //   backgroundColor: theme.palette.primary.main,
    //   color: theme.palette.common.black,
    //   '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
    //     color: theme.palette.common.white,
    //   },
    // },
  },
}))(MenuItem);

const options = [
  "Low",
  "Medium",
  "High",
  "Extreme"
];
const values = [
  "L",
  "M",
  "H",
  "E"
];
const colors = [
  "green",
  "yellow",
  "orange",
  "red"
];
const textcolors = [
  "white",
  "black",
  "black",
  "black"
];

export default function JhaRacSelect({RAC, setRAC, disabled}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, value) => {
    setRAC(value)
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
     
        <Button
          style={{backgroundColor:colors[values.indexOf(RAC)], color: textcolors[values.indexOf(RAC)]}}
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="RAC select"
          variant="contained"
          onClick={() => { if(disabled) {
            return} 
            handleClickListItem()}}
        >
          {}
          {options[values.indexOf(RAC)]}
        </Button>
 
      <StyledMenu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {values.map((value, index) => (
          <StyledMenuItem
            key={value}
            selected={value === RAC}
            onClick={(event) => handleMenuItemClick(event, value)}
          >
            {options[index]}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}


// export default function JhaRacSelect() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [rac, setRac] = React.useState("LOW");
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleSelect = (rac) => () => {
//     setRac(rac);
//     setAnchorEl(null);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Button
//         aria-controls="customized-menu"
//         aria-haspopup="true"
//         variant="contained"
//         color="primary"
//         onClick={handleClick}
//       >
//         {rac}
//       </Button>
//       <StyledMenu
//         id="customized-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <StyledMenuItem>
//           {/* <ListItemIcon>
//             <SendIcon fontSize="small" />
//           </ListItemIcon> */}
//           <ListItemText onClick={handleSelect("Low")} primary="Low" />
//         </StyledMenuItem>
//         <StyledMenuItem>
//           {/* <ListItemIcon>
//             <DraftsIcon fontSize="small" />
//           </ListItemIcon> */}
//           <ListItemText  onClick={handleSelect("Medium")}  primary="Medium" />
//         </StyledMenuItem>
//         <StyledMenuItem>
//           {/* <ListItemIcon>
//             <DraftsIcon fontSize="small" />
//           </ListItemIcon> */}
//           <ListItemText onClick={handleSelect("High")}  primary="High" />
//         </StyledMenuItem>
//         <StyledMenuItem>
//           {/* <ListItemIcon>
//             <InboxIcon fontSize="small" />
//           </ListItemIcon> */}
//           <ListItemText onClick={handleSelect("Extreme")}  primary="Extreme" />
//         </StyledMenuItem>
//       </StyledMenu>
//     </div>
//   );
// }
