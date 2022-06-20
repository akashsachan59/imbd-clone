import React, { useState, useEffect } from 'react'
import { BookmarkIcon, MenuIcon, SearchIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { useRouter } from "next/router";
import { removeCookies, getCookie } from "cookies-next";

function Header() {

    const [login, setLogin] = useState(false)

    const router = useRouter()
    const token = getCookie('token')

    // console.log(token)

    useEffect(() => {
        if (token) {
            setLogin(true)
        }else{
            setLogin(false)
        }
    }, [token])

    const handleLogout = () => {
        removeCookies('token')
        removeCookies('isloggedin')
        router.push('/')
    }

    const handleAdd = () => {
        if(login){
        router.push("/createMovie")
        }else{
            alert("You must be logged in to add a movie!")
        }
    }

    
    return (
        <div className='mx-20 grid grid-cols-4 py-4'>
            
            {/* left */}
            <div className='flex'>

            <div className='h-10 w-20 mr-4'>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png"
                />
            </div>

            <div className='flex items-center space-x-1'>
                <MenuIcon className='text-gray-500 h-8'/>
                <div className='text-white'>Menu</div>
            </div>

            <div className='flex items-center ml-4 cursor-pointer' onClick={handleAdd}>
                <PlusCircleIcon className='text-gray-500 h-8' />
                <div className='text-white'>Add Movie</div>
            </div>

            </div>
            
            {/* middle */}
            <div className='flex items-center justify-between border-2 bg-white rounded-md col-span-2'>
                <input type="text" placeholder='Search IMDb'
                    className='pl-5 outline-none flex-grow'
                />
                <SearchIcon className='text-gray-500 h-6 pr-2' />
            </div>

            {/* right */}
            <div className='flex items-center text-white space-x-4'>
                <BookmarkIcon className='text-gray-500 h-8 pl-10'/>
                <div>Watchlist</div>

                {/* {token && (
                    )}

                {!token && (
                    
                    )} */}
                    <div className={`cursor-pointer ${login  ? "block" : "hidden"}`} onClick={handleLogout}>Logout</div>
                    <><div className={`cursor-pointer ${login  ? "hidden" : "block"}`} onClick={() => router.push('/signup')}>Signup</div>
                    <div className={`cursor-pointer ${login  ? "hidden" : "block"}`} onClick={() => router.push('/login')}>Login</div></>
                
            </div>
        </div>
    )
}

export default Header
