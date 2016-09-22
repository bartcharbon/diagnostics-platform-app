import { getAllGenesPresent } from './Variants'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_GN_SCORES = 'Gavin.SET_GN_SCORES'

export const constants = { SET_GN_SCORES }

import { get } from 'redux/modules/MolgenisApi'

// ------------------------------------
// Action creators
// ------------------------------------
export function setGeneNetworkScores (phenotype, scores) {
  return {
    type : SET_GN_SCORES,
    payload : { phenotype, scores }
  }
}

export function fetchGeneNetworkScores (phenotype) {
  return function (dispatch, getState) {
    const { session : {server, token} , gavin } = getState()
    const genes = getAllGenesPresent(gavin.entities).join()
    return get(server, `v2/GeneNetworks?q=HPO_ID==${phenotype.primaryID};GENE=in=(${genes})&num=1000`, token)
      .then((json) => {
        const scores = {}
        json.items.forEach(function (score) {
          scores[score.GENE] = score.SCORE
        })
        dispatch(setGeneNetworkScores(phenotype, scores))
      })
  }
}

export const actions = { setGeneNetworkScores }

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_GN_SCORES] : (state, action) => {
    const { phenotype, scores } = action.payload
    return {
      [phenotype.primaryID] : scores
    }
  }
}

// ------------------------------------
// Selectors
// ------------------------------------
// TODO sort variants in state based on scores

// ------------------------------------
// Reducer
// ------------------------------------
export const defaultState = {}

export default function gavinReducer (state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
