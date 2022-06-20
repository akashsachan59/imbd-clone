import { useRouter } from 'next/router'
import React, { useState } from 'react'

function editMovie() {
    const router = useRouter()
    const data = router.query
    const id = data.id
    console.log(id)
    const [name, setName] = useState(data.name)
    const [release, setRelease] = useState(data.release)
    const [plot, setPlot] = useState(data.plot)
    const [poster, setPoster] = useState(data.poster)
    const [actors, setActors] = useState(data.actors)
    const [producer, setProducer] = useState(data.producer)

    const [error, setError] = useState(false)

    // Showing error message
    const errorMessage = () => {
        return (
            <div
                style={{ display: error ? '' : 'none' }}>
                <p>Please fill all the fields.</p>
            </div>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (name === '' || release === '' || plot === '' || poster === '' || actors === '' || producer === '') {
            setError(true)
        } else {
            setError(false)
            const data = {
                id,
                name,
                release,
                plot,
                poster,
                actors,
                producer
            }
            console.log(data)

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/edit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).catch(err => console.log(err))

            const resJson = await response.json().catch(err => console.log(err))
            console.log(resJson)

            if(resJson){
                setName('')
                setRelease('')
                setPlot('')
                setPoster('')
                setActors('')
                setProducer('')
                alert('Movie edited successfully')
                router.push('/')
            }
        }
    }

    return (
        <div className="flex flex-col justify-center items-center mt-10">

            <div className="w-40 h-20 mb-10 cursor-pointer" onClick={() => router.push('/')}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png"
                />
            </div>

            {/* Calling Error Methods */}
            <div className="mb-10 text-red-500 text-lg text-semibold">
                {errorMessage()}
            </div>

            <div className="border shadow-sm rounded-sm p-3 w-[575px] flex flex-col">
                <div className="text-3xl font-semibold mb-5">
                    Edit Movie Details
                </div>

                <div>

                    <div className='mb-5'>Title</div>
                    <div className='flex'>
                        <input className='outline-none border flex-grow border-gray-400 mb-5 rounded-sm h-8'
                            type="text" value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>

                    <div className='mb-5'>Plot</div>
                    <div className='flex'>
                        <textarea className='outline-none border flex-grow border-gray-400 mb-5 rounded-sm h-32'
                            value={plot}
                            onChange={(e) => { setPlot(e.target.value) }}
                        ></textarea>
                    </div>

                    <div className='mb-5'>Year of Release</div>
                    <div className='flex'>
                        <input className='outline-none border flex-grow border-gray-400 mb-5 rounded-sm h-8'
                            type="text" value={release}
                            onChange={(e) => { setRelease(e.target.value) }}
                        />
                    </div>

                    <div className='mb-5'>Add Poster Url</div>
                    <div className='flex'>
                        <input className='outline-none border flex-grow border-gray-400 mb-5 rounded-sm h-8'
                            type="text" value={poster}
                            onChange={(e) => { setPoster(e.target.value) }}
                        />
                    </div>

                    <div className='mb-5'>Cast</div>
                    <div className='flex'>
                        <input className='outline-none border flex-grow border-gray-400 rounded-sm h-8'
                            type="text" value={actors}
                            onChange={(e) => { setActors(e.target.value) }}
                        />
                    </div>

                    <div className='mb-5'>Producer</div>
                    <div className='flex'>
                        <input className='outline-none border flex-grow border-gray-400 rounded-sm h-8'
                            type="text" value={producer}
                            onChange={(e) => { setProducer(e.target.value) }}
                        />
                    </div>

                    <div className='outline-none my-2.5 h-8 border flex-grow 
                    border-gray-400 rounded-sm bg-gradient-to-t from-yellow-600 to-yellow-200 
                    text-center cursor-pointer' onClick={handleSubmit}>Submit</div>

                </div>
            </div>
        </div>
    )
}

export default editMovie