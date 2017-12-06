import { compose } from 'recompose';
import { defaultsDeep, pick } from 'lodash';
import { connect as defaultConnect } from 'react-redux';
import actions from '../actions';

export default (selectors, createSelectors, withFilters) => (selectItems, filterReducer, options) => {
  const defaultedOptions = defaultsDeep(options, { connect: defaultConnect, dataPropName: 'filteredData' });

  const createMapStateToProps = (selectItems, filterReducer) => {
    /* if selectItems is a selector function */
    if (typeof selectItems === 'function') {
      const { createFilteredDataSelector } = createSelectors(selectItems, filterReducer);

      return (state, ownProps) => ({
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

  const mapStateToProps = createMapStateToProps(selectItems, filterReducer);

  return compose(
    withFilters(),
    defaultedOptions.connect(
      mapStateToProps,
      null,
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
    ),
  );
}
