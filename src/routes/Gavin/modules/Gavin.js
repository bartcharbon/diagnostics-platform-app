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
export const getActivePhenotypes = (state) => fromPhenotypes.getActivePhenotypes(state.phenotypes)
export const getAllGenesPresent = (state) => fromVariants.getAllGenesPresent(state.entities)

export function getVariantsSortedOnScore (state) {
  const totalScorePerGene = _getTotalScorePerGene(state)
  return state.entities.variants.map(element => {
    return { ...element, totalScore : totalScorePerGene[element.Gene] }
  }).sort(function (item1, item2) {
    return sortVariants(item1, item2)
  })
}

/**
 * Retrieves the total score for each gene, per gene
 * @param state
 * @returns object mapping key gene name to value total score for that gene name
 * @private
 */
function _getTotalScorePerGene (state) {
  const phenos = getActivePhenotypes(state)
  const genes = getAllGenesPresent(state)
  const scores = state.scores.scores
  return genes.reduce((soFar, gene) => ({
    ...soFar,
    [gene] : _getTotalScoreForGene(gene, phenos, scores)
  }), {})
}

/**
 * Sums all gene network scores for a gene
 * @param gene the gene to sum the scores for
 * @param phenos the phenotypes whose scores should be summed
 * @param scores the scores per phenotype and gene
 * @returns summed scores for all selected phenotypes for this gene
 * or undefined if for one or more of the phenotypes no score was found for this gene
 * @private
 */
function _getTotalScoreForGene (gene, phenos, scores) {
  return phenos.reduce((total, pheno) => {
    if (!scores.hasOwnProperty(pheno) || !scores[pheno].hasOwnProperty(gene) || total === undefined) {
      return undefined
    }
    return total + scores[pheno][gene]
  }, 0)
}

export function sortVariants (item1, item2) {
  // cope with undefined scores
  var value2 = item2.totalScore
  var value1 = item1.totalScore
  if (value1 === undefined) {
    if (value2 === undefined) return 0
    return 1
  }
  if (value2 === undefined) return -1
  if (value2 > value1) return 1
  if (value2 < value1) return -1
  return 0
}

// ------------------------------------
// Action Handlers
// ------------------------------------
// const ACTION_HANDLERS = {}

export const reducer = combineReducers({ phenotypes, scores, entities })

export default reducer
