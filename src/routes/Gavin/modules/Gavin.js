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
  return state.entities.variants.map(element => {
    return { ...element, totalScore : summedScores[element['Gene']] }
  }).sort(function (item1, item2) {
    return parseFloat(item2['totalScore']) - parseFloat(item1['totalScore'])
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
