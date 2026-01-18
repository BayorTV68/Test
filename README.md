# 🚀 UYEH TECH - Interactive Project Roadmap

An interactive, modern web-based project roadmap showcasing the complete development journey for UYEH TECH's digital platform.

![Version](https://img.shields.io/badge/version-1.0-brightgreen)
![Status](https://img.shields.io/badge/current%20phase-Phase%209-blue)
![Progress](https://img.shields.io/badge/progress-56%25-yellow)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Project Phases](#project-phases)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Customization](#customization)
- [Technologies Used](#technologies-used)
- [Browser Support](#browser-support)
- [Contributing](#contributing)

## 🎯 Overview

The UYEH TECH Interactive Roadmap is a single-page web application that visualizes a 30-week project timeline divided into 16 phases across 3 major stages. It provides an intuitive interface for tracking progress, understanding project scope, and navigating through different development phases.

**Current Status:** Phase 9 - Dynamic Blog System (Week 11-13)

## ✨ Features

### Core Functionality
- **Interactive Phase Navigation** - Click any phase to jump directly to it
- **Real-time Progress Tracking** - Visual progress bar showing 56% completion
- **Dark/Light Theme Toggle** - Switch between themes with persistent storage
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Elegant scroll effects and transitions
- **Keyboard Shortcuts** - Navigate efficiently with keyboard commands

### Visual Features
- **Modern UI Design** - Clean, professional interface with #11ff88 accent color
- **Current Phase Indicator** - Highlighted current phase (Phase 9) with badge
- **Stage Organization** - Three distinct stages with color-coded sections
- **Card-Based Layout** - Easy-to-scan information cards
- **Scroll-to-Top Button** - Quick navigation back to the top

### Technical Features
- **No Dependencies** - Pure HTML, CSS, and vanilla JavaScript
- **Local Storage** - Remembers theme preference
- **Fixed Current Phase** - Phase 9 locked as current milestone
- **Console Statistics** - Developer-friendly progress tracking
- **Intersection Observer** - Efficient animation triggers

## 📁 Project Structure

```
uyeh-tech-roadmap/
├── Roadmap.html          # Main HTML file (complete standalone)
├── README.md             # This file
└── assets/               # (Optional) External resources
    └── documentation/
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required

### Installation

1. **Download the file**
   ```bash
   # Clone or download Roadmap.html
   ```

2. **Open in browser**
   - Simply double-click `Roadmap.html`
   - Or drag and drop into your browser
   - Or use a local server for development

3. **Optional: Deploy to hosting**
   ```bash
   # Can be hosted on any static hosting service:
   # - GitHub Pages
   # - Netlify
   # - Vercel
   # - AWS S3
   # - Any web server
   ```

## 📖 Usage Guide

### Navigation

**Phase Selection**
- Click any phase button in the "View Project Phases" section
- Phases are organized chronologically from 1-16
- Current phase (Phase 9) is highlighted in green

**Scrolling**
- Scroll naturally through the page
- Click the ↑ button (bottom-right) to return to top
- Use keyboard shortcuts for quick navigation

**Theme Switching**
- Click "Dark Mode/Light Mode" button in header
- Your preference is automatically saved
- Press `T` key for quick toggle

### Understanding the Layout

**Three Main Stages:**

1. **Stage One - Foundation & Structure** (Phases 1-8)
   - Weeks 1-10
   - Setup, design, and core pages

2. **Stage Two - Functional Integration** (Phases 9-11) ⭐ Current
   - Weeks 11-23
   - Dynamic features and marketplace

3. **Stage Three - Refinement & Launch** (Phases 12-16)
   - Weeks 24-30
   - Testing, optimization, and deployment

## 📊 Project Phases

### Stage One: Foundation & Structure
| Phase | Week | Focus |
|-------|------|-------|
| Phase 1 | 1-2 | Foundation Setup |
| Phase 2 | 2-3 | Home Page Development |
| Phase 3 | 3-4 | About Page Development |
| Phase 4 | 4-5 | Services Page |
| Phase 5 | 5-6 | Portfolio Section |
| Phase 6 | 6-7 | Contact Page |
| Phase 7 | 7-8 | Blog Foundation |
| Phase 8 | 8-10 | Design Unification |

### Stage Two: Functional Integration ⭐
| Phase | Week | Focus |
|-------|------|-------|
| **Phase 9** | **11-13** | **Dynamic Blog System** (Current) |
| Phase 10 | 14-20 | Code Marketplace |
| Phase 11 | 21-23 | Functional Enhancements |

### Stage Three: Refinement & Launch
| Phase | Week | Focus |
|-------|------|-------|
| Phase 12 | 24-25 | Content & UI Polish |
| Phase 13 | 25-26 | SEO & Performance |
| Phase 14 | 26-27 | Legal & Compliance |
| Phase 15 | 27-28 | Testing & QA |
| Phase 16 | 29-30 | Deployment & Launch |

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `T` | Toggle theme (Dark/Light) |
| `→` | Scroll to next phase |
| `←` | Scroll to previous phase |
| `C` | Scroll to current phase (Phase 9) |
| `Home` | Scroll to top of page |

## 🎨 Customization

### Changing the Current Phase

The current phase is locked at Phase 9. To change it:

1. Open `Roadmap.html` in a text editor
2. Find the constant: `const FIXED_CURRENT_PHASE = 9;`
3. Change the number to your desired phase (1-16)
4. Save and reload

### Modifying Colors

The primary accent color is `#11ff88`. To change it:

```css
:root {
    --primary: #11ff88;          /* Main accent color */
    --primary-dark: #0DD470;     /* Darker shade */
    --primary-light: #7BFFB3;    /* Lighter shade */
}
```

### Adding New Phases

To add phases beyond Phase 16:

1. Add to the `phases` array in JavaScript:
```javascript
{ id: 17, name: 'Phase 17', week: 'Week 31-32', stage: 3 }
```

2. Add corresponding HTML in the appropriate stage section

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with custom properties
  - Flexbox & Grid layouts
  - CSS animations and transitions
  - Media queries for responsiveness
- **Vanilla JavaScript** - No frameworks or libraries
  - Intersection Observer API
  - Local Storage API
  - Event listeners and DOM manipulation
- **Google Fonts** - Poppins & JetBrains Mono typefaces

## 🌐 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Opera | 76+ |

**Features requiring modern browser:**
- CSS Grid
- CSS Custom Properties
- Intersection Observer API
- Local Storage

## 📱 Responsive Breakpoints

- **Desktop:** 1200px and above
- **Tablet:** 768px - 1199px
- **Mobile:** 480px - 767px
- **Small Mobile:** Below 480px

## 🤝 Contributing

While this is a company-specific roadmap, suggestions for improvements are welcome:

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test across browsers
5. Submit a pull request

## 📄 License

Copyright © 2025 UYEH TECH. All rights reserved.

This roadmap is proprietary to UYEH TECH and intended for internal use and client presentation.

## 📞 Contact

**UYEH TECH**
- Website: [Coming Soon]
- Email: [Your Email]
- Location: [Your Location]

## 📝 Changelog

### Version 1.0 (December 5, 2025)
- Initial release
- 16 phases across 3 stages
- Dark/light theme support
- Interactive navigation
- Current phase locked at Phase 9
- Responsive design implementation
- Keyboard shortcuts added

## 🎯 Roadmap for the Roadmap

Future enhancements planned:
- [ ] Export to PDF functionality
- [ ] Print-friendly stylesheet
- [ ] Phase completion checkboxes
- [ ] Timeline view visualization
- [ ] Team member assignment
- [ ] Integration with project management tools

---

**Made with 💚 by UYEH TECH**

*Last Updated: December 5, 2025*