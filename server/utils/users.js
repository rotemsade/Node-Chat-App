const _ = require('lodash');

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    return _.remove(this.users, (user) => user.id === id)[0];
  }
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var nameArray = users.map((user) => user.name);

    return nameArray;
  }
}

module.exports = {Users};
