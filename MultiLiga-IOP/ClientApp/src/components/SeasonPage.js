import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SeasonList from './SeasonList'

const SeasonPage = (props) => {
  const [input, setInput] = useState('');
  const [seasonListDefault, setSeasonListDefault] = useState();
  const [seasonList, setSeasonList] = useState();
  const [leagueNames, setLeagueNames] = useState();
  const [disciplineNames, setDisciplineNames] = useState();

  const fetchData = async () => {
      return await fetch(`season/get${props.location.search}`)
      .then(response => response.json())
      .then(data => {
         setSeasonList(data) 
         setSeasonListDefault(data)
       });
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
    const filtered = seasonListDefault.filter(season => {
      return season.name.toLowerCase().includes(input.toLowerCase())
      || leagueNames[season.leagueId].name.toLowerCase().includes(input.toLowerCase())
      || disciplineNames[leagueNames[season.leagueId].disciplineId].toLowerCase().includes(input.toLowerCase())
    })
    setInput(input);
    setSeasonList(filtered);
  }

  useEffect( () => {fetchData()},[]);
  useEffect( () => {fetchLeagueData()},[]);
  useEffect( () => {fetchDisciplineData()},[]);
	
  return (
    <>
      <h1>Discipline List</h1>
      <SearchBar 
       input={input} 
       setKeyword={updateInput}
      />
      <SeasonList seasonList={seasonList} leagueNames={leagueNames} disciplineNames={disciplineNames}/>
    </>
   );
}

export default SeasonPage