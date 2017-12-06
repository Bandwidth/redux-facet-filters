import { combineReducers } from 'redux-immutable';
import { filterReducer } from '../../src/immutable';
import { combineFacetReducers } from '@bandwidth/redux-facet/immutable';
import shapes from './shapes';

export default combineReducers({
  /**
   * Our facet reducers live here.
   * Facets in this example are designed to only be concerned with facet-specific
   * state; in this case, just our filters. That's by design.
   *
   * By placing the users and posts data in general reducers, we keep
   * our app data normalized and easily shared between views. It's traditional
   * redux.
   *
   * But our facets are very specific to a particular view, and they
   * apply generalized behaviors (like our filters) to those views in an isolated way.
   *
   * Our containers will assemble all this data together to create their
   * final picture of the data they are presenting.
   */
  [combineFacetReducers.key]: combineFacetReducers({
    shapesList: combineReducers({
      [filterReducer.key]: filterReducer,
    }),
    propProvidedShapesList: combineReducers({
      [filterReducer.key]: filterReducer,
    }),
  }),

  // our 'traditional' redux data reducers
  shapes,
});
