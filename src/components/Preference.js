import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { isAuthenticated, logout } from '../utils/auth';
import notify from '../utils/notification';

const Preference = () => {


    const { id } = isAuthenticated().user;
    const [username, setUsername] = useState('');
    const [preference, setPreference] = useState('');
    const [loading, setLoading] = useState(false);
    const [didRedirect, setDidRedirect] = useState(false);
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');

    const { user } = isAuthenticated();

   

    const getUsername = () => {
        const url = `${process.env.REACT_APP_LIVE}/auth/username`;
        const data = {
            id: id
        }
        axios.post(url, data).then(result => {
            setUsername(result.data.username);
        }).catch(err => {
            console.log(err);
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

    const onChangePreference = async (e) => {
        await setPreference(e.target.value);
    }

    useEffect(() => {
        getUsername();
    }, []);

    const onNext = async (e) => {
        e.preventDefault();
        if (preference == '' || mobile=='' || address=='') {
            notify('Kindly fill the details');
        } else {
            await setLoading(true);
            const url = `${process.env.REACT_APP_LIVE}/auth/user/update`;
            const data = {
                id: id,
                category: preference,
                mobile:mobile,
                address:address
            }
            axios.post(url, data).then(result => {
                setDidRedirect(true);
            }).catch(err => {
                notify('Something went wrong');
            })
        }
    }


    const performRedirect = () => {
        if (user && user.role == 'customer' && didRedirect) {
            return <Redirect to="/user/home" />;
        }
    }

    return (
        <div className="auth-wrapper">
            {performRedirect()}
            {loadingMessage()}
            <div className="auth-inner p-5">
                <div className="row justify-content-center">
                    <i className="fas fa-hamburger fa-4x mb-2 mx-2 text-warning"></i>
                </div>
                <h3>Welcome <span style={{ textTransform: 'capitalize' }}>{username}!</span></h3>


                <div className="form-group" onChange={onChangePreference}>
                    <label><b>Choose a preference<span className="ml-2" style={{ color: 'red' }}>*</span></b></label>
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
                <div className="form-group">
                        <label>Address<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                        <input name="address" type="text" className="form-control" placeholder="Enter address" value={address} onChange={(e)=>setAddress(e.target.value)} required />
                </div>
                <div className="form-group">
                            <label>Mobile<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                            <input name="mobile" type="phone" className="form-control" placeholder="Enter mobile" value={mobile} onChange={(e)=>setMobile(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={onNext}>Next</button>

            </div>
        </div>
    )
}

export default Preference;