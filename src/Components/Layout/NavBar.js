import React, { Component } from 'react';
// import SignedInLink from './SignedInLinks';
import fire from '../../config/Firebase';
import { NavLink } from 'react-router-dom';


class NavBar extends Component {
    constructor() {
        super()
        this.state = {
            letters: '',
            currentUid: ''
        }
    }

    logout() {
        fire.auth().signOut();
        console.log('Hago algo')
        console.log(fire.auth());
    }



    componentDidMount() {
        const that = this;

        const interval = setInterval(() => {
            if (fire.auth().currentUser !== null) {
                that.setState({ currentUid: fire.auth().currentUser.uid })
                // console.log(fire.auth().currentUser.uid)
                fetch(`http://localhost:3001/data?id=${fire.auth().currentUser.uid}`)
                    .then(response => response.json())
                    .then(response => that.setState({ letters: response.data[0].letters }))
                    .catch(err => console.error(err))

                if (that.state.letters.length === 2) {
                    clearInterval(interval);
                }
            }
        }, 1000);

    }



    render() {
        const { letters, currentUid } = this.state;
        // console.log(letters)


        return (
            <div>
                <nav className="nav-wrapper grey darken-3">
                    <div className="container">
                        <li className="brand-logo">BlaBlaChat</li>
                        <ul className="right">
                            <li><NavLink to="/addpost">New Post</NavLink></li>
                            <li><NavLink to={{ pathname: `/friendlist/${currentUid}` }}>Friends</NavLink></li>
                            <li><NavLink to="/addpost">New Post</NavLink></li>
                            <li onClick={this.logout}><NavLink to="/signin">Log Out</NavLink></li>
                            <li><NavLink to="/dashboard" className="btn btn-loating orange lighten-1">{letters}</NavLink></li>
                        </ul>
                    </div>

                </nav>


            </div>
        )
    }
}

export default NavBar;