import { get } from 'redux/modules/MolgenisApi'
import { getAllGenesPresent } from './Variants'
import { showAlert } from 'redux/modules/Alerts'

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
        if (json.items.length === 0) {
          dispatch(showAlert('warning', 'No Gene Network scores were found for phenotype[' + phenotype.name + '(' + phenotype.primaryID + ')]', 'Unable to determine gene priority order'))
        }
        json.items.forEach(function (score) {
          const geneID = score.hugo
          scores[geneID] = score.score
        })
        dispatch(setGeneNetworkScores(phenotype, scores))
      }).catch((error) => {
        var message = ''
        if (error.errors[0] !== undefined) {
          message = error.errors[0].message
        }
        dispatch(showAlert('danger', 'Error retrieving Gene Network scores from the server', message))
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
// TODO sort variants in state based on scores

// ------------------------------------
// Reducer
// ------------------------------------
export const defaultState = { scores : {} }

export default function gavinReducer (state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
