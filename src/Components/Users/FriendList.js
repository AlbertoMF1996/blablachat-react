import React, { Component } from 'react';
import fire from '../../config/Firebase';
import { NavLink } from 'react-router-dom';
import "./users.scss"

class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUid: this.props.match.params.id,
            users: [],
            usersData: [],
            hasFriends: false
        }
    }

    componentDidMount() {
        const that = this;
        const list = [];


        fetch(`https://pfc-blablachat-node.herokuapp.com/friendlist?id=${that.state.currentUid}`)
            .then(response => response.json())
            .then(response => that.setState({ users: response.data }))
            .catch(err => console.error(err))


        setTimeout(function () {
            if (that.state.users[0] === undefined) {
                console.log('Entro en el if')
            } else {
                that.setState({ hasFriends: true });
                // const list = [];
                that.state.users.forEach(user => {
                    // console.log(user.iduser2)
                    fetch(`https://pfc-blablachat-node.herokuapp.com/friendRequest?id=${user.iduser2}`)
                        .then(response => response.json())
                        // .then(response => console.log(response.data[0].firstName))
                        // .then(response => console.log(response.data[0]))
                        .then(response => list.push(Object.values(response.data[0])))
                        // .then(response => that.setState({ usersData: [...that.state.usersData, response.data[0].id] }))
                        // .then(response => list.push(response.data[0].id, response.data[0].firstName))
                        .catch(err => console.error(err))
                });

            }

        }, 1000)



        setTimeout(function () {
            // const { usersData } =  that.state;
            list.forEach(userListaData => {

                const newUser = {
                    id: userListaData[0],
                    email: userListaData[1],
                    firstName: userListaData[2],
                    lastName: userListaData[3],
                    letters: userListaData[4]
                }

                that.setState({
                    usersData: [...that.state.usersData, newUser]
                })
                // console.log(userListaData)
            })
        }, 1400)



    }
    showId() {
        alert(fire.auth().currentUser.uid)
    }

    prueba = () => {
        console.log(this.state.usersData)
    }



    render() {

        const { usersData, currentUid, hasFriends } = this.state;
        // console.log(hasFriends)
        if (hasFriends === false) {
            return (
                <div className="container text-center screen-height">
                    <h1 className="font-weight-light text-muted">You haven't friend yet </h1>
                    <span className="d-flex justify-content-center">
                        <h2 className="align-self-center m-0">Search friends!</h2>
                        <button className="btn btn-loating orange lighten-1 material-icons align-self-center ml-5"><NavLink to="/showusers"> add </NavLink></button>
                    </span>

                </div>
            )
        } else {
            return (
                <div className="container screen-height mt-5">
                    <div className="mb-3">
                        <span>Add more friends</span>
                        <button className="btn btn-loating orange lighten-1 material-icons ml-3"><NavLink to={{ pathname: `/showusers` }}>add</NavLink></button>
                    </div>
                    {

                        usersData.map(user => {
                            return (
                                <div className="row border friend-row" key={user.id}>
                                    <div className="col-md-9 align-self-center">
                                        <p><span className="btn btn-loating orange lighten-1 mr-3">{user.letters}</span>{user.firstName} {user.lastName}</p>

                                    </div>
                                    <div className="col-md-3 align-self-center">
                                        <button className="btn btn-loating orange lighten-1 material-icons right"><NavLink to={{ pathname: `/chatroom/${user.id}-${currentUid}` }}>chat</NavLink></button>
                                    </div>
                                </div>
                            )
                        })
                    }



                </div>
            );
        }
    }
}

export default FriendList;