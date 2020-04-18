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

function SimpleCard({body, title}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Grid item xs="6">
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
          adjective
        </Typography>
        <Typography variant="body2" component="p">
        {body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpen}>View</Button>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
    </Grid>
  );
}

function DashboardView () {
  const classes = useStyles();
  return (
    <div className={classes.gridstyle}>
      <Grid container spacing={3}>
      <SimpleCard title="JHA forms over time" body={<Chart
    chartType="LineChart"
    loader={<div>Loading Chart</div>}
    data={[
      [
        { type: 'number', label: 'x' },
        { type: 'number', label: 'values' },
        { id: 'i0', type: 'number', role: 'interval' },
        { id: 'i1', type: 'number', role: 'interval' },
        { id: 'i2', type: 'number', role: 'interval' },
        { id: 'i2', type: 'number', role: 'interval' },
        { id: 'i2', type: 'number', role: 'interval' },
        { id: 'i2', type: 'number', role: 'interval' },
      ],
      [1, 100, 90, 110, 85, 96, 104, 120],
      [2, 120, 95, 130, 90, 113, 124, 140],
      [3, 130, 105, 140, 100, 117, 133, 139],
      [4, 90, 85, 95, 85, 88, 92, 95],
      [5, 70, 74, 63, 67, 69, 70, 72],
      [6, 30, 39, 22, 21, 28, 34, 40],
      [7, 80, 77, 83, 70, 77, 85, 90],
      [8, 100, 90, 110, 85, 95, 102, 110],
    ]}
    options={{
      intervals: { style: 'sticks' },
      legend: 'none',
    }}
  />} ></SimpleCard>
      
      <SimpleCard title="JHA forms over time" body={
        <Chart
        chartType="BubbleChart"
        loader={<div>Loading Chart</div>}
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
         loader={<div>Loading Chart</div>}
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
        loader={<div>Loading Chart</div>}
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
      loader={<div>Loading Chart</div>}
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
    loader={<div>Loading Chart</div>}
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
         loader={<div>Loading Chart</div>}
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
      </Grid>
      </div>
  )
}


class Dashboard extends Component {
  render() {
    
    return (
      <div>
        <h2>My Analytics</h2>
        <DashboardView></DashboardView>
       

      </div>
    );
  }
}
 
export default Dashboard;