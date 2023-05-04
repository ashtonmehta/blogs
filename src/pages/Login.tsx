import React from 'react'
import PropTypes from 'prop-types'
import { auth, provider } from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsAuth }) => {

    const navigate = useNavigate()

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true)
            setIsAuth(true)
            navigate('/')
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <p className="text-gray-700 text-lg mb-6">Sign in with Google to continue.</p>
                <button
                    onClick={signInWithGoogle}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
  )
}

Login.propTypes = {
    setIsAuth: PropTypes.func.isRequired
}

export default Login