import React from 'react';
import './App.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

const EpisodeDetailComponent = (...props) => {

    const classes = useStyles();
  
    const [Details1, setDetails1] = React.useState([]);
  
    const getEpisode = () => {
      axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes/${props[0].match.params.episode_id}`)
        .then((response) => {
        setDetails1(response.data);
      }).catch(error => {
        console.log(error);
      });
    };
  
    React.useEffect(() => {
      getEpisode();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return (
      <div>
        <h1>Episode Information</h1>
          {Details1 ? Details1.map(detail => 
          <div>
            <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Paper className={classes.paper}><b>Title:</b> {detail.title}</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}><b>Episode Number in Season:</b> {detail.episode}</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}><b>Episode Number in Series:</b> {detail.episode_id}</Paper>
                </Grid>
                <Grid item xs={6} sm={4}>
                <Paper className={classes.paper}><b>Series:</b> {detail.series}</Paper>
                </Grid>
                <Grid item xs={6} sm={4}>
                <Paper className={classes.paper}><b>Season:</b> {detail.season}</Paper>
                </Grid>
                <Grid item xs={6} sm={4}>
                <Paper className={classes.paper}><b>Aired on:</b> {detail.air_date}</Paper>
                </Grid>
            </Grid>
            </div>
            <h1>Characters in this Episode</h1>
            <div className={classes.characters}>
                <Grid container spacing={2} direction='row' justify="center" alignItems="center">
                    {detail.characters.map(character => 
                    <Grid item> 
                    <Paper className={classes.characters}>
                        <Button fullWidth variant="outlined" color="primary" onClick={(e) => window.location.href=`/${character}`}>{character}</Button>
                    </Paper>
                    </Grid>)}
                </Grid>
            </div>
        </div>
          )
          : null}
      </div>
    );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    maxWidth: 750,
    margin: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    align: 'center',
  },
  characters: {
    display: 'block',
    maxWidth: 800,
    margin: 'auto'
  }
}));

export default EpisodeDetailComponent