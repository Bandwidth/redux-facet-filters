import { createSelector } from 'reselect';

export default selectors => (selectItems, filterReducer) => {
  const createFilteredListSelector = facetName => createSelector(
    selectItems,
    selectors.createFilterListSelector(facetName),
    (items, filters) => filters.reduce(filterReducer, items),
  );

  return {
    createFilteredListSelector,
  };
};
