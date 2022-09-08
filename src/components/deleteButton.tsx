import React from 'react';
import axios from 'axios';

interface DeleteProps{
    _id: string;
    objectsName: string
    successCallback: Function;
}

export const DeleteButton = (props: DeleteProps) => {

    const deleteById = () => {
        axios.delete('http://localhost:8000/api/'+props.objectsName+'/delete/'+props._id)
            .then( response => { props.successCallback(); });
    }

    return(
        <button type="button" onClick={deleteById}>Delete</button>
    )
}