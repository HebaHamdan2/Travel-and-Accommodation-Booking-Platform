# Overview 
TRAVEL is a full-featured hotel booking platform that allows users to explore hotels, browse trending destinations, view featured deals, search by city, check room details, manage a cart, complete bookings, and download PDF bills.
Administrators can manage cities, hotels, and rooms through an optimized dashboard featuring CRUD operations, pagination, validation, and search.

The entire application is fully responsive, supports dark/light themes, and is designed based on a custom Figma UI.

<p align="center">
  <img src="https://github.com/user-attachments/assets/365a1eab-3b03-427b-8de0-de2b02e1b3ed" alt="Logo" width="300"/>
</p>

# Live Links
- TRAVEL App Deployment: https://deploy-preview-1--travelandac.netlify.app/
- Chromatic Storybook: 
- My custom Figma Design: https://www.figma.com/design/SO9mx1Q65o9VQUQjaqPebw/Travel-and-Accommodation-Booking-Platform?node-id=0-1&t=tbGxMp7eVwIN8VvD-1

# Technology Stack
- **React (Vite + TypeScript)**: A modern, fast React setup with TypeScript support and optimized builds using Vite, used for: building a scalable, fully typed frontend architecture with fast development and efficient production builds.
- **Material UI (MUI)**: A professional React component library with built-in accessibility and theming, used for: creating a responsive UI, dark/light theme support, advanced dialogs, forms, tables, layout structure, and overall design consistency.
- **React Router DOM**:A routing solution for React applications, used for: page navigation, dynamic routing (hotel pages), role-based route protection, loaders, params, and custom error boundaries.
- **Redux Toolkit (RTK)**: A modern state management library for Redux with simplified configuration, used for: managing global state including authentication, cart, booking flow, search parameters, and shared UI states.
- **Redux Persist**: A Redux add-on for saving state to localStorage, used for: persisting authentication,booking and cart  items data across page reloads.
- **RTK Query**: A powerful data fetching and caching library built into Redux Toolkit, used for: Managing API requests (except login), automatic caching, refetching, and handling loading/error states.
- **Axios**: A lightweight HTTP client for handling network requests, used for: Handling login requests, sending user credentials, and working with authentication tokens.
- **Formik**: A React library for managing complex form state, used for: Building user/admin forms, handling form submission, managing field state, and integrating with reusable form components.
- **Yup**: A schema-based validation library, used for: Form validation for all dialogs and pages, preventing invalid inputs, and providing consistent error messages.
- **Leaflet + React-Leaflet**: A mapping library for interactive, lightweight maps, used for: Showing hotel locations with zoom, markers, and mobile-friendly maps.
- **yet-another-react-lightbox**: A modern image gallery and lightbox UI library, displaying hotel image galleries with high-quality animations, zoom, and keyboard navigation.
- **react-to-print**: A tool that allows exporting React components as printable PDFs, used for: Generating the user’s PDF booking bill directly from the UI.
- **Day.js**: A lightweight date-handling library, used for: Formatting and manipulating dates in booking details.
- **jwt-decode**: A small utility for decoding JWT tokens, used for: Extracting the user ID for “recently visited hotels” and checking token expiration inside a custom Redux Toolkit middleware using data stored in localStorage.
# Developer Tools
- **TypeScript**: Improving code reliability, reducing runtime bugs, and making components, reducers, and forms type-safe.
- **Storybook + Chromatic**: Documenting reusable components, reviewing UI behavior in isolation, and catching UI changes with Chromatic snapshots.
- **Jest + React Testing Library + MSW**: Testing form logic, UI interactions and dialogs.
- **Redux DevTools**: Tracking reducers, verifying persisted slices, and inspecting global state transitions.
- **Git + GitHub**: Managing code changes, branches and pull request.
- **Netlify**: A deployment and hosting platform for frontend apps, used for Hosting the **TRAVEL** project.
- **Swagger API Docs**: Interactive documentation for REST APIs, used for: Understanding backend endpoints provided by **Foothill** and ensuring correct request/response integration.
- **Figma (Custom UI Design)**: Designing the entire UI of the user UI with consistent components and flows.
- **Jira Board**: Visualizing tasks, organizing sprints, and tracking personal development progress.
- **Excalidraw**: Following the **Foothill-provided** complete flow diagram and mapping the app’s logic.
- **Prettier Extension**: for consistent code formatting.

# Features
The TRAVEL platform provides a complete hotel discovery and booking experience for users. It includes dynamic hotel listings, trending destinations, featured deals, advanced city-based search, and filtering by price, amenities, ratings, and availability. Users can explore detailed hotel pages featuring image galleries, reviews, available rooms, and an interactive location map. 
The booking journey is streamlined with a stepper-based checkout, user profile and payment input, cart management, and the ability to download a detailed PDF bill. The UI is fully responsive, supports dark and light themes, and is based on a custom Figma design.

On the administrative side, the platform offers a role-protected dashboard for managing cities, hotels, and rooms using CRUD operations, pagination, search, and form dialogs built with Formik and Yup. Globally, the application includes a custom 403 Unauthorized page, 404 Not Found page, and an offline fallback page for network disruptions

# Acknowledgments
Special thanks to Foothill Technology Solutions and my mentors for their continuous support, guidance, and the opportunity to grow as a Frontend Engineer.
