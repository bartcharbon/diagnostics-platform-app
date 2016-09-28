import { get } from 'redux/modules/MolgenisApi'
import { getAllGenesPresent } from './Variants'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_GN_SCORES = 'Gavin.SET_GN_SCORES'

export const constants = { SET_GN_SCORES }

// ------------------------------------
// Action creators
// ------------------------------------
export function setGeneNetworkScores (phenotype, scores) {
  return {
    type    : SET_GN_SCORES,
    payload : { phenotype, scores }
  }
}

export const actions = { setGeneNetworkScores }

// ------------------------------------
// Thunks
// ------------------------------------
export function fetchGeneNetworkScores (phenotype) {
  return function (dispatch, getState) {
    const { session : { server, token }, gavin } = getState()
    const genes = getAllGenesPresent(gavin.entities).join()
    return get(server, `v2/sys_GeneNetworkScore?q=hpo==${phenotype.primaryID};hugo=in=(${genes})&num=1000`, token)
      .then((json) => {
        const scores = {}
        json.items.forEach(function (score) {
          const hpoID = score.hugo
          // TODO: Why is this needed?
          const scoreValue = parseFloat(score.score)
          scores[hpoID] = scoreValue
        })
        dispatch(setGeneNetworkScores(phenotype, scores))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_GN_SCORES] : (state, action) => {
    const { phenotype : { primaryID }, scores } = action.payload
    return {
      ...state,
      scores : {
        ...state.scores,
        [primaryID] : scores
      }
    }
  }

}

// ------------------------------------
// Selectors
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
export const defaultState = { scores : {} }

export default function gavinReducer (state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
