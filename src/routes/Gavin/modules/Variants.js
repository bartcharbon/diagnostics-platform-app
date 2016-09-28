import { get } from 'redux/modules/MolgenisApi'
import { showAlert } from 'redux/modules/Alerts'

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
      var attrNames = json.meta.attributes.map(function (attr) { return attr.name })
      //FIXME: cope with compounds? or wait for one dimensionial attributeslist
      var missing = ['#CHROM', 'POS', 'REF', 'ALT', 'Gene'].filter(function (attr) {return attrNames.indexOf(attr) === -1})
      if (missing.length > 0) dispatch(showAlert('danger', 'Entity [' + entityName + '] is missing required attributes', missing.join(', ')))
      const variants = json.items
      dispatch(setVariants(variants))
    }).catch((error) => {
      var message = ''
      if (error.errors[0] !== undefined) {
        message = error.errors[0].message
      }
      dispatch(showAlert('danger', 'Error retrieving entity[' + entityName + '] from the server', message))
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
