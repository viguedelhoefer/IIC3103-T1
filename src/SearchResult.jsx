import React from 'react';
import './App.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';

const SearchResultComponent = (...props) => {

    const classes = useStyles();

    const name_formated = props[0].match.params.name.replace(/\s/g, '+');
    const [characterList, setcharacterList] = React.useState([]);
  
    const getCharacterList = () => {
      axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${name_formated}`)
        .then((response) => {
        console.log(response.data);
        setcharacterList(response.data);
      }).catch(error => {
        console.log(error);
      });
    };
  
    React.useEffect(() => {
      getCharacterList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return (
      <div>
        <h1> Resultados de la busqueda: {props[0].match.params.name} </h1>
        <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
            {characterList ? 
            characterList.map(character =>
            <ListItem button onClick={(e) => window.location.href=`/${character.name}`}>
            <ListItemIcon>
                <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={`${character.name}`} />
            </ListItem>
            ) : null}
        </List>
        </div>
      </div>
    );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    display: 'block',
    margin: 'auto',
  },
}));

export default SearchResultComponent;