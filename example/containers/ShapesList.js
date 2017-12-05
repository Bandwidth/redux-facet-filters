import { compose } from 'recompose';
import facet from '@bandwidth/redux-facet/immutable';
import withFilteredData from '../../src/immutable';
import selectors from '../selectors/shapes';
import List from '../components/List';

const filterReducer = (shapes, filter) => {
  switch(filter.type) {
    case 'color':
      return shapes.filter(shape => shape.color === filter.value);
    case 'numberGreater':
      return shapes.filter(shape => shape.number > filter.value);
    case 'numberLess':
      return shapes.filter(shape => shape.number < filter.value);
    default:
      return shapes;
  }
}

export default compose(
  facet('shapesList'),
  withFilteredData(selectors.selectShapes, filterReducer, { dataPropName: 'shapes' }),
)(List);
