# Octomov

A retro Windows 98-inspired movie search app using the OMDb API, with serverless functions for pagination, details, and poster support.

## Live Demo

👉 [octomov.netlify.app](https://octomov.netlify.app/)

## Screenshots
![31180efc-aa8b-4d63-96df-05de65209c98](https://github.com/user-attachments/assets/6e05e1f0-b660-4df7-8bf9-25fced7aef14)

## Features

- Search for movies by title
- Paginated results with posters and short plots
- Responsive, retro UI (Win98 style)
- Movie details page with full plot, IMDB-style info, and clickable names (Google search)
- Serverless backend (Netlify Functions) for OMDb API proxying

## Tech Stack

- HTML, CSS, JavaScript (Vanilla)
- OMDb API
- Netlify Functions (Node.js)
- Deployed on Netlify

## Local Development

1. Clone the repo:

   ```sh
   git clone https://github.com/palaashatri/octomov.git
   cd octomov
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Run locally with Netlify CLI:

   ```sh
   npx netlify dev
   ```

   The app will be available at `http://localhost:8888`.

## Deployment

- The app is deployed at [octomov.netlify.app](https://octomov.netlify.app/)
- Static files are in `/public/`
- Serverless functions are in `/netlify/functions/`
- See `netlify.toml` for function routing

## License

MIT

---

> Not affiliated with IMDB or OMDb. For educational/demo use only.
