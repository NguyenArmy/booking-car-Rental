import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;



export const AppContext = createContext();



export const AppProvider = ({children}) =>{

    const navigate = useNavigate();
    const [currency, setCurrency] = useState(import.meta.env.VITE_CURRENCY || '$');
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const[showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [cars, setCars] = useState([]);

    //funtion to check if user is logged in
    const fetchUser = async() =>{
        try{
            const {data} = await axios.get('/api/user/data')
            if(data?.success){
                setUser(data.user);
                setIsOwner(data.isOwner);
            } else if (data?._id) {
                setUser(data);
                setIsOwner(data.role === 'owner');
            }else{
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message);
            console.error('Error fetching user data:', error);
        }

    }

    //function to fetch all cars from to server
    const fetchCars = async() =>{
        try{
            const {data} = await axios.get('/api/user/cars');
            data.success ? setCars(data.cars) : toast.error(data.message);

        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to log out the user
    const logout = () =>{
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
       axios.defaults.headers.common['Authorization'] = '';
       toast.success('Logged out successfully');
    }
    //useEffect to retrieve the token from locolStorage
    useEffect(()=>{
        const token = localStorage.getItem('token')
        setToken(token);
        fetchCars();
    }, [])

    useEffect(()=> {
        if(token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();    
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token])
    const value ={
        navigate,
        currency,
        setCurrency,
        token,
        setToken,
        user,
        setUser,
        isOwner,
        setIsOwner,
        fetchUser,
        showLogin,
        setShowLogin, logout,
        fetchCars,
        cars,
        setCars,
        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,

        axios,

    }
    return (<AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>)
}
export const useAppContext = () =>{
    return useContext (AppContext);
}
