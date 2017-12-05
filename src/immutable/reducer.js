import actions from '../actions';
import { fromJS, Map } from 'immutable';
import { REDUCER_KEY } from '../constants';
import { handleActions } from 'redux-actions';
import createMount from './createMount';

const DEFAULT_STATE = new Map();

const reducer = handleActions({
  [actions.setFilter]: (state, { payload: { filter } }) => state
    .set(filter.id, fromJS(filter)),
  [actions.removeFilter]: (state, { payload: { id } }) => state
    .remove(id),
  [actions.clearFilters]: () => DEFAULT_STATE,
}, DEFAULT_STATE);

reducer.mount = createMount(reducer);

reducer.key = REDUCER_KEY;

export default reducer;
