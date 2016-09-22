import { injectReducer } from '../../store/reducers'
import { login } from 'redux/modules/Session'
import { searchPhenotypeOntology } from './modules/PhenotypeSelection'

export default (store) => ({
  path : 'gavin',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Gavin = require('./containers/GavinContainer').default
      const reducer = require('./modules/Gavin').default

      /*  Add the reducer to the store on key 'gavin'  */
      injectReducer(store, { key : 'gavin', reducer })

      const loginAction = login({ apiUrl : 'http://localhost:8080/api/' }, 'admin', 'admin')
      store.dispatch(loginAction).then(
        () => {
          store.dispatch(searchPhenotypeOntology())
        }
      )

      /*  Return getComponent   */
      cb(null, Gavin)

      /* Webpack named bundle   */
    }, 'Gavin')
  }
})
