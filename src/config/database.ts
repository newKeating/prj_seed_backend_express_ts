require('dotenv').config()

export default {
  default: {
    host: process.env.DB_HOST || '127.0.0.1',
    db: process.env.DB_DATABASE || 'caredocplus_api',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    user: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    port: process.env.REDIS_PORT || 6379
  }
}
