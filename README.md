to start application

npm run dev

- Users enter a long URL in the input field and click "Shorten"
- The application generates a short ID using the shortid package
- The original URL and its short ID are stored in the MongoDB database
- When someone visits the short URL (e.g., http://localhost:5000/abc123 ), they are redirected to the original URL
