import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore'
import { db, auth } from '../firebase-config'

const CreatePost = ({ isAuth } : { isAuth : boolean }) => {
    const [title, setTitle] = useState('')
    const [post, setPost] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [isAuth, navigate])

    const CreatePost = async () => {
        const docRef = collection(db, "posts")
        await addDoc(docRef, {
            title: title,
            post: post,
            author: {
                name: auth.currentUser?.displayName,
                id: auth.currentUser?.uid
            },
            timestamp: Date.now()
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        CreatePost()
        console.log("Submitted")
        navigate('/')
    }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h1 className="text-2xl font-semibold mb-6">Create a post</h1>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Title:</label>
                <input
                  placeholder="Title..."
                  type="text"
                    onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Post:</label>
                <textarea
                  placeholder="Post..."
                    onChange={(e) => setPost(e.target.value)}
                  rows={10}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                />
            </div>
            <button
                onClick={handleSubmit}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            >
              Submit
            </button>
        </div>
    </div>
  );
};

export default CreatePost;