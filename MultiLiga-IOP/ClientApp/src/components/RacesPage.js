import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import RacesListPast from './RacesListPast';

const RacesPage = (props) => {
    const [input, setInput] = useState('');
    const [racesListDefault, setRacesListDefault] = useState();
    const [racesList, setRacesList] = useState([]);
    const [seasonList, setSeasonList] = useState();
    const [leagueNames, setLeagueNames] = useState();
    const [disciplineNames, setDisciplineNames] = useState();

    const fetchRacesData = async () => {
        return await fetch(`race/get${props.location.search}`)
        .then(response => response.json())
        .then(data => {
          return data.filter(race =>{
              console.log(Date.parse(race.date) - Date.now())
              return (Date.parse(race.date) < Date.now() ? race : false)
          })
       })
        .then(data => {
           setRacesList(data) 
           setRacesListDefault(data)
         });
    }
    
    const fetchSeasonData = async () => {
        return await fetch(`season/get`)
        .then(response => response.json())
        .then(data => data.reduce((a, x) => ({ ...a, [x.id]: x }), {}))
        .then(data => setSeasonList(data));
    }
    
    const fetchLeagueData = async() => {
      return await fetch(`league/get`)
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

    const updateInput = (input) => {
        const filtered = racesListDefault.filter(race => {
          return (race.name.toLowerCase().includes(input.toLowerCase())
          || (seasonList[race.seasonId] ? seasonList[race.seasonId].name.toLowerCase().includes(input.toLowerCase()) : false)
          || (leagueNames[seasonList[race.seasonId].leagueId] ? leagueNames[seasonList[race.seasonId].leagueId].name.toLowerCase().includes(input.toLowerCase()) : false)
          || (disciplineNames[leagueNames[seasonList[race.seasonId].leagueId].disciplineId] ? disciplineNames[leagueNames[seasonList[race.seasonId].leagueId].disciplineId].toLowerCase().includes(input.toLowerCase()) : false)
        )})
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
          <RacesListPast racesList={racesList} seasonList={seasonList} leagueNames={leagueNames} disciplineNames={disciplineNames}/>
        </>
       );

}

export default RacesPage