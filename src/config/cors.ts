// CORS configuration for the server
const corsOptions = {
  methods: ['GET', 'POST'], // Currently no other methods are supported
  origin: [
    'http://localhost:3000',
    'https://samis-portfolio.onrender.com', 
    'https://samkharks.dev',
    'https://www.samkharks.dev'
  ]
};

export { corsOptions };