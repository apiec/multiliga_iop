import React from 'react';
import { Link } from 'react-router-dom';

const DisciplineListToSignUp = ({ disciplineList = [] }) => {
    return (
        <>
            { disciplineList.map((data, index) => {
                if (data) {
                    return (
                        <div key={data.name}>
                            <Link to={`/racelist_signups?disciplineId=${data.id}`}> {data.name} </Link>
                        </div>
                    )
                }
                return null
            })}
        </>
    );
}

export default DisciplineListToSignUp