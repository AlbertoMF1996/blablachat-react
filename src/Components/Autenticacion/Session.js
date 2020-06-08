import React, { Component } from 'react'
import SignUp from './SignUp';
import SignIn from './SignIn';

class Session extends Component {
    constructor() {
        super()
        this.state = {
            signUp: true
        }
    }

    handleState = () => {
        var { signUp } = this.state;
        if(signUp !== null){
            this.setState({ signUp: !signUp})
        }
    }
    render() {
        var { signUp } = this.state;

        if (signUp) {
            return (
                
                <SignIn handleState={this.handleState}/>
            )
        } else {
            return(
                <SignUp handleState={this.handleState}/>
            )

        }
    }
}

export default Session;