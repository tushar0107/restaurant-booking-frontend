import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Loader from '../components/Loader';
import axios from 'axios';
import apiUrl from '../Vars';


export const BookTable = ()=>{
    const params= useParams();
    const user = useSelector(state=>state.user);
    const [guests,setGuests] = useState('');
    const [table,setTable] = useState();
    const [date,setDate] = useState('');
    const [time,setTime] = useState('');
    const [details,setDetails] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const formData = {
        user_id:user?.value.id,
        restaurant_id:parseInt(params.id),
        table_no:table,
        details:details,
        guests:guests,
        booking_date: new Date(),
        visit_date:date,
        visit_time:time
    }

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
            if(table===undefined){
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
            {isLoading? <Loader status={isLoading}/>:
            <><div id="book-table-page">
                {/* <h2>Create A Booking</h2> */}
                <div className='num-of-guests'>
                    <input type="number" name="num-of-guests" value={guests} onChange={(e)=>handleFormData(e)} placeholder='Enter no. of Guests' />
                    <div>
                        <span>Table no. </span>
                        <select name="table" id="table-list" value={table} onChange={(e)=>handleFormData(e)}>
                            <option value={undefined}>Select Table</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                <div className='date-time-input'>
                    <span>Select Date <br /><input type="date" name="date" value={date} onChange={(e)=>handleFormData(e)} id="date" /></span>
                    <span>Select Time <br />
                        <input type="time" name="time" value={time} onChange={(e)=>handleFormData(e)} id="time" />
                    </span>
                </div>
                <div className="details">
                    <br /><span>Enter any arrangements if you want us to make for you</span><br />
                        <textarea name="details" id="details" rows="3" value={details} onChange={(e)=>handleFormData(e)}></textarea>
                </div>
            </div>
            <button className='confirm-btn submit-btn' onClick={submitBooking}>Confirm Booking</button>
            </>
            }
        </>
    );
}