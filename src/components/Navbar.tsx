import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ isAuth, setIsAuth }) => {
    const navigate = useNavigate()

    const logout = () => {
        signOut(auth).then(() => {
            localStorage.clear()
            setIsAuth(false)
            console.log("Logged out")
            navigate('/login')
        }).catch((error) => {
            console.log(error)
        })
    }


    return (
        <nav className="bg-blue-500 p-6 shadow-md">
            <div className="flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-semibold hover:text-blue-200 transition duration-200">Home</Link>
                <div className="flex space-x-4">
                    {!isAuth
                        ?
                        <Link to="/login" className="text-white text-lg font-semibold hover:text-blue-200 transition duration-200">Login</Link>
                        :
                        <>
                            <Link to="/create-post" className="text-white text-lg font-semibold hover:text-blue-200 transition duration-200">Create Post</Link>
                            <button onClick={logout} className="text-white text-lg font-semibold hover:text-blue-200 transition duration-200">Logout</button>
                        </>}
                </div>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    setIsAuth: PropTypes.func.isRequired
}

export default Navbar