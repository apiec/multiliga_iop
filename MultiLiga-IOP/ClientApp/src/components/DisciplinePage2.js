import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import DisciplineListToSignUp from './DisciplineListFiltered';

const DisciplinePage2 = (props) => {
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
    const filtered = disciplineListDefault.filter(discipline => {
      return discipline.name.toLowerCase().includes(input.toLowerCase())
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
      <DisciplineListToSignUp disciplineList={disciplineList}/>
    </>
   );
}

export default DisciplinePage2