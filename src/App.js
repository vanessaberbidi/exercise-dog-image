import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.fetchDog = this.fetchDog.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.saveDog = this.saveDog.bind(this);
    this.state = {
      message: '',
      error: null,
      name: '',
      array: []
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

  shouldComponentUpdate(nextProps, nextState) {
    console.log('should component update')
    const { message } = nextState;
    return !message.includes('terrier');
  }

  componentDidUpdate() {
    localStorage.setItem('Dog', this.state.array);
    const dogBreed = this.state.message.split('/')[4];
    console.log(dogBreed);
    localStorage.setItem("dogURL", JSON.stringify(this.state.array));
  }

  handleEvent({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    })
  }

  saveDog() {
    const {
      message,
      name,
      array
    } = this.state;
    const dogData = { message, name };
    const newArray = [...array, dogData];
    this.setState({ array: newArray, name: '' });
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
        <div>
          <button onClick={this.saveDog}>Save Dog</button>
        </div>
        <img className="img-width" src={this.state.message} />
      </div>
    );
  }
}
