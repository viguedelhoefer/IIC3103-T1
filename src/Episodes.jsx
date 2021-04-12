import React from 'react';
import './App.css';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';


const EpisodesComponent = (...props) => {

    const classes = useStyles();

    const series_formated = props[0].match.params.series.replace(/\s/g, '+');
    const [Episodes, setEpisodes] = React.useState([]);

  const getEpisodeList = () => {
    axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=${series_formated}`)
      .then((response) => {
      const SeasonEpisodes = response.data.filter(episode => episode.season === props[0].match.params.season_id)
      setEpisodes(SeasonEpisodes);
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  };

  React.useEffect(() => {
    getEpisodeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(Episodes);

  return (
    <div>
      <h1> {props[0].match.params.series} Season {props[0].match.params.season_id} </h1>
        <div className={classes.root}>
        {Episodes ? Episodes.map(episodes => 
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                <Grid item>
                    <Avatar> {episodes.episode} </Avatar>
                </Grid>
                <Grid item xs>
                    <Button fullWidth variant="outlined" color="primary" onClick={(e) => window.location.href=`/${props[0].match.params.series}/${props[0].match.params.season_id}/${episodes.episode_id}`}> {episodes.title} </Button>
                </Grid>
                </Grid>
            </Paper>
        ) : null}
        </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

export default EpisodesComponent