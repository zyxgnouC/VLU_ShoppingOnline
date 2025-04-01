require('../untils/MongooseUtil.js');
const Models = require('./Models.js');

const AdminDAO = {
  async selectByUsernameAndPassword(username, password) {
    const query = { username: username, password: password };
    const admin = await Models.Admin.findOne({username: username, password: password });
    return admin;
  }
};
module.exports = AdminDAO;