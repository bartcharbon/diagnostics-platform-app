import reducer, { defaultState } from 'redux/modules/session'
import deepFreeze from 'deep-freeze'

describe('(Redux) session', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(defaultState)
    })
  })
})
