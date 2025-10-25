import WordPressAPI from './api';

export const getSubscribers = async () => {
  return await WordPressAPI.get('/wp-json/lankadeals/v1/subscribers');
};

export const addSubscriber = async (email) => {
  return await WordPressAPI.post('/wp-json/lankadeals/v1/subscribe', {
    email: email
  });
};

export const deleteSubscriber = async (id) => {
  return await WordPressAPI.delete(`/wp-json/lankadeals/v1/subscribers/${id}`);
};

export const sendNewsletter = async (newsletterData) => {
  return await WordPressAPI.post('/wp-json/lankadeals/v1/newsletter/send', newsletterData);
};

export default {
  getSubscribers,
  addSubscriber,
  deleteSubscriber,
  sendNewsletter
};