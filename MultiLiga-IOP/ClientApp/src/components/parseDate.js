import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ParseDate = (sharpDateTime) => {
    return (
        <>
            {sharpDateTime.date}
        </>
        );
}

export default ParseDate