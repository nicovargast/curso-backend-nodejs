require('dotenv').config();

const config = {
    dev: process.env.NONDE_ENV !== 'production',
    port: process.env.PORT || 3000
};

module.exports = { config };