# AgencEco - Web Agency Project

## Project Overview
AgencEco is a web agency project designed to promote eco-friendly digital solutions. The project includes a responsive multi-page website (HTML/CSS/JS) and a Node.js backend for dynamic content management. The frontend is fully responsive and optimized for mobile and desktop, with a focus on accessibility and modern design.

## Technical Choices
- **Frontend:**
  - HTML5 semantic structure for accessibility and SEO
  - CSS3 with custom media queries for responsive design
  - JavaScript (vanilla) for interactivity (menu, slider, dynamic news)
  - Google Fonts (Poppins) and Font Awesome for icons
- **Backend:**
  - Node.js with Express (see `AgencEcoBackend/`)
  - RESTful API for news and contact forms
  - Data persistence (can be extended with MongoDB or SQLite)
- **Version Control:**
  - Git for source management
  - GitHub for remote repository and collaboration

## Installation Procedure

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (Node Package Manager)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Damien-05/projet-formation.git
cd projet-formation
```

### 2. Install Backend Dependencies
```bash
cd AgencEcoBackend
npm install
```

### 3. (Optional) Configure Environment Variables
Create a `.env` file in `AgencEcoBackend/` for sensitive data (e.g., database URI, API keys).

### 4. Launch the Backend Server
```bash
node app.js
```
The backend will run by default on `http://localhost:3000` (configurable in `app.js`).

### 5. Serve the Frontend
You can use any static server or open the HTML files directly in your browser. For local development:
```bash
# From the project root
yarn global add serve # or npm install -g serve
serve html
```
Or use the Live Server extension in VS Code for hot-reload.

## Secure Hosting Recommendations
- **Frontend:**
  - Host static files (HTML/CSS/JS/images) on a secure HTTPS server (e.g., Netlify, Vercel, GitHub Pages, or your own Nginx/Apache server with SSL).
- **Backend:**
  - Deploy Node.js backend on a secure platform (Heroku, Render, DigitalOcean, AWS EC2, etc.)
  - Always use HTTPS (SSL/TLS) for API endpoints
  - Store secrets (API keys, DB credentials) in environment variables, never in code
  - Use CORS policies to restrict API access
  - Keep dependencies up to date and monitor for vulnerabilities

## Project Structure
```
g:\formation projet AgencEco\
│
├── AgencEcoBackend/         # Node.js backend (Express)
│   ├── app.js
│   ├── package.json
│   └── ...
├── css/                    # Main CSS files
├── html/                   # All HTML pages
├── images/                 # Images and assets
├── js/                     # JavaScript files
└── README-EN.md            # This file
```

## Contact & Contribution
- For issues or feature requests, open a GitHub issue.
- Contributions are welcome via pull requests.

---
© 2021-2025 AgencEco. All rights reserved.
