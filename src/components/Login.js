import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function Login({ setLoggedIn }) {
    const initFormState = {
        username: '',
        password: ''
    }

    const [formState, setFormState] = useState(initFormState);

    const history = useHistory();

    const formChange = (e) => {
        const {name, value } = e.target;
        setFormState((prevState) => ({...prevState, [name]: value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await fetch ('http://localhost:9595/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        .then ((resp) => resp.json())
        .then ((user) => {
            if(user.error) {
                alert(user.error)
            } else {
                setLoggedIn(user)
                setFormState(initFormState)
                history.push(`/users/${user.id}`)
            }
        })
    }

    return (
        <div>
            <form className = 'formWrapper' onSubmit = {handleSubmit} autoComplete="off">
                <input className = 'input' type = 'text' name = 'username' placeholder = 'Username' value = {formState.username} onChange = {formChange} required />
                <input className = 'input' type = 'password' name = 'password' placeholder = 'Password' value = {formState.password} onChange = {formChange} required />
                <button className = 'formBtn' type = 'submit'>Login</button>
            </form>
            <p className = 'signup'>Don't have an account?<br />
                Create one <a className = 'signupLink' href = '/users/new' >HERE</a></p>
        </div>
    )
}

export default Login