import React from 'react';
import ReactDom from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './configureStore';

import ShapesList from './containers/ShapesList';

const store = configureStore();

ReactDom.render(
  <Provider store={store}>
    <div style={{ fontFamily: 'sans-serif', padding: '12px' }}>
      <h1>redux-facet-filters example app</h1>
      <p>
        In this example app, we see how individual facets can wire in filters,
        which helps us narrow down collections of items without writing
        a lot of Redux boilerplate code.
      </p>
      <ShapesList />
    </div>
  </Provider>,
  document.getElementById('main'),
);
