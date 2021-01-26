import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import DisciplineList from './DisciplineList';

const DisciplineSearchPage = (props) => {
  const [input, setInput] = useState('');
  const [disciplineListDefault, setDisciplineListDefault] = useState();
  const [disciplineList, setDisciplineList] = useState();

  const fetchData = async () => {
      return await fetch('discipline/get')
      .then(response => response.json())
      .then(data => {
         setDisciplineList(data) 
         setDisciplineListDefault(data)
       });}

  const updateInput = async (input) => {
     const filtered = disciplineListDefault.filter(country => {
      return country.name.toLowerCase().includes(input.toLowerCase())
     })
     setInput(input);
     setDisciplineList(filtered);
  }

  useEffect( () => {fetchData()},[]);
	
  return (
    <>
      <h1>Discipline List</h1>
      <SearchBar 
       input={input} 
       setKeyword={updateInput}
      />
      <DisciplineList disciplineList={disciplineList}/>
    </>
   );
}

export default DisciplineSearchPage