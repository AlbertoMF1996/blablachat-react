import React, { Component } from 'react';
import fire from '../src/config/Firebase';


// import Router from './Components/Router';
import Home from './Components/Home/Home';
import Session from './Components/Autenticacion/Session';
import Footer from './Components/Layout/Footer'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }
    componentDidMount() {
        this.authListener();
    }


    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            // console.log(user);
            if (user) {
                this.setState({ user });
            } else {
                this.setState({ user: null });
            }
        })

    }


    render() {

        return (
            // <BrowserRouter>
            <div className="App">
                {this.state.user ? (<Home />) : (<Session />)}
                <Footer />
            </div>


        );
    }
}

export default App;
