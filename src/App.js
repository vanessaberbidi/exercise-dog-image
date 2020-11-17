import React from 'react';
import './App.css';
import './RenderDogs';
import RenderDogs from './RenderDogs';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.fetchDog = this.fetchDog.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.state = {
      message: '',
      error: null,
      name: '',
      breedsDog: ''
    }
  }

  fetchDog() {
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          message: result.message,
        })
      },
      (error) => {
        this.setState({
          error
        })
      }
    )
  }

  componentDidMount() {
    this.fetchDog();
  }

  shouldComponentUpdate() {
    if(this.state.message.includes('terrier')) {
      console.log('false');
      return false
    } else {
      console.log('true')
      return true
    }
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.name, this.state.message);
    const dogBreed = this.state.message.split('/')[4];
    console.log(dogBreed)
  }

  handleEvent({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    })
  }

  render() {
    if (this.state.message === '') return 'Loading...';
    return (
      <div>
        <div>
          <button className="button-style" onClick={this.fetchDog}>Next Dog</button>
        </div>
        <div>
          <label htmlFor="dogsname">Give a name to the Dog</label>
          <input
            type="text"
            id="dogsname"
            name="name"
            value={this.state.name}
            onChange={this.handleEvent}
          />
        </div>
        <img className="img-width" src={this.state.message} />
        <div>{this.state.breedsDog}</div>
      </div>
    );
  }
}
