import React from 'react';

export default class FilterCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'color',
      value: 'orange',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onCreate(this.state.type, this.state.value);
  };

  getDefaultValue = type => {
    switch(type) {
      case 'color':
        return 'orange';
      case 'numberGreater':
        return 0;
      case 'numberLess':
        return 100;
      default:
        return 0;
    }
  }

  handleTypeChange = e => {
    this.setState({ type: e.target.value, value: this.getDefaultValue(e.target.value) });
  };

  handleValueChange = e => {
    this.setState({ value: e.target.value });
  };

  renderValueField = () => {
    const { type, value } = this.state;
    switch(type) {
      case 'numberGreater':
      case 'numberLess':
        return (
          <input onChange={this.handleValueChange} value={value} type="number" required />
        );
      case 'color':
        return (
          <select onChange={this.handleValueChange} value={value} required>
            <option>orange</option>
            <option>yellow</option>
            <option>blue</option>
          </select>
        );
      default:
        return <span>Choose a filter type</span>;
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <select value={this.state.type} onChange={this.handleTypeChange} style={{ marginRight: '1em' }}>
          <option>color</option>
          <option value="numberGreater">number &gt;</option>
          <option value="numberLess">number &lt;</option>
        </select>
        {this.renderValueField()}
        <button type="submit" style={{ marginLeft: '1em' }}>Add</button>
      </form>
    )
  }
}
