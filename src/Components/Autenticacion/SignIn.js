import React, { Component } from 'react'
import fire from '../../config/Firebase';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }
    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {})
        .catch((error) => {
            alert('Wrong email or password');
            console.log(error);
        })
    }
    render() {

        const { handleState } = this.props;
        return ( 
            <div className="container screen-height">
                <form onSubmit={this.login} className="white">
                    <h5 className="grey-text text-darker-3">Sign In</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn orange lighten-1 z-depth-0">Login</button>
                        <small className="right">Don't have account? <button onClick={handleState}>Sign up</button></small>
                    </div>

                </form>
            </div> 
        )
    }
}


export default SignIn