import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React from 'react';

// need to create some way for every 15-20th picture to load otherwise it looks like a lot of duplicates

// const data = [
//   {name: "Paige", age: 30},
//   {name: "Jamie", age: 40}
// ]
const api_key = "0eaoWv5ps3d3NN1uYKFwRkRqWVTTaRLwR4E7lD0n"
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      photos: []
    }
  }
  componentDidMount() {
    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${api_key}`).then((response) => {
      // console.log(response) 
      this.setState({photos: response.data.photos})
    })
  }

  photoAlt(inputPhoto) {
    return `photo from the ${inputPhoto.rover.name} rover ${inputPhoto.camera.name} camera taken on ${inputPhoto.rover.landing_date}` 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {
            this.state.photos.map((scopeVariablePhoto) => {
              return(
                //add title of image, date of capture, rover name, make image smaller
                <div>
                  <div key={scopeVariablePhoto.id}> 
                    <img src={scopeVariablePhoto.img_src} alt={this.photoAlt(scopeVariablePhoto)}></img>
                    <h3>{scopeVariablePhoto.camera.name}</h3> 
                    
                  </div>
                </div>
              )
            })
          }
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}



export default App;