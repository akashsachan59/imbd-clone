import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { PlusSmIcon } from '@heroicons/react/solid'
import AddProducer from '../components/AddProducer';
import AddActor from '../components/AddActor';

function createMovie() {
    const router = useRouter();

    const [name, setName] = useState('')
    const [release, setRelease] = useState('')
    const [plot, setPlot] = useState('')
    const [poster, setPoster] = useState('')
    const [actors, setActors] = useState('')
    const [producer, setProducer] = useState('')

    const [showProducer, setShowProducer] = useState(false)
    const [showActor, setShowActor] = useState(false)

    const [error, setError] = useState(false);

    // handle create movie submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (name === '' || release === '' || plot === '' || poster === '' || actors === '' || producer === '') {
            setError(true)
        } else {
            setError(false)
            const data = {
                name,
                release,
                plot,
                poster,
                actors,
                producer
            }
            console.log(data)

            const response = await fetch('http://localhost:3000/createMovie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).catch(err => console.log(err))

            const resJson = await response.json().catch(err => console.log(err))
            console.log(resJson)

            if (resJson) {
                setName('')
                setRelease('')
                setPlot('')
                setPoster('')
                setActors('')
                setProducer('')
                alert('Movie added successfully')
                router.push('/')
            }
        }
    }

    // Showing error message
    const errorMessage = () => {
        return (
            <div
                style={{ display: error ? '' : 'none' }}>
                <p>Please fill all the fields.</p>
            </div>
        )
    }

    // handle add producer
    const handleAddProducer = () => {
        if(showProducer) {
            setShowProducer(false)
        }else{
            setShowProducer(true)
        }
    }

    // handle add actor
    const handleAddActor = () => {
        if(showActor) {
            setShowActor(false)
        }else{
            setShowActor(true)
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
                    Add a Movie
                </div>

                <div>

                    <div className='mb-5'>Title</div>
                    <div className='flex'>
                        <input className='outline-none border flex-grow border-gray-400 mb-5 rounded-sm h-8'
                            type="text"
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </div>

                    <div className='mb-5'>Plot</div>
                    <div className='flex'>
                        <textarea className='outline-none border flex-grow border-gray-400 mb-5 rounded-sm h-32'
                            onChange={(e) => { setPlot(e.target.value) }}
                        ></textarea>
                    </div>

                    <div className='mb-5'>Year of Release</div>
                    <div className='flex'>
                        <input className='outline-none border flex-grow border-gray-400 mb-5 rounded-sm h-8'
                            type="text"
                            onChange={(e) => { setRelease(e.target.value) }}
                        />
                    </div>

                    <div className='mb-5'>Add Poster Url</div>
                    <div className='flex'>
                        <input className='outline-none border flex-grow border-gray-400 mb-5 rounded-sm h-8'
                            type="text"
                            onChange={(e) => { setPoster(e.target.value) }}
                        />
                    </div>

                    <div className='mb-5'>Cast</div>
                    <div className='flex'>
                        <input className='outline-none border flex-grow border-gray-400 rounded-sm h-8'
                            type="text"
                            onChange={(e) => { setActors(e.target.value) }}
                        />
                    </div>
                    <div className='text-yellow-500 flex items-center mb-5 cursor-pointer'
                        onClick={handleAddActor}
                    >
                        <PlusSmIcon className='h-8' />
                        <div>add new actor/actress</div>
                    </div>
                    {showActor && <AddActor />}

                    <div className='mb-5'>Producer</div>
                    <div className='flex'>
                        <input className='outline-none border flex-grow border-gray-400 rounded-sm h-8'
                            type="text"
                            onChange={(e) => { setProducer(e.target.value) }}
                        />
                    </div>
                    <div className='text-yellow-500 flex items-center mb-5 cursor-pointer'
                        onClick={handleAddProducer}
                    >
                        <PlusSmIcon className='h-8' />
                        <div>add new producer</div>
                    </div>
                    {showProducer && <AddProducer />}

                    <div onClick={handleSubmit} className='outline-none my-2.5 h-8 border flex-grow 
                    border-gray-400 rounded-sm bg-gradient-to-t from-yellow-600 to-yellow-200 
                    text-center cursor-pointer'>Submit</div>

                </div>
            </div>
        </div>
    )
}

export default createMovie