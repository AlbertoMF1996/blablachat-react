import React, { Component } from 'react';
import fire from '../../config/Firebase';
import './chat.css';

class Chat extends Component {

    constructor(props) {
        super(props);

        this.updateMessage = this.updateMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateScroll = this.updateScroll.bind(this);

        this.state = {
            message: '',
            messages: [],
            currentChatRoom: ''
        }
    }

    updateMessage(e) {
        this.setState({ message: e.target.value });

    }

    handleSubmit(e) {
        e.preventDefault();

        if (document.getElementById("message").value !== "") {
            var div = document.getElementById("chat-container");
            // div.scrollTop = div.scrollHeight;
            console.log("altura pre mandado: " + div.scrollHeight)
            const newMessage = {
                id: this.state.messages.length,
                text: this.state.message,
                user: fire.auth().currentUser.uid
            };
            fire.database().ref(`${this.state.currentChatRoom}/${newMessage.id}`)
                .set(newMessage);

            this.setState({ message: '' });

            this.updateScroll();
        }



    }

    componentWillMount() {
        const { match } = this.props;
        // console.log(match.params.room)

        const splitedUrl = (match.params.room).split("-");
        const orderedUrl = splitedUrl.sort();

        const currentChat = `${orderedUrl[0]}${orderedUrl[1]}`
        this.setState({ currentChatRoom: currentChat })
        console.log(currentChat)

        console.log(fire.database().ref(currentChat).key)

        // fire.database().ref(currentChat).on('value', snap => {
        fire.database().ref(`${currentChat}`).on('value', snap => {
            const currentMessages = snap.val();
            if (currentMessages !== null) {
                this.setState({
                    messages: currentMessages
                })
            }
        })

    }
    componentDidMount() {

        // const { match } = this.props;
        // // console.log(match.params.room)

        // const splitedUrl = (match.params.room).split("-");
        // const orderedUrl = splitedUrl.sort();

        // const currentChat = `${orderedUrl[0]}${orderedUrl[1]}`
        // this.setState({ currentChatRoom: currentChat })
        // console.log(currentChat)

        // console.log(fire.database().ref(currentChat).key)

        // // fire.database().ref(currentChat).on('value', snap => {
        // fire.database().ref(`${currentChat}`).on('value', snap => {
        //     const currentMessages = snap.val();
        //     if (currentMessages !== null) {
        //         this.setState({
        //             messages: currentMessages
        //         })
        //     }
        // })

        setTimeout(function () {
        var div = document.getElementById("chat-container");
        div.scrollTop = div.scrollHeight;
        }, 100)
        // var div = document.getElementById("chat-container");
        // div.scrollTop = div.scrollHeight;

    }

    updateScroll() {
        // var div = document.getElementById("chat-container");
        // div.scrollTop = div.scrollHeight;
        // console.log(div.scrollHeight);
        setTimeout(function () {
            var div = document.getElementById("chat-container");
            div.scrollTop = div.scrollHeight;
        }, 10)
    }


    render() {


        const { messages } = this.state;
        const messagesList = messages.map(message => {


            if (message.user === fire.auth().currentUser.uid) {
                return <p key={message.id} className="message mt-2 align-self-end justify-content-end message-right">{message.text}</p>
            } else {
                return <p key={message.id} className="message mt-2 message-left">{message.text}</p>
            }
        })



        return (
            <div className="screen-height container">
                <div id="chat-container" className="chat-container container mt-5">
                    {/* <ul>
                    <span>{messagesList}</span>
                </ul> */}
                    <div className="d-flex flex-column">
                        {messagesList}
                    </div>

                </div>
                <form onSubmit={this.handleSubmit} className="d-flex">
                    <input id="message" type="text" value={this.state.message} onChange={this.updateMessage} />

                    <button type="submit" className="ml-3">Send</button>
                </form>
            </div>
        );
    };
}

export default Chat;