import React, { Component } from 'react';

class Footer extends Component {

    render() {

        return (
            <footer className="page-footer grey darken-3 mt-3 mb-0 dynamic-height">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h5 className="white-text">Contat us</h5>
                            <p className="grey-text text-lighten-4">For any suggestion, pls contact us here: suggention@blablachat.com</p>

                        </div>

                        <div className="col-6">
                            <h5>Info</h5>
                            <ul>
                                <li><a href="#!">About Blablachat</a></li>
                                <li><a href="#!">About developers</a></li>
                                <li><a href="#!">Help</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer
