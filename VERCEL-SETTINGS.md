# Vercel Project Settings Guide

## 📋 Configuration Settings for Vercel Dashboard

When setting up your project in Vercel, use these exact settings:

### General Settings
- **Framework Preset**: Other (or Vite)
- **Root Directory**: `.` (leave empty/default)
- **Node.js Version**: 18.x (or latest LTS)

### Build & Development Settings
```
Build Command:
cd frontend && npm install && npm run build

Output Directory:
frontend/dist

Install Command:
npm install
```

### Environment Variables
Add these in: Settings → Environment Variables

| Key | Value | Environment |
|-----|-------|-------------|
| `GEMINI_API_KEY` | `your_actual_gemini_api_key` | Production, Preview, Development |

### Functions
- **Functions Region**: (Leave as default or choose closest to your users)
- **Serverless Function Size**: Default (1024 MB)

## 🔍 Important Notes

1. **MongoDB Connection**:
   - The MongoDB URI is hardcoded in `backend/main.py`
   - Alternatively, you can add `MONGODB_URI` as an environment variable
   - Make sure to whitelist `0.0.0.0/0` in MongoDB Atlas Network Access

2. **API Routes**:
   - All backend routes will be available at: `/api/*`
   - Example: `https://your-project.vercel.app/api/health`
   - Example: `https://your-project.vercel.app/api/properties`
   - Example: `https://your-project.vercel.app/api/chat`

3. **CORS Configuration**:
   - Already configured to accept `*.vercel.app` domains
   - Update specific domain in `backend/main.py` after first deployment

4. **Deployment Triggers**:
   - **Production**: Every push to `main` branch
   - **Preview**: Every pull request
   - **Manual**: Deploy via Vercel dashboard or CLI

## 🎯 Testing After Deployment

1. **Check API Health**:
   ```
   https://your-project.vercel.app/api/health
   ```
   Should return: `{"status": "healthy", "model": "gemini-2.0-flash-exp"}`

2. **Check Properties Endpoint**:
   ```
   https://your-project.vercel.app/api/properties
   ```
   Should return JSON with properties array

3. **Test Frontend**:
   - Visit: `https://your-project.vercel.app`
   - Verify chatbot loads
   - Check properties page
   - Test location filter
   - Try submitting host form

## 📊 Monitoring

After deployment, monitor:
- **Deployments**: Vercel Dashboard → Deployments
- **Function Logs**: Vercel Dashboard → Functions → View Logs
- **Analytics**: Vercel Dashboard → Analytics (if enabled)

## 🔄 Redeployment

If you need to redeploy:

**Via Git**:
```bash
git add .
git commit -m "Update message"
git push origin main
```

**Via CLI**:
```bash
vercel --prod
```

**Via Dashboard**:
- Go to Deployments
- Click "Redeploy"

## 🆘 Common Issues & Solutions

### Issue: "Build Command failed"
**Solution**: 
- Check that frontend dependencies are in `frontend/package.json`
- Verify build command is correct
- Check build logs for specific errors

### Issue: "API routes return 404"
**Solution**:
- Verify `vercel.json` routes configuration
- Check that `api/index.py` exists
- Ensure `api/requirements.txt` has all dependencies

### Issue: "Chatbot not responding"
**Solution**:
- Check `GEMINI_API_KEY` is set correctly
- View function logs in Vercel dashboard
- Verify API endpoint in browser console

### Issue: "Properties not loading"
**Solution**:
- Check MongoDB connection (whitelist IPs)
- Verify API endpoint returns data
- Check browser console for CORS errors

## 🎉 Success Indicators

Your deployment is successful if:
- ✅ Build completes without errors
- ✅ Site loads at your Vercel URL
- ✅ API health check returns 200
- ✅ Properties display correctly
- ✅ Chatbot responds to messages
- ✅ No console errors in browser

---

**Ready to deploy?** Follow DEPLOY-CHECKLIST.md step by step!
