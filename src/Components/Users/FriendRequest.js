import React, { Component } from 'react';
import fire from '../../config/Firebase';
import { NavLink } from 'react-router-dom';

class FriendRequest extends Component {
    constructor(props) {
        super(props)


        // this.db = fire.database().ref().child("8");
        this.db = fire.database().ref(this.props.match.params.id);

        this.state = {
            users: [],
            usersData: [],
            currentUid: ''
        }
    }

    componentDidMount() {
        const { users } = this.state;
        const { match } = this.props;
        this.state.currentUid = match.params.id;
        const that = this;
        // this.db.on('value', snap => {
        //     const fullList = Object.values(snap.val()).slice(",")

        //     // console.log(fullList)
        //     fullList.forEach(id => {
        //         fetch(`http://localhost:3001/friendRequest?id=${id}`)
        //             .then(response => response.json())
        //             // .then(response => console.log(response.data[0]))
        //             .then(response => this.setState({ usersData: [...this.state.usersData, response.data] }))
        //             .catch(err => console.error(err))
        //     });
        //     this.setState({ users })
        // });

        const interval = setInterval(() => {
            if (fire.auth().currentUser !== null) {
                this.db.on('value', snap => {
                    this.setState({ usersData: []})
                    // console.log(snap.val())
                    if (snap.val() !== null) {
                        const fullList = Object.values(snap.val()).slice(",")

                        // console.log(fullList)
                        fullList.forEach(id => {
                            fetch(`https://pfc-blablachat-node.herokuapp.com/friendRequest?id=${id}`)
                                .then(response => response.json())
                                // .then(response => console.log(response.data[0]))
                                .then(response => this.setState({ usersData: [...this.state.usersData, response.data] }))
                                .catch(err => console.error(err))
                        });
                        this.setState({ users })
                    }
                });

                if (that.state.currentUid.length !== 0) {
                    clearInterval(interval);
                }
            }
        }, 2000);
    }

    acceptRequest = (e) => {
        fetch(`https://pfc-blablachat-node.herokuapp.com/addfriend?id1=${fire.auth().currentUser.uid}&id2=${e.target.id}`)
            .catch(err => console.error(err))
        fetch(`https://pfc-blablachat-node.herokuapp.com/addfriend?id2=${fire.auth().currentUser.uid}&id1=${e.target.id}`)
            .catch(err => console.error(err))

        this.db.on('value', snap => {
            if (snap.val() !== null) {
                const fullList = snap.val()
                const keys = Object.keys(fullList)
                const values = Object.values(fullList)


                for (var i = 0; i < values.length; i++) {

                    if (values[i].toString() === e.target.id) {
                        this.db.child(keys[i]).remove();
                    }
                }
            }
        });

        alert("successfully added");

    }


    rejectRequest = (e) => {
        console.log(e);
        var confirmValue = window.confirm("Do you want to delete contact?");

        if(confirmValue){
            this.db.on('value', snap => {
                if (snap.val() !== null) {
                    const fullList = snap.val()
                    const keys = Object.keys(fullList)
                    const values = Object.values(fullList)
    
                    for (var i = 0; i < values.length; i++) {
                        if (e.target !== null && values[i].toString() === e.target.id) {
                            this.db.child(keys[i]).remove();
                        }
                    }
                }
            });

        }

    }

    render() {
        // console.log(this.state.usersData.length)
        if (this.state.usersData.length === 0) {
            return (
                <div className="container text-center screen-height">
                    <h1 className="font-weight-light text-muted">You haven't friend request</h1>
                    <h2>Search friends!</h2>
                    <button><NavLink to="/showusers"> Add friends </NavLink></button>
                </div>

            )
        }
        if (this.state.currentUid.length !== 0) {
            return (
                <div className="container screen-height mt-5">
                    <div>
                        <ul>
                            {
                                this.state.usersData.map(user => {
                                    return (
                                        <div id={user[0].id} className="row mt-3 border friend-row">
                                            <div className="col-6 d-flex">
                                                <p>{user[0].firstName}</p>
                                                <p className="ml-2">{user[0].lastName}</p>
                                            </div>

                                            <div className="col-3 align-self-center">
                                                <button id={user[0].id} className="btn btn-loating orange lighten-1 ml-2 material-icons right" onClick={this.acceptRequest}>add</button>
                                            </div>

                                            <div className="col-3 align-self-center">
                                                <button id={user[0].id} className="btn btn-loating orange lighten-1 ml-2 material-icons right" onClick={this.rejectRequest}>not_interested</button>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            )
        }

    }
}

export default FriendRequest;