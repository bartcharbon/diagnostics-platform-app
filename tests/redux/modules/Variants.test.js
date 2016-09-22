import reducer, { defaultState } from 'redux/modules/variants';
import deepFreeze from 'deep-freeze';

describe('(Redux) variants', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(defaultState);
    });
  });
});
