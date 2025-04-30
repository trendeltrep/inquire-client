# Inquire client-side (Next.js + Redux Toolkit + MUI + TailwindCSS)

### Assumptions & Notes

- The frontend is deployed to **Vercel**.
- The frontend is built using **Next.js with TypeScript**, using client-side routing and built-in pages.
- **Redux Toolkit** is used for global state management.
- **Material UI** is used as the primary component library, styled further with **TailwindCSS**.
- All API requests are routed through the `NEXT_PUBLIC_API_URL` environment variable for flexibility between environments.
- Input validation is handled using **React Hook Form** and **Yup**.

### Optional Enhancements Implemented

- **Search functionality** with live filtering by post title.
- **Pagination** that limits posts per page (5 by default) with navigation controls.

