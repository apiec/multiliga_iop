import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RaceResults = ({ raceResults = [] }) => {


    const toMillis = (s) => {
        return Date.parse(`01 Jan 1970 ${s} GMT`)
    }
        
    return (
        <>
            <table className='table table-striped' aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {raceResults
                    .sort((a, b) => toMillis(a.result) - toMillis(b.result))
                    .map((row, index) =>
                        row.display ?
                            <tr key={row.user.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link to={`/user/?userId=${row.user.id}`}> {row.user.userName} </Link>
                                </td>
                                <td>
                                    {row.result}
                                </td>
                            </tr>
                        :
                            null
                    )}
                </tbody>
            </table>
        </>
    );
}

export default RaceResults