import { compose } from 'recompose';
import { defaultsDeep, pick } from 'lodash';
import actions from '../actions';

export default (
  selectors,
  createSelectors,
  withFilters,
  withFacetData
) => (selectItems, filterReducer, options) => {
  const defaultedOptions = defaultsDeep(options, { dataPropName: 'filteredData' });

  const createMapFacetStateToProps = (selectItems, filterReducer) => {
    /* if selectItems is a selector function */
    if (typeof selectItems === 'function') {
      const { createFilteredDataSelector } = createSelectors(selectItems, filterReducer);

      return (facetState, ownProps, state) => ({
        // ignore facetState, bypass to global state so we can select data as well
        [defaultedOptions.dataPropName]: createFilteredDataSelector(ownProps.facetName)(state),
      });
    /* if selectItems is a prop name */
    } else if (typeof selectItems === 'string') {
      return (state, ownProps) => {
        return {
          [defaultedOptions.dataPropName]: ownProps.filters.reduce(filterReducer, ownProps[selectItems]),
        };
      }
    } else {
      throw new Error('The first parameter of withFilteredData must be a selector function or a prop name');
    }
  }

  if (!filterReducer) {
    throw new Error('A filter reducer must be supplied to withFilteredData');
  }

  if (!selectItems) {
    throw new Error('withFilteredData requires a first parameter, which is either a selector function or a prop name');
  }

  const mapStateToProps = createMapFacetStateToProps(selectItems, filterReducer);

  return compose(
    withFilters(),
    withFacetData(mapStateToProps),
  );
}
