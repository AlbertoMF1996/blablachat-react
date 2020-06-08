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

        if(this.handleUpload()){
            fetch(`https://pfc-blablachat-node.herokuapp.com/posts/add?text=${post.text}&img=${post.img}&id=${fire.auth().currentUser.uid}&title=${post.title}`)
            .then((res) => {
                alert("Successfully added")
            })
            .catch(err => console.error(err))
        }else{
            alert("Can't add empty post")
        }
    }

    handleUpload(){
        var { title, text, img } = this.state.post;
        if(title===""){
            return false;
        }
        if(title==="" && text==="" && img===""){
            return false;
        }else{
            return true;
        }
    }



    render() {


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
                    <input type="text" id="img" placeholder="click 'Img' / login / upload photo / go 'direct link' / copy link here " value={post.img} onChange={e => this.setState({ post: { ...post, img: e.target.value } })} />
                    <small className="right"><a className="text-secondary" href="https://imgbb.com/" target="_blank">Img</a></small>
                </div>

                <button className="btn btn-loating orange lighten-1" onClick={this.addPost}>Add Post</button>


                
            </div>
        )
    }
}

export default AddPost;