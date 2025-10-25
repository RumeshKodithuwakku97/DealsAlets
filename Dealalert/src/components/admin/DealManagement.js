import React, { useState, useEffect } from 'react';
import { createDeal, getDeals, updateDeal, deleteDeal } from '../../services/wordpress/deals';
import Modal from '../common/Modal';
import './DealManagement.css';

const DealManagement = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    originalPrice: '',
    discountPrice: '',
    url: '',
    store: '',
    category: '',
    expiryDate: ''
  });

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      const dealsData = await getDeals();
      setDeals(dealsData);
    } catch (error) {
      console.error('Error loading deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDeal) {
        await updateDeal(editingDeal.id, formData);
      } else {
        await createDeal(formData);
      }
      setShowModal(false);
      setEditingDeal(null);
      setFormData({
        title: '', description: '', originalPrice: '', discountPrice: '',
        url: '', store: '', category: '', expiryDate: ''
      });
      loadDeals();
    } catch (error) {
      console.error('Error saving deal:', error);
    }
  };

  const handleEdit = (deal) => {
    setEditingDeal(deal);
    setFormData({
      title: deal.title.rendered,
      description: deal.content.rendered,
      originalPrice: deal.meta?.original_price || '',
      discountPrice: deal.meta?.discount_price || '',
      url: deal.meta?.deal_url || '',
      store: deal.meta?.store_name || '',
      category: deal.meta?.category || '',
      expiryDate: deal.meta?.expiry_date || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await deleteDeal(id);
        loadDeals();
      } catch (error) {
        console.error('Error deleting deal:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading deals...</div>;
  }

  return (
    <div className="deal-management">
      <div className="container">
        <div className="page-header">
          <h1>Deal Management</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New Deal
          </button>
        </div>

        <div className="deals-list">
          {deals.map(deal => (
            <div key={deal.id} className="deal-card">
              <h3>{deal.title.rendered}</h3>
              <p>{deal.meta?.store_name}</p>
              <div className="deal-actions">
                <button onClick={() => handleEdit(deal)} className="btn">
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(deal.id)} 
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingDeal(null);
            setFormData({
              title: '', description: '', originalPrice: '', discountPrice: '',
              url: '', store: '', category: '', expiryDate: ''
            });
          }}
          title={editingDeal ? 'Edit Deal' : 'Add New Deal'}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Original Price</label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Discount Price</label>
                <input
                  type="number"
                  value={formData.discountPrice}
                  onChange={(e) => setFormData({...formData, discountPrice: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Store</label>
              <input
                type="text"
                value={formData.store}
                onChange={(e) => setFormData({...formData, store: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Deal URL</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {editingDeal ? 'Update Deal' : 'Create Deal'}
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default DealManagement;