import React from 'react';
import { Link } from 'react-router-dom';

const SeasonList = ({ seasonList = [], leagueNames = {}, disciplineNames = {} }) => {
    return (
        <>
            <table className='table table-striped' aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Season</th>
                        <th>League</th>
                        <th>Discipline</th>
                    </tr>
                </thead>
                <tbody>
                    {seasonList.map(season =>
                        <tr key={season.id}>
                            <td>
                                <Link to={`/race/?seasonId=${season.id}`}> {season.name} </Link>
                            </td>
                            {
                                leagueNames[season.leagueId] ?
                                <>
                                    <td>
                                        <Link to={`/season/?leagueId=${season.leagueId}`}> {leagueNames[season.leagueId] ? leagueNames[season.leagueId].name : "-"} </Link>
                                    </td>
                                    <td>
                                        <Link to={`/league/?disciplineId=${leagueNames[season.leagueId] ? leagueNames[season.leagueId].disciplineId : "-"}`}> {disciplineNames[leagueNames[season.leagueId].disciplineId]} </Link>
                                    </td>
                                </>
                                :
                                <>
                                    <td>-</td>
                                    <td>-</td>
                                </>
                            }
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default SeasonList