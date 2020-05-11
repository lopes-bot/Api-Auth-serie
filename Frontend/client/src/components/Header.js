import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className="navbar-brand" >Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" >
                    <ul className="navbar-nav mr-auto lefth">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">sign Up</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin">sign In</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signout">sign Out</Link>
                        </li>
                    
                   
                    </ul>
          
                </div>
        </nav>
        )
    }
}
