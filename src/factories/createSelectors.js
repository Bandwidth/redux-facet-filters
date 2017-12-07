import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../constants';

export default facetSelectors => {
  const selectFilterListFromFacetState = facetState => facetState[REDUCER_KEY];

  const createFilterListSelector = facetName => createSelector(
    facetSelectors.createFacetStateSelector(facetName),
    selectFilterListFromFacetState,
  );

  const createFilterSelectorCreator = index => facetName => createSelector(
    createFilterListSelector(facetName),
    filters => filters[index],
  );

  const createFilterSelectorFromFacetState = index => createSelector(
    selectFilterListFromFacetState,
    filters => filters[index],
  );

  return {
    createFilterListSelector,
    createFilterSelectorCreator,

    selectFilterListFromFacetState,
    createFilterSelectorFromFacetState,
  };
};
