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
        fetch(`https://pfc-blablachat-node.herokuapp.com/users?nameSearch=${this.state.nameSearch}`)
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
        alert("Request sent successfully");
    }


    renderUsers = ({ id, firstName, lastName, letters }) =>
        <div className="row border" key={id}>
            <div className="col-8 align-self-center">
                <div key={id} className="mt-3 d-flex container users-list"><p><span className="btn btn-loating orange lighten-1 mr-3">{letters}</span>{firstName} {lastName} </p></div>
            </div>
            <div className="col-4 add-button align-self-center">
                <button id={id} className="btn btn-loating orange lighten-1 material-icons ml-2" onClick={this.sendFriendRequest}>add</button>
            </div>
        </div>

    render() {
        const { users } = this.state;
        return (
            <div className="screen-height container">
                <div className=" mt-3 d-flex container">
                    <input type="text" id="nameSearch" onChange={this.handleChange} />
                    <button className="btn btn-loating orange lighten-1 material-icons ml-5" onClick={this.getUsers}>search</button>
                </div>

                <div className="mt-4">
                    {users.map(this.renderUsers)}
                </div>
            </div>
        );
    }
}

export default ShowUsers;