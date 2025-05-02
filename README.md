# Notes App Frontend

A modern, responsive notes application built with React and Vite. This frontend application provides a user-friendly interface for managing notes with features like authentication, note creation, editing, and deletion.

## Features

- **User Authentication**: Secure login and registration system
- **Note Management**: Create, read, update, and delete notes
- **Modern UI**: Built with Tailwind CSS for a clean and responsive design
- **Form Validation**: Implemented using Formik and Yup
- **API Integration**: Seamless communication with backend services using Axios
- **Routing**: Client-side routing with React Router
- **Responsive Design**: Works across all device sizes

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Form Handling**: Formik, React Hook Form, Yup
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **UI Components**: React Icons
- **Notifications**: SweetAlert2
- **Code Quality**: ESLint

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

- `src/`: Main source code directory
  - `pages/`: React components for different pages
  - `config/`: Configuration files
  - `assets/`: Static assets
  - `api.js`: API integration
  - `PrivateRoute.jsx`: Protected route component

## Development

- Uses ESLint for code linting
- Tailwind CSS for styling
- Hot Module Replacement (HMR) for fast development
