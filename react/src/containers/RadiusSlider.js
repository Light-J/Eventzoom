import React, { Component } from 'react'
import Slider from 'react-rangeslider'
 
class RadiusSlider extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      volume: 50
    }
  }
 
  handleOnChange = (value) => {
    this.setState({
      volume: value
    })
    this.props.handleChange({target : {id: "radius", value}})
  }
 
  render() {
    let { volume } = this.state
    return (
    <div className="radius-select">Radius: <span className="radius-value">{volume} km</span>
        <Slider
            min={1}
            max={10000}
            step={20}
            value={volume}
            onChange={this.handleOnChange}
      />
      </div>
    )
  }
}
export default RadiusSlider;