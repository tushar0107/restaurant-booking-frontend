import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import apiUrl from '../Vars';


export const Restaurant = ()=>{
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [restaurant,setRestaurant] = useState();
    const [menu, setMenu] = useState();

    useEffect(()=>{
        setIsLoading(true);
        axios.get(`${apiUrl}/api/get-restaurant/${id}`).then((res)=>{
            console.log('restaurant: ',res.data);
            if(res.data.status){
                setRestaurant(res.data.data[0]);
            }
        }).then(()=>{
            axios.get(`${apiUrl}/api/menu/${id}`).then((res)=>{
                console.log('menu: ',res.data);
                if(res.data.status){
                    setMenu(res.data.data);
                }
            });
            setIsLoading(false);
        }).catch(err=>console.log(err));
    },[id]);
    return (
        <>
        {
            isLoading ?
                <Loader status={isLoading}/>:
                <div id='restaurant-page'>
                    <div className='head' style={{backgroundImage:'url(../../logo192.png)'}}>
                        <h2>{restaurant?.name}</h2>
                        <span className='address'>{restaurant?.address + ', ' + restaurant?.city}</span>
                    </div>
                    <div id='restaurant-sheet'>
                        <div id="book-table-btn">
                            <Link to={`/book-table/${id}`}>Book a Table</Link>
                        </div>
                        <div id="menu-list">
                            {
                                Array.isArray(menu)?(
                                    menu.length>0 ? menu.map((item,index)=>{
                                    return(
                                        <div className="menu-item" key={index}>
                                            <div className="menu-img">
                                                <img src="../../logo192.png" alt="" />
                                            </div>
                                            <div className="menu-details">
                                                <strong>{item.food_item}</strong><br />
                                                <span>{item.food_desc.slice(0,50)}</span><br />
                                                <span>{item.price}/-</span>
                                            </div>
                                        </div>
                                    );
                                    }) : <h5>No items in the menu</h5>)
                                :null
                            }
                        </div>
                    </div>

                </div>
        }
        </>
    );
}