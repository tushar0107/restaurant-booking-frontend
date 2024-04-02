import axios from 'axios';
import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlRice, faUtensils } from '@fortawesome/free-solid-svg-icons';
import apiUrl from '../Vars';


const Search = ()=>{
    
    const [name,setName] = useState('');
    const [city,setCity] = useState('');
    const [type,setType] = useState('');
    const [ethnicity,setEthnicity] = useState('');
    const [serviceType,setServiceType] = useState('');
    const [tableCapacity,setTableCapacity] = useState(null);

    const [loading, setLoading] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    
    const formData = {
        name:name,
        city:city,
        type:type,
        ethnicity:ethnicity,
        table_capacity:tableCapacity,
        service_type:serviceType
    }

    const handleSearchInput = (e)=>{
        // to handle form data based on the input name attribute 
        // this function sets the value for the respective states of data
        switch (e.target.name) {
            case 'name':
            setName(e.target.value);
                break;
            case 'city':
            setCity(e.target.value);
                break;
            case 'food-type':
            setType(e.target.value);
                break;
            case 'ethnicity':
            setEthnicity(e.target.value);
                break;
            case 'service-type':
            setServiceType(e.target.value);
                break;
            case 'table-capacity':
            setTableCapacity(e.target.value);
                break;
            default:
                break;
        }
    }


    const searchOutput = (e)=>{
        console.log(formData);
        setLoading(true);

        axios.post(`${apiUrl}/api/restaurants`,{...formData}).then((res)=>{
            console.log(res.data);
            if(res.data.length!==0){
                setRestaurants(res.data.data);
            }
            setLoading(false);
        }).catch(err=>{
            setLoading(false);
            console.log('Search Error: ',err);
            alert(err);
        });
    }

    return (
      <div id="search-page">
        <div id="search-container">
            <div id="search-bar">
                <input type="search" name='name' id="name" value={name} onChange={(e)=>handleSearchInput(e)} placeholder="Search by restaurants..." ></input>
                <input type="search" name='city' id="city" value={city} onChange={(e)=>handleSearchInput(e)} placeholder="Search by city..." ></input>
            </div>
            <span className='light-icon'><FontAwesomeIcon icon={faBowlRice}/></span>
            <span className='option-button'><input type="radio" id='veg' name="food-type" onChange={(e)=>{handleSearchInput(e)}} value="veg" ></input><label htmlFor="veg"> Veg</label></span>
            <span className='option-button'><input type="radio" id='non-veg' name='food-type' onChange={(e)=>{handleSearchInput(e)}} value="non-veg" ></input><label htmlFor="non-veg">Non-Veg</label></span>
            <span className='option-button'><input type="radio" id='veg-non-veg' name='food-type' onChange={(e)=>{handleSearchInput(e)}} value="veg & non-veg" ></input><label htmlFor="veg-non-veg">Veg & Non-Veg</label></span>
            <br />
            <span>Table Capacity: </span>
            <span className='option-button'><input type="radio" id='table-capacity-10' name='table-capacity' onChange={(e)=>{handleSearchInput(e)}} value="10" ></input><label htmlFor="table-capacity-10">&gt;10</label></span>
            <span className='option-button'><input type="radio" id='table-capacity-20' name='table-capacity' onChange={(e)=>{handleSearchInput(e)}} value="20" ></input><label htmlFor="table-capacity-20">&gt;20</label></span>
            <span className='option-button'><input type="radio" id='table-capacity-30' name='table-capacity' onChange={(e)=>{handleSearchInput(e)}} value="30" ></input><label htmlFor="table-capacity-30">&gt;30</label></span>
            <br />{/* <input type="text" name='ethnicity' className='search-input-box' value={ethnicity} onChange={(e)=>handleSearchInput(e)} placeholder="Type of restaurant" ></input> */}
            <span className='light-icon'><FontAwesomeIcon icon={faUtensils}/> </span>
            <span className='option-button'><input type="radio" id='service-cafe' name='service-type' onChange={(e)=>{handleSearchInput(e)}} value="Cafe" ></input><label htmlFor="service-cafe">Cafe</label></span>
            <span className='option-button'><input type="radio" id='service-dining' name='service-type' onChange={(e)=>{handleSearchInput(e)}} value="Dinner" ></input><label htmlFor="service-dining">Dining</label></span>
            <span className='option-button'><input type="radio" id='service-restaurant' name='service-type' onChange={(e)=>{handleSearchInput(e)}} value="Family Restaurant" ></input><label htmlFor="service-restaurant">Family Restaurant</label></span>
            <br /><button className='submit-btn' onClick={searchOutput}> Search</button>
        </div>
        {loading?<Loader status={loading}/>:
        <> 
            <div id="search-results-container">
                {
                    Array.isArray(restaurants) ? restaurants.map((ele,key)=>{
                        return(                    
                            <Link to={`/restaurant/${ele.id}`} className="restaurant-card" key={key}>
                                <div className="restro-img"><img src="../../logo192.png" alt="" /></div>
                                <div className="restro-details">
                                    <span className="restaurant-name"><strong>{ele.name || 'Name'}</strong></span><br />
                                    <span className="address">{ele.address || 'address'}, {ele.city ||'city'}, {ele.state || 'State'}</span><br />
                                    <span className='light-icon'><FontAwesomeIcon icon={faUtensils}/> {ele.service_type}</span>
                                    <br /><span className='light-icon'><span className="light-icon"><FontAwesomeIcon icon={faBowlRice}/> </span>{ele.type} </span> 
                                </div>
                            </Link>
                        );
                    }):null
                }
            </div>
        </>}
      </div>
    );
}

export default Search;