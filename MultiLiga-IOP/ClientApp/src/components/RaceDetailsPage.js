import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import RaceResults from './RaceResults';

const RaceDetailsPage = (props) => {
  const [input, setInput] = useState('');
  const [resultListDefault, setResultListDefault] = useState();
  const [resultList, setResultList] = useState();
  const [raceData, setRaceData] = useState();
  const [disciplineNames, setDisciplineNames] = useState();

  const fetchResultData = async () => {
      return await fetch(`race/getresults${props.location.search}`)
      .then(response => response.json())
      .then(data => data.map(x => {
        return {...x, "display": true}
      }))
      .then(data => {
         setResultList(data) 
         setResultListDefault(data)
       });
  }
  
  const fetchRaceData = async() => {
    return await fetch(`race/get${props.location.search}`)
    .then(response => response.json())
    .then(data => setRaceData(data));
  }

  const updateInput = async (input) => {
    const filtered = resultList.map(result => {
      let newResult = {...result};
      newResult.display = result.user.userName.toLowerCase().includes(input.toLowerCase());
      return newResult;
    });
    setInput(input);
    setResultList(filtered);
  }

  useEffect( () => {fetchResultData()},[]);
  useEffect( () => {fetchRaceData()},[]);
	
  return (
    <>
      <h1>{raceData ? raceData.name : "-"}</h1>
      <h2>{raceData ? raceData.Date : "-"}</h2>
      <SearchBar 
       input={input} 
       setKeyword={updateInput}
      />
      <RaceResults raceResults={resultList ? resultList : []}/> 
    </>
   );
}

export default RaceDetailsPage