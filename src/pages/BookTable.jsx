import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';


export const BookTable = ()=>{
    const params= useParams();
    const user = useSelector(state=>state.user);
    const [guests,setGuests] = useState(null);
    const [table,setTable] = useState(null);
    const [date,setDate] = useState('');
    const [time,setTime] = useState('');
    const [details,setDetails] = useState('');

    const formData = {
        user_id:user.id,
        restaurant_id:params.id,
        table_no:table,
        details:details,
        guests:guests,
        booking_date:new Date().toLocaleString(),
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
        console.log(formData);
    }

    return(
        <>
            <div id="book-table-page">
                {/* <h2>Create A Booking</h2> */}
                <div className='num-of-guests'>
                    <input type="number" name="num-of-guests" value={guests} onChange={(e)=>handleFormData(e)} placeholder='Enter no. of Guests' />
                    <div>
                        <span>Table no. </span>
                        <select name="table" id="table-list" value={table} onChange={(e)=>handleFormData(e)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                <div className='date-time-input'>
                    <span>Select Date <br /> and Time:</span>
                    <span>
                        <input type="date" name="date" value={date} onChange={(e)=>handleFormData(e)} id="date" />
                    </span>
                    <span>
                        <input type="time" name="time" value={time} onChange={(e)=>handleFormData(e)} id="time" />
                    </span>
                </div>
                <div className="details">
                    <br /><span>Enter any arrangements it you want us to make</span><br />
                        <textarea name="details" id="details" rows="3"></textarea>
                </div>
            </div>
            <button className='confirm-btn submit-btn' onClick={submitBooking}>Confirm Booking</button>
        </>
    );
}