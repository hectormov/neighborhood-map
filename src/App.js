import React from 'react';
import GoogleMaps from './GoogleMaps'
import Search from './Search';
import Header from './Header'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state.locations = [
      //Ideally, this would be fetched from a DB and update the state with it.
      { name: 'Luna y Sol', id: '5468dc49498edc6b88c89220', location: {lat: 29.745154, lng: -95.377596} },
      { name: 'St. Danes', id: '4b05a7b3f964a52056e022e3', location: {lat: 29.74391, lng: -95.38123} },
      { name: 'Tacos a Go Go', id: '4ad13bbcf964a5209bdd20e3', location: {lat: 29.738444, lng: -95.379889} },
      { name: 'Spicy Girl', id: '599d52765d891b017b6e035b', location: {lat: 29.738873, lng: -95.380134} },
      { name: 'Njoy Thai Restaurant', id: '4fb196e0e4b03ad0edbffc7b', location: {lat: 29.744828 , lng: -95.383524} },
      { name: 'Natachee’s Supper ‘n Punch', id: '4c8bd68555fba0939dd859ab', location: {lat: 29.738856  , lng: -95.379558} }
    ];
    //initializing the filtered locations to include all locations
    this.state.filteredLocations = this.state.locations;
  }

  state = {
    locations: [],
    filteredLocations: [],
    selectedLocation: ''
  }

  // Adds or clears the state of selectedLocation
  selectLocation = (location) => {
    if (location.id === this.state.selectedLocation.id) {
      this.setState({selectedLocation: ''});
    } else {
      this.setState({selectedLocation: location});
    }
  }

  // Helps to filter the list and updates the state of the filtered locations
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

  render() {
    return (
        <div>
          <Header />
          <GoogleMaps
            locations={this.state.locations}
            filteredLocations={this.state.filteredLocations}
            selectedLocation={this.state.selectedLocation}
            myKey={'AIzaSyBB3j35dbLFQFIqURXBo5X11-9b4MiLTe4'}
            home={{ lat: 29.742292, lng: -95.37718 }}
          />
          <Search 
            locations={this.state.locations}
            filteredLocations={this.state.filteredLocations}
            selectedLocation={this.state.selectedLocation}
            selectLocation={this.selectLocation}
            queryUpdate={this.queryUpdate}
          />
        </div>
    );
  }
}

export default App;
