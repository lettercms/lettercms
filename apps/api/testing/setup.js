module.exports = (app, server) => {
  const handle = app.getRequestHandler();

  server.all('*', (req, res) => handle(req, res));

  return server;
}
