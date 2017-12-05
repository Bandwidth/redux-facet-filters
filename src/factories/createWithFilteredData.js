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

  const { createFilteredListSelector } = createSelectors(selectItems, filterReducer);

  const mapStateToProps = (state, ownProps) => ({
    filters: selectors.createFilterListSelector(ownProps.facetName)(state),
    [defaultedOptions.dataPropName]: createFilteredListSelector(ownProps.facetName)(state),
  });

  const mapDispatchToProps = (dispatch, ownProps) => {
    const setFilter = (filter) => ownProps.facetDispatch(actions.setFilter(filter));
    return {
      setFilter,
      addFilter: setFilter,
      updateFilter: setFilter,
      removeFilter: (id) => ownProps.facetDispatch(actions.removeFilter(id)),
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
