import React from 'react';
import './App.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

const CharacterComponent = (...props) => {

    const classes = useStyles();

    const name_formated = props[0].match.params.character_name.replace(/\s/g, '+');
  
    const [character, setCharacter] = React.useState([]);
    const [quotes, setQuotes] = React.useState([]);
  
    const getCharacterAndQuotes = () => {
      const req1 = axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${name_formated}`);
      const req2 = axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/quote?author=${name_formated}`);
      axios.all([req1, req2])
        .then(axios.spread((...response) => {
        setCharacter(response[0].data);
        setQuotes(response[1].data);
      })).catch(error => {
        console.log(error);
      });
    };
  
    React.useEffect(() => {
      getCharacterAndQuotes();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(character);
  
    return (
      <div>
        {character ? character.map(character => 
        <div>
          <div>
            <h1> {character.name} </h1>
            <img src={character.img} alt={`Imagen de ${character.name}`} width="400" height="500"/>
          </div>
          <div className={classes.root}>
          <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}><b>Nickname:</b> {character.nickname}</Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}><b>Portrayed by:</b> {character.portrayed}</Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}><b>Category:</b> {character.category}</Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}><b>Status:</b> {character.status}</Paper>
              </Grid>
          </Grid>
          </div>
          <h3> Jobs </h3>
          <div className={classes.jobs}>
                <Grid container spacing={2} direction='row' justify="center" alignItems="center">
                    {character.occupation.map(job =>
                    <Grid item xs={3}> 
                    <Paper className={classes.paper}> {job} </Paper>
                    </Grid>)}
                </Grid>
          </div>
          <h1>Appearances</h1>
          <div className={classes.jobs}>
            <Grid container spacing={8} direction='row' justify="center" alignItems="center">
                <Grid item>
                    <h3>Breaking Bad</h3>
                    <Grid container spacing={1} direction='column' justify='center' alignItems='center'>
                        {character.appearance.map(bb_apears =>
                        <Grid item> 
                        <Paper className={classes.characters}>
                            <Button fullWidth variant="outlined" color="primary" onClick={(e) => window.location.href=`/Breaking Bad/${bb_apears}`}> Season {bb_apears}</Button>
                        </Paper>
                        </Grid>
                        )}
                    </Grid>
                </Grid>
                <Grid item>
                <h3>Better Call Saul</h3>
                <Grid container spacing={1} direction='column' justify='center' alignItems='center'>
                    {character.better_call_saul_appearance.map(bcs_apears =>
                    <Grid item> 
                    <Paper className={classes.characters}>
                        <Button fullWidth variant="outlined" color="primary" onClick={(e) => window.location.href=`/Better Call Saul/${bcs_apears}`}> Season {bcs_apears}</Button>
                    </Paper>
                    </Grid>
                    )}
                </Grid>
                </Grid>
            </Grid>
          </div>
        </div>
        )
        : null}
        <h1>Quotes</h1>
          {quotes ? quotes.map(quotes => 
            <div>
              <li className={classes.listItem}> {quotes.quote} </li>
            </div>
          ) : null}
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
    jobs: {
      display: 'block',
      maxWidth: 800,
      margin: 'auto'
    },
    listItem: {
      paddingBottom: theme.spacing(2),
      displat: 'block',
      margin: 'auto',
      maxWidth: 850,
    }
}));

export default CharacterComponent;