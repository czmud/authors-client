import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthorForm } from '../components/authorForm';
import { FormAuthor } from '../models/formAuthor';

interface AuthorErrors{
    path: string;
    message: string;
}

export const AuthorEdit = () => {
    const { id } = useParams();
    const [ oneAuthor, setOneAuthor ] = useState<FormAuthor>(new FormAuthor());
    const [ authorIsFetched, setAuthorIsFetched ] = useState(false);
    const navigate = useNavigate();

    useEffect( () => {
        axios.get("http://localhost:8000/api/authors/"+id)
            .then( response => { setOneAuthor(
                new FormAuthor(
                response.data.author.name
                ));
                setAuthorIsFetched(true);
            })
            .catch( error => console.log(error) )
    }, [id]);

    const redirectHome = () => {
        navigate("/");
    }

    const updateExistingAuthor = (event: FormEvent, successCallback: Function, updateAuthor: FormAuthor, setErrors: Function ) => {
        event.preventDefault();
        axios.put("http://localhost:8000/api/authors/update/"+id, updateAuthor)
            .then( results => successCallback())
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

    return(
        <div>
        <Link to={"/authors"}>Home</Link>
        <p>Edit this author: </p>
        {authorIsFetched ? <AuthorForm author={oneAuthor} saveUpdateCallback={updateExistingAuthor} successCallback={redirectHome}/> : null }
    </div>
    )
}