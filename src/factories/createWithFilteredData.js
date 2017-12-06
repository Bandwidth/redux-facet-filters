import { defaultsDeep, pick } from 'lodash';
import { connect as defaultConnect } from 'react-redux';
import actions from '../actions';

export default (selectors, createSelectors) => (selectItems, filterReducer, options) => {
  const defaultedOptions = defaultsDeep(options, { connect: defaultConnect, dataPropName: 'filteredData' });

  const createMapStateToProps = (selectItems, filterReducer) => {
    /* if selectItems is a selector function */
    if (typeof selectItems === 'function') {
      const { createFilteredDataSelector } = createSelectors(selectItems, filterReducer);

      return (state, ownProps) => ({
        filters: selectors.createFilterListSelector(ownProps.facetName)(state),
        [defaultedOptions.dataPropName]: createFilteredDataSelector(ownProps.facetName)(state),
      });
    /* if selectItems is a prop name */
    } else if (typeof selectItems === 'string') {
      return (state, ownProps) => {
        const filterSelector = selectors.createFilterListSelector(ownProps.facetName);
        const filters = filterSelector(state);
        const filteredData = filters.reduce(filterReducer, ownProps[selectItems]);

        return {
          filters,
          [defaultedOptions.dataPropName]: filteredData,
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

  const mapStateToProps = createMapStateToProps(selectItems, filterReducer);

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      addFilter: (filter) => ownProps.facetDispatch(actions.addFilter(filter)),
      updateFilter: (index, filter) => ownProps.facetDispatch(actions.updateFilter(index, filter)),
      insertFilter: (index, filter) => ownProps.facetDispatch(actions.insertFilter(index, filter)),
      removeFilter: (index) => ownProps.facetDispatch(actions.removeFilter(index)),
      clearFilters: () => ownProps.facetDispatch(actions.clearFilters()),
    };
  };

  return defaultedOptions.connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    // pass through connect options from HOC options
    pick(defaultedOptions, [
      'pure',
      'areStatesEqual',
      'areOwnPropsEqual',
      'areStatePropsEqual',
      'areMergedPropsEqual',
      'storeKey',
    ]),
  );
}
