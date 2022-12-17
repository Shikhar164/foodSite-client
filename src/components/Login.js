import axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '../utils/auth';
import notify from '../utils/notification';

const Login = () => {

    const [state, setState] = useState({
        email: '',
        password: '',
        error: false,
        errMessage: '',
        loading: false,
        didRedirect: false
    });

    const { email, password, error, errMessage, loading, didRedirect } = state;

    const { user } = isAuthenticated();

    const onChangeInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }


    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }

    const errorMessage = () => {
        return (
            error && (
                <div className="alert alert-info">
                    <h2>{errMessage}</h2>
                </div>
            )
        )
    }

    const onLogin = async (e) => {
        e.preventDefault();

        if (email == '' || password == '') {
            notify('Enter credentials');
        } else {

            await setState({
                ...state,
                loading: true,
                error: false
            });

            const url = `${process.env.REACT_APP_LIVE}/auth/login`;
            const data = {
                email: email,
                password: password
            }

            axios.post(url, data).then(async result => {
                await authenticate(result.data, async () => {
                    await setState({
                        ...state,
                        didRedirect: true,
                        error: false,
                        errMessage: ''
                    });
                })

            }).catch(async err => {
                notify('Sorry! Please try again');
                await setState({
                    ...state,
                    loading: false,
                    error: true,
                    errMessage: 'Invalid Credentials'
                });
            })
        }
    }

    const performRedirect = () => {
        console.log(user);
        if (user && user.role == 'customer' && didRedirect) {
            return <Redirect to="/user/home" />;
        } else if (user && user.role == 'restaurant' && didRedirect) {
            return <Redirect to="/restaurant/home" />;
        }
    }

    return (
        <div>
            <Link to='/rest/register' style={{position:'absolute', top:'5px', left:'5px'}}>
                <button className="btn btn-danger mx-2">Join us, register your business</button>
            </Link>
            <div className="auth-wrapper">
                {loadingMessage()}
                {errorMessage()}
                {performRedirect()}
                <div className="auth-inner">
                    <div className="row justify-content-center">
                        <i className="fas fa-hamburger fa-4x mb-2 mx-2 text-warning"></i>
                    </div>
                    <h3>Log In</h3>

                    <div className="form-group">
                        <label>Email address<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                        <input name="email" type="email" className="form-control" placeholder="Enter email" value={email} onChange={onChangeInput} required />
                    </div>

                    <div className="form-group">
                        <label>Password<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                        <input name="password" type="password" className="form-control" placeholder="Enter password" value={password} onChange={onChangeInput} required />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" onClick={onLogin}>Log In</button>
                    <p className="forgot-password text-right">
                        No account, <Link to="/user/register">Register here</Link>
                    </p>

                </div>
                <p className="text-center text-white">&copy; FoodShala 2022</p>

            </div>
        </div>
    )
}

export default Login;
