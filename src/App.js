
import { useDispatch } from 'react-redux';
import './App.css';
import Base from './pages/Base';
import { useEffect } from 'react';
import { login } from './user/UserSlice';

function App() {
  const dispatch = useDispatch();

    useEffect(()=>{
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(userData!=null){
            dispatch(login(userData));
        }else{
          console.log('Not logged in');
        }
    });
  return (
    <Base/>
  );
}

export default App;
