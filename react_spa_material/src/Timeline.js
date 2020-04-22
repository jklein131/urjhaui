import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    marginBottom: 10,
    maxWidth: 1200,
  },
  image: {
    width: 128,
    height: 128,
  },
  imageComment : {
    width: 25,
    height: 25,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function SingleTimeline() {
    const classes = useStyles();
    return (
<Paper className={classes.paper} spacing={2}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Joshua Klein Created a PDF 
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Jobsite: 102344 Spruce Grove Ave
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: 1030114
                </Typography>
                <Paper><Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.imageComment}>
                                <img className={classes.img} alt="p" src="/static/images/grid/complex.jpg" />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                Wow good Work! 
                                </Typography>
                                </Grid>
                                </Grid>
                        </Grid>
                        </Paper>
                        <Paper><Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.imageComment}>
                                <img className={classes.img} alt="p" src="/static/images/grid/complex.jpg" />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                Wow good Work! 
                                </Typography>
                                </Grid>
                                </Grid>
                        </Grid>
                        </Paper>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Add Comment
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">15 Minutes Ago</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
}

export default function Timeline() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Typography variant="h4">Social Safety Feed</Typography>
        <br></br>
        <SingleTimeline></SingleTimeline>
        <SingleTimeline></SingleTimeline>
        <SingleTimeline></SingleTimeline>
        <SingleTimeline></SingleTimeline>
      
    </div>
  );
}