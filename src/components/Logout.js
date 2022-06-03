import React, { useEffect } from 'react'

function Logout({ setLoggedIn }) {


    useEffect(() => {
        fetch (`http://localhost:9595/users/logout`, {
            method: 'DELETE'
        })
        .then ((resp) => resp.json())
        .then (setLoggedIn)
    }, [])

    return (
        <>
            <h3>Have a spectacular day!</h3>
        </>
    )
    }

export default Logout