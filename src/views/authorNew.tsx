import React, { FormEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthorForm } from '../components/authorForm';
import { FormAuthor } from '../models/formAuthor';

interface AuthorErrors{
    path: string;
    message: string;
}

export const AuthorNew = () => {
    const navigate = useNavigate(); 

    const saveNewAuthor = (event: FormEvent, successCallback: Function, newAuthor: FormAuthor, setErrors: Function ) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/authors/new", newAuthor)
        .then( response => successCallback(response.data.author))
        .catch( errors => {
            const errorResponse = errors.response.data.errors;
            const errorArr: AuthorErrors[] = [];
            for( const key of Object.keys(errorResponse)){
                errorArr.push({
                    path: errorResponse[key].path,
                    message: errorResponse[key].message
                });
            }
            setErrors(errorArr);
            });
    }

    const redirectHome = () => {
        navigate("/");
    }

    return(
        <div>
            <Link to={"/authors"}>Home</Link>
            <p>Add a new author: </p>
            <AuthorForm author={new FormAuthor()} saveUpdateCallback={saveNewAuthor} successCallback={redirectHome}/>
        </div>
    )
}