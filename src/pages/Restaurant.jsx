import React from 'react';
import { useParams } from 'react-router';


export const Restaurant = ()=>{
    const {id} = useParams();
    return (
        <>
            <h1>restaurant page {id}</h1>
        </>
    );
}