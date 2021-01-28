import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ParseDate = (sharpDateTime) => {
    return (
        <>
            {new Date(Date(sharpDateTime)).toLocaleDateString()}
        </>
        );
}

export default ParseDate