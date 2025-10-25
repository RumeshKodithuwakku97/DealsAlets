import WordPressAPI from './api';

export const getAnalytics = async () => {
  return await WordPressAPI.get('/wp-json/lankadeals/v1/analytics');
};

export const getDealStats = async () => {
  return await WordPressAPI.get('/wp-json/lankadeals/v1/analytics/deals');
};

export default {
  getAnalytics,
  getDealStats
};