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

    this.img2 = new Image(
      "https://uploads.codesandbox.io/uploads/user/b082e46e-e20c-4323-a8fd-973177bfd7a9/HgNz-img2.png",
      849,
      569
    );

    this.state = {
      scale: 0,
      img1: new Image(
        "https://uploads.codesandbox.io/uploads/user/b082e46e-e20c-4323-a8fd-973177bfd7a9/aOvY-img1.png",
        808,
        539
      ),
      img2: this.img2,
      opacity: 100
    };
  }

  handleOpacityChange = e => {
    this.setState({ opacity: e.target.value });
  };

  handleOffsetClick = e => {
    const img = this.state.img1;
    var x = img.offset.x;
    var y = img.offset.y;
    switch (e.target.value) {
      case "top":
        y += 1;
        break;
      case "bottom":
        y -= 1;
        break;
      case "right":
        x += 1;
        break;
      case "left":
        x -= 1;
        break;
      default:
    }
    img.setOffset(x, y);
    this.setState({ img1: img });
  };

  handleScaleChange = e => {
    const positive = e.target.value >= 0;
    const value = Math.sqrt(Math.pow(e.target.value, 2)) / 100;
    const scale = positive ? value + 1 : 1 - value;

    this.state.img2.setScale(scale);

    this.setState({
      scale: e.target.value
    });
  };

  render() {
    return (
      <div>
        scale:
        <input
          type="number"
          value={this.state.scale}
          min={-100}
          max={100}
          onChange={this.handleScaleChange}
        />
        opacity:
        <input
          type="range"
          min={0}
          max={100}
          value={this.state.opacity}
          onChange={this.handleOpacityChange}
        />
        <button value="top" onClick={this.handleOffsetClick}>
          top
        </button>
        <button value="bottom" onClick={this.handleOffsetClick}>
          bottom
        </button>
        <button value="left" onClick={this.handleOffsetClick}>
          left
        </button>
        <button value="right" onClick={this.handleOffsetClick}>
          right
        </button>
        <input
          type="text"
          value={this.state.img1.offset.x + "x" + this.state.img1.offset.y}
        />
        <Map
          crs={L.CRS.Simple}
          zoom={0}
          center={[0, 0]}
          zoomControl={true}
          zoomSnap={0}
        >
          <ImageOverlay
            url={this.state.img2.url}
            bounds={this.state.img2.getBounds()}
            corners={this.state.corners}
            opacity={this.state.opacity / 100}
          />
          <ImageOverlay
            url={this.state.img1.url}
            bounds={this.state.img1.getBounds()}
            opacity={this.state.opacity / 100}
          />
          <MagnifyingGlassControl zoomOffset={1} />
        </Map>
      </div>
    );
  }
}

export default App;
