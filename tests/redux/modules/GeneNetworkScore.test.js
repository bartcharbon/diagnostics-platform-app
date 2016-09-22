import reducer, { defaultState } from 'redux/modules/geneNetworkScore';
import deepFreeze from 'deep-freeze';

describe('(Redux) geneNetworkScore', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(defaultState);
    });
  });
});
