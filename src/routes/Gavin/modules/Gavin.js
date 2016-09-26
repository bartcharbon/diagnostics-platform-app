import { combineReducers } from 'redux'
import phenotypes, * as fromPhenotypes from './PhenotypeSelection'
import scores from './GeneNetworkScore'
import entities, * as fromVariants from './Variants'

// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {}

// ------------------------------------
// Selectors
// ------------------------------------
export const getSelectedPhenotypes = (state) => fromPhenotypes.getSelectedPhenotypes(state.phenotypes)
export const getAllGenesPresent = (state) => fromVariants.getAllGenesPresent(state.entities)

// TODO order table based on scores in state
export function getVariantsSortedOnScore (state) {
  // const variants = state.entities.variants
  const scores = getSummedUpScorePerTerm(state.scores)
  console.log('scores: ', scores)
}

function getSummedUpScorePerTerm (scores) {
  const summedScores = {}

  for (var hpoID in scores) {
       //  console.log('term', hpoID)

    const genes = scores[hpoID]
    for (var gene in genes) {
            // console.log('existing', summedScores[gene])
      const score = genes[gene]

      if (summedScores[gene] === undefined) {
        summedScores[gene] = score
      } else {
                // console.log('summed', gene)
        summedScores[gene] = summedScores[gene] + score
      }
    }
  }

  return summedScores
}

// ------------------------------------
// Action Handlers
// ------------------------------------
// const ACTION_HANDLERS = {}

export const reducer = combineReducers({ phenotypes, scores, entities })

export default reducer
