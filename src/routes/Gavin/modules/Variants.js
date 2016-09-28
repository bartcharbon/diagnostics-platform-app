import { get } from 'redux/modules/MolgenisApi'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_VARIANTS = 'Gavin.SET_VARIANTS'

export const constants = { SET_VARIANTS }

// ------------------------------------
// Action creators
// ------------------------------------
export function setVariants (variants) {
  return {
    type    : SET_VARIANTS,
    payload : variants
  }
}

export const actions = { setVariants }

// ------------------------------------
// Thunks
// ------------------------------------
export function fetchVariants (entityName) {
  return function (dispatch, getState) {
    const { server, token } = getState().session
    return get(server, `v2/${entityName}`, token).then((json) => {
      const variants = json.items
      dispatch(setVariants(variants))
    })
  }
}

// ------------------------------------
// Action Handlers
//
// Switch that defines what every action
// should do
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_VARIANTS] : (state, action) => {
    const variants = action.payload
    return {
      variants : variants
    }
  }
}

// ------------------------------------
// Selectors
//
// Selector filters data from the state
// that can be used for other componenents
// ------------------------------------
export const getAllGenesPresent = (state) =>
    state.variants.map(function (variant) {
      return variant.Gene
    })

// ------------------------------------
// Reducer
//
// Reducer distributes actions to trigger state changes
// ------------------------------------
const initialState = {
  'variants' : []
}

export default function variantReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
