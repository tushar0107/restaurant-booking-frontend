import { Route, Routes } from "react-router";
import Header from "../components/Header";
import Search from "./Search";
import Home from "./Home";
import Profile from "./Profile";
import { Restaurant } from "./Restaurant";
import { BookTable } from "./BookTable";


const Base = ()=>{
    
    return(
        <>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/search' element={<Search/>}></Route>
                <Route path='/profile' element={<Profile/>}></Route>
                <Route path='/restaurant/:id' element={<Restaurant/>}></Route>
                <Route path='/book-table/:id' element={<BookTable/>}></Route>
            </Routes>
        </>
    );
};

export default Base;