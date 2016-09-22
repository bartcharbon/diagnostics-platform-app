import reducer, {defaultState, setGeneNetworkScores} from 'routes/Gavin/modules/GeneNetworkScore'
import deepFreeze from 'deep-freeze'

describe('(Redux) GeneNetworkScore', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(defaultState);
    })

    it('sets score', () => {
      const scores = {'BRCA2': 2, 'NOD': 3}
      const phenotype = {primaryID: 'HP_000123', name: "pheno 123"}
      const action = setGeneNetworkScores(phenotype, scores)
      deepFreeze(action)
      const newState = reducer(defaultState, action)
      expect(newState).to.eql(
        {
          scores: {
            'HP_000123': {
              'BRCA2': 2,
              'NOD': 3
            }
          }
        }
      )
    })

    it('combines scores for different phenotypes', () => {
      const scoresPheno2 = {'BRCA2': 3, 'NOD': 8}
      const phenotype2 = {primaryID: 'HP_000124', name: "pheno 124"}
      const action = setGeneNetworkScores(phenotype2, scoresPheno2)
      deepFreeze(action)
      const newState = reducer({
        scores: {
          'HP_000123': {
            'BRCA2': 2,
            'NOD': 3
          }
        }
      }, action)
      expect(newState).to.eql(
        {
          scores: {
            'HP_000123': {
              'BRCA2': 2,
              'NOD': 3
            },
            'HP_000124': {
              'BRCA2': 3,
              'NOD': 8
            }
          }
        }
      )
    });

    it('replaces score for existing phenotype', () => {
      const scores = {'BRCA2': 2, 'NOD': 3}
      const phenotype = {primaryID: 'HP_000123', name: "pheno 123"}
      const action = setGeneNetworkScores(phenotype, scores)
      deepFreeze(action)
      const existingState = {
        scores: {
          'HP_000123': {
            'BRCA2': 3,
            'NOD': 2
          },
          'HP_000124': {
            'BRCA2': 3,
            'NOD': 8
          }
        }
      }
      deepFreeze(existingState)
      const newState = reducer(existingState, action)
      expect(newState).to.eql(
        {
          scores: {
            'HP_000123': {
              'BRCA2': 2,
              'NOD': 3
            },
            'HP_000124': {
              'BRCA2': 3,
              'NOD': 8
            }
          }
        }
      )
    });
  });
});
