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
      photos: [],
      liked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // handleClick(index) {
  //   let photos = [...this.state.photos]
  //   let photo = {...photos[index]}
  //   photo.liked = true 
  //   photos[index] = photo 
  //   this.setState({photos})
  //   console.log(photo)
  // }

  handleClick() {
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
        <header className="App-header">
          {
            this.state.photos.map((scopeVariablePhoto, index) => {
              
              return(
                //add title of image, date of capture, rover name, make image smaller
                <div>
                  <div id="container" key={scopeVariablePhoto.id}> 
                    <div class="description">
                      <h5>{scopeVariablePhoto.rover.name} Rover</h5>
                      <p>{scopeVariablePhoto.camera.name}({scopeVariablePhoto.camera.full_name})</p>
                      <p>Image Date: {scopeVariablePhoto.earth_date}</p>
                    </div>
                    <div class="img-container">
                      <img src={scopeVariablePhoto.img_src} alt={this.photoAlt(scopeVariablePhoto)} width="400" height="280"></img>
                      <button className="like-btn" onClick={() => this.handleClick()}>{label}</button>
                      </div>
                    {/* <button style={scopeVariablePhoto.liked && {color: 'purple'}} onClick={() => this.handleClick(index)}>Like</button> */}
                    {/* <p>
                    you {text} this. Click to toggle.
                  </p> */}
                   
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
