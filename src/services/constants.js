

export const BASE_URL =process.env.REACT_APP_API_URL;

export const apiEndpoints = {
  signup: '/api/auth/signup',
  login: '/api/auth/login',
  adminLogin: '/api/admin/login',
  forgotPassword: '/api/auth/forgot-password',
  resetPassword: '/api/auth/reset-password',
  adminPanel: '/api/admin/users',
  approveUser: '/api/admin/approve-user',
  pendingUsers: '/api/admin/pending-users',

  // add more if needed
};