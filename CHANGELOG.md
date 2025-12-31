# Changelog

## [Unreleased] - 2025-01-30

### Changed
- **Rebranded** from "Where Can I Eat" to **WCIE** across all user-facing surfaces
- **Updated primary brand color** from green to **MonstarX purple** (HSL: 262 83% 58%)
- **Redesigned landing page** for minimalistic, conversion-optimized experience:
  - Simplified hero section with focused messaging
  - Removed distracting secondary sections
  - Increased whitespace and reduced visual noise
  - Centered layout with clear hierarchy

### Added
- **Prominent "Use my current location" button** with pulse-glow animation
- **MonstarX branding** in hero section (logo/attribution under primary CTA)
- **Search preferences context** (`SearchPreferencesContext`) for retention:
  - Saves last location and coordinates to localStorage
  - Maintains recent searches (up to 5)
  - Persists across sessions
- **Recent searches UI** on landing page as clickable badges
- **Search retention hooks** in Landing and Results pages
- Custom `pulse-glow` animation keyframe for location button
- Comprehensive changelog (this file)

### Updated
- `index.html` - Title and meta description for WCIE branding
- `src/index.css` - CSS variables for MonstarX purple theme
- `src/App.tsx` - Integrated SearchPreferencesProvider
- `src/components/Navbar.tsx` - Updated branding to WCIE
- `src/components/Footer.tsx` - Updated branding and attribution
- `src/pages/Auth.tsx` - Updated welcome messaging
- `src/pages/Landing.tsx` - Complete hero redesign with retention features
- `src/pages/Results.tsx` - Integrated search preferences saving

### Technical
- All color references now use semantic HSL tokens from design system
- localStorage-based persistence with error handling
- Context API pattern for cross-component state management
- Maintained existing routing, data flow, and map functionality
