import React from 'react';
import { Author } from '../models/author';
import { DeleteButton } from './deleteButton'
import { EditButton } from './editButton';

interface AuthorProps{
    authors: Author[];
    removeFromDom: Function;
}

const style = {
    display: "flex",
    justifyContent: "center"
}

export const AuthorDisplay = ( props: AuthorProps ) => {

    return(
        <div>
            <div style={style}>
            <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Actions available</th>
                    </tr>
                </thead>
                <tbody>
                    {props.authors.map( (oneAuthor, i) => <tr key={i}>
                        <td>{oneAuthor.name}</td>
                        <td>
                            <DeleteButton _id={oneAuthor._id} objectsName="authors" successCallback={()=>props.removeFromDom(oneAuthor._id)} />
                            <EditButton _id={oneAuthor._id} objectsName="authors"/>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            </div>



        </div>
    )
}