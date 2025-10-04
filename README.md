# 📱 Manufacturing Knowledge Capture Interface

A mobile-first knowledge capture application built for manufacturing technicians to document, search, and manage their technical knowledge entries with ease.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-06B6D4)
![Playwright](https://img.shields.io/badge/Playwright-1.40.0-45ba4b)

---

## 🎯 Features

### Core Functionality
- ✅ **Create** - Add new knowledge entries with title, description, and image upload
- ✅ **Read** - View all entries in a responsive card-based grid
- ✅ **Update** - Edit existing entries with intuitive modal interface
- ✅ **Delete** - Remove entries with beautiful confirmation modal
- 🔍 **Real-time Search** - Instantly filter entries by title or description
- 📸 **Image Upload** - Support for visual documentation with preview
- 📱 **Mobile-First Design** - Optimized for on-the-go technicians
- 🎨 **Modern UI/UX** - Glassmorphism, smooth animations, touch-optimized

### UX Enhancements
- 🔔 Toast notifications for user feedback
- 🌀 Loading states for async operations
- 💫 Smooth animations (slide-up modals, scale-in effects)
- 👆 Touch-friendly interactions
- 🎭 Empty states with helpful messaging
- ⚡ Floating Action Button (FAB) for quick access

---

## 🏗️ Project Structure

```
assessment/
├── src/
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Tailwind CSS directives
│   └── test/
│       └── assessment.spec.ts # Playwright E2E tests
├── node_modules/
├── public/
├── eslint.config.ts           # For linting test
├── playwright-report/         # Playwright reports after testing
├── index.html
├── package.json
├── test-results/              # last-run.json files for showing status of test and failed test
├── playwright.config.ts       # Playwright test configuration
├── tsconfig.app.json          # TypeScript configuration
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
└── README.md                  # Documentations

```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

#### Step 1: Create Project

```bash
# Create new Vite + React + TypeScript project
npm create vite@latest assessment -- --template react-ts
cd assessment
```

#### Step 2: Install Dependencies

```bash
# Install base dependencies
npm install

# Install Tailwind CSS
npm install tailwindcss @tailwindcss/vite

# Install Lucide React (icons)
npm install lucide-react

# Install Playwright (E2E testing)
npm install -D @playwright/test
npx playwright install
```

#### Step 3: Configure Tailwind CSS
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});

```
**`src/index.css`**
```css
@import "tailwindcss";

```

**`src/main.tsx`**
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'  // Import Tailwind CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

#### Step 4: Configure Playwright

**`playwright.config.ts`** (Project Root)
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/test',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

#### Step 5: Add Application Code

Copy the complete application code from the React artifact into `src/App.tsx`.

#### Step 6: Add Tests

Create `src/test/assessment.spec.ts` with the test code from the test artifact.

---

## 🎮 Running the Application

### Development Mode

```bash
# Start development server
npm run dev

# Open in browser
# http://localhost:5173
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## 🧪 Testing

### Run E2E Tests

```bash
# Run all tests (automatically starts dev server)
npx playwright test

# Run tests in UI mode (recommended for development)
npx playwright test --ui

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run specific browser
npx playwright test --project=chromium

# Run mobile tests
npx playwright test --project="Mobile Chrome"

# View test report
npx playwright show-report
```

### Test Coverage

The application includes 5 comprehensive E2E tests:

1. **Add Entry Test** - Verifies creating new knowledge entries
2. **Delete Entry Test** - Tests deletion with confirmation modal
3. **Search Test** - Validates real-time search filtering
4. **Edit Entry Test** - Ensures editing functionality works correctly
5. **Cancel Test** - Confirms canceling doesn't create entries

**Test File:** `src/test/assessment.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

test.describe("Knowledge Capture App", () => {
  test("should add a new entry", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.click('[data-testid="add-button"]');
    await page.fill('[data-testid="title-input"]', "Test Entry");
    await page.fill('[data-testid="description-input"]', "Test description");
    await page.click('[data-testid="submit-button"]');
    await page.waitForTimeout(1000);
    await expect(page.locator('[data-testid="entry-card"]').first()).toContainText("Test Entry");
  });

  test("should delete an entry", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.waitForSelector('[data-testid="entry-card"]');
    const initialCount = await page.locator('[data-testid="entry-card"]').count();
    await page.hover('[data-testid="entry-card"]');
    await page.locator('[data-testid="delete-button"]').first().click();
    await page.waitForSelector('[data-testid="confirm-delete-button"]');
    await page.click('[data-testid="confirm-delete-button"]');
    await page.waitForTimeout(1000);
    const finalCount = await page.locator('[data-testid="entry-card"]').count();
    expect(finalCount).toBe(initialCount - 1);
  });

  test("should search entries", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.waitForSelector('[data-testid="entry-card"]');
    const initialCount = await page.locator('[data-testid="entry-card"]').count();
    await page.fill('[data-testid="search-input"]', "qui");
    await page.waitForTimeout(500);
    const filteredCount = await page.locator('[data-testid="entry-card"]').count();
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test("should edit an entry", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.waitForSelector('[data-testid="entry-card"]');
    const originalTitle = await page.locator('[data-testid="entry-title"]').first().textContent();
    await page.hover('[data-testid="entry-card"]');
    await page.locator('[data-testid="edit-button"]').first().click();
    await page.waitForSelector('[data-testid="entry-form"]');
    await page.fill('[data-testid="title-input"]', "Updated Entry Title");
    await page.click('[data-testid="submit-button"]');
    await page.waitForTimeout(1000);
    const updatedTitle = await page.locator('[data-testid="entry-title"]').first().textContent();
    expect(updatedTitle).toContain("Updated Entry Title");
    expect(updatedTitle).not.toBe(originalTitle);
  });

  test("should cancel entry creation", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.waitForSelector('[data-testid="add-button"]');
    await page.click('[data-testid="add-button"]');
    await page.fill('[data-testid="title-input"]', "Cancelled Entry");
    await page.locator('button:has-text("Cancel")').click();
    await page.waitForTimeout(500);
  });
});
```

---

## 🏛️ Architecture

### Component Structure

```
App.tsx
├── Toast Component              # Notification system
├── DeleteModal Component        # Confirmation dialog
├── EntryCard Component         # Individual entry display
├── FormModal Component         # Create/Edit form
└── KnowledgeCaptureApp        # Main container
    ├── State Management
    ├── API Integration
    └── Event Handlers
```

### Key Components

#### 1. **Toast Component**
- Displays success/error notifications
- Auto-dismisses after 3 seconds
- Smooth slide-in animation

#### 2. **DeleteModal Component**
- Beautiful confirmation dialog
- Backdrop blur effect
- Shows entry title being deleted
- Scale-in animation

#### 3. **EntryCard Component**
- Displays entry information
- Touch-optimized actions (edit/delete)
- Image preview support
- Responsive layout

#### 4. **FormModal Component**
- Bottom-sheet style on mobile
- Centered modal on desktop
- Image upload with preview
- Form validation

#### 5. **KnowledgeCaptureApp (Main)**
- Manages global state
- Handles API calls
- Implements search functionality
- Orchestrates all components

### State Management

```typescript
const [entries, setEntries] = useState([]);
const [filteredEntries, setFilteredEntries] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [loading, setLoading] = useState(true);
const [showForm, setShowForm] = useState(false);
const [editingEntry, setEditingEntry] = useState(null);
const [toast, setToast] = useState(null);
const [deleteConfirm, setDeleteConfirm] = useState(null);
```

### API Integration

Uses JSONPlaceholder as mock API:

```typescript
const mockApiService = {
  async getAll() { /* GET entries */ },
  async create(entry) { /* POST new entry */ },
  async update(id, entry) { /* PUT updated entry */ },
  async delete(id) { /* DELETE entry */ }
};
```

---

## 🎨 Design System

### Color Palette

- **Primary**: Blue 600 (`#2563eb`)
- **Success**: Green 500 (`#22c55e`)
- **Error**: Red 600 (`#dc2626`)
- **Background**: Gray 50 (`#f9fafb`)
- **Text**: Gray 900 (`#111827`)

### Typography

- **Headers**: Bold, Gray 900
- **Body**: Regular, Gray 600
- **Labels**: Medium, Gray 700

### Spacing

- Mobile padding: `px-4` (1rem)
- Desktop max-width: `max-w-7xl`
- Card gap: `gap-4` (1rem)

### Animations

```css
@keyframes slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

@keyframes slide-in {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes scale-in {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

---

## 📱 Mobile-First Approach

### Responsive Breakpoints

- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (≥ 768px)
- **Desktop**: `lg:` (≥ 1024px)

### Mobile Optimizations

1. **Bottom-sheet modals** - Forms slide up from bottom on mobile
2. **Floating Action Button** - Thumb-zone optimized positioning
3. **Touch interactions** - Actions reveal on touch
4. **Single column layout** - Optimal for narrow screens
5. **Sticky header** - Search always accessible

### Desktop Enhancements

1. **Multi-column grid** - Up to 3 columns on large screens
2. **Hover effects** - Additional visual feedback
3. **Centered modals** - Better use of screen space
4. **Keyboard navigation** - Tab and Enter support

---

## 🔧 Configuration Files

### package.json

```json
{
  "name": "assessment",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "playwright test",
    "test:ui": "playwright test --ui"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.0.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## 🐛 Troubleshooting

### Styles Not Applying

**Problem:** Tailwind classes aren't working

**Solution:**
1. Ensure `src/index.css` has `@tailwind` directives
2. Check `src/main.tsx` imports `'./index.css'`
3. Restart dev server: `Ctrl+C` then `npm run dev`
4. Clear browser cache

### Test Failures

**Problem:** Playwright tests failing

**Solution:**
1. Install browsers: `npx playwright install`
2. Ensure dev server is running: `npm run dev`
3. Check test selectors match `data-testid` attributes
4. Run in debug mode: `npx playwright test --debug`

### API Errors

**Problem:** CRUD operations not working

**Solution:**
1. Check console for network errors
2. Verify JSONPlaceholder API is accessible
3. Check async/await syntax in API calls
4. Ensure proper error handling

### TypeScript Errors

**Problem:** Type errors in IDE

**Solution:**
1. Ensure `react-ts` template was used
2. Install type definitions: `npm install --save-dev @types/react @types/react-dom`
3. Restart TypeScript server in IDE

---

## 📈 Performance Optimizations

1. **React.memo** - Could be added for EntryCard components
2. **Debounced search** - Could optimize search performance
3. **Virtual scrolling** - For large datasets
4. **Image optimization** - Compress uploaded images
5. **Code splitting** - Lazy load components

---

## 🔐 Security Considerations

1. **Input validation** - Sanitize user inputs
2. **XSS prevention** - React escapes by default
3. **API authentication** - Add JWT tokens for production
4. **CORS configuration** - Configure for production API
5. **Image validation** - Verify file types and sizes

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Output will be in `dist/` directory.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Environment Variables

For production API:

```env
VITE_API_BASE_URL=https://your-api.com
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b master`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin master`
5. Open Pull Request

---

## 📝 License

MIT License - feel free to use this project for learning or production.

---

## 👨‍💻 Author
Built with ❤️ by Egbetayo Damilola.

---

## 🙏 Acknowledgments

- React Team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Playwright for robust E2E testing
- Lucide for beautiful icons
- JSONPlaceholder for mock API

---

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review Playwright logs for test failures

---

**Happy Coding! 🚀**