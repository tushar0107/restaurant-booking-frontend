import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import apiUrl from '../Vars';
import Loader from './Loader';

const RestaurantForm = ({show,formShow})=>{

    const user = useSelector((state)=>state.user.value);

    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [phone1,setPhone1] = useState();
    const [phone2,setPhone2] = useState();
    const [type,setType] = useState('');
    const [ethnicity,setEthnicity] = useState('');
    const [tableCapacity,setTableCapaciy] = useState();
    const [serviceType, setServiceType] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);

    const formData = {
        user_id: user?.id,
        name:name,
        address:address,
        city:city,
        state:state,
        phone1:phone1,
        phone2:phone2,
        type:type,
        ethnicity:ethnicity,
        table_capacity:tableCapacity,
        service_type:serviceType,
        location:location,
        owner:user?.id
    }

    useEffect(()=>{},[user]);

    const handleForm = (e)=>{
        switch (e.target.name) {
            case 'name':
                setName(e.target.value);
                break;
            case 'address':
                setAddress(e.target.value);
                break;
            case 'city':
                setCity(e.target.value);
                break;
            case 'state':
                setState(e.target.value);
                break;
            case 'phone1':
                setPhone1(e.target.value);
                break;
            case 'phone2':
                setPhone2(e.target.value);
                break;
            case 'food-type':
                setType(e.target.value);
                break;
            case 'ethnicity':
                setEthnicity(e.target.value);
                break;
            case 'table_capacity':
                setTableCapaciy(e.target.value);
                break;
            case 'service_type':
                setServiceType(e.target.value);
                break;
            case 'location':
                setLocation(e.target.value);
                break;
            default:
                break;
        }
    }

    const submitForm = ()=>{
        setLoading(true);
        axios.post(`${apiUrl}/api/register-restaurant`,{...formData}).then((res)=>{
            console.log(res.data);
            alert(res.data.message);
            setLoading(false);
            formShow(false);
            window.location.reload();
        }).catch(err=>{
            console.log(err);
            setLoading(false);
            formShow(false);
        });
    }

    return (
        <div id='form-container' style={{display:show?'block':'none'}}>
            <div id='form'>
                <div>
                    <input type="text" name='name' id='name' value={name} onChange={(e)=>handleForm(e)} placeholder='Name of Restaurant'></input>
                </div>
                <div>
                    <input type="text" name='address' id='address' value={address} onChange={(e)=>handleForm(e)} placeholder='Address'></input>
                </div>
                <div>
                    <input type="text" name='city' id='city' value={city} onChange={(e)=>handleForm(e)} placeholder='City'></input>
                </div>
                <div>
                    <input type="text" name='state' id='state' value={state} onChange={(e)=>handleForm(e)} placeholder='State'></input>
                </div>
                <div>
                    <input type="number" name='phone1' id='phone1' value={phone1} onChange={(e)=>handleForm(e)} placeholder='Phone Number'></input>
                </div>
                <div>
                    <input type="number" name='phone2' id='phone2' value={phone2} onChange={(e)=>handleForm(e)} placeholder='Alternate Phone Number'></input>
                </div>
                <div>
                    <label htmlFor="food-type">Food Type (veg / non-veg)</label><br />
                    <span className='option-button'><input type="radio" id='veg' name="food-type" onChange={(e)=>{handleForm(e)}} value="veg" ></input><label htmlFor="veg"> Veg</label></span>
                    <span className='option-button'><input type="radio" id='non-veg' name='food-type' onChange={(e)=>{handleForm(e)}} value="non-veg" ></input><label htmlFor="non-veg">Non-Veg</label></span>
                    <span className='option-button'><input type="radio" id='veg-non-veg' name='food-type' onChange={(e)=>{handleForm(e)}} value="veg & non-veg" ></input><label htmlFor="veg-non-veg">Both</label></span>
            
                </div>
                <div>
                    <label htmlFor="ethnicity">Ethnicity</label><br />
                    <input type="text" name='ethnicity' id='ethnicity' value={ethnicity} onChange={(e)=>handleForm(e)} placeholder='e.g. Indian, Italian, Punjabi,...'></input>
                </div>
                <div>
                    <input type="number" name='table_capacity' id='table_capacity' value={tableCapacity} onChange={(e)=>handleForm(e)} placeholder='Table Capacity'></input>
                </div>
                <div>
                    <label htmlFor="service_type">Service Type</label><br />
                    <input type="text" name='service_type' id='service_type' value={serviceType} onChange={(e)=>handleForm(e)} placeholder='e.g. Cafe, Family Restaurant,...'></input>
                </div>
                <div>
                    <label htmlFor="location">Location</label><br />
                    <input type="text" name='location' id='location' value={location} onChange={(e)=>handleForm(e)} placeholder='Google maps link'></input>
                </div>
                <button className='submit-btn form-btn' onClick={submitForm}>Submit</button>
                <button className='secondary-btn form-btn cancel-btn' onClick={()=>formShow(false)}>Cancel</button>
            </div>
            <Loader status={loading}/>
        </div>
    );
}


export default RestaurantForm;