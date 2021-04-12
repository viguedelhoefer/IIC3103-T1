import React from 'react';
import './App.css';
import Nav from './Navigation';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import SeasonsComponent from './Seasons';
import EpisodesComponent from './Episodes';
import EpisodeDetailComponent from './EpisodesDetail';
import SearchResultComponent from './SearchResult';
import CharacterComponent from './Characters';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Route exact path="/" component={SeasonsComponent} />
        <Route exact path="/:series/:season_id" component={EpisodesComponent} />
        <Route exact path="/:series/:season_id/:episode_id" component={EpisodeDetailComponent} />
        <Route exact path="/:character_name" component={CharacterComponent} />
        <Route exact path="/Search/result/character/:name" component={SearchResultComponent} />
      </div>
    </Router>
  );
}

export default App;

/*const SeasonsComponent = () => {

  const [Seasons, setSeasons] = React.useState({
    betterCallSaul: [],
    breakingBad: []
  });

  const getEpisodeList = () => {
    const req1 = axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul`);
    const req2 = axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad`);
    axios.all([req1, req2])
      .then(axios.spread((...response) => {
        const seasonsBetterCallSaul = [... new Set(response[0].data.map(episode => episode.season))];
        const seasonsBreakingBad = [... new Set(response[1].data.map(episode => episode.season))];
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
    <div>
      <h1>Better Call Saul</h1>
      <div>
        {Seasons ? Seasons.betterCallSaul.map(season => <Link to={`/Better Call Saul/${season}`}> Temporada {season} </Link>) : null}
      </div>
      <h1>Breaking Bad</h1>
      <div>
        {Seasons ? Seasons.breakingBad.map(season => <Link to={`/Breaking Bad/${season}`}> Temporada {season} </Link>) : null}
      </div>
    </div>
  );

}*/

/*const EpisodesComponent = (...props) => {

  const series_formated = props[0].match.params.series.replace(/\s/g, '+');
  const [Episodes, setEpisodes] = React.useState([]);

  const getEpisodeList = () => {
    axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=${series_formated}`)
      .then((response) => {
      const SeasonEpisodes = response.data.filter(episode => episode.season === props[0].match.params.season_id)
      setEpisodes(SeasonEpisodes);
    }).catch(error => {
      console.log(error);
    });
  };

  React.useEffect(() => {
    getEpisodeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1> {props[0].match.params.series} season {props[0].match.params.season_id} </h1>
      <div>
        {Episodes ? Episodes.map(episodes => <Link to={`/${props[0].match.params.series}/${props[0].match.params.season_id}/${episodes.episode_id}`}> Episodio {episodes.episode} </Link>) : null}
      </div>
    </div>
  );

}*/

/*const EpisodeDetailComponent = (...props) => {
  
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

  console.log(Details1);

  return (
    <div>
      <h1>Episode Information</h1>
        {Details1 ? Details1.map(detail => 
        <div>
          <p> Titulo: {detail.title} </p>
          <p> Fecha Lanzamiento: {detail.air_date} </p>
          <p> Episodio Numero: {detail.episode} </p>
          <p> ID: {detail.episode_id} </p>
          <p> Temporada: {detail.season} </p>
          <p> Serie: {detail.series} </p>
          <h1>Personajes</h1>
          {detail.characters.map(character => 
          <Link to={`/${character}`}> {character} </Link>)}
          )
        </div>
        )
        : null}
    </div>
  );
}*/

/*const CharacterComponent = (...props) => {

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

  return (
    <div>
      {character ? character.map(character => 
        <div>
          <h1> {character.name} </h1>
          <img src={character.img} alt={`Imagen de ${character.name}`} width="400" height="500"/>
          <h2>Breaking Bad</h2>
          {character.appearance.map(bb_apears => 
          <Link to={`/Breaking Bad/${bb_apears}`}> {bb_apears} </Link>)}
          <h2>Better Call Saul</h2>
          {character.better_call_saul_appearance.map(bcs_apears => 
          <Link to={`/Better Call Saul/${bcs_apears}`}> {bcs_apears} </Link>)}
          <p> {character.category} </p>
          <p> {character.char_id} </p>
          <p> {character.nickname} </p>
          {character.occupation.map(job => 
          <p> {job} </p>)}
          <p> {character.portrayed} </p>
        </div>
      )
      : null}
      {quotes ? quotes.map(quotes => 
        <div>
          <p> {quotes.quote} </p>
        </div>
      )
      : null}
      
    </div>
  );
}*/

/*const SearchResultComponent = (...props) => {

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
      <div>
        {characterList ? characterList.map(character => <Link to={`/${character.name}`}> {character.name} </Link>) : null}
      </div>
    </div>
  );

}*/
