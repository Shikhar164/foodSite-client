import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import Footer from '../utils/footer';
import Loader from '../utils/loader';
import Navbar from '../utils/navbar';
import notify from '../utils/notification';

const UserHome = () => {

    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);

    const { category } = isAuthenticated().user;

    const fetchData = async () => {
        const url = `${process.env.REACT_APP_LIVE}/rest/all`;
        const data = {
            category: category
        }

        axios.post(url, data).then(async res => {
            await setData(res.data.restaurants);
            setTimeout(() => {
                setLoader(false)
            }, 1000);
        }).catch((err) => {
            setTimeout(() => {
                setLoader(false)
            }, 1000);
            notify('Something went wrong!')
        });
    }

    useEffect(() => {
        fetchData()
    }, []);

    const showCategory = (value) => {
        if (value == 'veg') {
            return (<div className="d-flex">
                <p className="badge badge-danger">Veg</p>
            </div>)
        }
        if (value == 'non-veg') {
            return (<div className="d-flex">
                <p className="badge badge-danger">Non-Veg</p>
            </div>)
        }
        if (value == 'both') {
            return (<div className="d-flex">
                <p className="badge badge-danger mr-2">Veg</p>
                <p className="badge badge-danger">Non-Veg</p>
            </div>)
        }
    }


    return (
        <div style={{ height: '100vh' }}>
            {
                (loader) ? (
                    <Loader />
                ) : (
                    <div>
                        <Navbar />
                        <div className="container">
                            <div className="row" style={{ marginTop: "5rem" }}>
                            <Link to="/user/orders"><button className="btn btn-success"><i className="fas fa-shopping-bag mr-2"></i>My Orders</button></Link>
                            </div>
                            <div className="row" style={{ marginTop: "1rem" }}>
                                {data.map((item) => (
                                    <div class="col-md-4 mb-5">
                                        <Link to={`/user/home/${item.id}`} style={{ textDecoration: 'none' }}>
                                            <div class="card" key={item.id.toString()}>
                                                <img class="card-img-top" src={item.image} alt="biryani" />
                                                <div class="card-body">
                                                    <h3 class="card-title">{item.name}</h3>
                                                    <p className="text-muted">{item.address}</p>
                                                    {showCategory(item.category)}
                                                    <p className="text-muted"><b>Contact - </b>{item.mobile}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Footer />
                    </div>

                )
            }
        </div>
    )
}

export default UserHome;