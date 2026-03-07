# Design System: Les Rives Authentic River Experience Home

**Project ID:** 15089476824322554533

## 1. Visual Theme & Atmosphere

The overall atmosphere is "Airy, Professional, and Authentic." The design relies on high-contrast text to ensure readability with ample whitespace. It leans towards a structured, utilitarian layout suitable for a booking or tour management platform. Smooth transitions and hover states (like scaling items) give it a dynamic and responsive feel. The project natively supports both a Light and Dark mode, maintaining strong contrast in both states.

## 2. Color Palette & Roles

- **Vibrant Gold/Yellow (#f1c40f)**: Used for primary actions, buttons (e.g., "Book Now"), highlighted text, background badges, and primary hover states.
- **Off-White Background Light (#f8f9fa)**: Used for the primary app background in light mode.
- **Deep Charcoal Background Dark (#1a202c)**: Used as the dark mode foundation background.
- **Pure White Content Light (#ffffff)**: Used for cards, containers, navigation bars, and modals in light mode.
- **Muted Navy Content Dark (#2d3748)**: Used for cards and elevated containers in dark mode.
- **Dark Grey Text Main Light (#333333)**: Used for primary headers and main body text in light mode.
- **Soft Platinum Text Main Dark (#e2e8f0)**: Used for primary headers and main body text in dark mode.
- **Medium Grey Text Muted Light (#666666)**: Used for secondary text, metadata, descriptions, and breadcrumbs.
- **Cool Grey Text Muted Dark (#a0aec0)**: Used for secondary text and metadata in dark mode.
- **Solid Black Footer (#222222)**: Used exclusively for the dark footer area spanning all pages.

## 3. Typography Rules

- **Display Font (Headers)**: `Playfair Display` (serif). Used for large impactful headings (like hero sections and site branding), often rendered in `font-bold` and uppercase, with wide `tracking-wide` letter spacing to feel luxurious and premium.
- **Sans Font (Body)**: `Lato` (sans-serif). Used for main body text, navigation, and UI components. Characterized by high legibility in `font-light/font-normal`, usually kept in `text-sm` or `text-xs`.

## 4. Component Stylings

- **Buttons:** Subtly rounded corners (`rounded`, ~4px). Primary buttons use the vibrant gold background and contrast with dark text. They often include a hover transition (`hover:-translate-y-0.5`, `transition`, `transform`).
- **Cards/Containers:** Subtly rounded corners (`rounded`, ~4px) with a pure white background in light mode or muted navy in dark mode. They use `border border-gray-100` framing and whisper-soft diffused shadows (`shadow` or `shadow-sm`).
- **Inputs/Forms:** Accordions and inputs use simple stroke styling (`border-gray-200`) with high contrast text and subtle background fills (`bg-gray-50`) when in active states.
- **Images/Avatars:** Uses sharply rectangular/rounded wrappers for tour packages. It relies on `group-hover:scale-110` with generous transition duration for premium hover interaction. Profile pictures and pagination dots are perfectly round (`rounded-full`).

## 5. Layout Principles

- The layout favors maximum readability with a structured grid system (`grid-cols-1 md:grid-cols-3` or `md:grid-cols-4`).
- Uses a classic sticky sidebar (`sticky top-4`) alongside wide reading columns.
- Whitespace strategy uses generous vertical margins (`mb-12`) and internal padding (`p-6`, `p-8`) to visually separate blocks of content naturally without needing hard dividers everywhere.

---

## Existing Screens Inventory

- Saigon Night Food Tour Details: `003f31a2f0184433b5750983db47b797`
- Change Password Modal: `056e7d40273243aaa574fb93fd96d42b`
- Booking Step 1: Select Date and Guests: `1f1d95b7a90c4251bf1bf1050291a7ef`
- Booking Step 2: Payment and Checkout: `2a2f1b45c53049e393d1610f7017df54`
- Admin: Detailed Permissions Edit View: `373b9471e08b4f439c2aa7c3a9a280f0`
- Admin Dashboard: Manage Employee Directory: `37bfec8f1de44477b5c2438bf8665ea2`
- Reset Password Page: `3c3bf9a9f99048d58e691564b2e6d30d`
- User Dashboard: Manage My Bookings: `5b393a1830c04018a2eef586403a2042`
- Customer Sign Up Modal: `5f6c042556954c9eb591e37d201eba42`
- Admin: Permissions Update Success Flow: `68887757935b462ba61f831f28b4ec6a`
- Admin: Employee Directory with Navigation: `689ab07b7bd8439cae5900ef38ab92de`
- Admin Dashboard: Manage Tours Inventory: `7285f16b99cb43148221f7648b9e024a`
- Les Rives Authentic River Experience Home: `748ebfe0bde941f3b67e53ed73b6dfcc`
- Admin: Edit Tour Details Screen: `bb4585ff38744b98b0c15b8b2748f41e`
- Admin: Dynamic Employee Permissions Setting: `c5e547301a9d46f597d1afe536bc1344`
- Forgot Password Email Template: `c9c55662d62a4857a5e22664d1e9f2b5`
- About Us: Our Story and Values: `cc4ec58d24b54a89bd371c17acaa2008`
- Booking Step 3: Confirmation and Next Steps: `d8d9eeb5c7d04fd0a29271544d7df42b`
- Customer Login Modal: `de9b4fa0fa734cb6b12f60a5ea13c7aa`
