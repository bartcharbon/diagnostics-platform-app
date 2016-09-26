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

export function getVariantsSortedOnScore (state) {
  const summedScores = getSummedUpScorePerTerm(state.scores.scores)
  console.log(summedScores);
  return state.entities.variants.map(element => {
    return { ...element, totalScore : summedScores[element['Gene']] }
  }).sort(function (item1, item2) {
    // cope with undefined scores
    var value2 = item2.totalScore
    var value1 = item1.totalScore
    if (value1 === undefined) {
      if (value2 === undefined) {
        return 0
      }
      return 1
    }
    if (value2 === undefined) {
      return -1
    }
    if (value2 > value1) {
      return 1
    }
    if (value2 < value1) {
      return -1
    }
    return 0
  })
}

function getSummedUpScorePerTerm (scores) {
  const summedScores = {}

  for (var hpoID in scores) {
       //  console.log('term', hpoID)

    const genes = scores[hpoID]
    for (var gene in genes) {
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
