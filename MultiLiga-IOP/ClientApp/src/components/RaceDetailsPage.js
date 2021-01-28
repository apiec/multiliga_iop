import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import RaceResults from './RaceResults';
import ParseDate from './parseDate';

const RaceDetailsPage = (props) => {
  const [input, setInput] = useState('');
  const [resultListDefault, setResultListDefault] = useState();
  const [resultList, setResultList] = useState();
  const [raceData, setRaceData] = useState();

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
    const filtered = resultListDefault.map(result => {
      return {...result, "display": result.user.userName.toLowerCase().includes(input.toLowerCase())};
    });
    setInput(input);
    setResultList(filtered);
  }

  useEffect( () => {fetchResultData()},[]);
  useEffect( () => {fetchRaceData()},[]);
  
  return (
    <>
      <h1>{raceData ? raceData.name : "-"}</h1>
      <p><ParseDate sharpDateTime={raceData ? raceData.Date: "/Date(1373555464883)/"}/> {raceData ? raceData.location : "-"}</p>
      <p>{raceData ? raceData.description : "-"}</p>
      
      <SearchBar 
       input={input} 
       setKeyword={updateInput}
      />
      <RaceResults raceResults={resultList ? resultList : []}/> 
    </>
   );
}

export default RaceDetailsPage