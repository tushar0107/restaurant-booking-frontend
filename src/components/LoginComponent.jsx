import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { saveRestaurants } from '../user/RestaurantsSlice';
import { login } from '../user/UserSlice';
import apiUrl from '../Vars';
import Loader from './Loader';


const LoginComponent = ({show,hide}) => {
    const dispatch = useDispatch();
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
        axios.post(`${apiUrl}/api/login`,{mobile:mobile,password:password}).then((res)=>{
            if(res.data.status===true){
                dispatch(login(res.data.user));
                localStorage.setItem('userData',JSON.stringify(res.data.user));
                if(res.data.user.user_type==='owner'){
                    dispatch(saveRestaurants(res.data.restaurant));
                    localStorage.setItem('restaurant',JSON.stringify(res.data.restaurant));
                }
                hide('none');
            }else{
                alert(res.data.message);
            }
            setLoading(false);  
        }).catch((err)=>{  
            setLoading(false);  
            console.log(err);
        });
    
    }
  return (
    <div id='login-pop-up' style={{display:show,}}>
      <div id="login-form">
        <h3>Login</h3>
        <input
          type="number"
          onChange={(e) => handleMobile(e)}
          name="mobile"
          value={mobile}
        />
        <input
          type="password"
          onChange={(e) => handlePassword(e)}
          name="password"
          value={password}
        />
        <button type="submit" onClick={submit}>
          Login
        </button>
      </div>
      <Loader status={loading} />
    </div>
  );
};

export default LoginComponent;