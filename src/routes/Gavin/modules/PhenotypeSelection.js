// Constants
export const PHENOTYPE_SELECTED = 'Gavin.PHENOTYPE_SELECTED'
export const TOGGLE_PHENOTYPE = 'Gavin.TOGGLE_PHENOTYPE'
export const REMOVE_PHENOTYPE = 'Gavin.REMOVE_PHENOTYPE'
export const PHENOTYPE_ONTOLOGY_FOUND = 'Gavin.PHENOTYPE_ONTOLOGY_FOUND'

export const constants = { PHENOTYPE_SELECTED, TOGGLE_PHENOTYPE, REMOVE_PHENOTYPE }

import { get } from 'redux/modules/MolgenisApi'
import { fetchGeneNetworkScores } from './GeneNetworkScore'

// Action Creators

// A phenotype was selected and should be added to the selection
export function phenotypeSelected (phenotype) {
  return {
    type    : PHENOTYPE_SELECTED,
    payload : phenotype
  }
}

export function selectPhenotype (phenotype) {
  return function (dispatch) {
    dispatch(phenotypeSelected(phenotype))
    dispatch(fetchGeneNetworkScores(phenotype))
  }
}

export function togglePhenotype (index) {
  return {
    type    : TOGGLE_PHENOTYPE,
    payload : index
  }
}

export function removePhenotype (index) {
  return {
    type    : REMOVE_PHENOTYPE,
    payload : index
  }
}

export function searchPhenotypeOntology () {
  return (dispatch, getState) => {
    const { server, token } = getState().session
    return get(server, 'v2/sys_ont_Ontology?ontologyName==hp', token).then(
      (json) => {
        dispatch(phenotypeOntologyFound(json.items[0].id))
      }
    )
  }
}

export const phenotypeOntologyFound = (id) => ({
  type    : PHENOTYPE_ONTOLOGY_FOUND,
  payload : id
})

export const actions = { selectPhenotype, togglePhenotype, removePhenotype, phenotypeOntologyFound }

const ACTION_HANDLERS = {
  [PHENOTYPE_ONTOLOGY_FOUND] : (state, action) => (
  { ...state, ontologyId : action.payload }
  ),
  [PHENOTYPE_SELECTED] : (state, action) => (
    (state.selected.map(item => item.id).indexOf(action.payload.primaryID) === -1) ? {
      ...state,
      selected   : [...state.selected, { id : action.payload.primaryID, active : true }],
      phenotypes : { ...state.phenotypes, [action.payload.primaryID] : action.payload }
    } : state),
  [TOGGLE_PHENOTYPE] : (state, action) => {
    const index = action.payload
    const selectedPheno = state.selected[index]
    return {
      selected : [
        ...state.selected.slice(0, index),
        { ...selectedPheno, active : !selectedPheno.active },
        ...state.selected.slice(index + 1)],
      phenotypes : state.phenotypes
    }
  },
  [REMOVE_PHENOTYPE] : (state, action) => {
    const index = action.payload
    return {
      selected : [
        ...state.selected.slice(0, index),
        ...state.selected.slice(index + 1)],
      phenotypes : state.phenotypes
    }
  }
}

// ------------------------------------
// Selectors
// ------------------------------------
export const getSelectedPhenotypes = (state) =>
  state.selected.map(pheno => ({
    active : pheno.active,
    value  : state.phenotypes[pheno.id]
  }))

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { selected : [], phenotypes : {} }
export default function gavinReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
