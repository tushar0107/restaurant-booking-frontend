import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../user/UserSlice';
import { useNavigate } from 'react-router';
import Loader from '../components/Loader';
import apiUrl from '../Vars';



const Profile = ()=>{
    const user = useSelector((state)=>state.user.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [bookings,setBookings] = useState();

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
                localStorage.setItem('userData',JSON.stringify(res.data.user));
                if(res.data.status===true){
                    navigate('/');
                }
            }else{
                alert(res.data.message);
            }
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
        });
    
    }

    useEffect(()=>{
        if(user){
            setLoading(true);
            axios.get(`${apiUrl}/api/get-bookings/${user.id}`).then((res)=>{
                console.log(res.data);
                setBookings(res.data.data);
                setLoading(false);
            }).catch(err=>console.log(err));
        }
    },[user]);

    return (
        <div id='profile-page'>
            {
            user ?
                    <div id="profile-container">
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
                    </div>
                :
            <div id='login-form'>
                <h3>Login</h3>
                <input type="number" onChange={(e)=>handleMobile(e)} name="mobile" value={mobile} />
                <input type="password" onChange={(e)=>handlePassword(e)} name='password' value={password} />
                <button type='submit' onClick={submit}>Login</button>
            </div>}
            <Loader status={loading}/>
        </div>
    );
};


export default Profile;