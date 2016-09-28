import { get } from 'redux/modules/MolgenisApi'
import { fetchGeneNetworkScores } from './GeneNetworkScore'
import { showAlert } from 'redux/modules/Alerts'

// ------------------------------------
// Constants
// ------------------------------------
export const PHENOTYPE_SELECTED = 'Gavin.PHENOTYPE_SELECTED'
export const TOGGLE_PHENOTYPE = 'Gavin.TOGGLE_PHENOTYPE'
export const REMOVE_PHENOTYPE = 'Gavin.REMOVE_PHENOTYPE'
export const PHENOTYPE_ONTOLOGY_FOUND = 'Gavin.PHENOTYPE_ONTOLOGY_FOUND'

export const constants = { PHENOTYPE_SELECTED, TOGGLE_PHENOTYPE, REMOVE_PHENOTYPE }

// ------------------------------------
// Action creators
// ------------------------------------
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

export const phenotypeOntologyFound = (id) => ({
  type    : PHENOTYPE_ONTOLOGY_FOUND,
  payload : id
})

export const actions = { selectPhenotype, togglePhenotype, removePhenotype, phenotypeOntologyFound }

// ------------------------------------
// Thunks
// ------------------------------------
export function searchPhenotypeOntology () {
  return (dispatch, getState) => {
    const { server, token } = getState().session
    return get(server, 'v2/sys_ont_Ontology?q=ontologyName==hp', token).then(
      (json) => {
        if (json.items.length > 0) {
          dispatch(phenotypeOntologyFound(json.items[0].id))
        } else {
          dispatch(showAlert('danger', 'No ontology found with name "hp".', 'Have you imported hpo.owl.zip?'))
        }
      },
      (error) => dispatch(showAlert('danger', 'Failed to download ontology with name "hp".', error.message))
    )
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
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
      ...state,
      selected : [
        ...state.selected.slice(0, index),
        { ...selectedPheno, active : !selectedPheno.active },
        ...state.selected.slice(index + 1)]
    }
  },
  [REMOVE_PHENOTYPE] : (state, action) => {
    const index = action.payload
    return {
      ...state,
      selected : [
        ...state.selected.slice(0, index),
        ...state.selected.slice(index + 1)]
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

export const getActivePhenotypes = (state) => state.selected.filter(pheno => pheno.active).map(pheno => pheno.id)

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = { selected : [], phenotypes : {} }
export default function gavinReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
