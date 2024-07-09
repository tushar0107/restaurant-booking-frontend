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
        console.log(id);
        setIsLoading(true);
        axios.get(`${apiUrl}/api/get-restaurant/${id}`).then((res)=>{
            console.log('restaurant: ',res.data);
            if(res.data.status){
                setRestaurant(res.data.result);
            }
        }).then(()=>{
            axios.get(`${apiUrl}/api/menu/${id}`).then((res)=>{
                console.log('menu: ',res.data);
                if(res.data.status){
                    setMenu(res.data.result);
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
                    <div className='spacer'></div>
                    <div id='restaurant-sheet'>
                        <div id="book-table-btn">
                            <div className='restaurant-details'>
                                <span className='restaurant-name'>{restaurant?.name}</span><br />
                                <span className='address'>{restaurant?.address+', '+restaurant?.city}</span>
                            </div>
                            <Link to={`/book-table/${id}`}><button>Book a Table</button></Link>
                        </div>
                        <div id="menu-list">
                            {
                                Array.isArray(menu)?(
                                    menu.length>0 ? menu.map((item,index)=>{
                                    return(
                                        <div className="menu-item" key={index}>
                                            <div className="menu-img">
                                                <img src={item.food_image_url?(apiUrl+'/'+item.food_image_url):'../../food-item.png'} alt="" />
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