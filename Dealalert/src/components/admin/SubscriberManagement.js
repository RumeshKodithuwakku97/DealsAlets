import React, { useState, useEffect } from 'react';
import { getSubscribers, deleteSubscriber } from '../../services/wordpress/subscribers';
import './SubscriberManagement.css';

const SubscriberManagement = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    try {
      const subs = await getSubscribers();
      setSubscribers(subs);
    } catch (error) {
      console.error('Error loading subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscriber?')) {
      try {
        await deleteSubscriber(id);
        loadSubscribers();
      } catch (error) {
        console.error('Error deleting subscriber:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading subscribers...</div>;
  }

  return (
    <div className="subscriber-management">
      <div className="container">
        <div className="page-header">
          <h1>Subscriber Management</h1>
          <div className="subscriber-count">
            Total Subscribers: {subscribers.length}
          </div>
        </div>

        <div className="subscribers-list">
          {subscribers.map(subscriber => (
            <div key={subscriber.id} className="subscriber-card">
              <div className="subscriber-info">
                <h4>{subscriber.email}</h4>
                <p>Joined: {new Date(subscriber.date).toLocaleDateString()}</p>
              </div>
              <button 
                onClick={() => handleDelete(subscriber.id)}
                className="btn btn-danger"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {subscribers.length === 0 && (
          <div className="empty-state">
            <h3>No subscribers yet</h3>
            <p>Subscribers will appear here when they sign up for your newsletter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriberManagement;