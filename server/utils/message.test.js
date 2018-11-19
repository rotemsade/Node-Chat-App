var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var generatedMessage = generateMessage('User', 'Test Message');

    expect(generatedMessage.from).toBe('User');
    expect(generatedMessage.text).toBe('Test Message');
    expect(typeof generatedMessage.createdAt).toBe('number');
  });
});
