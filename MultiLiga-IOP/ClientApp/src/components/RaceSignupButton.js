import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal'

const RaceSignupButton = ({ userId, raceId }) => {
    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
    
    const checkIfSignedUp = async () => {
        return await fetch(`race/issignedup?userId=${userId}&raceId=${raceId}`)
        .then(response => response.json())
        .then(result => setIsSignedUp(result.isSignedUp))
    }

    const openSignUpModal = () => {
        setIsSignUpModalOpen(true)
    }

    const closeSignUpModal = () => {
        setIsSignUpModalOpen(false)
    }

    const openSignOutModal = () => {
        setIsSignOutModalOpen(true)
    }

    const closeSignOutModal = () => {
        setIsSignOutModalOpen(false)
    }

    const signUp = async () => {
        return await fetch(`race/signup?userId=${userId}&raceId=${raceId}`, {
            method: 'POST'
        })
        .then(result => setIsSignedUp(result.ok ? true : isSignedUp))
    } 


    const signOut = async () => {
        return await fetch(`race/signout?userId=${userId}&raceId=${raceId}`, {
            method: 'POST'
        })
        .then(result => setIsSignedUp(result.ok ? false : isSignedUp))
    }

    const signUpAndCloseModal = async () => {
        signUp();
        closeSignUpModal();
    }

    const signOutAndCloseModal = async () => {
        signOut();
        closeSignOutModal();
    }

    checkIfSignedUp()
    return (
        <>
            {!isSignedUp ?
                <>
                    <button disabled={!userId ? true : false} onClick={openSignUpModal}>Sign up!</button>
                </>
                :
                <>
                    <button disabled={!userId ? true : false} onClick={openSignOutModal}>Sign out!</button>
                </>
            }
            <Modal
                isOpen={isSignUpModalOpen}
                onRequestClose={closeSignUpModal}
                contentLabel={"AAA"}
                ariaHideApp={false}
                style={customStyles}
            >
                <h2> Confirm </h2>
                <div>Confirm signing up</div>
                <button onClick={signUpAndCloseModal}>Confirm</button>
                <button onClick={closeSignUpModal}>Cancel</button>
            </Modal>
            
            <Modal
                isOpen={isSignOutModalOpen}
                onRequestClose={closeSignOutModal}
                contentLabel={"BBB"}
                ariaHideApp={false}
                style={customStyles}
            >
                <h2> Confirm </h2>
                <div>Confirm signing out</div>
                <button onClick={signOutAndCloseModal}>Confirm</button>
                <button onClick={closeSignOutModal}>Cancel</button>
            </Modal>
        </>
    );
}

export default RaceSignupButton