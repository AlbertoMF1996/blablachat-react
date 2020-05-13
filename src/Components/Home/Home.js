import React, { Component } from 'react';
import Router  from '../Router';

class Home extends Component {
    render() {

        return (
            <div>
                {/* <button><NavLink to="/dashboard"> Sign up</NavLink></button> */}
                <Router />
                
            </div>
        )
    }
}

export default Home;