import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Profile({ profile, onDeleteUser }) {
    const { id, username } = profile;
    const history = useHistory();

    const handleDelete = () => {
        fetch (`http://localhost:9595/users/${profile.id}`, {
            method: 'DELETE',
        })
        .then ((resp) => console.log(resp))
        .then (() => {
            onDeleteUser(profile) 
            history.push('/users/new')})
    }

    return (
        <div className = 'userInfo'>
            <p className = 'username'>username: {username}</p>
            <Link to = {`/profile/${id}/edit`}>
                <button className = 'formBtn'>Edit Profile</button>
            </Link>
                <button className = 'formBtn' onClick = {handleDelete}>Delete Profile</button>
        </div>
    )
}

export default Profile