# Project Xpress - Vercel Deployment Guide

## Prerequisites
1. Push your code to GitHub repository
2. Have a Vercel account (free tier works)
3. Set up environment variables

## Environment Variables Required
Add these to your Vercel project settings:

```
EMAIL_USER=projectxpress27@gmail.com
EMAIL_PASS=kclb ttzo mmua bhde
DATABASE_URL=your_neon_database_url
NODE_ENV=production
```

## Deployment Steps

### Option 1: Direct Vercel CLI Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

### Option 2: GitHub Integration
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Vercel will auto-deploy on commits

## Build Configuration
The project includes:
- `vercel.json` - Vercel deployment configuration
- `api/orders.ts` - Serverless API function for orders
- Build output in `dist/public` directory

## Post-Deployment
1. Update any hardcoded URLs in the frontend to point to your Vercel domain
2. Test the order submission functionality
3. Verify email notifications are working

## Domain Configuration
- Default: `your-project.vercel.app`
- Custom domain: Configure in Vercel dashboard

## File Structure for Deployment
```
/
├── api/                 # Serverless functions
│   └── orders.ts       # Order handling API
├── client/             # React frontend source
├── dist/public/        # Built frontend (auto-generated)
├── server/            # Original server code (for reference)
├── shared/            # Shared types and schemas
├── vercel.json        # Vercel configuration
└── package.json       # Dependencies and build scripts
```

## Troubleshooting
- If build fails, check that all imports are resolved
- Ensure environment variables are set in Vercel dashboard
- Check function logs in Vercel dashboard for API issues