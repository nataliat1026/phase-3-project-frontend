import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function NewUser({ addNewUser }) {
    const initFormState = {
        username: '',
        email: '',
        password: ''
    }

    const [formState, setFormState] = useState(initFormState);
    const [passConfirmation, setPassConfirmation] = useState({passwordConfirm: ''})

    const history = useHistory();

    const formChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({...prevState, [name]: value}))
    }

    const passwordConfChange = (e) => {
        const { name, value } = e.target;
        setPassConfirmation((prevState) => ({...prevState, [name]: value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (formState.password !== passConfirmation.passwordConfirm) {
            alert('Passwords do not match! Please try again.')
        } else {
            await fetch ('http://localhost:9595/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
            })
            .then ((resp) => resp.json())
            .then ((newUser) => {
                addNewUser(newUser)
                setFormState(initFormState)
                history.push(`/users/${newUser.id}`)
            })
        }
    }

    return (
        <div>
            <form  className = 'formWrapper' onSubmit = {handleSubmit} autoComplete="off">
                <label className = 'label' htmlFor = 'username'></label>
                <input className = 'input' id = 'username' type = 'text' name = 'username' placeholder = 'Username' value = {formState.username} onChange = {formChange} required />
                <label className = 'label' htmlFor = 'email'></label>
                <input className = 'input' id = 'email' type = 'email' name = 'email' placeholder = 'Email address' value = {formState.email} onChange = {formChange} required />
                <label className = 'label' htmlFor = 'password'></label>
                <input className = 'input' id = 'password' type = 'password' name = 'password' placeholder = 'Password' value = {formState.password} onChange = {formChange} required />
                <label className = 'label' htmlFor = 'passwordConfirm'></label>
                <input className = 'input' id = 'passwordConfirm' type = 'password' name = 'passwordConfirm' placeholder = 'Confirm password' value = {passConfirmation.passwordConfirm} onChange = {passwordConfChange} required />
                <button className = 'formBtn' type = 'submit'>Create Account</button>
            </form>
        </div>
    )
}

export default NewUser
