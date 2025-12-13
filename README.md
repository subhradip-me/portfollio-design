# 🎨 Professional Portfolio Website

A modern, full-stack portfolio website built with React, featuring seamless backend integration, SEO optimization, and responsive design.

## 🚀 Live Demo

- **Frontend**: [Your Portfolio URL]
- **Admin Panel**: [Your Portfolio URL]/admin

## ✨ Features

### 🎯 Frontend Features
- **Modern React 19** with Vite for lightning-fast development
- **Responsive Design** with Tailwind CSS 4
- **Smooth Animations** powered by GSAP and Lenis
- **SEO Optimized** with dynamic meta tags and automated sitemap generation
- **Component-based Architecture** for maintainability and scalability

### 🔐 Backend Integration
- **JWT Authentication** for secure admin access
- **RESTful API** integration with Axios
- **Error Handling** with retry mechanisms and user-friendly error boundaries
- **Token Management** with automatic refresh and secure storage

### 📊 SEO & Performance
- **Automated Sitemap Generation** (sitemap.xml & robots.txt)
- **Dynamic Meta Tags** with Open Graph and Twitter Cards (React 19 compatible)
- **Structured Data** for rich search engine snippets
- **Breadcrumb Navigation** for better UX and SEO
- **Performance Optimized** with code splitting and lazy loading

### 🛡️ Security & Quality
- **Error Boundaries** for graceful error handling
- **Type-safe Configuration** with centralized constants
- **Clean Code Architecture** with organized folder structure
- **ESLint Configuration** for code quality assurance

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **Vite** - Next-generation frontend build tool
- **Tailwind CSS 4** - Modern utility-first CSS framework
- **React Router** - Declarative routing for React
- **Native SEO** - Document head management using native DOM API

### Animation & UX
- **GSAP** - Professional-grade animation library
- **Lenis** - Smooth scroll library
- **Custom Cursor** - Interactive cursor component

### Backend Integration
- **Axios** - Promise-based HTTP client
- **JWT** - JSON Web Token authentication
- **React Context** - State management for auth

### SEO & Meta
- **Dynamic Sitemap** - Automated XML sitemap generation
- **Structured Data** - JSON-LD schema markup
- **Open Graph** - Social media optimization
- **Twitter Cards** - Twitter sharing optimization

## 📁 Project Structure

```
portfollio-design/
├── public/
│   ├── images/           # Static images and OG images
│   ├── sitemap.xml       # Generated XML sitemap
│   ├── robots.txt        # Generated robots.txt
│   └── vite.svg
├── scripts/
│   ├── generateSitemap.js # Automated sitemap generation
│   └── config.js         # Node.js specific configuration
├── src/
│   ├── components/       # Reusable React components
│   │   ├── About.jsx
│   │   ├── Admin.jsx
│   │   ├── Breadcrumbs.jsx
│   │   ├── Contact.jsx
│   │   ├── Cursor.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Loader.jsx
│   │   ├── LoginForm.jsx
│   │   ├── Projects.jsx
│   │   └── SEOMetaTags.jsx
│   ├── config/
│   │   └── sitemap.js    # SEO and sitemap configuration
│   ├── constants/
│   │   └── index.js      # Application constants
│   ├── context/
│   │   └── AuthContext.jsx # Authentication context
│   ├── hooks/
│   │   └── useApi.js     # Custom hooks for API calls
│   ├── pages/
│   │   └── AllWork.jsx   # Portfolio gallery page
│   ├── services/
│   │   └── api.js        # API service layer
│   ├── utils/
│   │   └── index.js      # Utility functions
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## 🚦 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfollio-design
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_APP_NAME=Your Portfolio
   VITE_SITE_URL=http://localhost:5174
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5174`

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run generate-sitemap` | Generate sitemap.xml and robots.txt |

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# App Configuration  
VITE_APP_NAME=Your Portfolio
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=development

# SEO Configuration
VITE_SITE_URL=http://localhost:5174
```

### Sitemap Configuration
Update your domain in `src/config/sitemap.js`:

```javascript
export const SITE_CONFIG = {
  baseUrl: 'https://your-actual-domain.com', // Update this
  // ... other config
};
```

### Personal Information
Update the following files with your information:
- `src/config/sitemap.js` - Name, social links, structured data
- `src/components/About.jsx` - About section content
- `src/components/Hero.jsx` - Hero section content
- `src/components/Projects.jsx` - Your projects

## 🔐 Authentication System

The portfolio includes a complete authentication system:

### Login Process
1. Navigate to `/login`
2. Enter credentials
3. JWT token stored securely
4. Access admin panel at `/admin`

### API Integration
```javascript
// Example API call with authentication
import { apiService } from './services/api';

const data = await apiService.get('/protected-route');
```

### Protected Routes
- `/admin` - Admin dashboard
- `/login` - Authentication page

## 📊 SEO Features

### Dynamic Meta Tags
Each page automatically gets optimized meta tags:
- Title and description
- Open Graph tags for social sharing
- Twitter Cards
- Canonical URLs
- Structured data (JSON-LD)

### Sitemap Generation
Run `npm run generate-sitemap` to create:
- `public/sitemap.xml` - XML sitemap for search engines
- `public/robots.txt` - Crawler directives

### Breadcrumbs
Automatic breadcrumb navigation for better UX and SEO.

## 🎨 Customization

### Styling
- **Colors**: Update `src/index.css` for color scheme
- **Animations**: Modify GSAP animations in components
- **Layout**: Responsive design with Tailwind classes

### Components
All components are modular and can be easily customized:
- `Hero.jsx` - Landing section
- `About.jsx` - About section
- `Projects.jsx` - Portfolio showcase
- `Contact.jsx` - Contact form

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
The project is configured for Vercel deployment with automatic sitemap generation.

1. **Connect to Vercel**
   - Connect your GitHub repository to Vercel
   - Automatic deployments on push to main branch

2. **Environment Variables** 
   Set the following in Vercel dashboard:
   ```env
   VITE_API_BASE_URL=https://your-api-domain.com/api
   VITE_APP_NAME=Your Portfolio
   VITE_SITE_URL=https://your-domain.com
   ```

3. **Domain Configuration**
   Update `src/config/sitemap.js` with your production domain before deployment.

### Deploy to Firebase (Alternative)
```bash
npm run build
firebase deploy
```

### Deploy to Netlify (Alternative)
```bash
npm run build
# Upload dist folder to Netlify or use GitHub integration
```

### Pre-deployment Checklist
- ✅ Update domain in sitemap configuration
- ✅ Set production environment variables  
- ✅ Test build locally: `npm run build`
- ✅ Verify all routes work: `npm run preview`
- ✅ Check sitemap generation: `npm run generate-sitemap`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed description
3. Include error messages and steps to reproduce

### Common Deployment Issues

**Build Fails with Peer Dependency Conflicts:**
- This project uses React 19 with native DOM manipulation for SEO instead of react-helmet-async
- All dependencies are compatible with React 19

**Sitemap Not Generated:**
```bash
npm run generate-sitemap
```

**Environment Variables Not Working:**
- Ensure all VITE_ prefixed variables are set
- Check Vercel/hosting platform environment settings

**Routes Not Working in Production (404 errors):**
- ✅ `vercel.json` configuration added for client-side routing
- ✅ `public/_redirects` fallback for other platforms
- ✅ Catch-all route in App.jsx for unmatched paths
- All routes (`/`, `/admin`, `/login`, `/all-projects`) should work in production

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite** for the incredible build tool
- **Tailwind CSS** for the utility-first CSS framework
- **GSAP** for powerful animations
- **Open Source Community** for inspiration and tools

---

## 📞 Contact

- **Portfolio**: [Your Portfolio URL]
- **Email**: [Your Email]
- **LinkedIn**: [Your LinkedIn]
- **GitHub**: [Your GitHub]

---

<div align="center">
  <strong>Built with ❤️ and modern web technologies</strong>
</div>
