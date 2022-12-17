import axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { authenticate, isAuthenticated } from '../utils/auth';
import notify from '../utils/notification';
const UserRegister = () => {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        role: '',
        error: false,
        errMessage: '',
        loading: false,
        didRedirect: false
    });


    const { name, email, password, confirm, role,
        error, errMessage, loading, didRedirect
    } = state;

    const {user} = isAuthenticated();

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

    

    const performRedirect = () => {
        if (user && user.role=='customer' && didRedirect) {
            return <Redirect to="/user/preference" />;
        }else if (user && user.role=='restaurant' && didRedirect){
            return <Redirect to="/restaurant/preference" />;
        }    
    }

    const onRegister = async (e) => {
        e.preventDefault();
        if(name=='' || email=='' || password=='' || confirm==''){
            notify('Kindly fill the required fields');
        }else if(password!==confirm){
            notify('Password and Confirm Password need to be same');
        }else{
            await setState({
                ...state,
                loading:true,
                error:false
            });

            const url = `${process.env.REACT_APP_LIVE}/auth/customer/signup`;
            const data = {
                email: email,
                password: password,
                name: name
            }

            axios.post(url, data).then(async result=>{
                await authenticate(result.data, async ()=>{
                    await setState({
                        ...state,
                        didRedirect: true,
                        error:false,
                        errMessage:''
                    });
                });
                
            }).catch(async err=>{
                notify('Sorry! Please try again');
                await setState({
                    ...state,
                    loading:false,
                    error:false,
                    errMessage:'Something went wrong!'
                });
            })
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
                            <i className="fas fa-hamburger fa-2x mb-2 mx-2 text-warning"></i>
                        </div>
                        <h3>Register</h3>

                        <div className="form-group">
                            <label>Name<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                            <input name="name" type="text" className="form-control" placeholder="Enter name" value={name} onChange={onChangeInput} required />
                        </div>

                        <div className="form-group">
                            <label>Email address<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                            <input name="email" type="email" className="form-control" placeholder="Enter email" value={email} onChange={onChangeInput} required />
                        </div>


                        <div className="form-group">
                            <label>Password<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                            <input name="password" type="password" className="form-control" placeholder="Enter password" value={password} onChange={onChangeInput} required />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                            <input name="confirm" type="password" className="form-control" placeholder="Enter password again" value={confirm} onChange={onChangeInput} required />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" onClick={onRegister}>Register</button>
                        <p className="forgot-password text-right">
                            Already registered, <Link to="/login">Login here</Link>
                        </p>


                </div>
                <p className="text-center text-muted">&copy; FoodShala 2022</p>

            </div>
        </div>
    )
}


export default UserRegister;