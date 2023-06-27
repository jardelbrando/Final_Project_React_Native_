import server from './server.js';

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Server started on port ${port} 💪`);
});