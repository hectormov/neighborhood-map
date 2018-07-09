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
      { name: 'Natachee’s Supper ‘n Punch', id: '4c8bd68555fba0939dd859ab', location: {lat: 29.738856  , lng: -95.379558} },
      { name: 'Piola', id: '4c589ea404f9be9a8a67ed60', location: {lat: 29.742810  , lng: -95.379749} },
      { name: 'Beer Market', id: '54dbe8e3498e085d40987e64', location: {lat: 29.741998  , lng: -95.379685} },
      { name: `Mai's`, id: '4d3f2b86557d6dcb9bfd5544', location: {lat: 29.741152  , lng: -95.379752} },
      { name: `Les Givral's`, id: '4b2fae2af964a520e9ed24e3', location: {lat: 29.745505  , lng: -95.376897} },
      { name: `Cali Sandwiches`, id: '4ab15335f964a520046920e3', location: {lat: 29.743688  , lng: -95.377249} },
      { name: `Simply Pho`, id: '50e5e014f31ce7d874a05bf7', location: {lat: 29.743855  , lng: -95.377614} },
      { name: `Weights + Measures`, id: '533a412f498e24595b81e4f6', location: {lat: 29.742603  , lng: -95.372871} },
      { name: `Chipotle`, id: '5254113f11d237a594dd0731', location: {lat: 29.746256  , lng: -95.376241} },
      { name: `Gloria's`, id: '4fdbc1f5e4b000729b993c8f', location: {lat: 29.746750  , lng: -95.377121} }
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
