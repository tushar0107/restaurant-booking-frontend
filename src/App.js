
import { useDispatch } from 'react-redux';
import './App.css';
import Base from './pages/Base';
import { useEffect } from 'react';
import { login } from './user/UserSlice';
import { saveRestaurants } from './user/RestaurantsSlice';

function App() {
  const dispatch = useDispatch();

    useEffect(()=>{
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(userData!=null){
            dispatch(login(userData));
        }else{
          console.log('Not logged in');
        }
        
        const restaurantFromls = localStorage.getItem('restaurant');
        if(restaurantFromls!==null || restaurantFromls!=='undefined'){
            dispatch(saveRestaurants(JSON.parse(restaurantFromls)));
        }
    });
  return (
    <Base/>
  );
}

export default App;
