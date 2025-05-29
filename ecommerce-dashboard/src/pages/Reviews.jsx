import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reviews.css';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    userId: '',
    rating: '',
    comment: ''
  });
  const [message, setMessage] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/reviews');
      setReviews(res.data);
    } catch (err) {
      setMessage('Failed to fetch reviews');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const addReview = async () => {
    try {
      await axios.post('http://localhost:5000/api/reviews', newReview);
      setMessage('Review submitted!');
      setNewReview({ userId: '', rating: '', comment: '' });
      fetchReviews();
    } catch (err) {
      setMessage('Failed to submit review');
    }
  };

  return (
    <div className="container">
      <h1>Reviews</h1>

      <div>
        <input name="userId" placeholder="User ID" value={newReview.userId} onChange={handleChange} />
        <input name="rating" placeholder="Rating (1-5)" type="number" value={newReview.rating} onChange={handleChange} />
        <input name="comment" placeholder="Comment" value={newReview.comment} onChange={handleChange} />
        <button onClick={addReview}>Submit Review</button>
      </div>

      <p>{message}</p>

      <ul>
        {reviews.map((rev, index) => (
          <li key={index}>
            ⭐ {rev.rating}/5 - {rev.comment} (User ID: {rev.userId})
          </li>
        ))}
      </ul>
    </div>
  );
}
