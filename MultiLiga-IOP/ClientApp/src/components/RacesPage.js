import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import RacesList from './RacesList';

const RacesPage = (props) => {
    const [input, setInput] = useState('');
    const [racesListDefault, setRacesListDefault] = useState();
    const [racesList, setRacesList] = useState();
    const [seasonList, setSeasonList] = useState();
    const [leagueNames, setLeagueNames] = useState();
    const [disciplineNames, setDisciplineNames] = useState();

    const fetchRacesData = async () => {
        return await fetch(`race/get${props.location.search}`)
        .then(response => response.json())
        .then(data => {
           setRacesList(data) 
           setRacesListDefault(data)
         });
    }
    
    const fetchSeasonData = async () => {
        return await fetch(`season/get${props.location.search}`)
        .then(response => response.json())
        .then(data => data.reduce((a, x) => ({ ...a, [x.id]: x }), {}))
        .then(data => setSeasonList(data));
    }
    
    const fetchLeagueData = async() => {
      return await fetch(`league/get${props.location.search}`)
      .then(response => response.json())
      .then(data => data.reduce((a, x) => ({ ...a, [x.id]: x }), {}))
      .then(data => setLeagueNames(data));
    }
  
    const fetchDisciplineData = async() => {
      return await fetch(`discipline/get`)
      .then(response => response.json())
      .then(data => data.reduce((a,x) => ({...a, [x.id]: x.name}), {}))
      .then(data => setDisciplineNames(data));
    }       

    const updateInput = async (input) => {
        const filtered = racesListDefault.filter(race => {
          return race.name.toLowerCase().includes(input.toLowerCase())
          || seasonList[race.seasonId].name.toLowerCase().includes(input.toLowerCase())
          || leagueNames[seasonList[race.seasonId].leagueId].name.toLowerCase().includes(input.toLowerCase())
          || disciplineNames[leagueNames[seasonList[race.seasonId].leagueId]].toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setRacesList(filtered);
      }

    
    useEffect( () => {fetchRacesData()}, []);
    useEffect( () => {fetchSeasonData()}, []);
    useEffect( () => {fetchLeagueData()}, []);
    useEffect( () => {fetchDisciplineData()}, []);
     
    return (
        <>
          <h1>Races List</h1>
          <SearchBar 
           input={input} 
           setKeyword={updateInput} 
          />
          <RacesList racesList={racesList} seasonList={seasonList} leagueNames={leagueNames} disciplineNames={disciplineNames}/>
        </>
       );

}

export default RacesPage