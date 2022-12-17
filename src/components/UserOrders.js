import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import Footer from '../utils/footer';
import Loader from '../utils/loader';
import Navbar from '../utils/navbar';
import notify from '../utils/notification';

const UserOrders = () => {

    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);

    const { id } = isAuthenticated().user;

    const fetchData = async () => {
        const url = `${process.env.REACT_APP_LIVE}/order/customer/orders`;
        const data = {
            id: id
        }

        axios.post(url, data).then(async res => {
            await setData(res.data.orders);
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


    return (
        <div style={{ height: '100vh' }}>
            {
                (loader) ? (
                    <Loader />
                ) : (
                    <div>
                        <Navbar />
                        <div className="container" style={{ marginTop: '5rem' }}>
                            <div className="row mb-3">
                                <Link to="/user/home" style={{ color: 'black' }}><i class="fas fa-arrow-left fa-2x"></i></Link>
                            </div>
                            <h3>My Orders</h3>
                            <div class="table-wrapper-scroll-y my-custom-scrollbar">
                                <table className="table table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                            <td>S.no.</td>
                                            <td>Order id</td>
                                            <td>Food Name</td>
                                            <td>Restaurant Name</td>
                                            <td>Restaurant Mobile</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((item, i) => {
                                                return <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.foodItemName}</td>
                                                    <td>{item.restaurantName}</td>
                                                    <td>{item.restaurantMobile}</td>
                                                </tr>
                                            })
                                        }

                                    </tbody>

                                </table>
                            </div>
                        </div>
                        <Footer />
                    </div>

                )
            }
        </div>
    )
}

export default UserOrders;