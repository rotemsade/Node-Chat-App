const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Yoav',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Noa',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Romi',
      room: 'Node Course'
    }];
  })


  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Rotem',
      room: 'The Office Fans'
    };

    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var removed = users.removeUser('1');
    expect(removed.name).toBe('Yoav');
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var removed = users.removeUser('143');
    expect(removed).toBe(undefined);
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    var user = users.getUser('3');
    expect(user.name).toBe('Romi');
    expect(users.users.length).toBe(3);
  });

  it('should not find a user', () => {
    var user = users.getUser('22');
    expect(user).toBe(undefined);
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Yoav', 'Romi']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Noa']);
  });

});
