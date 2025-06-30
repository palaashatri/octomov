# Octomov

A retro Windows 98-inspired movie search app using the OMDb API, with serverless functions for pagination, details, and poster support.

## Live Demo

👉 [octomov.netlify.app](https://octomov.netlify.app/)

## Screenshots
![Main](https://github.com/user-attachments/assets/a398ab5d-dc1d-4afa-ba80-1510243c68d7)
![Results](https://github.com/user-attachments/assets/4782a148-fb63-43a0-867d-a310c6d91bfe)
![Details](https://github.com/user-attachments/assets/7f6814b7-c33b-44fa-a988-ee6c2809bc29)



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
