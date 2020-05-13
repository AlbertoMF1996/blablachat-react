import React, { Component } from 'react';
import fire from '../../config/Firebase';

class AddPost extends Component {

    state = {
        post: {
            text: '',
            img: '',
            title:''
        }
    }
    addPost = _ => {
        const {post} = this.state;
        fetch(`http://localhost:3001/posts/add?text=${post.text}&img=${post.img}&id=${fire.auth().currentUser.uid}&title=${post.title}`)
        // fetch(`http://localhost:3001/posts/add?text=${post.text}&img=${post.img}&id=1000`)
        .then((res) => {
            console.log('corecto')
        })
        .catch(err => console.error(err+"asdasdas"))
    }



    render() {
        // const uid = '';
        // fire.auth().onAuthStateChanged(function(user) {
        //     if (user) {
        //       // User is signed in.
        //       console.log(user.uid);
        //     } else {
        //       // No user is signed in.
        //       console.log('else');
        //     }
        //   });

        // console.log(uid)
        const { post } = this.state;
        return (
            <div className="container screen-height">
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={post.title} onChange={e => this.setState({ post: { ...post, title: e.target.value } })} />
                </div>

                <div className="input-field">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="text" value={post.text} onChange={e => this.setState({ post: { ...post, text: e.target.value } })} />
                </div>

                <div className="input-field">
                    <label htmlFor="image">Image</label>
                    <input type="text" id="img" placeholder="click link / login / upload photo / go 'direct link' / copy link here " value={post.img} onChange={e => this.setState({ post: { ...post, img: e.target.value } })} />
                </div>

                <button onClick={this.addPost}>Add Post</button>
            </div>
        )
    }
}

export default AddPost;