import { fromJS } from 'immutable';

export default reducer => baseReducer => (
  state = baseReducer.defaultState || fromJS({}),
  action,
) => {
  const baseState = baseReducer(state, action);
  return baseState.set(
    reducer.key,
    reducer(baseState.get(reducer.key), action),
  );
};
