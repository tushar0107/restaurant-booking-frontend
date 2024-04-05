import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../user/UserSlice';
import { saveRestaurants } from '../user/RestaurantsSlice';
import RestaurantForm from '../components/RestaurantForm';
import Loader from '../components/Loader';
import apiUrl from '../Vars';



const Profile = ()=>{
    const user = useSelector((state)=>state.user.value);
    const restaurantFromStore = useSelector((state)=>state.restaurants.value);
    const dispatch = useDispatch();
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [bookings,setBookings] = useState();
    const [restaurant,setRestaurant] = useState();
    const [openForm, setOpenForm] = useState(false);

    const handleMobile = (e)=>{
        setMobile(e.target.value);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }

    const submit = ()=>{
        setLoading(true);
        axios.post(`${apiUrl}/api/login`,{mobile:mobile,password:password}).then((res)=>{
            console.log(res);
            if(res.data.status===true){
                dispatch(login(res.data.user));
                dispatch(saveRestaurants(res.data.restaurant));
                localStorage.setItem('userData',JSON.stringify(res.data.user));
                localStorage.setItem('restaurant',JSON.stringify(res.data.restaurant));
                setRestaurant(res.data.restaurant);
            }else{
                alert(res.data.message);
            }
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
        });
    
    }

    useEffect(()=>{
            // if(user){
            //     setLoading(true);
            //     axios.get(`${apiUrl}/api/get-bookings/${user.id}`).then((res)=>{
            //         console.log(res.data);
            //         setBookings(res.data.data);
            //         setLoading(false);
            //     }).catch(err=>console.log(err));
            // }
            const restaurantFromls = localStorage.getItem('restaurant');
            if(restaurantFromls!==null){
                dispatch(saveRestaurants(JSON.parse(restaurantFromls)));
            }
            setRestaurant(restaurantFromStore);

            return;
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
                                            <span><strong>{ele.restaurant_name}</strong></span><br />
                                            <span>{new Date(ele.visit_date).toDateString()}, {ele.visit_time}</span><br />
                                            <span><em>Details: {ele.details}</em></span>
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
                                            {ele.location!==null?<span><a href={ele.location} target='_blank' rel="noreferrer">{ele.location}</a></span>:null}
                                        </div>
                                    );
                                }) : null
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
            <Loader status={loading}/>
            <RestaurantForm show={openForm} formShow={setOpenForm} />
        </div>
    );
};


export default Profile;