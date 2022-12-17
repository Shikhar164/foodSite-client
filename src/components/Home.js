import React, { useEffect, useState } from 'react';
import Navbar from '../utils/navbar';
import cover from '../static/images/foodShala.jpg';
import Footer from '../utils/footer';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import notify from '../utils/notification';
import { isAuthenticated } from '../utils/auth';

const Home = () => {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        const url = `${process.env.REACT_APP_LIVE}/rest/home/restaurants`;
        axios.get(url).then(async res => {
            await setData(res.data.restaurants);
        }).catch((err) => [
            notify('Something went wrong!')
        ]);
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

    const redirectTo = (value) => {
        if( value == 'restaurant' ){
            return <Redirect to='/restaurant/home' />
        }else{
            return <Redirect to='/user/home' />
        }
    }

    return (
        (isAuthenticated()) ? (
            redirectTo()
        ):(
            <div>
            <Navbar />

            <div class="container" style={{ marginTop: '100px' }}>

                <div class="row align-items-center my-5">
                    <div class="col-lg-7">
                        <img class="img-fluid rounded mb-4 mb-lg-0" src={cover} alt="" />
                    </div>
                    <div class="col-lg-5">
                        <h1 class="font-weight-light">Where Foodies Thrive!</h1>
                        <p>Explore curated lists of top food items, restaurants, cafes, pubs, and bars in Delhi NCR, based on trends</p>
                        <Link class="btn btn-primary" to="/login">Order Online!</Link>
                    </div>
                </div>

                <div class="card text-white bg-secondary my-5 py-4 text-center">
                    <div class="card-body">
                        <p class="text-white m-0">Vegetarian or Non-Vegetarian, Indian or Italian, everything at your doorstep</p>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <h3>Top Restaurants</h3>
                </div>

                <div class="row">
                    {data.map((item) => (
                        <div class="col-md-4 mb-5">
                            <Link to='/login' style={{textDecoration:'none'}}>

                                <div class="card h-80" key={item.id}>
                                    <img class="card-img-top" src={item.image} alt="biryani" />
                                    <div class="card-body">
                                        <h3 class="card-title">{item.name}</h3>
                                        <p className="text-muted">{item.address}</p>
                                        {showCategory(item.category)}
                                        <p className="text-muted">{item.mobile}</p>
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
      
    )
}

export default Home;