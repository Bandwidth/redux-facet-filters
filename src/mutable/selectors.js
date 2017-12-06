import { createSelector } from 'reselect';
import { selectors } from '@bandwidth/redux-facet/immutable';
import { REDUCER_KEY } from '../constants';

const createFilterListSelector = facetName => createSelector(
  selectors.createFacetStateSelector(facetName),
  filters => facetState[REDUCER_KEY],
);

const createFilterSelectorCreator = index => facetName => createSelector(
  createFilterCollectionSelector(facetName),
  filters => filters[index],
);

export default {
  createFilterListSelector,
  createFilterSelectorCreator,
};
