import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../user/UserSlice';
import { saveRestaurants } from '../user/RestaurantsSlice';
import RestaurantForm from '../components/RestaurantForm';
import Loader from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
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
    const [viewUser,setViewUser] = useState(false);

    const handleMobile = (e)=>{
        setMobile(e.target.value);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }

    const submit = ()=>{
        setLoading(true);
        axios.post(`${apiUrl}/api/login`,{mobile:mobile,password:password}).then((res)=>{
            if(res.data.status===true){
                dispatch(login(res.data.user));
                localStorage.setItem('userData',JSON.stringify(res.data.user));
                if(res.data.user.user_type==='owner'){
                    dispatch(saveRestaurants(res.data.restaurant));
                    localStorage.setItem('restaurant',JSON.stringify(res.data.restaurant));
                    setRestaurant(res.data.restaurant);
                }
            }else{
                alert(res.data.message);
            }
            setLoading(false);  
        }).catch((err)=>{
            setLoading(false);  
            console.log(err);
        });
    
    }

    const userlogout =()=>{
        localStorage.clear();
        window.location.reload();
        dispatch(logout());
    }

    useEffect(()=>{
        console.log(user);
            if(user){
                setLoading(true);
                axios.get(`${apiUrl}/api/get-bookings/${user.id}`).then((res)=>{
                    console.log(res.data);
                    setBookings(res.data.data);
                    setLoading(false);
                }).catch(err=>{
                    setLoading(false);
                    console.log(err)
                });
            }
            if(restaurantFromStore){
                console.log(restaurantFromStore);
                setRestaurant(restaurantFromStore);
            }

    },[user]);

    return (
        <div id='profile-page'>
            
            {
            user ?
                    <div id="profile-container">
                        <div id="profile-drop">
                            <div id="profile-button">
                                <span>View Profile</span>
                                <button className='inline-btn' onClick={()=>{viewUser ? setViewUser(false) : setViewUser(true)}}>+</button>
                            </div>
                            <div id="profile-content" style={{marginTop:viewUser?'0px':'-130px'}}>
                                <p className='user-name'>{user?.first_name} {user?.last_name}</p>
                                <p className="user-mobile">{user?.mobile}</p>
                                <p className="user-address">{user?.address}</p>
                                <p className="user-email"><em>{user?.email}</em></p>
                            </div>
                        </div>
                        {bookings?.length > 0 ?
                        <>
                        <h3>My Bookings</h3>
                        <div id="bookings">
                            {
                                Array.isArray(bookings)? bookings.map((ele,key)=>{
                                    return(
                                        <div className="booking-card" key={key}>
                                            <span><strong>{ele.name}</strong>, {ele.address}</span><br />
                                            <span>{new Date(ele.visit_date).toDateString()}, {ele.visit_time}</span><br />
                                            <span><em>{ele.details? 'Details: '+ele.details: ''}</em></span>
                                            <span>Phone: <a href={'tel:'+ele.phone1}>{ele.phone1}</a>, <a href={'tel:'+ele.phone2}>{ele.phone2}</a></span>
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
                                            <span>{ele?.address}, {ele.city}, {ele?.state}</span><br />
                                            <span>Phone : {ele.phone1} {ele.phone2 ? ', '+ele.phone2 : ''}</span><br />
                                            <span>{ele.type} | {ele.ethnicity}</span><br />
                                            <span>{ele.service_type} | {ele.table_capacity}</span><br />
                                            <span>{ele.location!==null?<span><FontAwesomeIcon icon={faLocationDot}/> <a href={ele.location} target='_blank' rel="noreferrer">{ele.location}</a></span>:null}</span>
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
            {user?<button type='submit' className='secondary-btn' onClick={userlogout}>Logout</button>:null}
            <Loader status={loading}/>
            <RestaurantForm show={openForm} formShow={setOpenForm} />
        </div>
    );
};


export default Profile;