import React, { Component } from 'react';
import fire from '../../config/Firebase'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            hasPosts: false
        }
    }

    componentDidMount() {
        const that = this;
        this.getPosts();
        console.log(that.state.posts[0])

        setTimeout(function () {
            if (that.state.posts[0] !== undefined) {
                that.setState({
                    hasPosts: true
                })
            }
        }, 1000);
    }

    getPosts = _ => {

        const that = this
        setTimeout(function () {
            fetch(`http://localhost:3001/posts?id=${fire.auth().currentUser.uid}`)
                .then(response => response.json())
                .then(response => that.setState({ posts: response.data }))
                .catch(err => console.error(err))
        }, 800);
    }

    renderPosts = ({ id, texto, imagen }) => <div key={id}>{texto}  <img src={imagen} className="img-fluid" alt="Captura" border="0"></img></div>


    render() {
        const { posts, hasPosts } = this.state
        console.log(hasPosts)
        if (hasPosts === false) {
            return (
                <div className="container text-center">
                    <h1 className="font-weight-light text-muted">No tienes post aun</h1>
                </div>
            )
        } else {
            return (
                <div className="container p-3">
                    {/* {posts.map(this.renderPosts)} */}
                    {
                        posts.map(post => {
                            return (
                                // <div className="my-5">
                                //     <h1 className="text-center">{post.texto}</h1>
                                //     <img src={post.imagen} className="img-fluid" width="500" height="500"></img>
                                // </div>
                                <div className="row">
                                    <div className="col s12 m7">
                                        <div className="card">
                                            <div className="card-image">
                                                <img src={post.imagen} alt="" />
                                                <span className="card-title">{post.titulo}</span>
                                            </div>
                                            <div className="card-content">
                                                <p>{post.texto}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            )
        }

    }
}

export default Dashboard; 