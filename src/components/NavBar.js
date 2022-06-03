import React from 'react';
import { NavLink } from 'react-router-dom';


function NavBar({ loggedIn }) {
        return (
        <div className = 'navWrapper'>
            <NavLink className = 'navLinks' exact to = '/'>
                Home
            </NavLink>
            {loggedIn['id'] === undefined ?
            <NavLink className = 'navLinks' exact to = '/login'>
                Login
            </NavLink> :
            <>
                <NavLink className = 'navLinks' exact to = '/logout'>
                    Logout
                </NavLink>
                <NavLink className = 'navLinks' to = {`/users/${loggedIn.id}`}>
                    Profile
                </NavLink>
                <NavLink className = 'navLinks' to = {`/users/${loggedIn.id}/posts`}>
                    Blog
                </NavLink>

            </>
            }
            
            
        </div>
    )
}

export default NavBar