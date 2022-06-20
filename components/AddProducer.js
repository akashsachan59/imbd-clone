import React, { useState } from 'react'

function AddProducer() {
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [show, setShow] = useState(true)

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
        if (name === '' || bio === '' || gender === '' || dob === '') {
            setError(true)
        } else {
            setError(false)
            const data = {
                name,
                bio,
                dob,
                gender
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/createProducer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).catch(err => console.log(err))

            const resJson = await response.json().catch(err => console.log(err))

            if (resJson) {
                setName('')
                setBio('')
                setDob('')
                setGender('')
                setShow(false)
                alert('Producer added successfully')
            }
        }
    }

    return (
        <div className={`${show ? "block" : "hidden"}`}>
            <div className="border shadow-sm rounded-sm p-3 m-10 flex flex-col">

                {/* Calling Error Methods */}
                <div className="mb-10 text-red-500 text-lg text-semibold">
                    {errorMessage()}
                </div>

                <div className='mb-5'>Name</div>
                <div className='flex mb-5'>
                    <input className='outline-none border flex-grow border-gray-400 rounded-sm h-8'
                        type="text" value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                </div>

                <div className='mb-5'>Date of Birth</div>
                <div className="flex mb-5">
                    <input className='outline-none border flex-grow border-gray-400 rounded-sm h-8'
                        type="text" value={dob}
                        onChange={(e) => { setDob(e.target.value) }}
                    />
                </div>

                <div className='mb-5'>Gender</div>
                <div className="flex mb-5">
                    <input className='outline-none border flex-grow border-gray-400 rounded-sm h-8'
                        type="text" value={gender}
                        onChange={(e) => { setGender(e.target.value) }}
                    />
                </div>

                <div className='mb-5'>Bio</div>
                <div className='flex mb-5'>
                    <textarea className='outline-none border flex-grow border-gray-400 rounded-sm h-16'
                        onChange={(e) => { setBio(e.target.value) }}
                        value={bio}
                    ></textarea>
                </div>
                <div className='outline-none my-2.5 h-8 border flex-grow border-gray-400 rounded-sm 
                bg-gradient-to-t from-yellow-600 to-yellow-200 text-center cursor-pointer'
                    onClick={handleSubmit}
                >
                    Add New Producer
                </div>
            </div>
        </div>
    )
}

export default AddProducer