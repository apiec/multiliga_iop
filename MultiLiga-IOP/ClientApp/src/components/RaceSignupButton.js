import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RaceSignupButton = ({ userId, raceId }) => {
    const [isSignedUp, setIsSignedUp] = useState(false);
    
    const signUp = async () => {
        return await fetch(`race/signup?userId=${userId}&raceId=${raceId}`, {
            method: 'POST'
        })
        .then(result => setIsSignedUp(result.ok))
    } 

    return (
        isSignedUp ?
        <>
            <button onClick={signUp}>Sign up!</button>
        </>
        :
        <>
            <button onClick={signOut}>Sign out!</button>
        </>
        
    );
}

export default RaceSignupButton