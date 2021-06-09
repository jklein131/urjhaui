import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import Jobs from "./Jobs";
import Chart from "react-google-charts";
 
//https://react-google-charts.com/
import Dialog from '@material-ui/core/Dialog';
import MuiAlert from '@material-ui/lab/Alert';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { environment } from "./enviroments/enviroment";
import LinearProgress from '@material-ui/core/LinearProgress';

import * as m from 'moment'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

 function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (clickout) => {
    return () => {
      if  (clickout || window.confirm("would you like to close without saving?"))  {
        setOpen(false);
    }
  }
    //
  };
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      {/* 
      
      DISABLED FOR NOW AS WE WILL HARDCODE ANALYTICS 

      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Graph
      </Button> */}
      <br></br>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Create New Chart"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Use Custom Forms"
      />
    </FormGroup>
     {
       state.checkedB ? <p>Select from a custom Form</p> : <p> select from JHA graphs</p>
     }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose(true)} color="primary">
            Discard
          </Button>
          <Button onClick={handleClose(true)} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 5,
    margin: 5,
  },
  gridstyle : {
    flexGrow: 1,
    flexDirection: "column",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 700,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function SimpleCard({body, title, description}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Grid item xs="12" sm="6">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{title}</h2>
            {body}
          </div>
        </Fade>
      </Modal>

    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {description}
        </Typography>
        <Typography variant="body2" component="div">
        {body}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small" onClick={handleOpen}>View</Button>
        <Button size="small">Edit</Button> */}
      </CardActions>
    </Card>
    </Grid>
  );
}

function JhaOverTimeChart() {
  const [data, setData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(()=> {
    environment.fetch('jhacomplete/analytics/jha_over_time').then((res)=> res.json()).then((res2)=> {setData(res2); setIsLoading(false)})
  }, [])
return <SimpleCard title="JHA Forms by Date" description={"Number of JHA's created accross jobsites"} body={
  (data.length === 0 || !isLoading) ? isLoading ? <LinearProgress></LinearProgress> : <Chart
    chartType="LineChart"
    loader={<div></div>}
    data={ [
      ["Activity", "Count"],
      ...data.map(current=>{
      return [m.utc(current._id.year+'-'+current._id.month+'-'+current._id.day).format('MMMM Do'), current.count];
    })
    ]}
    options={{
      intervals: { style: 'sticks' },
      legend: 'none',
      curveType: 'function',
    }}
  /> : <Alert severity="info">Complete a JHA to start seeing data here!</Alert>
} ></SimpleCard>
}

function ActivityOverCount() {
  const [data, setData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(()=> {
    environment.fetch('jhacomplete/analytics/activity_over_count').then((res)=> res.json()).then((res2)=> {setData(res2); setIsLoading(false)})
  }, [])
return <SimpleCard title="Activities by Popularity" description={"Most common activies completed"} body={
  (data.length === 0 || !isLoading) ? isLoading ? <LinearProgress></LinearProgress> :  <Chart
    chartType="PieChart"
    loader={<div></div>}
    data={ [
      ["Activity", "Count"],
      ...data.map(current=>{
      return [current._id.name.length === 0 ? "N/A": current._id.name[0], current.count];
    })
    ]}
    options={{
      intervals: { style: 'sticks' },
    }}
  /> :<Alert severity="info">Complete a JHA to start seeing data here!</Alert>} ></SimpleCard>
}
function UsersOverCount() {
  const [data, setData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(()=> {
    environment.fetch('jhacomplete/analytics/users_over_count').then((res)=> res.json()).then((res2)=> {setData(res2) ; setIsLoading(false)})
  }, [])
  console.log("users over", data, isLoading)
return <SimpleCard title="JHA Forms by User" description={"Top JHA power users"} isLoading={isLoading} body={
  (data.length === 0 || !isLoading) ? isLoading ? <LinearProgress></LinearProgress> :<Chart
    chartType="BarChart"
    loader={<div></div>}
    data={ [
      ["Activity", "Count"],
      ...data.map(current=>{
      return [current._id.name.length === 0 ? "N/A": current._id.name[0], current.count];
    })
    ]}
    options={{
      intervals: { style: 'sticks' },
      legend: 'none',
    }}
  /> :<Alert severity="info">Complete a JHA to start seeing data here!</Alert>
} ></SimpleCard>
}

function JobOverCounts() {
  const [data, setData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(()=> {
    environment.fetch('jhacomplete/analytics/jobs_over_count').then((res)=> res.json()).then((res2)=> {setData(res2) ; setIsLoading(false)})
  }, [])
  console.log("jobs over", data, isLoading)
return <SimpleCard title="JHA Forms by Job" description={"Top Jobsite JHA users"} isLoading={isLoading} body={
  (data.length === 0 || !isLoading) ? isLoading ? <LinearProgress></LinearProgress> :<Chart
    chartType="BarChart"
    loader={<div></div>}
    data={ [
      ["Activity", "Count"],
      ...data.map(current=>{
      return [current._id.name.length === 0 ? "N/A": current._id.name[0], current.count];
    })
    ]}
    options={{
      intervals: { style: 'sticks' },
      legend: 'none',
    }}
  /> :<Alert severity="info">Complete a JHA to start seeing data here!</Alert>
} ></SimpleCard>
}
function DashboardView () {
  const classes = useStyles();
  return (
    <div className={classes.gridstyle}>
      <ResponsiveDialog></ResponsiveDialog>
      <Grid container spacing={3}>
      <JhaOverTimeChart></JhaOverTimeChart>
      <ActivityOverCount></ActivityOverCount>
      <UsersOverCount></UsersOverCount>
      <JobOverCounts></JobOverCounts>
      {/* <SimpleCard title="JHA forms over time" body={
        <Chart
        chartType="BubbleChart"
        loader={<div></div>}
        data={[
          ['ID', 'Life Expectancy', 'Fertility Rate', 'Region', 'Population'],
          ['CAN', 80.66, 1.67, 'North America', 33739900],
          ['DEU', 79.84, 1.36, 'Europe', 81902307],
          ['DNK', 78.6, 1.84, 'Europe', 5523095],
          ['EGY', 72.73, 2.78, 'Middle East', 79716203],
          ['GBR', 80.05, 2, 'Europe', 61801570],
          ['IRN', 72.49, 1.7, 'Middle East', 73137148],
          ['IRQ', 68.09, 4.77, 'Middle East', 31090763],
          ['ISR', 81.55, 2.96, 'Middle East', 7485600],
          ['RUS', 68.6, 1.54, 'Europe', 141850000],
          ['USA', 78.09, 2.05, 'North America', 307007000],
        ]}
        options={{
          title:
            'Correlation between life expectancy, fertility rate ' +
            'and population of some world countries (2010)',
          hAxis: { title: 'Life Expectancy' },
          vAxis: { title: 'Fertility Rate' },
          bubble: { textStyle: { fontSize: 11 } },
        }}
      />
      }></SimpleCard>
      <SimpleCard title="Reported Accidents Over Time" body={
         <Chart
         chartType="AreaChart"
         loader={<div></div>}
         data={[
           ['Year', 'Sales', 'Expenses'],
           ['2013', 1000, 400],
           ['2014', 1170, 460],
           ['2015', 660, 1120],
           ['2016', 1030, 540],
         ]}
         options={{

           title: 'Company Performance',
           hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
           vAxis: { minValue: 0 },
           // For the legend to fit, we make the chart area smaller
           chartArea: { width: '50%', height: '70%' },
           // lineWidth: 25
         }}
       />
      }></SimpleCard><SimpleCard title="Reported Accidents Over Time" body={
        <Chart
        chartType="AreaChart"
        loader={<div></div>}
        data={[
          ['Year', 'Sales', 'Expenses'],
          ['2013', 1000, 400],
          ['2014', 1170, 460],
          ['2015', 660, 1120],
          ['2016', 1030, 540],
        ]}
        options={{

          title: 'Company Performance',
          hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
          vAxis: { minValue: 0 },
          // For the legend to fit, we make the chart area smaller
          chartArea: { width: '50%', height: '70%' },
          // lineWidth: 25
        }}
      />
     }></SimpleCard><SimpleCard title="Reported Accidents Over Time" body={
      <Chart
      chartType="AreaChart"
      loader={<div></div>}
      data={[
        ['Year', 'Sales', 'Expenses'],
        ['2013', 1000, 400],
        ['2014', 1170, 460],
        ['2015', 660, 1120],
        ['2016', 1030, 540],
      ]}
      options={{

        title: 'Company Performance',
        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 },
        // For the legend to fit, we make the chart area smaller
        chartArea: { width: '50%', height: '70%' },
        // lineWidth: 25
      }}
    />
   }></SimpleCard><SimpleCard title="Reported Accidents Over Time" body={
    <Chart
    chartType="AreaChart"
    loader={<div></div>}
    data={[
      ['Year', 'Sales', 'Expenses'],
      ['2013', 1000, 400],
      ['2014', 1170, 460],
      ['2015', 660, 1120],
      ['2016', 1030, 540],
    ]}
    options={{

      title: 'Company Performance',
      hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
      vAxis: { minValue: 0 },
      // For the legend to fit, we make the chart area smaller
      chartArea: { width: '50%', height: '70%' },
      // lineWidth: 25
    }}
  />
 }></SimpleCard>
      <SimpleCard title="Reported Accidents Over Time" body={
         <Chart
         chartType="AreaChart"
         loader={<div></div>}
         data={[
           ['Year', 'Sales', 'Expenses'],
           ['2013', 1000, 400],
           ['2014', 1170, 460],
           ['2015', 660, 1120],
           ['2016', 1030, 540],
         ]}
         options={{

           title: 'Company Performance',
           hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
           vAxis: { minValue: 0 },
           // For the legend to fit, we make the chart area smaller
           chartArea: { width: '50%', height: '70%' },
           // lineWidth: 25
         }}
       />
      }></SimpleCard> */}
      </Grid>
      </div>
  )
}

class Dashboard extends Component {
  render() {
    
    return (
      <div>
        <h2>My Analytics</h2>
        <Typography>
          View Visual Information about JHAs performance. 
        </Typography>
        <DashboardView></DashboardView>
       

      </div>
    );
  }
}
 
export default Dashboard;