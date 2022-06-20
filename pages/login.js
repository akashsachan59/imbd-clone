import { setCookies } from "cookies-next";
import { useState } from "react";
import { useRouter } from "next/router";


export default function Login() {

    const router = useRouter();

    // States for login
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    // States for checking the errors
    const [error, setError] = useState(false);

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            setError(true)
        } else {
            setError(false)
            const data = {
                email,
                password
            }
            // console.log(data)

            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const resJson = await response.json()
            let login = resJson.isloggedin
            // console.log(resJson)

            if (login) {
                setCookies('token', resJson.token)
                router.push('/')
            } else {
                setError(true)
            }
            // console.log(getCookies('token'))
        }
    }

    // Showing error message
    const errorMessage = () => {
        return (
            <div
                style={{ display: error ? '' : 'none' }}>
                <p>Please enter valid credentials</p>
            </div>
        )
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
                    Login
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
                    text-center cursor-pointer'>Login</div>
                </form>
            </div>
        </div>
    )
}


