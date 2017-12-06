# redux-facet-filters

Filtering and sorting tools for [`redux-facet`](https://github.com/bandwidth/redux-facet). Filter or rearrange multiple collections of resources in your application without writing and re-writing Redux boilerplate code.

[Check out a simple example here](http://dev.bandwidth.com/redux-facet-filters/). The source is located in [/example](https://github.com/Bandwidth/redux-facet-filters/tree/master/example).

## Immutable.js Support

To use `redux-facet-filters` with `immutable`, import all modules from `@bandwidth/redux-facet-filters/immutable`. Module names and usages stay the same.

## What can you do with it?

* Apply filters to data selected from your store to specific views in your application without writing boilerplate Redux actions, reducers and sagas to track filter state.
* Add, remove, replace, and reorder filters simply by connecting your component to the provided container.
* Go beyond filtering-- use the filter pipeline to sort your data, as well.

## Will this alter the data in my store?

Nope!

`redux-facet-filters` (and `redux-facet` in general) is built on the principle of computing as much data as we can from a minimal Redux store. To use this library effectively, you should have a global and canonical data set which you maintain in your store. The purpose of this library is to consume that data set, run it through your provided filters, and supply a computed view of the data to your components.

## Documentation

### Default export: `withFilteredData(selectItems: Function|String, filterReducer: Function, options: Object)`

A higher-order-component which enhances a `facet` container with:

1. Access to a filtered dataset
2. A set of action creator props which allow adding, removing, modifying and clearing filters

Two parameters are required to use `withFilteredData`:

1. `selectItems`:
  * If a function is provided: a selector function to retrieve your raw data to be filtered. This function should take the Redux state as a parameter and return your data in whatever format you want. `redux-facet-filters` does not enforce a required shape for raw data.
  * If a string is provided: a prop name which will be passed to the container which must provided raw data to be filtered. The container will apply the filter reducer to this data.
2. `filterReducer`: similar to Redux' reducer function, this function will be called successively with each filter in order. The first parameter will always be your data set, and the second parameter will be a filter. Return a new copy of your data set with the filter applied.

The third parameter is `options`:

```js
{
  dataPropName: String = 'filteredData',
  connect: Function = connect, /* from react-redux */
  ...connectOptions /* any options you would normally pass to react-redux connect */
}
```

Options lets you define the prop name you want to be used to provide your filtered data to the wrapped component. It defaults to `filteredData`.

#### About filters

`redux-facet-filters` is not opinionated about what your filters look like or how you process the filtering of your data. For instance, you may choose to define filters as objects like so:

```js
{
  type: 'nameIncludes',
  value: 'foo',
}
```

And treat your filter reducer similarly to a Redux reducer:

```js
const filterReducer = (items, filter) => {
  switch (filter.type) {
    case 'nameIncludes':
      return items.filter(item => item.name.includes(filter.value));
    default:
      return items;
  }
}
```

Filters aren't limited to reducing the data set. You could also use a filter to sort your data:

```js
const filterReducer = (items, filter) => {
  switch (filter.type) {
    case 'sortBy':
      // the value of this filter deterimines the key we should compare
      return items.sort((a, b) => a[filter.value].localeCompare(b[filter.value]));
    default:
      return items;
  }
}
```

#### Using `withFilteredData()`

Compose `withFilteredData` after `facet` before passing in your component:

```js
facet('users', mapStateToProps, mapDispatchToProps)(
  withFilteredData(selectUsers, userFilterReducer)(
    ViewComponent
  )
);
```

To make things cleaner, it's recommended you use [`recompose`](https://github.com/acdlite/recompose):

```js
compose(
  facet('users', mapStateToProps, mapDispatchToProps),
  withFilteredData(selectUsers, userFilterReducer)
)(ViewComponent);
```

Remember, `withFilteredData` must come *after* `facet`.

#### Properties provided

A component enhanced with `withFilteredData` will receive the following props:

* `filteredData | [dataPropName]`
  * The filtered dataset will be supplied to a prop name you can define yourself. By default, this prop will be `filteredData`.
* `filters`
  * An array of filter objects. `redux-facet-filters` does not enforce any shape on filters. They can contain any data you need to power your filtering logic.
* `addFilter(filter: Object)`
  * Pushes a filter to the end of the filter list.
* `updateFilter(index: Number, filter: Object)`
  * Replaces an existing filter with a new version.
* `insertFilter(index: Number, filter: Object)`
  * Inserts a filter into the filter list at the specified index.
* `removeFilter(index: Number)`
  * Removes the filter at the specified index.
* `clearFilters()`
  * Clears all filters in the list.

### `withFilters()`

A smaller higher-order-component that only provides filter props, and does not compute filtered data. A facet component composed with `withFilters` will provide `filters`, `addFilter`, `updateFilter`, `insertFilter`, `removeFilter` and `clearFilters`.

This smaller component may be useful if you want to create a container scoped only to your filter controls.

### `filterReducer`

Include this reducer within your facet reducers to track filtering state.

This reducer expects to be mounted within a facet reducer. if this is done correctly, it will therefore only listen to filtering actions related to its facet.

#### Basic usage

To mount it manually, please reference the `.key` property to mount it at the correct location in your facet reducer, or the library will not work.

```javascript
const facetReducer = facetReducer('users', combineReducers({
  foo: fooReducer,
  bar: barReducer,
  [filterReducer.key]: filterReducer,
}));
```

#### Automatic usage

> Note: `mount` will not work with `combineReducers`, since `combineReducers` ignores any 'extra' keys that get added to the resulting map.

You can mount the `filterReducer` automatically into your facet reducer using its `.mount(facetReducer: Function)` function. By calling it with your facet reducer, it will return a new reducer and mount itself at the correct key. Your base reducer must return a state which is an object so that a key can be created in the alert reducer.

```js
const enhancedFacetReducer = filterReducer.mount(facetReducer);
```

### `filterActions`

The library exports a set of action creators which you can use to manage filters within sagas or other parts of your code.

The action creators are:

* `filterActions.addFilter(filter: Object)`: adds a filter to the end of the filter list.
* `filterActions.updateFilter(index: Number, filter: Object)`: replaces the filter at the specified index in the filter list.
* `filterActions.insertFilter(index: Number, filter: Object)`: inserts a filter at the specified index in the filter list.
* `filterActions.removeFilter(index: Number)`: removes the filter at the specified index in the filter list.
* `filterActions.clearFilters()`: clears all filters in the filter list.

#### NOTE: facet name metadata is required

`redux-facet-filters` does not apply facet names to actions created by its action creators. It's up to you to apply them if necessary. If you use the action creators provided to your component by `withFilteredData`, these will be applied automatically. Likewise, if you use these action creators in a saga which is created with `facetSaga`, the facet name will be applied.

To apply a facet name to an action, use `redux-facet`'s `withFacet` helper function.

### `createFilterSelectors(itemsSelector: Function, filterReducer: Function)`

A helper factor which creates a set of facet selector creators you can use to select filtered data from the Redux store.

The parameters are the same as the required parameters for `withFilteredData`. `itemsSelector` is a function which takes the state and returns the items you wish to filter. `filterReducer` is a reducer function which is called successively with your current data set and the next filter in the filter list.

The factory will return an object with facet selector creators. The selector creators provided are:

* `createFilteredDataSelector(facetName: String)`: creates a selector which computes a filtered data set from the data you selected from the store with `itemsSelector`.

#### Example usage

```js
const selectors = createFilterSelectors(selectUsers);

const FacetContainer = facet(
  'users',
  // a helper from the redux-facet library
  // which applies the facetName to all selector creators
  createStructuredFacetSelector({
    items: selectors.createFilteredDataSelector,
  }),
)(ViewComponent);
```

### `filterSelectors`

`redux-facet-filters` ships with a few selector creators and selector creator creators (think of these as "higher order selector creators") which can be used to manually retrieve filter state information for your facet.

* `filterSelectors.createFilterListSelector(facetName: String)`: when called with a facet name, this creates a selector which will return the list of filters.
* `filterSelectors.createFilterSelectorCreator(index: Number)`: when called with an index, this function creates a facet selector creator which will select the filter at the specified index. The returned function can be used like `filterSelectorCreator(facetName: String)`, similarly to `createFilterListSelector`. It returns a selector which can be used against the Redux state.

#### Examples

```js
const filterListSelector = createFilterListSelector('users');
filterListSelector(state);
/*
  [
    { type: 'usernameContains', value: 'foo' },
    { type: 'emailContains', value: '@gmail' },
    { type: 'createdBefore', value: '2017/12/1' },
  ]
*/

const createFilterSelector = createFilterSelectorCreator(2);
const selectFilter = createFilterSelector('users');
selectFilter(state);
/*
  { type: 'createdBefore', value: '2017/12/1' }
*/
```

