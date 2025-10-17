# drd2-online-diary

Online deník (Online Diary) - A secure and intuitive platform for recording daily thoughts, experiences, and reflections.

## Features

- ✅ User authentication (Login and Registration)
- ✅ Material Design 3 dark theme
- ✅ Fantasy-themed background
- ✅ Responsive design (desktop and mobile)
- ✅ Czech language interface
- ✅ Accessibility-compliant

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Framework**: Material-UI (MUI) v5
- **Styling**: Emotion (CSS-in-JS)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sparx2206/drd2-online-diary.git
cd drd2-online-diary
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Add the fantasy battle background image:
   - Download from: https://github.com/user-attachments/assets/6c199f4c-2bf6-4187-9f24-c5360f9533ed
   - Save as `frontend/public/fantasy-battle-bg.jpg`

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

### Building for Production

```bash
cd frontend
npm run build
npm run preview
```

## Project Structure

```
drd2-online-diary/
├── frontend/               # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   │   └── LoginPage.tsx
│   │   ├── theme.ts       # Material-UI theme configuration
│   │   ├── App.tsx        # Main application component
│   │   └── main.tsx       # Application entry point
│   └── package.json
├── PROJECT.md             # Project definition and roadmap
├── CONTRIBUTING.md        # Contribution guidelines
└── README.md             # This file
```

## Features in Detail

### Login and Registration

The application currently provides:
- Email and password-based authentication
- Two-tab interface for Login and Registration
- Form validation
- Responsive design for all screen sizes

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

This project is currently unlicensed. Please contact the repository owner for licensing information.

## Contact

For questions or discussions, please use GitHub issues or discussions.