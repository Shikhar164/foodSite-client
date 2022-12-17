import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../utils/auth';
import Footer from '../utils/footer';
import Loader from '../utils/loader';
import Navbar from '../utils/navbar';
import notify from '../utils/notification';
import {Link} from 'react-router-dom';
const RestHome = () => {
    const [state, setState] = useState({
        name: '',
        price: '',
        image: '',
        error: false,
        errMessage: '',
        loading: false,
        didRedirect: false
    });

    const [loader, setLoader] = useState(true);


    const [food, setFood] = useState([]);


    const { id } = isAuthenticated().user;

    const [preference, setPreference] = useState('');

    const { name, foodType, price, image, error, errMessage, loading, didRedirect } = state;


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

    const onChangeFile = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.files[0]
        });
    }

    const deleteItem = async (id) => {
        try{
            await axios.post(`${process.env.REACT_APP_LIVE}/food/delete`,
            {
                id:id
            });

            window.location.reload();

        }catch(err){
            notify('Not able to delete');
        }
    }


    const onChangePreference = async (e) => {
        await setPreference(e.target.value);
    }

    const onRegister = async (e) => {
        if (name == '' || preference == '' || price == '' || image == '') {
            notify('Kindly fill the required fields');
        } else {
            await setState({
                ...state,
                loading: true,
                error: false
            });

            const url = `${process.env.REACT_APP_LIVE}/food/add`;

            const data = new FormData();

            data.append('name', name);
            data.append('price', price);
            data.append('foodType', preference);
            data.append('image', image);
            data.append('restaurantId', id);

            axios.post(url, data).then(async result => {

                await setState({
                    ...state,
                    didRedirect: true,
                    error: false,
                    errMessage: ''
                });

                window.location.reload();
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

    const fetchMenu = async () => {
        const url = `${process.env.REACT_APP_LIVE}/food/items`;
        const data = {
            id: id
        }

        axios.post(url, data).then(async res => {
            await setFood(res.data.foodItems);
        }).catch((err) => [
            notify('Something went wrong!')
        ]);
    }

    useEffect(()=>{
        fetchMenu();
        setTimeout(() => {
            setLoader(false)
        }, 1000);
    }, [])


    return (
        <div style={{height:'100vh'}}>
            {(loader)?(
                <Loader />
            ):(
                <div>
                <Navbar />
                <div className="container">
                    <div className="row mb-3" style={{ marginTop: '100px' }} >
                    <Link to="/restaurant/orders"><button className="btn btn-success"><i className="fas fa-shopping-bag mr-2"></i>View Orders</button></Link>
                    </div>
                    <div className="row" >
                        <div className="col-sm-12 col-md-4">
                            {loadingMessage()}
                            {errorMessage()}
                            <h3>Add Food Item</h3>
                            <div class="form-group">
                                <label for="name">Food Item name<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                                <input type="text" class="form-control" name="name" id="name" placeholder="Enter food name" value={name} onChange={onChangeInput} />
                            </div>
                            <div className="form-group" onChange={onChangePreference}>
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
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="price">Price<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                                <input type="text" class="form-control" name="price" id="price" placeholder="Enter price" value={price} onChange={onChangeInput} />
                            </div>
    
                            <div className="form-group">
                                <label for="price">Image<span className="ml-2" style={{ color: 'red' }}>*</span></label>
                                <input className="form-control pb-5" name="image" type="file" onChange={onChangeFile} />
                            </div>
                            <button type="submit" class="btn btn-primary float-right" onClick={onRegister}>Add</button>
                        </div>
                        <div className="col-sm-12 col-md-8">
                        <div class="table-wrapper-scroll-y my-custom-scrollbar">
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
                                        food.map((item, i)=>{
                                            return <tr>
                                                <td>{i+1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.foodType}</td>
                                                <td>{item.price}</td>
                                                <td><img src={item.image} height="50px" /></td>
                                                <td><button className="btn btn-danger" onClick={()=>deleteItem(item.id)}><i className="fas fa-trash text-white"></i></button></td>
                                            </tr>
                                        })
                                    }
                                
                                </tbody>
    
                            </table>
                            </div>
                        </div>
                    </div>
    
                </div>
                <Footer />
            </div>
       
            )}
        </div>
 )
}

export default RestHome;