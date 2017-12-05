import { createSelector } from 'reselect';
import { selectors } from '@bandwidth/redux-facet/immutable';
import { REDUCER_KEY } from '../constants';

const createFilterCollectionSelector = facetName => createSelector(
  selectors.createFacetStateSelector(facetName),
  facetState => facetState[REDUCER_KEY],
);

const createFilterListSelector = facetName => createSelector(
  createFilterCollectionSelector(facetName),
  filters => Object.values(filters).sort((a, b) => a.id.localeCompare(b.id)),
);

const createFilterSelectorCreator = filterId => facetName => createSelector(
  createFilterCollectionSelector(facetName),
  filters => filters[filterId],
);

export default {
  createFilterCollectionSelector,
  createFilterListSelector,
  createFilterSelectorCreator,
};
