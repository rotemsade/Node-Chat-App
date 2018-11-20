var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var generatedMessage = generateMessage('User', 'Test Message');

    expect(generatedMessage).toMatchObject({from: 'User',text: 'Test Message'});
    expect(typeof generatedMessage.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = "User";
    var latitude = 32.1435253;
    var longitude = 34.8420176;
    var url = 'https://www.google.com/maps?q=32.1435253,34.8420176';
    var generatedLocationMessage = generateLocationMessage(from, latitude, longitude);

    expect(generatedLocationMessage).toMatchObject({from,url});
    expect(typeof generatedLocationMessage.createdAt).toBe('number');
  });
});
