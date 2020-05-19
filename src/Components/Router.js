import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../Components/Dashboard/Dashboard';
import AddPost from './Dashboard/AddPost';
import ShowUsers from './Users/ShowUsers';
import FriendRequest from './Users/FriendRequest';
import Chat from './Chat/Chat';
import FriendList from './Users/FriendList';
import Error from './Layout/Error';
import Navbar from './Layout/Nav/Navbar';



class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    {/* <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} /> */}
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/addpost" component={AddPost} />
                    <Route exact path="/showusers" component={ShowUsers} />
                    <Route exact path="/friendrequest/:id" component={FriendRequest} />
                    <Route exact path="/friendlist/:id" component={FriendList} />
                    <Route exact path="/chatroom/:room" component={Chat} />
                    <Route component={Error}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;