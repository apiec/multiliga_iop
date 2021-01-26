import React from 'react';
import { Link } from 'react-router-dom';

const DisciplineList = ({ disciplineList = [] }) => {
    return (
        <>
            { disciplineList.map((data, index) => {
                if (data) {
                    return (
                        <div key={data.name}>
                            <Link to={`/league/get?disciplineId=${data.id}`}> {data.name} </Link>
                        </div>
                    )
                }
                return null
            })}
        </>
    );
}

export default DisciplineList