# Nexaur - Real Estate Fractional Investment Platform

## 🚀 Deploying to Vercel

### Prerequisites
1. A [Vercel account](https://vercel.com/signup)
2. [Vercel CLI](https://vercel.com/docs/cli) installed (optional but recommended)
3. Your Gemini API key
4. MongoDB Atlas connection string

### Step-by-Step Deployment Guide

#### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Configure Environment Variables**
   In the Vercel project settings, add these environment variables:
   
   - `GEMINI_API_KEY` = Your Gemini API key
   - `MONGODB_URI` = Your MongoDB connection string (optional if hardcoded)

4. **Deploy Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at `https://your-project.vercel.app`

#### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**
   ```bash
   cd "F:\Web Dev\bot1"
   vercel
   ```

4. **Follow the prompts**
   - Link to existing project or create new one
   - Set project settings
   - Add environment variables when prompted

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

### 🔧 Post-Deployment Configuration

#### Update API URLs
After deployment, update your frontend API calls to use the Vercel URL:

In your frontend files, replace `http://localhost:8000` with:
- Development: `http://localhost:8000`
- Production: `https://your-project.vercel.app/api`

You can create a `.env` file in frontend:
```bash
VITE_API_URL=https://your-project.vercel.app/api
```

Then update axios calls to use:
```javascript
axios.get(`${import.meta.env.VITE_API_URL}/properties`)
```

#### Update CORS Origins
The backend CORS is already configured to accept:
- `http://localhost:5173` (local development)
- `https://*.vercel.app` (all Vercel deployments)

Make sure to update the specific domain in `backend/main.py` after deployment.

### 📝 Environment Variables Needed

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |
| `MONGODB_URI` | MongoDB connection string | Optional (if hardcoded) |

### 🔍 Troubleshooting

**Issue: API routes not working**
- Check that API routes use `/api/` prefix
- Verify `vercel.json` routing configuration
- Check Vercel function logs in dashboard

**Issue: Environment variables not loaded**
- Ensure variables are set in Vercel dashboard
- Redeploy after adding new variables
- Check variable names match exactly

**Issue: Build fails**
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Check build logs in Vercel dashboard

**Issue: MongoDB connection fails**
- Whitelist Vercel's IP addresses in MongoDB Atlas (or use 0.0.0.0/0)
- Verify connection string is correct
- Check MongoDB Atlas is accessible

### 📱 Testing Your Deployment

1. Visit your Vercel URL
2. Test the chatbot functionality
3. Verify property listings load
4. Check location filter works
5. Test all navigation links

### 🔄 Continuous Deployment

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request gets a preview URL

### 📊 Monitoring

- **Analytics**: Enable in Vercel dashboard
- **Function Logs**: View API logs in Vercel dashboard
- **Performance**: Check Web Vitals in Vercel

### 🎉 Your Site is Live!

Once deployed, your site will be available at:
```
https://your-project-name.vercel.app
```

You can also add a custom domain in Vercel settings!

---

## 🛠️ Local Development

To run locally after deployment:

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## 📚 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: FastAPI + Python
- **Database**: MongoDB Atlas
- **AI**: Google Gemini AI
- **Deployment**: Vercel

---

Made with ❤️ for Nexaur
