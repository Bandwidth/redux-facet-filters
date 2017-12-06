import { defaultsDeep, pick } from 'lodash';
import { connect as defaultConnect } from 'react-redux';
import actions from '../actions';

export default (selectors, createSelectors) => (selectItems, filterReducer, options) => {
  const defaultedOptions = defaultsDeep(options, { connect: defaultConnect, dataPropName: 'filteredData' });

  if (!filterReducer) {
    throw new Error('A filter reducer must be supplied to withFilteredData');
  }

  if (!selectItems) {
    throw new Error('selectItems must be supplied to withFilteredData');
  }

  const { createFilteredDataSelector } = createSelectors(selectItems, filterReducer);

  const mapStateToProps = (state, ownProps) => ({
    filters: selectors.createFilterListSelector(ownProps.facetName)(state),
    [defaultedOptions.dataPropName]: createFilteredDataSelector(ownProps.facetName)(state),
  });

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
