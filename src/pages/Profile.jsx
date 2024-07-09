import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../user/UserSlice';
import { saveRestaurants } from '../user/RestaurantsSlice';
import RestaurantForm from '../components/RestaurantForm';
import Loader from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import apiUrl from '../Vars';



const Profile = ()=>{
    const user = useSelector((state)=>state.user.value);
    const restaurantFromStore = useSelector((state)=>state.restaurants.value);
    const dispatch = useDispatch();
    const [mobile, setMobile] = useState('7304431820');
    const [password, setPassword] = useState('123456');
    const [loading, setLoading] = useState(false);
    const [bookings,setBookings] = useState();
    const [restaurant,setRestaurant] = useState();
    const [openForm, setOpenForm] = useState(false);
    const [responsetext,setResponsetext] = useState('');

    const handleMobile = (e)=>{
        setMobile(e.target.value);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }

    const submit = ()=>{
        setLoading(true);
        axios.post(`${apiUrl}/api/login`,{mobile:mobile,password:password}).then((res)=>{
            setResponsetext(res.data);
            if(res.data.status===true){
                dispatch(login(res.data.user));
                localStorage.setItem('userData',JSON.stringify(res.data.user));
                setLoading(false);
            }else{
                alert(res.data.message);
                setLoading(false);  
        }
        }).catch((err)=>{
            console.log(err);
            setLoading(false);  
        });
    
    }
    
    const showRestaurants = ()=>{
        axios.post(`${apiUrl}/api/show-restaurants`,{id:user._id}).then((res)=>{
            console.log('restaurants from api',res);
            if(res.status===true){
                dispatch(saveRestaurants(res.data.restaurants));
                localStorage.setItem('restaurant',JSON.stringify(res.data.restaurants));
                setRestaurant(res.data.restaurants);
            }
        });
    }

    useEffect(()=>{
            if(user){
                setLoading(true);
                axios.get(`${apiUrl}/api/get-bookings/${user._id}`).then((res)=>{
                    console.log(res.data);
                    setBookings(res.data.result);
                    setLoading(false);
                }).catch(err=>console.log(err));
            }

    },[user]);

    return (
        <div id='profile-page'>
            {
            user ?
                    <div id="profile-container">
                        {bookings?
                        <>
                        <h3>My Bookings</h3>
                        <div id="bookings">
                            {
                                Array.isArray(bookings)? bookings.map((ele,key)=>{
                                    return(
                                        <div className="booking-card" key={key}>
                                            <span><strong>{ele.restaurant.name}</strong></span><br />
                                            <span>At: {new Date(ele.visit_date).toDateString()}, {ele.visit_time}</span><br />
                                            <span><em>Details: {ele.details}</em></span><br />
                                            <span>{ele.restaurant.address}, {ele.restaurant.city}</span>
                                        </div>
                                    );
                                }) : null
                            }
                        </div>
                        </>:null}
                        
                        {/* if the user is owner show restaurants */}
                        {restaurant?
                        <>
                        <h3>My Restaurants</h3>
                        <div id="restaurants">
                            {
                                Array.isArray(restaurant)? restaurant.map((ele,key)=>{
                                    return(
                                        <div className="owner-restaurant-card" key={key}>
                                            <span><strong>{ele.name}</strong></span><br />
                                            <span>{ele.address}, {ele.city}, {ele.state}</span><br />
                                            <span>Phone : {ele.phone1}, {ele?.phone2}</span><br />
                                            <span>{ele.type} | {ele?.ethnicity}</span><br />
                                            <span>{ele.service_type} | {ele.table_capacity}</span><br />
                                            {ele.location!==null?<span><FontAwesomeIcon icon={faLocationPin}/> <a href={ele.location} target='_blank' rel="noreferrer">{ele.location}</a></span>:null}
                                        </div>
                                    );
                                }) : <span>No restaurants created</span>
                            }
                        </div>
                        </>
                        : null}
                        {user.user_type==='owner'? <button type='button' className='form-btn' onClick={()=>setOpenForm(true)}>+ Add a restaurant</button> :null}
                    </div>
                    
                :
            <div id='login-form'>
                <h3>Login</h3>
                <input type="number" onChange={(e)=>handleMobile(e)} name="mobile" value={mobile} />
                <input type="password" onChange={(e)=>handlePassword(e)} name='password' value={password} />
                <button type='submit' onClick={submit}>Login</button>
            </div>}
            {user?.user_type==='owner'? <button className='secondary-btn' onClick={showRestaurants}>Show Restaurants</button> : null}
            {user?<button type='submit' className='secondary-btn' onClick={()=>{localStorage.clear();window.location.reload();}}>Logout</button>:null}
            <span>{responsetext}</span>
            <Loader status={loading}/>
            <RestaurantForm show={openForm} formShow={setOpenForm} />
        </div>
    );
};


export default Profile;