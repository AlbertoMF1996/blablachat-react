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
        // this.getPosts();


        const interval = setInterval(() => {
            if (fire.auth().currentUser !== null) {
                this.getPosts();

                if (that.state.posts[0] !== undefined) {
                    clearInterval(interval);
                }
            }
        }, 1000);




        console.log(that.state.posts[0])

        setTimeout(function () {
            if (that.state.posts[0] !== undefined) {
                that.setState({
                    hasPosts: true
                })
            }
        }, 2000);
    }

    getPosts = _ => {

        const that = this;
        if (fire.auth().currentUser !== null) {
            setTimeout(function () {
                fetch(`https://pfc-blablachat-node.herokuapp.com/posts?id=${fire.auth().currentUser.uid}`)
                    .then(response => response.json())
                    .then(response => that.setState({ posts: response.data }))
                    .catch(err => console.error(err))
            }, 800);
        }

    }

    // renderPosts = ({ id, texto, imagen }) => <div key={id}>{texto}  <img src={imagen} className="img-fluid" alt="Captura" border="0"></img></div>


    render() {
        const { posts, hasPosts } = this.state
        console.log(hasPosts)
        if (hasPosts === false) {
            return (
                <div className="container text-center screen-height">
                    <h1 className="font-weight-light text-muted">No tienes post aun</h1>
                </div>
            )
        } else {
            return (
                <div className="container p-3 screen-height">
                    {/* {posts.map(this.renderPosts)} */}
                    {
                        posts.map(post => {
                            if (post.imagen !== "") {
                                return (
                                    // <div className="my-5">
                                    //     <h1 className="text-center">{post.texto}</h1>
                                    //     <img src={post.imagen} className="img-fluid" width="500" height="500"></img>
                                    // </div>
                                    <div className="row" key={post.id}>
                                        <div className="col s12 m7">
                                            <div className="card">
                                                <div className="card-image">
                                                    <img src={post.imagen} alt="" />
                                                    <span className="card-title text-dark">{post.titulo}</span>
                                                    <span>{post.imagen}</span>
                                                </div>
                                                <div className="card-content">
                                                    <p>{post.texto}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            } else {
                                return (
                                    <div className="row" key={post.id}>
                                        <div className="col s12 m7">
                                            <div className="card">
                                                <div className="card-content">
                                                    <h4>{post.titulo}</h4><hr /><p>{post.texto}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            )
        }

    }
}

export default Dashboard; 