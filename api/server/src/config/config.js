require("dotenv").config();

module.exports = {
  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    database: "1clicknew",
    username: "postgres",
    password: "ileana2020",
    host: "192.168.0.250",
    dialect: "postgres",
  },

  test: {
    database: "1clicknew",
    username: "postgres",
    password: "ileana2020",
    host: "192.168.0.250",
    dialect: "postgres",
  },

  production: {
    database: "1clicknew",
    username: "postgres",
    password: "ileana2020",
    host: "192.168.0.250",
    dialect: "postgres",
  },
};
