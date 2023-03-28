const { Router } = require('express');

const employeeRoute = Router();

employeeRoute.get('/', (_req, res) => {
  res.status(200).json({ Hello: 'World' });
});

module.exports = employeeRoute;
