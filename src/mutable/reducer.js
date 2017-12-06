import actions from '../actions';
import { fromJS, Map } from 'immutable';
import { REDUCER_KEY } from '../constants';
import { handleActions } from 'redux-actions';
import createMount from './createMount';

const DEFAULT_STATE = [];

const reducer = handleActions({
  [actions.addFilter]: (state, { payload: { filter } }) => [
    ...state,
    filter
  ],
  [actions.updateFilter]: (state, { payload: { index, filter } }) => state
    .splice(index, 1, filter),
  [actions.insertFilter]: (state, { payload: { index, filter } }) => state
    .splice(index, 0, filter),
  [actions.removeFilter]: (state, { payload: { index } }) => state
    .splice(index, 1),
  [actions.clearFilters]: () => DEFAULT_STATE,
}, DEFAULT_STATE);

reducer.mount = createMount(reducer);

reducer.key = REDUCER_KEY;

export default reducer;
