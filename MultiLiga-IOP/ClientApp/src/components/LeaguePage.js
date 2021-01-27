import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import LeagueList from './LeagueList';

const LeaguePage = (props) => {
  const [input, setInput] = useState('');
  const [leagueListDefault, setLeagueListDefault] = useState();
  const [leagueList, setLeagueList] = useState();
  const [disciplineNames, setDisciplineNames] = useState();

  const fetchData = async () => {
      return await fetch(`league/get${props.location.search}`)
      .then(response => response.json())
      .then(data => {
         setLeagueList(data) 
         setLeagueListDefault(data)
       });
  }
  
  const fetchDisciplineData = async() => {
    return await fetch(`discipline/get`)
    .then(response => response.json())
    .then(data => data.reduce((a,x) => ({...a, [x.id]: x.name}), {}))
    .then(data => setDisciplineNames(data));
  }    

  const updateInput = async (input) => {
    const filtered = leagueListDefault.filter(league => {
      return league.name.toLowerCase().includes(input.toLowerCase())
      || disciplineNames[league.disciplineId].toLowerCase().includes(input.toLowerCase())
    })
    setInput(input);
    setLeagueList(filtered);
  }

  useEffect( () => {fetchData()},[]);
  useEffect( () => {fetchDisciplineData()},[]);
	
  return (
    <>
      <h1>Discipline List</h1>
      <SearchBar 
       input={input} 
       setKeyword={updateInput}
      />
      <LeagueList leagueList={leagueList} disciplineNames={disciplineNames}/>
    </>
   );
}

export default LeaguePage