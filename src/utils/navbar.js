import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from './auth';

const Navbar = () => {


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to="/"><i className="fas fa-hamburger mx-2 text-warning"></i>FoodShala</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">

                            {
                                (isAuthenticated()) ? (
                                    <div className="row">
                                        <li className="nav-item">
                                            <button className="btn btn-info mx-2">{isAuthenticated().user.name}</button>
                                        </li>
                                        <li className="nav-item">
                                        <Link to="/login" style={{color:'white'}}  onClick={()=>logout()}><button className="btn btn-danger mx-2"><i class="fas fa-sign-out-alt"></i></button></Link>
                                        </li>
                                    </div>

                                ) : (
                                    <div className="row">
                                        <li className="nav-item">
                                            <Link to='/rest/register'>
                                                <button className="btn btn-danger mx-2">Join us, register your business</button>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/login'>
                                                <button className="btn btn-info mx-2">Login</button>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/user/register">
                                                <button className="btn btn-success">Signup</button>
                                            </Link>
                                        </li>
                                    </div>
                                )
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;