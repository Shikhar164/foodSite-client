import axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { authenticate, isAuthenticated } from '../utils/auth';
import notify from '../utils/notification';
const RestRegister = () => {

    const [state, setState] = useState({
        name: '',
        address: '',
        email: '',
        mobile: '',
        password: '',
        confirm: '',
        image:'',
        role: '',
        error: false,
        errMessage: '',
        loading: false,
        didRedirect: false
    });

    const [preference, setPreference] = useState('');


    const { name, address, email, mobile, password, confirm, role, image,
        error, errMessage, loading, didRedirect
    } = state;

    const { user } = isAuthenticated();

    const onChangeInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const onChangeFile = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.files[0]
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

    const onChangePreference = async (e) => {
        await setPreference(e.target.value);
    }

    const performRedirect = () => {
        if(didRedirect){
            return <Redirect to='/login' />
        }
    }

    const onRegister = async (e) => {
        e.preventDefault();
        if (name == '' || email == '' || password == '' || confirm == '' || mobile=='' || address=='') {
            notify('Kindly fill the required fields');
        } else if (password !== confirm) {
            notify('Password and Confirm Password need to be same');
        } else {
            await setState({
                ...state,
                loading: true,
                error: false
            });

            const url = `${process.env.REACT_APP_LIVE}/auth/restaurant/signup`;
            
            const data = new FormData();

            data.append('email', email);
            data.append('password', password);
            data.append('name', name);
            data.append('category', preference);
            data.append('address', address);
            data.append('mobile', mobile);
            data.append('image', image);

            axios.post(url, data).then(async result => {
                await authenticate(result.data, async () => {
                    await setState({
                        ...state,
                        didRedirect: true,
                        error: false,
                        errMessage: ''
                    });
                });

            }).catch(async err => {
                notify('Sorry! Please try again');
                await setState({
                    ...state,
                    loading: false,
                    error: true,
                    errMessage: 'Something went wrong!'
                });
            })
        }

    }


    return (
        <div>
            <div className="auth-wrapper">
                {loadingMessage()}
                {errorMessage()}
                {performRedirect()}
                <div className="auth-inner" style={{ 'width': '700px' }}>
                    <div className="row justify-content-center">
                        <i className="fas fa-hamburger fa-2x mb-2 mx-2 text-warning"></i>
                    </div>
                    <h4 className="text-center">Register</h4>

                    <div className="row justify-content-between mb-2">
                        <div className="col-sm-6 col-md-6">
                            <label>Restaurant Name<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                            <input name="name" type="text" className="form-control" placeholder="Enter name" value={name} onChange={onChangeInput} required />
                        </div>

                        <div className="col-sm-6 col-md-6">
                            <label>Address<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                            <input name="address" type="text" className="form-control" placeholder="Enter address" value={address} onChange={onChangeInput} required />
                        </div>
                    </div>


                    <div className="row justify-content-between mb-2">
                        <div className="col-sm-6 col-md-6">
                            <label>Email address<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                            <input name="email" type="email" className="form-control" placeholder="Enter email" value={email} onChange={onChangeInput} required />
                        </div>

                        <div className="col-sm-6 col-md-6">
                            <label>Mobile<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                            <input name="mobile" type="phone" className="form-control" placeholder="Enter mobile" value={mobile} onChange={onChangeInput} required />
                        </div>
                    </div>

                    <div className="row justify-content-between mb-2">
                        <div className="col-sm-6 col-md-6">
                            <label>Password<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                            <input name="password" type="password" className="form-control" placeholder="Enter password" value={password} onChange={onChangeInput} required />
                        </div>

                        <div className="col-sm-6 col-md-6">
                            <label>Confirm Password<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                            <input name="confirm" type="password" className="form-control" placeholder="Enter password again" value={confirm} onChange={onChangeInput} required />
                        </div>
                    </div>


                    <div className="form-group mx-4 mb-2" onChange={onChangePreference}>
                        <label><b>Choose a food category<span className="ml-2" style={{ color: 'red' }}>*</span></b></label>
                        <br />

                        <div className="row justify-content-between px-4">
                            <div>
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="veg" value="veg" />
                                <label class="form-check-label" for="veg">Veg</label>
                            </div>
                            <div>
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="non-veg" value="non-veg" />
                                <label class="form-check-label" for="non-veg">Non-Veg</label>
                            </div>
                            <div>
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="both" value="both" />
                                <label class="form-check-label" for="both">Both</label>
                            </div>
                        </div>
                    </div>

                    <div className="row px-3">
                        <input className="form-control pb-4" name="image" type="file" onChange={onChangeFile} />
                    </div>

                    <div className="row justify-content-center mt-4 mb-2">
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary btn-block" onClick={onRegister}>Register</button>
                        </div>
                    </div>
                    <p className="forgot-password text-right">
                        Already registered, <Link to="/login">Login here</Link>
                    </p>


                </div>
                <p className="text-center text-muted">&copy; FoodShala 2022</p>

            </div>
        </div>
    )
}


export default RestRegister;