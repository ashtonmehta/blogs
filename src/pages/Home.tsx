import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, QueryDocumentSnapshot, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

interface Author {
    name: string;
    id: string;
}

interface Post {
  id: string;
  // Add other properties of your post here, for example:
  title: string;
  post: string;
  author: Author;
  
  timestamp: number;
}

const Home = ({isAuth} : {isAuth : boolean}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const docRef = collection(db, 'posts');
      const querySnapshot = await getDocs(docRef);

      setPosts(
        querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
          ...(doc.data() as Post),
          id: doc.id,
        }))
      );
    };
    getPosts();
  }, []);

  const deletePost = async (id: string) => {
    // Delete the post with the given id
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
    
};

    const handleDelete = async (id: string) => {
        // Delete the post with the given id
        setPosts(posts.filter((post) => post.id !== id));
        deletePost(id);
        // Navigate to the home page
    };


  return (
    <div className="container mx-auto px-4 py-8">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            {isAuth && post.author.id === auth.currentUser?.uid && 
            <button
              onClick={() => handleDelete(post.id)}
              className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
            >
              Delete
            </button>
            }
          </div>
          <p className="text-gray-700">{post.post}</p>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <p>@{post.author.name}</p>
              <p>{new Date(post.timestamp).toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home