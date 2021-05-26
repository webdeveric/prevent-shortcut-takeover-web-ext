import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('should capitalize a string', () => {
    expect(capitalize('test')).toEqual('Test');
    expect(capitalize('Test')).toEqual('Test');
    expect(capitalize('TEST')).toEqual('TEST');
  });
});
