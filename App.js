import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";
import Navigation from "./Components/Navigation/Navigation";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import Logo from "./Components/Logo/Logo";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import "./App.css";
import "tachyons";
import "./index.css";

const app = new Clarifai.App({
  apiKey: "22aadbeb7b17409d8314f5287ad19e98",
});

const particlesOptions = {
  particles: {
    number: {
      value: 25,
      density: {
        enable: true,
        value_area: 600
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      umarIsIn: false,
    };
  }
  calculateFaceLocation = (data) => {
    
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width), 
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    //console.log(box);
    this.setState( {box} );
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input
      )
      .then(
        function (response) {
          this.displayFaceBox(this.calculateFaceLocation(response));
        },
        function (err) {
          // there was an error
        }
      );
  };

  onRouteChange = (route) => {
    if (route === "signout") {
    this.setState({umarIsIn: false});
    } else if (route === "home") {
      this.setState( {umarIsIn: true} );
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation umarIsIn={this.state.umarIsIn} onRouteChange={this.onRouteChange} />
          { this.state.route === "home" 
          ? 
        <>
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}
        />
        </>
        : (
          this.state.route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange} />
          : <Register onRouteChange={this.onRouteChange} />
        )
      }
      </div>
    );
  }
}


export default App;
