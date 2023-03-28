// const express = require('express');
const app = require('./app');

const PORT = 8081;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
