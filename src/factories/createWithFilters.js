import { defaultsDeep, pick } from 'lodash';
import actions from '../actions';
import { compose } from '@bandwidth/redux-facet';

export default (selectors, facet, withFacetData) => () => {
  const mapFacetStateToProps = (state) => ({
    filters: selectors.selectFilterListFromFacetState(state),
  });

  const mapFacetDispatchToProps = (facetDispatch) => {
    return {
      addFilter: (filter) => facetDispatch(actions.addFilter(filter)),
      updateFilter: (index, filter) => facetDispatch(actions.updateFilter(index, filter)),
      insertFilter: (index, filter) => facetDispatch(actions.insertFilter(index, filter)),
      removeFilter: (index) => facetDispatch(actions.removeFilter(index)),
      clearFilters: () => facetDispatch(actions.clearFilters()),
    };
  };

  return compose(
    facet(mapFacetDispatchToProps),
    withFacetData(mapFacetStateToProps),
  );
}
