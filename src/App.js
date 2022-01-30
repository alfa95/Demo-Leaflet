import "./styles.css";
import React, { Component } from "react";
import L from "leaflet";
import { Map, ImageOverlay, withLeaflet } from "react-leaflet";
// import ReactDistortableImageOverlay from "react-leaflet-distortable-imageoverlay";
import MagnifyingGlassControlDefault from "react-leaflet-magnifying-glass";
const MagnifyingGlassControl = withLeaflet(MagnifyingGlassControlDefault);

class Image {
  constructor(url, width, height) {
    this.url = url;
    this.scale = 1;
    this.offset = {
      x: 0,
      y: 0
    };
    this.originalWidth = width;
    this.originalHeight = height;
    this.width = width;
    this.height = height;
  }
  setScale = scale => {
    this.scale = scale;
    this.width = this.originalWidth * scale;
    this.height = this.originalHeight * scale;
  };
  setOffset = (x, y) => {
    this.offset.x = x;
    this.offset.y = y;
  };
  getBounds = () => {
    return [this.getTopLeft(), this.getBottomRight()];
  };
  getTopLeft = () => [this.height * -1 + this.offset.y, 0 + this.offset.x];
  getTopRiht = () => [
    this.height * -1 + this.offset.y,
    this.width + this.offset.x
  ];
  getBottomLeft = () => [0 + this.offset.y, this.width + this.offset.x];
  getBottomRight = () => [0 + this.offset.y, this.width + this.offset.x];
}

class App extends Component {
  constructor(props) {
    super(props);
    this.arImage = [];
    for(var i=0; i<4; i++) {
        this.arImage.push(
          new Image(
            `/img${i}.png`,
            849,
            569
          )
        )
    }

    this.state = {
      arImage: this.arImage
    };
  }
  maxImage = 4;
  handleAdd = e => {
    const img= this.state.arImage;
    console.log(img.length);
    if(img.length<this.maxImage)
    img.push(
      new Image(
        `/img${img.length}.png`,
        849,
        569
      )
    );
    this.setState({ arImage: img });
  };

  handleRemove = e => {
    const img= this.state.arImage;
    if(img.length>0)
    img.pop();
    console.log(img);
    this.setState({ arImage: img });
  };

  render() {
    return (
      <div>
        <button value="add" onClick={this.handleAdd}>
          ADD
        </button>
        <button value="remove" onClick={this.handleRemove}>
          Remove
        </button>
        <Map
          crs={L.CRS.Simple}
          zoom={0}
          center={[0, 0]}
          zoomControl={true}
          zoomSnap={0}
        >
          {this.state.arImage.map(function(value,i){
        return <ImageOverlay 
        key={i.toString()}
        url={value.url}
            bounds={value.getBounds()}
            corners={value.corners}
            opacity={value.opacity / 100}
        />;
    })}
          <MagnifyingGlassControl zoomOffset={1} />
        </Map>
      </div>
    );
  }
}

export default App;
