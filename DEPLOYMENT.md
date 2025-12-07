# Deployment Guide - TruEstate Sales Management System

## Local Deployment

### Prerequisites
- Node.js v16 or higher
- npm

### Step 1: Install Dependencies

```bash
cd backend
npm install
npm audit fix --force  # Fix vulnerabilities

cd ../frontend
npm install
npm audit fix --force  # Fix vulnerabilities
```

### Step 2: Start the Backend

```bash
cd backend
npm start
```

Expected output:
```
Server running on port 5000
```

The backend API will be accessible at `http://localhost:5000/api`

### Step 3: Start the Frontend (in a new terminal)

```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v4.3.9 ready in [time] ms

➜ Local: http://localhost:3000/
➜ press h to show help
```

### Step 4: Access the Application

Open your browser and navigate to `http://localhost:3000`

## Production Deployment

### Backend Deployment (Docker)

Create `backend/Dockerfile`:
```dockerfile
FROM node:16-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production && npm audit fix --force

# Copy application
COPY src ./src

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "src/index.js"]
```

Build and run:
```bash
docker build -t truestate-backend .
docker run -p 5000:5000 -e PORT=5000 truestate-backend
```

### Frontend Deployment (Docker)

Create `frontend/Dockerfile`:
```dockerfile
# Build stage
FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install && npm audit fix --force

COPY . .
RUN npm run build

# Runtime stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

Create `frontend/nginx.conf`:
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
    location /api/ {
        proxy_pass http://backend:5000;
    }
}
```

Build and run:
```bash
docker build -t truestate-frontend .
docker run -p 3000:80 truestate-frontend
```

### Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - NODE_ENV=production

  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://localhost:5000

networks:
  default:
    name: truestate-network
```

Deploy:
```bash
docker-compose up
```

## Cloud Deployment

### Heroku

#### Backend Deployment

1. Create `backend/Procfile`:
```
web: node src/index.js
```

2. Deploy:
```bash
cd backend
heroku create truestate-backend
heroku config:set PORT=5000
git push heroku main
```

#### Frontend Deployment

1. Create `frontend/Procfile`:
```
web: npm start
```

2. Deploy:
```bash
cd frontend
heroku create truestate-frontend
git push heroku main
```

### AWS Elastic Beanstalk

#### Backend

```bash
# Install EB CLI
pip install awsebcli

# Initialize
cd backend
eb init -p "Node.js 16 running on 64bit Amazon Linux 2"

# Create environment
eb create truestate-backend-env

# Deploy
eb deploy
```

#### Frontend

```bash
# Build
cd frontend
npm run build

# Deploy to S3/CloudFront
aws s3 sync dist/ s3://truestate-frontend/
```

### Vercel (Recommended for Frontend)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Render (For Full Stack)

1. Create `render.yaml`:
```yaml
services:
  - type: web
    name: truestate-backend
    runtime: node
    buildCommand: npm install
    startCommand: node src/index.js
    envVars:
      - key: PORT
        value: 10000

  - type: web
    name: truestate-frontend
    runtime: node
    buildCommand: npm install && npm run build
    staticSite: true
    publishPath: dist
```

2. Connect GitHub and deploy

## Environment Configuration

### Backend (.env)
```
PORT=5000
NODE_ENV=production
```

### Frontend (vite.config.js)
```javascript
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```

## Monitoring & Logging

### Backend Logging
```javascript
// Add to backend/src/index.js
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

### Error Tracking
- Consider using Sentry for error tracking
- Use LogRocket for frontend monitoring
- Implement health checks

## Scaling Strategies

### Horizontal Scaling
1. Multiple backend instances behind load balancer (nginx, HAProxy)
2. Frontend served from CDN
3. Database replication

### Vertical Scaling
1. Upgrade server resources
2. Optimize database queries
3. Implement caching (Redis)

## Backup & Disaster Recovery

1. Regular database backups
2. Version control for code
3. Infrastructure as Code (IaC)
4. Disaster recovery plan documentation

## Performance Optimization

### Backend
- Add caching headers
- Compress responses (gzip)
- Database indexing
- Query optimization

### Frontend
- Lazy load components
- Code splitting
- Image optimization
- CDN delivery

## SSL/TLS Configuration

### Self-Signed Certificate (Development)
```bash
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365
```

### Let's Encrypt (Production)
Use Certbot for free SSL certificates:
```bash
certbot certonly --standalone -d yourdomain.com
```

## Security Checklist

- [ ] HTTPS enabled in production
- [ ] Environment variables secured
- [ ] Input validation implemented
- [ ] CORS properly configured
- [ ] Dependencies updated
- [ ] Security headers configured
- [ ] Rate limiting implemented
- [ ] Authentication considered
- [ ] Secrets management configured
- [ ] Monitoring enabled

## Maintenance

### Regular Tasks
- Update dependencies: `npm audit fix`
- Monitor server logs
- Check application performance
- Backup data
- Security updates

### Troubleshooting
- Check logs for errors
- Monitor resource usage
- Verify API endpoints
- Test database connectivity
- Review performance metrics
