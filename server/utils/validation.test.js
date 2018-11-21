const expect = require('expect');

var {isRealString} = require('./validation')

describe('isRealString', () => {
  it('should reject non-string values', () => {
    expect(isRealString(12336)).toBe(false);
    expect(isRealString({})).toBe(false);
    expect(isRealString(true)).toBe(false);
  });

  it('should reject string with only spaces', () => {
    expect(isRealString('    ')).toBe(false);
  });

  it('should allow string with non space characters', () => {
    expect(isRealString(' f   ')).toBe(true);
    expect(isRealString(' string is OK   ')).toBe(true);
    expect(isRealString('123+456')).toBe(true);
  });
});
