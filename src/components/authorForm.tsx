import React, { ChangeEvent, FormEvent, useReducer, useState } from 'react';
import { FormAuthor } from '../models/formAuthor';
import { CancelForm } from './cancelForm';

const style = {
    display: "flex",
    justifyContent: "center"
}

const styleRed = {
    color: "red"
}

interface FormProps{
    author: FormAuthor;
    saveUpdateCallback: Function;
    successCallback: Function;
}

interface AuthorErrors{
    path: string;
    message: string;
}

type Action = 
| { type: string, payload: string }
| { type: string, payload: number };

function reducer( oneAuthor: FormAuthor, action: Action ){
    return {
        ...oneAuthor,
        [action.type]: action.payload
    };
}

export const AuthorForm = (props: FormProps) => {
    const [ oneAuthor, dispatch ] = useReducer( reducer, props.author )
    const [ errors, setErrors ] = useState<AuthorErrors[]>([]);

    const handleChange = ( event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        dispatch({
            type: name,
            payload: value
        })
    }

    return(
        <div style={style}>
        <form onSubmit={ (event: FormEvent ) => props.saveUpdateCallback(event, props.successCallback, oneAuthor, setErrors) }>
        <table>
            <tbody>
                <tr><td><label>Name:</label></td></tr>
                <tr><td>
                    <input  name="name"
                            value={oneAuthor.name} 
                            onChange={ (event: ChangeEvent<HTMLInputElement>) => handleChange(event)} />
                </td></tr>
                <tr>
                    <td>
                        <CancelForm/>
                        <input type="submit" value="Save"/>
                    </td>
                </tr>
                { errors.length > 0 ? 
                    errors.map( (oneError, i) => <tr key={i} ><td style={styleRed} >{oneError.message}</td></tr>)
                : null }
            </tbody>
        </table>
        </form>
        </div>
    )
}