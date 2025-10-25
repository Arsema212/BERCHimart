// Admin Configuration - Keep this secure
export const ADMIN_CONFIG = {
  EMAIL: 'admin@gmail.com',
  PASSWORD: 'admin1234',
  ROLE: 'admin'
};

// Role-based redirect paths
export const ROLE_REDIRECTS = {
  admin: '/admin/dashboard',
  moderator: '/moderator/dashboard', 
  artisan: '/seller/dashboard',
  user: '/profile'
};
