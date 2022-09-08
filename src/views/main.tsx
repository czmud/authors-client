import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Author } from '../models/author';
import { AuthorDisplay } from '../components/authorDisplay';

export const Main = () => {
    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect( () => {
        axios.get("http://localhost:8000/api/authors")
            .then( response => setAuthors(response.data.authors))
            .catch( error => console.log(error) )
    }, []);

    const removeFromDom = (_id: string) => {
        setAuthors(authors.filter( oneAuthor => oneAuthor._id !== _id ));
    }

    return(
        <div>
            <p><Link to={"/authors/new"}>Add an author</Link></p>
            <p>We have quotes by:</p>
            <AuthorDisplay authors={authors} removeFromDom={removeFromDom}/>
        </div>
    )
}