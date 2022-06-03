import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function ProfileEditForm({ onUpdateProfile, profile }) {
    const [editForm, setEditForm] = useState({
        username: profile.username,
        password: ''
    })

    const params = useParams();

    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm({ ...editForm, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const patchObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editForm),
        }

        fetch (`http://localhost:9595/users/${params.id}`, patchObj)
        .then ((resp) => resp.json())
        .then ((updatedProfile) => {
            onUpdateProfile(updatedProfile)
            history.push(`/users/${params.id}`)
        });
    }

    return (
        <form className = 'editForm' onSubmit = {handleSubmit} autoComplete = 'off'>
            <p className = 'editFormH'>Edit Profile</p>
            <label className = 'label' htmlFor = 'username'>Username</label>
            <input className = 'input' id = 'username' name = 'username' type = 'text' value = {editForm.username} onChange = {handleChange} /><br/>
            <label className = 'label' htmlFor = 'password'>Confirm Password</label>
            <input className = 'input' id = 'password' name = 'password' type = 'password' value = {editForm.password} onChange = {handleChange} /><br/>
            <br/>
            <button className = 'formBtn'>Update Profile</button>
        </form>
    )
}

export default ProfileEditForm