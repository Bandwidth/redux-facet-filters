import actions from '../actions';
import { fromJS, List } from 'immutable';
import { REDUCER_KEY } from '../constants';
import { handleActions } from 'redux-actions';
import createMount from './createMount';

const DEFAULT_STATE = new List();

const reducer = handleActions({
  [actions.addFilter]: (state, { payload: { filter } }) => state
    .push(fromJS(filter)),
  [actions.updateFilter]: (state, { payload: { index, filter } }) => state
    .set(index, fromJS(filter)),
  [actions.insertFilter]: (state, { payload: { index, filter } }) => state
    .insert(index, fromJS(filter)),
  [actions.removeFilter]: (state, { payload: { index } }) => state
    .remove(index),
  [actions.clearFilters]: () => DEFAULT_STATE,
}, DEFAULT_STATE);

reducer.mount = createMount(reducer);

reducer.key = REDUCER_KEY;

export default reducer;
