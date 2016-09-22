import reducer, {
  initialState,
  phenotypeSelected,
  togglePhenotype,
  removePhenotype
} from 'routes/Gavin/modules/PhenotypeSelection'
import deepFreeze from 'deep-freeze'

describe('(Redux) phenotypeSelection', () => {
  describe('(Reducer)', () => {
    const phenotype = { primaryID : 'HP_000123', name : 'Phenotype' }
    deepFreeze(initialState)
    deepFreeze(phenotype)

    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })

    it('adds selected phenotype', () => {
      const event = phenotypeSelected(phenotype)
      deepFreeze(event)
      const newState = reducer(initialState, event)
      expect(newState).to.eql({
          selected : [{ active : true, id : 'HP_000123' }],
          phenotypes : { 'HP_000123' : phenotype }
        }
      )
    })

    it('toggles phenotype selection', () => {
      const event = togglePhenotype(1)
      const state = {
        selected : [{ active : true, id : 'HP_000123' },
          { active : true, id : 'HP_000124' },
          { active : true, id : 'HP_000125' }],
        phenotypes : {
          'HP_000123' : { primaryID : 'HP_000123', name : 'Phenotype' },
          'HP_000124' : { primaryID : 'HP_000124', name : 'Phenotype 2' },
          'HP_000125' : { primaryID : 'HP_000125', name : 'Phenotype 3' }
        }
      }
      deepFreeze(event)
      deepFreeze(state)
      const newState = reducer(state, event)
      expect(newState).to.eql({
          selected : [{ active : true, id : 'HP_000123' },
            { active : false, id : 'HP_000124' },
            { active : true, id : 'HP_000125' }],
          phenotypes : {
            'HP_000123' : { primaryID : 'HP_000123', name : 'Phenotype' },
            'HP_000124' : { primaryID : 'HP_000124', name : 'Phenotype 2' },
            'HP_000125' : { primaryID : 'HP_000125', name : 'Phenotype 3' }
          }
        }
      )
    })

    it('removes phenotype', () => {
      const event = removePhenotype(1)
      const state = {
        selected : [{ active : true, id : 'HP_000123' },
          { active : true, id : 'HP_000124' },
          { active : true, id : 'HP_000125' }],
        phenotypes : {
          'HP_000123' : { primaryID : 'HP_000123', name : 'Phenotype' },
          'HP_000124' : { primaryID : 'HP_000124', name : 'Phenotype 2' },
          'HP_000125' : { primaryID : 'HP_000125', name : 'Phenotype 3' }
        }
      }
      deepFreeze(event)
      deepFreeze(state)
      const newState = reducer(state, event)
      expect(newState).to.eql({
          selected : [{ active : true, id : 'HP_000123' },
            { active : true, id : 'HP_000125' }],
          phenotypes : {
            'HP_000123' : { primaryID : 'HP_000123', name : 'Phenotype' },
            'HP_000124' : { primaryID : 'HP_000124', name : 'Phenotype 2' },
            'HP_000125' : { primaryID : 'HP_000125', name : 'Phenotype 3' }
          }
        }
      )
    })

  })
})
