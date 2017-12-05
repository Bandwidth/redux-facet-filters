import actions from '../actions';
import { fromJS, Map } from 'immutable';
import { REDUCER_KEY } from '../constants';
import { handleActions } from 'redux-actions';
import createMount from './createMount';

const DEFAULT_STATE = {};

const reducer = handleActions({
  [actions.setFilter]: (state, { payload: { filter } }) => ({
    ...state,
    [filter.id]: filter
  }),
  [actions.removeFilter]: (state, { payload: { id } }) => state
    .filter(filter => filter.id !== id),
  [actions.clearFilters]: () => DEFAULT_STATE,
}, DEFAULT_STATE);

reducer.mount = createMount(reducer);

reducer.key = REDUCER_KEY;

export default reducer;
