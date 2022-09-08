import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CancelForm = () => {
    const navigate = useNavigate();

    const redirectBack = () => {
        navigate(-1)
    }

    return(
        <button type="button" onClick={redirectBack}>Cancel</button>
    )
}


