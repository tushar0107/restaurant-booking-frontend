import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../user/UserSlice';
import { useNavigate } from 'react-router';
import Loader from '../components/Loader';



const Profile = ()=>{
    const dispatch= useDispatch();
    const navigate = useNavigate();
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleMobile = (e)=>{
        setMobile(e.target.value);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }

    const submit = ()=>{
        setLoading(true);
        console.log(mobile,password);
        axios.post('http://127.0.0.1:8626/api/login',{mobile:mobile,password:password}).then((res)=>{
            console.log(res);
            dispatch(login(res.data.user));
            localStorage.setItem('userData',JSON.stringify(res.data[0]));
            if(res.data.status===true){
                navigate('/');
            }
            setLoading(false);
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
            <Loader status={loading}/>
        </>
    );
};


export default Profile;