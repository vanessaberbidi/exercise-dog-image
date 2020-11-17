import React from 'react';

export default class RenderDogs extends React.Component {
  componentDidUpdate () {
    if (this.props.value.includes('terrier')) {
      console.log('ops!');
      return false;
    } else {
      console.log('oba!');
      return true;
    }
  }
  render() {
    return (
      <div>
        <img className="img-width" src={this.props.value}/>
      </div>
    )
  }
}