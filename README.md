# WCIE - Restaurant Discovery App

Find great restaurants near you instantly.

## Features

- **Location-based search** - Use your current location or enter an address
- **Real-time results** - Powered by Google Places API
- **Interactive map view** - See restaurants on a map with markers and info windows
- **Advanced filtering** - Filter by cuisine, price range, and rating
- **Search retention** - Your searches are saved for quick access
- **Responsive design** - Works beautifully on all devices

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + Shadcn UI
- React Router v6
- React Query
- Google Maps API
- Firebase Authentication (planned)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file with:
```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

## Recent Changes

See [CHANGELOG.md](./CHANGELOG.md) for detailed release notes.

### Latest Updates (2025-01-30)
- Rebranded to **WCIE** with MonstarX purple theme
- Redesigned landing page for conversion optimization
- Added search preferences and retention features
- Implemented prominent animated location button
- Added MonstarX branding and attribution

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts (Auth, Theme, SearchPreferences)
├── hooks/          # Custom React hooks
├── lib/            # Utilities and services
├── pages/          # Page components
└── types/          # TypeScript type definitions
```

## License

All rights reserved.

---

Built with MonstarX
