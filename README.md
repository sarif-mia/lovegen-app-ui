# LOVEGEN App UI

A mobile-first web application UI for LOVEGEN, featuring a home page with image slider, categories, and filters.

## Features

- Responsive mobile design
- Image slider with swipe and click navigation
- Category and filter pages
- Clean, modern UI with glassmorphism effects

## Project Structure

- `index.html` - Home page
- `pages/` - Additional pages (categories, filters)
- `css/` - Stylesheets
- `js/` - JavaScript files
- `Dockerfile` - Docker configuration

## Running Locally

### Using Docker

1. Build the image: `docker build -t lovegen-app .`
2. Run the container: `docker run -d -p 8080:80 lovegen-app`
3. Open http://localhost:8080

### Directly

Open `index.html` in a web browser.

## Deployment

- **Netlify**: Connect the GitHub repo to Netlify for automatic deployment.
- **Docker**: Use the provided Dockerfile for containerized deployment.

## Technologies

- HTML5
- CSS3
- JavaScript (ES6)
- Docker
