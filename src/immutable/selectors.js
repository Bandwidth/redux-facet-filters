import { createSelector } from 'reselect';
import { selectors } from '@bandwidth/redux-facet/immutable';
import { REDUCER_KEY } from '../constants';

const createFilterListSelector = facetName => createSelector(
  selectors.createFacetStateSelector(facetName),
  facetState => facetState.get(REDUCER_KEY).toJS(),
);

const createFilterSelectorCreator = index => facetName => createSelector(
  createFilterListSelector(facetName),
  filters => filters[index],
);

export default {
  createFilterListSelector,
  createFilterSelectorCreator,
};
