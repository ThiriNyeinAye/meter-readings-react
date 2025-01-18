# Meter Data Project (React)

## Getting Started

This project is a React-based front-end application for displaying and managing meter data. It includes features such as listing meters, searching and filtering data, pagination, and viewing detailed information for individual meters. Built using Vite and React, this project emphasizes modularity, responsiveness, and ease of use.

## Project Preview

<img
  style="width: 480px; height: 100%"
  src="https://i.ibb.co/RjS2BJ3/meter-project.gif"
  alt="Meta Project"
/>

## Technologies Used

- **Framework:** React

- **Build Tool:** Vite

- **Package Manager:** Yarn

- **Routing:** React Router

- **Styling:** Tailwind CSS

## Installation and Setup

1.  **Clone the Repository:**

```bash
git clone https://github.com/ThiriNyeinAye/meta-data-react.git
cd meta-data-react
```

2.  **Install Dependencies:**

```bash
yarn install
```

3.  **Start the Development Server:**

```bash
yarn dev
```

4.  **View the Application:**
    Open your browser and visit:

```
http://localhost:3000
```

### Build Process

1. Run `yarn build` or `npm run build` to create a production-ready build of your application.
2. The build output will be stored in the `dist` folder.

### Start Process

1. After building your application, you can start it using `yarn start` or `npm start`.
2. This will serve your application from the `dist` folder.

## **Folder Structure Explanation**

- `src`: This folder contains the source code of your application.
  - `App.tsx`: The main application component.
  - `components`: A folder containing reusable UI components.
  - `hooks`: A folder containing custom React hooks.
  - `lib`: A folder containing utility functions and libraries.
  - `pages`: A folder containing page-level components.
  - `stores`: A folder containing state management stores.
  - `styles`: A folder containing global CSS styles.
- `public`: This folder contains static assets that can be served directly by the web server.
- `vite.config.ts`: The configuration file for Vite.
- `tsconfig.node.json`: The configuration file for TypeScript.
- `tailwind.config.js`: The configuration file for Tailwind CSS.

## **Overview Dependencies Explanation**

- `react` and `react-dom`: The core React library and DOM bindings.
- `vite`: The build tool and development server.
- `typescript`: The type checking and compilation tool.
- `tailwindcss`: The utility-first CSS framework.
- `clsx`: A utility library for conditionally joining class names.
- `react-router-dom`: A library for client-side routing.
- `zustand`: A state management library.
- `react-hot-toast`: A library for displaying toast notifications.
- `lottie-react`: A library for displaying animations.
- `remixicon`: A library for icons.
