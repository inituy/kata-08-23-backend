require('./initialize_server.js')().then(function (server) {
  console.log('Listening on ...', process.env.PORT);
  try { require('fs').unlinkSync(process.env.PORT); } catch (e) { }
  server.listen(process.env.PORT);
});

