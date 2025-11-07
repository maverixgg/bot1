// API Configuration
// This will automatically use the correct API URL based on environment

const API_BASE_URL = import.meta.env.VITE_API_URL || 
                     (import.meta.env.MODE === 'production' 
                       ? '/api'  // In production, use relative /api path
                       : 'http://localhost:8000'); // In development, use local backend

export default API_BASE_URL;
