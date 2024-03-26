import axios from 'axios';
import React, { useState} from 'react';


const Search = ()=>{
    const [searchInput, setSearchInput] = useState('');
    
    const formData = {
        name:'',
        city:searchInput,
        type:'',
        ethnicity:'',
        table_capacity:'',
        service_type:''
    }

    const handleSearchInput = (e)=>{
        setSearchInput(e.target.value);
    }


    const searchOutput = (e)=>{
        console.log(searchInput);
        axios.post('http://127.0.0.1:8626/api/restaurants',{...formData}).then((res)=>{
            console.log(res.data);
        })
    }

    return (
      <>
        <div id="search-bar">
            <input type="search" value={searchInput} onChange={(e)=>handleSearchInput(e)} placeholder="Search..." />
            <button onClick={searchOutput}>
              Search
            </button>
        </div>
        <span className='food-option-button'><input type="radio" id='veg' name="food-type" value="veg" ></input><label htmlFor="veg"> Veg</label></span>
        <span className='food-option-button'><input type="radio" id='non-veg' name='food-type' value="non-veg" ></input><label htmlFor="non-veg">Non-Veg</label></span>
            <div id="search-results-container"></div>
      </>
    );
}

export default Search;