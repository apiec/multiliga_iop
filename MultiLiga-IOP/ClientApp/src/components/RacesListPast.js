import React, { useState, useEffect } from 'react';
import authService from './api-authorization/AuthorizeService'
import { Link } from 'react-router-dom';

const RacesListPast = ({ racesList = [], seasonList = {}, leagueNames = {}, disciplineNames = {} }) => {
    
    return (
        <>
            <table className='table table-striped' aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Race</th>
                        <th>Date</th>
                        <th>Season</th>
                        <th>League</th>
                        <th>Discipline</th>
                    </tr>
                </thead>
                <tbody>
                    {racesList.sort((a,b) => Date.parse(a.date) - Date.parse(b.date)).map(race =>
                        <tr key={race.id}>
                            {seasonList[race.seasonId] && leagueNames[seasonList[race.seasonId].leagueId] ? 
                            <>
                                <td>
                                    <Link to={`/race_details/?raceId=${race.id}`}> {race.name} </Link>
                                </td>
                                <td>
                                <p>{race.date.substring(0,10)}</p>    
                                </td>
                                <td>
                                    <Link to={`/race/?seasonId=${race.seasonId}`}> {seasonList[race.seasonId].name} </Link>
                                </td>
                                <td>
                                    <Link to={`/season/?leagueId=${seasonList[race.seasonId].leagueId}`}> {leagueNames[seasonList[race.seasonId].leagueId].name} </Link>
                                </td>
                                <td>
                                    <Link to={`/league/?disciplineId=${leagueNames[seasonList[race.seasonId].leagueId].disciplineId}`}> {disciplineNames[leagueNames[seasonList[race.seasonId].leagueId].disciplineId]} </Link>
                                </td>
                            </>
                            :
                            <></>
                            }
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default RacesListPast