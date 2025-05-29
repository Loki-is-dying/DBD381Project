import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reviews.css';

export default function Reviews() {
  const loggedInUserId = localStorage.getItem('userId');
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ rating: '', comment: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/reviews');
      setReviews(data);
    } catch (err) {
      setMessage('Could not load reviews.');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitReview = async () => {
    if (!loggedInUserId) {
      setMessage('You must be logged in to submit a review.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/reviews', {
        ...form,
        userId: loggedInUserId,
      });

      setForm({ rating: '', comment: '' });
      setMessage('Review submitted!');
      fetchReviews();
    } catch {
      setMessage('Error submitting review.');
    }
  };

  return (
    <div className="review-container">
      <h2>User Reviews</h2>

      <div className="review-form">
        <p><strong>Logged in as:</strong> {loggedInUserId}</p>
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          placeholder="Rating"
          value={form.rating}
          onChange={handleChange}
        />
        <input
          name="comment"
          placeholder="Comment"
          value={form.comment}
          onChange={handleChange}
        />
        <button onClick={submitReview}>Submit</button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((revGroup) =>
            revGroup.reviews.map((r, i) => (
              <div key={`${revGroup._id}-${i}`} className="review-card">
                <div className="rating">⭐ {r.rating}/5</div>
                <p>{r.comment}</p>
                <small>By: {r.userId?.name || 'Unknown User'}</small>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
}
