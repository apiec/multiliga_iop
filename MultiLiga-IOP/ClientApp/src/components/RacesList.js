import React from 'react';
import { Link } from 'react-router-dom';

const RacesList = ({ racesList = [], seasonList = {}, leagueNames = {}, disciplineNames = {} }) => {
    return (
        <>
            <table className='table table-striped' aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Race</th>
                        <th>Season</th>
                        <th>League</th>
                        <th>Discipline</th>
                    </tr>
                </thead>
                <tbody>
                    {racesList.map(race =>
                        <tr key={race.id}>
                            <td>
                                <Link to={`/race_details/?raceId=${race.id}`}> {race.name} </Link>
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
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default RacesList