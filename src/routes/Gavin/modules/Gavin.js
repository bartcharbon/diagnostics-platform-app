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
export const getAllGenesPresent = (state) => fromVariants.getAllGenesPresent(state.variants)
// TODO order table based on scores in state

// ------------------------------------
// Action Handlers
// ------------------------------------
// const ACTION_HANDLERS = {}

export const reducer = combineReducers({ phenotypes, scores, entities })

export default reducer
