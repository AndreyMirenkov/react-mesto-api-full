const corsOptions = {
  origin: [
    'http://project.mesto.nomoredomains.sbs',
    'https://project.mesto.nomoredomains.sbs',
    'http://api.mesto.andreym.nomoredomains.sbs',
    'https://api.mesto.andreym.nomoredomains.sbs',
    'http://localhost:3000',
  ],
  credentials: true,
};
module.exports = corsOptions;
