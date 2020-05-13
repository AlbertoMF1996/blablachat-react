import React, { Component } from 'react';
import fire from '../../config/Firebase';

class ShowUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            nameSearch: ''
        }
    }


    getUsers = _ => {
        fetch(`http://localhost:3001/users?nameSearch=${this.state.nameSearch}`)
            .then(response => response.json())
            .then(response => this.setState({ users: response.data }))
            .catch(err => console.error(err))

        this.render();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    sendFriendRequest = (e) => {
        const firebaseRef = fire.database().ref();
        firebaseRef.child(e.target.id).push(fire.auth().currentUser.uid)
        alert("request sent successfully");
    }


    renderUsers = ({ id, firstName, lastName }) =>
        <div key={id} className="mt-3">Usuario con nombre: {firstName} y apellido: {lastName} <button id={id}  className="ml-2" onClick={this.sendFriendRequest}>Prueba</button></div>


    render() {
        const { users } = this.state;
        return (
            <div className="container mt-3 screen-height">
                <input type="text" id="nameSearch" onChange={this.handleChange} />
                <button onClick={this.getUsers}>Search</button>
                {users.map(this.renderUsers)}

            </div>
        );
    }
}

export default ShowUsers;