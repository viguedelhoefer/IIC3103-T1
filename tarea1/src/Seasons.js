import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import axios from 'axios';

const SeasonsComponent = () => {

    const classes = useStyles();

    const [Seasons, setSeasons] = React.useState({
      betterCallSaul: [],
      breakingBad: []
    });
  
    const getEpisodeList = () => {
      const req1 = axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul`);
      const req2 = axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad`);
      axios.all([req1, req2])
        .then(axios.spread((...response) => {
          const seasonsBetterCallSaul = [...new Set(response[0].data.map(episode => episode.season))];
          const seasonsBreakingBad = [...new Set(response[1].data.map(episode => episode.season))];
          setSeasons({ betterCallSaul: seasonsBetterCallSaul, breakingBad: seasonsBreakingBad });
          console.log(response);
        })).catch(error => {
          console.log(error);
        });
    };
  
    React.useEffect(() => {
      getEpisodeList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
    <div className={classes.root}>
        <Paper className={classes.paper}>
            <Grid container spacing={5}>
            <Grid item>
                <div className={classes.image}>
                    <img className={classes.img} alt="complex" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Breaking_Bad_logo.svg/1200px-Breaking_Bad_logo.svg.png" />
                </div>
            </Grid>
            <Grid item xs={12} sm container>
                <Grid item xs container direction="column" justify="center">
                {Seasons ? Seasons.breakingBad.map(season => 
                    <Button className={classes.button} variant="outlined" color="primary" onClick={(e) => window.location.href=`/Breaking Bad/${season}`}> 
                        Season {season} 
                    </Button>) : null}
                </Grid>
            </Grid>
            </Grid>
        </Paper>
        <div style={{paddingBottom: '5px'}} />
        <Paper className={classes.paper}>
            <Grid container spacing={5}>
            <Grid item>
                <div className={classes.image}>
                    <img className={classes.img} alt="complex" src="https://img2.freepng.es/20180723/iwi/kisspng-logo-typography-better-call-saul-font-better-call-saul-5b55c4769f5645.1609439615323475106527.jpg" />
                </div>
            </Grid>
            <Grid item xs={12} sm container>
                <Grid item xs container direction="column" justify="center">
                {Seasons ? Seasons.betterCallSaul.map(season => 
                    <Button className={classes.button} variant="outlined" color="primary" onClick={(e) => window.location.href=`/Better Call Saul/${season}`}> 
                        Season {season} 
                    </Button>) : null}
                </Grid>
            </Grid>
            </Grid>
        </Paper>
    </div>  
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingTop: theme.spacing(5),
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 600,
    },
    image: {
      width: 200,
      height: 200,
    },
    img: {
      display: 'block',
      margin: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    button: {
      marginBottom: theme.spacing(1),
    }
  }));

export default SeasonsComponent
