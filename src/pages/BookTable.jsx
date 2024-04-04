import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Loader from '../components/Loader';
import axios from 'axios';
import apiUrl from '../Vars';


export const BookTable = ()=>{
    const params= useParams();
    const user = useSelector(state=>state.user.value);
    const [guests,setGuests] = useState('');
    const [table,setTable] = useState(0);
    const [date,setDate] = useState('');
    const [time,setTime] = useState('');
    const [details,setDetails] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [restaurant,setRestaurant] = useState();

        
    const formData = {
        user_id:user?.id,
        restaurant_id:parseInt(params.id),
        table_no:table || 0,
        details:details,
        guests:guests,
        booking_date: new Date(),
        visit_date:date,
        visit_time:time,
        restaurant_name:restaurant?.name
    }

    useEffect(()=>{
        axios.get(`${apiUrl}/api/get-restaurant/${params.id}`).then((res)=>{
            console.log('restaurant: ',res.data);
            if(res.data.status){
                setRestaurant(res.data.data[0]);
            }
        }).catch(err=>{console.log(err)});
    },[params.id]);

    const handleFormData = (e)=>{
        switch (e.target.name) {
            case 'num-of-guests':
                setGuests(e.target.value);
                break;
            case 'table':
                setTable(e.target.value);
                break;
            case 'time':
                setTime(e.target.value);
                break;
            case 'date':
                setDate(e.target.value);
                break;
            case 'details':
                setDetails(e.target.value);        
                break;
            default:
                break;
        }
    }

    const submitBooking = ()=>{
        if(checkValidation()){
            if(table==="0" || table===""){
                alert('You have not selected any table. We will reserve one for you by our side. Thank you.')
            }
            console.log(formData);
            setIsLoading(true);
            axios.post(`${apiUrl}/api/booking`,{...formData}).then((res)=>{
                console.log(res.data);
                setIsLoading(false);
                alert(res.data.message);
            }).catch(err=>console.log(err));
        }
    }

    function checkValidation (){
        if(guests===""){
            alert('Please mention number of guests');
            return false;
        }else if(date===""){
            alert('Please mention Visit date');
            return false;
        }else if(time===""){
            alert('Please mention Visit time');
            return false;
        }else return true;
    }


    return(
        <>
            <div id="book-table-page">
                {/* <h2>Create A Booking</h2> */}
                <div className='table-details'>
                    <div className='details-input'>
                        <span>Enter No. of guests</span>
                        <input type="number" name="num-of-guests" value={guests} onChange={(e)=>handleFormData(e)} placeholder='No. of Guests' />
                    </div>
                    <div className='details-input'>
                        <span>Table no. </span>
                        <input type='number' name="table" id="table-list" min='1' max={restaurant?.table_capacity} value={table} onChange={(e)=>handleFormData(e)} placeholder={`1-${restaurant?.table_capacity}`}></input>
                    </div>
                </div>
                <div className='table-details'>
                    <div className="details-input">
                        <span>Select Date </span>
                        <input type="date" name="date" value={date} onChange={(e)=>handleFormData(e)} id="date" />
                    </div>
                    <div className="details-input">
                        <span>Select Time </span>
                        <input type="time" name="time" value={time} onChange={(e)=>handleFormData(e)} id="time" />
                    </div>
                    
                </div>
                <div className="details">
                    <br /><span>Enter any arrangements if you want us to make for you</span><br />
                        <textarea name="details" id="details" rows="3" value={details} onChange={(e)=>handleFormData(e)}></textarea>
                </div>
            <button className='confirm-btn submit-btn' onClick={submitBooking}>Confirm Booking</button>
            </div>
            <Loader status={isLoading}/>
        </>
    );
}