import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Categories.css';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState(''); // Replace with actual user ID if needed
  

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addCategory = async () => {
    try{
        await axios.post('http://localhost:5000/api/categories', { name })
        setMessage('Category Added!')
        setName('')
        fetchCategories()
    } catch(err){
        setMessage('Failed to upload category')
    }
  };

  return(
    <div className='category-container'> 
    <h1>  Categories  </h1>
    <input 
        type='text'
        value={name}
        onChange={(e)=> setName(e.target.value)}
        placeholder='New category name'
    />
    <button onClick={addCategory}>Add Category </button>
    {message && <p>{message}</p>}

    <ul>
        {categories.map((cat)=>(
            <li key ={cat._id}>{cat.name}</li>
        ))}
    </ul>

    </div>
  )
}
