import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DeleteProps{
    _id: string;
    objectsName: string
}

export const EditButton = (props: DeleteProps) => {
    const navigate = useNavigate();

    const redirectEditForm = () => {
        navigate("/"+props.objectsName+"/"+props._id+"/edit")
    }

    return(
        <button onClick={redirectEditForm}>Edit</button>
    )
}