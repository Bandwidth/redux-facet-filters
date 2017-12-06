import { defaultsDeep, pick } from 'lodash';
import { connect as defaultConnect } from 'react-redux';
import actions from '../actions';

export default selectors => (options) => {
  const defaultedOptions = defaultsDeep(options, { connect: defaultConnect, dataPropName: 'filteredData' });

  const mapStateToProps = (state, ownProps) => ({
    filters: selectors.createFilterListSelector(ownProps.facetName)(state),
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
