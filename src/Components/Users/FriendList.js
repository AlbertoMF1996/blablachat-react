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
                <div className="screen-height">
                    <h1>Añade algun amigo, Ransio</h1>
                    <button><NavLink to={{ pathname: `/friendrequest/${currentUid}` }}> Friend request </NavLink></button>
                </div>
            )
        } else {
            return (
                <div className="container screen-height mt-5">
                    <div>
                        <span>Add more friends</span>
                        <button className="btn btn-loating orange lighten-1 material-icons"><NavLink to={{ pathname: `/showusers`}}>add</NavLink></button>
                    </div>
                    {

                        usersData.map(user => {
                            return (
                                <div className="row border friend-row" key={user.id}>
                                    <div className="col-md-9 align-self-center">
                                        <p>{user.letters} {user.firstName} {user.lastName}</p>

                                    </div>
                                    <div className="col-md-3 align-self-center">
                                        <button className="btn btn-loating orange lighten-1 material-icons"><NavLink to={{ pathname: `/chatroom/${user.id}-${currentUid}` }}>chat</NavLink></button>
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