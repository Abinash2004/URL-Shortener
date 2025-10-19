# URL Shortener API

A secure Node.js + Express + MongoDB API to generate and manage short URLs with authentication and visit tracking.

## Features
- Stateless JWT-based authentication
- Cookies for session management
- Generate short URLs from long URLs using nanoid
- Redirect to original URLs from the short ones
- Log visit history of shortened URLs with timestamps
- Authorization: only logged-in users can generate short URLs
- Built with Node.js, Express, MongoDB, Mongoose, JWT, and nanoid
