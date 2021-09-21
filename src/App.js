
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      liked: false
    };
    // this.handleClick = this.handleClick.bind(this);
  }

//alternative button option: 
  // handleClick(index) {
  //   let photos = [...this.state.photos]
  //   let photo = {...photos[index]}
  //   photo.liked = true 
  //   photos[index] = photo 
  //   this.setState({photos})

  //   console.log(photo)
  // }

  handleClick2(index) {
    // let photos = [...this.state.photos]
    // let photo = {...photos[index]}

    this.setState({
      liked: !this.state.liked
    })
  }

  componentDidMount() {
    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
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
