import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getCookie } from "cookies-next";


function Movie({ data }) {

    const router = useRouter()
    const [login, setLogin] = useState(false)
    const token = getCookie('token')

    useEffect(() => {
        if (token) {
            setLogin(true)
        }else{
            setLogin(false)
        }
    }, [token])

    const handleEdit = (e) => {
        if(login){
        e.preventDefault()
        const id = e.target.getAttribute("id")
        // console.log(id)
        let name, release, plot, poster, actors, producer
        data.filter(movie => {
            if (movie.id === id) {
                name = movie.name
                release = movie.release,
                plot = movie.plot,
                poster = movie.poster[0].url,
                actors = movie.actors,
                producer = movie.producer
        }})
        // console.log(name, release, plot, poster, actors, producer)
        router.push({
            pathname: '/editMovie',
            query: {
                id: id,
                name: name,
                release: release,
                plot: plot,
                poster: poster,
                actors: actors,
                producer: producer
            }
        })
    }else{
        alert("You must be logged in to edit a movie!")
    }
    }

    return (
        <div className='text-white'>
            {data?.map((movie) => (
                <div key={movie.id} className="relative flex p-10 border border-yellow-200 rounded-lg mx-20 my-5">
                    <img className='h-[375px] w-[256px]' src={movie.poster[0].url} />
                    <div className={`flex flex-col justify-start px-10 space-y-8`}>
                        <div className='text-3xl'>Title :&ensp;{movie.name}</div>
                        <div className='pr-4'>Plot :&ensp;{movie.plot}</div>
                        <div>Year of release :&ensp;{movie.release}</div>
                        <div>Cast :&ensp;{movie.actors}</div>
                        <div>Producer :&ensp;{movie.producer}</div>
                        <div className='absolute top-0 right-10 border border-whites rounded-lg px-2 py-1 cursor-pointer'
                            onClick={handleEdit} id={movie.id}>Edit</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Movie