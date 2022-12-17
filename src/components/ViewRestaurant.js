import React, { useEffect, useState } from 'react';
import Navbar from '../utils/navbar';
import cover from '../static/images/chai.jpeg';
import { Link, useParams } from 'react-router-dom';
import Footer from '../utils/footer';
import axios from 'axios';
import notify from '../utils/notification';
import Loader from '../utils/loader';
import { isAuthenticated } from '../utils/auth';

const ViewRestaurant = () => {

    const [data, setData] = useState({});
    const [food, setFood] = useState([]);
    const [loader, setLoader] = useState(true);

    const query = useParams();

    useEffect(() => {
        fetchData();
        fetchMenu();
        setTimeout(() => {
            setLoader(false)
        }, 1000);
    }, []);

    const fetchData = async () => {
        const url = `${process.env.REACT_APP_LIVE}/rest/id`;
        axios.post(url, {
            id: query.id
        }).then(async res => {
            await setData(res.data.restaurant[0]);
        }).catch((err) => [
            notify('Something went wrong!')
        ]);

    }

    const fetchMenu = async () => {
        const url = `${process.env.REACT_APP_LIVE}/food/items`;
        const data = {
            id: query.id
        }

        axios.post(url, data).then(async res => {
            await setFood(res.data.foodItems);
        }).catch((err) => [
            notify('Something went wrong!')
        ]);
    }

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

    const {id,name,add,mobile} = isAuthenticated().user;


    const order = async (itemId, foodname, restName, restMob) => {
        try{
            const url = `${process.env.REACT_APP_LIVE}/order/add`;
            const data = {
                customerId:id,
                restaurantId:query.id,
                foodItemId:itemId,
                foodItemName: foodname,
                customerName:name,
                restaurantMobile:restMob,
                restaurantName:restName,
                customerAddress:add,
                customerMobile:mobile
            }
            await axios.post(url,data);
            notify('Order placed');

        }catch(err){
            notify('Not able to place Order')
        }
    }


    return (
        <div style={{height:'100vh'}}>
        {
            (loader) ? (
            <Loader />
        ) : (
            <div>
                <Navbar />
                <div className="row px-4" style={{ marginTop: '70px' }}>
                    <Link to="/restaurant/home" style={{ color: 'black' }}><i class="fas fa-arrow-left fa-2x"></i></Link>
                </div>
                <div className="container">
                    <div class="row align-items-center my-5">
                        <div class="col-lg-7">
                            <img class="rounded mb-4 mb-lg-0" src={data.image} alt={data.name} width="100%" />
                        </div>
                        <div class="col-lg-5">
                            <h1 class="font-weight-light">{data.name}</h1>
                            <p>
                                {showCategory(data.category)}
                            </p>
                            <p><b>Address - </b>{data.address}</p>
                            <p><b>Contact - </b>{data.mobile}</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <h3>Menu <i class="fas fa-utensils"></i></h3>
                        <div className="container">
                            <table className="table table-striped">
                                <thead className="thead-dark">
                                    <tr>
                                        <td>S.no.</td>
                                        <td>Name</td>
                                        <td>Food Type</td>
                                        <td>Price</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        food.map((item, i) => {
                                            return <tr>
                                                <td>{i + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.foodType}</td>
                                                <td>{item.price}</td>
                                                <td><img src={item.image} height="50px" /></td>
                                                <td><button className="btn btn-danger" onClick={()=>order(item.id, item.name, data.name, data.mobile)}>Order</button></td>
                                            </tr>
                                        })
                                    }

                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        )
        }
        </div>
    )
}

export default ViewRestaurant;