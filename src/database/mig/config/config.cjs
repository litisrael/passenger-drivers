
const dotenv = require('dotenv');
dotenv.config();



module.exports = {
  "development": {
    "username": process.env.db_user,
    "password": process.env.db_password_local,
    "database": "transoprt",
    "host": process.env.db_localhost,
    "dialect": process.env.db_dialect
  }

}
// module.exports = config;
// export default config;
  // "test": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_test",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // },
  // "production": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_production",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // }

