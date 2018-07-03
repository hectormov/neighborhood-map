import React from 'react';
import { Route } from 'react-router-dom'
import GoogleMaps from './GoogleMaps'
import Search from './Search';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state.locations = [
      //Ideally, this would be fetched from a DB and update the state with it.
      { name: 'Luna y Sol', id: 'lys', location: {lat: 29.745154, lng: -95.377596} },
      { name: 'St. Danes', id: 'sds', location: {lat: 29.74391, lng: -95.38123} },
      { name: 'Tacos a Go Go', id: 'tagg', location: {lat: 29.738444, lng: -95.379889} },
      { name: 'Spicy Girl', id: 'sg', location: {lat: 29.738873, lng: -95.380134} },
      { name: 'viet', id: 'hs', location: {lat: 29.744828 , lng: -95.383524} }
    ];
    //initializing the filtered locations to include all locations
    this.state.filteredLocations = this.state.locations;
  }

  state = {
    locations: [],
    filteredLocations: [],
    selectedLocation: ''
  }

  selectLocation = (location) => {
    if (location.id === this.state.selectedLocation.id) {
      this.setState({selectedLocation: ''});
    } else {
      this.setState({selectedLocation: location});
    }
  }

  queryUpdate = (value) => {
    this.setState(currentState => {
      let filteredLocations = [];
      const curLocations = currentState.locations;
      if(value !== '') {
        filteredLocations = curLocations.filter(loc => {
          return loc.name.toLowerCase().includes(value.toLowerCase());
        })
      } else {
        filteredLocations = curLocations;
      }
      return({filteredLocations});
    });
  }

  // TODO: Implement filtering of the markers alongside the text

  render() {
    return (
      <Route path='/' render={() => (
        <div>
          <GoogleMaps
            locations={this.state.locations}
            filteredLocations={this.state.filteredLocations}
            selectedLocation={this.state.selectedLocation}
            myKey={'AIzaSyBB3j35dbLFQFIqURXBo5X11-9b4MiLTe4'}
            home={{
              lat: 29.742292,
              lng: -95.37718
            }}
            />
          <Search 
            locations={this.state.locations}
            filteredLocations={this.state.filteredLocations}
            selectedLocation={this.state.selectedLocation}
            selectLocation={this.selectLocation}
            queryUpdate={this.queryUpdate}
          />
        </div>
      )} />
    );
  }
}

export default App;
