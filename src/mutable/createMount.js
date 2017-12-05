export default reducer => baseReducer => (
  state = baseReducer.defaultState || {},
  action,
) => {
  const baseState = baseReducer(state, action);
  return {
    ...baseState,
    [reducer.key]: reducer(baseState[reducer.key], action),
  };
};
