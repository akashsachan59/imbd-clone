import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {

    const router = useRouter();

    // States for Registration
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // States for error
    const [error, setError] = useState('')

    // Showing error message
    const errorMessage = () => {
        return (
            <div className="error-message"
                style={{ display: error ? '' : 'none' }}>
                <p>Please enter all the fields</p>
            </div>
        )
    }

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            setError(true)
        } else {
            setError(false)
            const data = {
                email,
                password,
            }
            console.log(data)

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const resJson = await response.json()
            // console.log(resJson)
            if (resJson.user) {
                alert(resJson.msg)
            }
            setEmail('')
            setPassword('')
            router.push('/login')

        }
    }


    return (
        <div className="flex flex-col justify-center items-center mt-20">

            <div className="w-40 h-20 mb-10 cursor-pointer" onClick={() => router.push('/')}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png"
                />
            </div>

            {/* Calling Error Methods */}
            <div className="mb-10 text-red-500 text-lg text-semibold">
                {errorMessage()}
            </div>

            <div className="border shadow-sm rounded-sm p-3 h-[325px] w-[375px] flex flex-col content-evenly">
                <div className="text-3xl font-semibold mb-5">
                    Create Account
                </div>

                <form>
                    <div className="mb-5">Email </div>
                    <div className="flex">
                        <input className="outline-none border flex-grow border-gray-400 mb-5 rounded-sm h-8"
                        onChange={(e) => { setEmail(e.target.value) }} type="text" value={email}></input>
                    </div>

                    <div className="mb-5">Password </div>
                    <div className="flex">
                        <input className="outline-none border flex-grow border-gray-400 mb-5 rounded-sm h-8"
                        onChange={(e) => { setPassword(e.target.value) }} type="password" value={password}></input>
                    </div>

                    <div onClick={handleSubmit} className='outline-none my-2.5 h-8 border flex-grow 
                    border-gray-400 rounded-sm bg-gradient-to-t from-yellow-600 to-yellow-200 
                    text-center cursor-pointer'>Create new account</div>
                </form>
            </div>
        </div>
    )

}