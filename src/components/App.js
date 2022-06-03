import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import NavBar from './NavBar';
import Login from './Login';
import NewUser from './NewUser';
import Profile from './Profile';
import ProfileEditForm from './ProfileEditForm';
import Logout from './Logout';
import Blog from './Blog';

function App() {
  const [loggedIn, setLoggedIn] = useState({});
  const [posts, setPosts] = useState([]);

  const addNewUser = (newUser) => setLoggedIn(newUser);

  const onUpdateProfile = (updatedProfile) => {
    setLoggedIn(updatedProfile);
  }

  const onDeleteUser = () => {
    setLoggedIn({})
  }


  useEffect(() => {
    fetch(`http://localhost:9595/users/${loggedIn.id}/posts`)
      .then((resp) => resp.json())
      .then((postsArr) => {
        console.log(postsArr)
        setPosts(postsArr)
      })
  }, [loggedIn])


  return (
    <>
      <NavBar loggedIn = {loggedIn} />
      <Switch>
        <Route exact path = '/'>
          <Home />
        </Route>
        <Route path = '/login'>
          <Login setLoggedIn = {setLoggedIn} />
        </Route>
        <Route path = '/users/new'>
          <NewUser addNewUser = {addNewUser} />
        </Route>
        <Route exact path = '/users/:id'>
          <Profile profile = {loggedIn} onDeleteUser = {onDeleteUser} />
        </Route>
        <Route exact path = '/profile/:id/edit'>
          <ProfileEditForm onUpdateProfile = {onUpdateProfile} profile = {loggedIn} />
        </Route>
        <Route exact path = '/users/:id/posts'>
          <Blog profile = {loggedIn} posts = {posts} setPosts = {setPosts} />
        </Route>
        <Route path = '/logout'>
          <Logout setLoggedIn = {setLoggedIn} />
        </Route>
      </Switch>
    </>
  );
}

export default App;



//  ?  fetch (`http://localhost:9595/users/${id}`)