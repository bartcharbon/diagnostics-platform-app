import reducer, { defaultState, showAlert, hideAlert } from 'redux/modules/Alerts';
import deepFreeze from 'deep-freeze';

describe('(Redux) alert', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      deepFreeze(defaultState)
      expect(reducer(undefined, {})).to.eql(defaultState);
    })

    it('adds an alert to the end of the list', () => {
      const state = [
        {style: 'warning', title: 'Pas op!', message: 'Er is iets misgegaan...'}
      ]
      deepFreeze(state)
      expect(reducer(state, showAlert('info', 'Valt wel mee', 'Niets meer aan doen.'))).to.eql(
        [
          {style: 'warning', title: 'Pas op!', message: 'Er is iets misgegaan...'},
          {style: 'info', title: 'Valt wel mee', message: 'Niets meer aan doen.'}
        ]
      )
    })

    it('removes an alert with index', () => {
      const state = [
        {style: 'warning', title: 'Pas op!', message: 'Message 1...'},
        {style: 'warning', title: 'Pas op!', message: 'Message 2'},
        {style: 'warning', title: 'Pas op!', message: 'Message 3.'}
      ]
      deepFreeze(state)
      expect(reducer(state, hideAlert(1))).to.eql(
        [
          {style: 'warning', title: 'Pas op!', message: 'Message 1...'},
          {style: 'warning', title: 'Pas op!', message: 'Message 3.'}
        ]
      )
    })
  });
});
