import React from 'react';
import { Link } from 'react-router-dom';

const LeagueList = ({ leagueList = [], disciplineNames = {} }) => {
    return (
        <>
            <table className='table table-striped' aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>League</th>
                        <th>Discipline</th>
                    </tr>
                </thead>
                <tbody>
                    {leagueList.map(league =>
                        <tr key={league.id}>
                            <td>
                                <Link to={`/season/get?leagueId=${league.id}`}> {league.name} </Link>
                            </td>
                            <td>
                                <Link to={`/league/?disciplineId=${league.disciplineId}`}> {disciplineNames[league.disciplineId]} </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default LeagueList