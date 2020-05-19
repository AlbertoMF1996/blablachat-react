import React, { Component } from 'react';
import fire from '../../config/Firebase';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.signup = this.signup.bind(this);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }


    signup(e) {
        // e.preventDefault();
        // const that = this;
        // fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        //     .then(function () {
        //         fire.auth().onAuthStateChanged(function (user) {
        //             if (user) {
        //                 // User is signed in.
        //                 console.log('si')
        //                 // console.log(user.uid)

        //                 setTimeout(function () {
        //                     // console.log(user.uid)
        //                     const uid = user.uid;
        //                     console.log('id: '+uid)
        //                     fetch(`https://pfc-blablachat-node.herokuapp.com/users/add?id=${uid}&email=${that.state.email}&firstName=${that.state.firstName}&lastName=${that.state.lastName}&letters=${that.state.firstName[0] + that.state.lastName[0]}`)
        //                     .catch(err => console.error(err))
        //                 }, 1400)
        //             } else {
        //                 // No user is signed in.
        //                 console.log('no')
        //             }
        //         });

        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })

        this.signUpErrorHandle();

    }

    signUpErrorHandle(){
        var { email, password, firstName, lastName} = this.state;

        var error ="";

        if(email.length === 0){
            error = error+"-Fill email \n";
        }
        if(password.length === 0 || password.length <6){
            error = error +"-Passwords must have at least 6 characters \n";
        }

        if(firstName.length === 0){
            error = error + "-Fill first name \n";
        }

        if(lastName.length === 0){
            error = error + "-Fill last name \n";
        }
        alert(error);
    }

    handleChange = (e) => {

        this.setState({
            [e.target.id]: e.target.value,
        })

    }
    handleSubmit = (e) => {
        e.preventDefault();
        // if (this.state.email.length > 0 & this.state.password.length > 5 & this.state.firstName.length > 0 & this.state.lastName.length > 0) {
            this.signup();
        // }
    }
    render() {
        const { handleState } = this.props


        return (
            <div className="container screen-height">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darker-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={this.handleChange} />
                    </div>


                    <div className="input-field">
                        <button className="btn orange lighten-1 z-depth-0">Sign Up</button>
                        <small className="right">Have account? <button onClick={handleState}>Sign in</button></small>
                    </div>
                </form>
            </div>
        )
    }
}


export default SignUp