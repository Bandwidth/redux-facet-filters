import { createSelector } from 'reselect';

export default selectors => (selectItems, filterReducer) => {
  const createFilteredDataSelector = facetName => createSelector(
    selectItems,
    selectors.createFilterListSelector(facetName),
    (items, filters) => filters.reduce(filterReducer, items),
  );

  return {
    createFilteredDataSelector,
  };
};
