import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../user/UserSlice';
import { useNavigate } from 'react-router';



const Profile = ()=>{
    const dispatch= useDispatch();
    const navigate = useNavigate();
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    const handleMobile = (e)=>{
        setMobile(e.target.value);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }

    const submit = ()=>{
        console.log(mobile,password);
        axios.post('http://127.0.0.1:8626/api/login',{mobile:mobile,password:password}).then((res)=>{
            console.log(res);
            dispatch(login(res.data));
            localStorage.setItem('userData',JSON.stringify(res.data[0]));
            navigate('/');
        }).catch((err)=>{
            console.log(err);
        });
    
    }

    return (
        <>
            <div id='login-form'>
                <h3>Login</h3>
                <input type="number" onChange={(e)=>handleMobile(e)} name="mobile" value={mobile} />
                <input type="password" onChange={(e)=>handlePassword(e)} name='password' value={password} />
                <button type='submit' onClick={submit}>Login</button>
            </div>
        </>
    );
};


export default Profile;