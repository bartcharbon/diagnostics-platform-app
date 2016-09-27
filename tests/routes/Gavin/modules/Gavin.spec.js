import { sortVariants } from 'routes/Gavin/modules/Gavin'
// import deepFreeze from 'deep-freeze'

describe('(Redux) Gavin', () => {
  describe('(sortVariants)', () => {
    it('sorts a list of scores properly', () => {
      const items = [
        {id: 1, totalScore: 12},
        {id: 2, totalScore: undefined},
        {id: 3, totalScore: -2},
        {id:4, totalScore: 8}]
      items.sort(sortVariants)
      const expected = [
        {id: 1, totalScore: 12},
        {id:4, totalScore: 8},
        {id: 3, totalScore: -2},
        {id: 2, totalScore: undefined}
      ]
      expect(items).to.eql(expected)
    })
  })
})
