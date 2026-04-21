# Tanishq Portfolio

A responsive single-file personal portfolio website with a Nodemailer-powered contact backend.

## Project Structure

- `portfolio.html` - Main portfolio page (styles and scripts included inline)
- `contact.js` - Express API for contact form email delivery via Nodemailer
- `.env` - Local Gmail mail configuration (not committed)
- `.env.example` - Environment variable template
- `1000081437.jpg` - Local image asset
- `1000081438.jpg` - Local image asset

## Contact Form Backend Setup

1. Install dependencies:
   - `npm install`
2. Configure environment variables in `.env`:
   - `EMAIL_USER` (your Gmail address)
   - `EMAIL_PASS` (your Gmail App Password)
   - `CONTACT_TO_EMAIL` (optional, defaults to `EMAIL_USER`)
3. Start the backend API:
   - `npm start`
4. Open `portfolio.html` in your browser.

The contact form posts to `http://localhost:3000/api/contact` when the Send Message button is clicked.

## API Endpoints

- `GET /api/health` - health check
- `POST /api/contact` - sends the contact message email

## Sections

- About
- Projects
- Skills
- Experience
- Contact

## License

Personal portfolio content. Reuse with permission.
