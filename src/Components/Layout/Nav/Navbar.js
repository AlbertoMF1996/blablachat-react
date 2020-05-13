// import React from 'react'

// import "./nav.scss"
// import Burger from './Burger'


// const Navbar = () => {
//     return (
// <div id="nav" className="container">
//     <div className="logo">
//         NavBar
//     </div>
//     <Burger uid={"Uid de prueba"}/>
// </div>
//     )
// }

// export default Navbar



import React, { Component } from 'react';
// import SignedInLink from './SignedInLinks';
import fire from '../../../config/Firebase';
import { NavLink } from 'react-router-dom';
import Burger from './Burger';


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

    handleClick() {
        // Menu icon control

        if (document.getElementById("burguerStyle").classList.contains("close-menu")) {
            document.getElementById("burguerStyle").classList.add('open-menu');
            document.getElementById("burguerStyle").classList.remove('close-menu');
        } else {
            document.getElementById("burguerStyle").classList.add('close-menu');
            document.getElementById("burguerStyle").classList.remove('open-menu');
        }

        // Menu list control

        if (document.getElementById("ulNavRight").classList.contains("close-menu-list")) {
            document.getElementById("ulNavRight").classList.add('open-menu-list');
            document.getElementById("ulNavRight").classList.remove('close-menu-list');
        } else {
            document.getElementById("ulNavRight").classList.add('close-menu-list');
            document.getElementById("ulNavRight").classList.remove('open-menu-list');
        }

    }



    render() {
        const { letters, currentUid } = this.state;
        // console.log(letters)


        return (
            <div className="nav-wrapper grey darken-3">
                <div id="nav" className="container nav-wrapper px-5">
                    <div className="logo">
                        BlaBlaChat
                </div>
                    <div id="burguerStyle" className="close-menu" onClick={this.handleClick}>
                        <div />
                        <div />
                        <div />
                    </div>
                    <ul id="ulNavRight" className="close-menu-list">
                        <li><NavLink to="/addpost">New Post</NavLink></li>
                        <li><NavLink to={{ pathname: `/friendlist/${currentUid}` }}>Friends</NavLink></li>
                        <li><NavLink to="/addpost">New Post</NavLink></li>
                        <li onClick={this.logout}><NavLink to="/signin">Log Out</NavLink></li>
                        <li><NavLink to="/dashboard" className="btn btn-loating orange lighten-1">{letters}</NavLink></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default NavBar;
