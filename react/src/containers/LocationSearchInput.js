import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./AddEvent.css";
import MapWithAMarker from "./MapComponent";

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      viewMap: false,
      completeAddress: "",
      coordinates: {},
    };
  }

  resetLocation = () => {
    this.setState({ address: "", completeAddress: "", viewMap: false });
    let specificLocation = {
      name: "",
      address: "",
    };
    this.props.handleChange({
      target: { name: "specificLocation", value: specificLocation },
    });
  };

  handleChange = (address) => {
    this.setState({ address, completeAddress: "", viewMap: false });
    let specificLocation = {
      name: address,
      address: "",
    };
    this.props.handleChange({
      target: { name: "specificLocation", value: specificLocation },
    });
  };

  handleCompleteAdress = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSelect = async (address) => {
    this.setState({
      address: address,
    });
    let specificLocation = {};
    specificLocation.name = address;
    address = await geocodeByAddress(address);
    let coordinates = await getLatLng(address[0]);
    specificLocation.location = {
      type: "Point",
      coordinates: [coordinates.lng, coordinates.lat],
    };
    address = address[0].address_components.map((e) => e.long_name);
    specificLocation.address = "";
    address.forEach((element) => {
      specificLocation.address += element + ", ";
    });
    specificLocation.address = specificLocation.address.substring(
      0,
      specificLocation.address.length - 2
    );
    this.setState({
      completeAddress: specificLocation.address,
      viewMap: true,
      coordinates,
    });
    this.props.handleChange({
      target: { name: "specificLocation", id: "specificLocation", value: specificLocation },
    });
  };

  render() {
    return (
      <div>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className="places-autocomplete">
              <input
                {...getInputProps({
                  placeholder: "Search for specific location ...",
                  className: "location-search-input form-control",
                })}
              />
              {this.state.address && (
                <span onClick={this.resetLocation} className="cross-btn">
                  x
                </span>
              )}
              {this.state.completeAddress && !this.props.noFullAddress && (
                <textarea
                  placeholder="Address"
                  className="form-control"
                  onChange={this.handleCompleteAdress}
                  value={this.state.completeAddress}
                  name="completeAddress"
                  rows="2"
                  style={{
                    resize: "none",
                  }}
                />
              )}
              <div className="autocomplete-dropdown-container">
                {loading && <div>Searching...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        backgroundColor: "#ebe6e6",
                        cursor: "pointer",
                        borderBottom: "1px solid #e2d9d9",
                        padding: "5px",
                      }
                    : {
                        backgroundColor: "#ffffff",
                        cursor: "pointer",
                        borderBottom: "1px solid #e2d9d9",
                        padding: "5px",
                      };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span className="suggestion-drpdwn">
                        <i className="location-marker fas fa-map-marker-alt"></i>
                        {suggestion.description}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        {this.state.viewMap && !this.props.noMap && (
          <MapWithAMarker
            coordinates={this.state.coordinates}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        )}
      </div>
    );
  }
}
