
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React from 'react';

console.log('REACT_APP_NASA_API_KEY')
// fix like button 
// style cards 
// hide api key
// deploy app 
// create way for every 15-20th picture to load otherwise it looks like a lot of duplicates


// const data = [
//   {name: "Paige", age: 30},
//   {name: "Jamie", age: 40}
// ]

const api_key = "0eaoWv5ps3d3NN1uYKFwRkRqWVTTaRLwR4E7lD0n"

// const api_key = process.env.REACT_APP_API_KEY

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      liked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index) {
    let photos = [...this.state.photos]
    let photo = {...photos[index]}
    photo.liked = true 
    photos[index] = photo 
    this.setState({photos})
    console.log(photo)
  }

  handleClick2(index) {
    let photos = [...this.state.photos]
    let photo = {...photos[index]}

    this.setState({
      liked: !this.state.liked
    })
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
    const text = this.state.liked ? 'liked' : 'haven\'t liked;'
    const label = this.state.liked ? 'Unlike' : "Like"

    return (
      <div className="App">
        <h1>Spacetagram</h1>
        <header className="App-header">
          {
            this.state.photos.map((scopeVariablePhoto, index) => {
              
              return(
                
                <div>
                  <div class="image-card" key={scopeVariablePhoto.id}> 
                    <div class="description">
                      <p>{scopeVariablePhoto.rover.name} Rover - {scopeVariablePhoto.camera.full_name}({scopeVariablePhoto.camera.name})</p>
                      
                      <p>Image Date: {scopeVariablePhoto.earth_date}</p>
                    </div>
                    <div class="img-container">
                      <img src={scopeVariablePhoto.img_src} alt={this.photoAlt(scopeVariablePhoto)} width="400" height="280"></img>
                    
                    {/* <button style={scopeVariablePhoto.liked && {color: 'purple'}} onClick={() => this.handleClick(index)}>Like</button>  */}
                    
                      <button className="like-btn" onClick={() => this.handleClick2(index)}>{label}</button>
                      </div>
                   
                  </div>
                </div>
              )
            })
          }
          
        </header>
      </div>
    );
  }
}



export default App;
