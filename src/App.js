import React from 'react';
import { Route } from 'react-router-dom'
import GoogleMaps from './GoogleMaps'

class App extends React.Component {
  state = {
    locations: [
      //Ideally, this would be fetched from a DB
      { name: 'Luna y Sol', location: {lat: 29.745154, lng: -95.377596} },
      { name: 'St. Danes', location: {lat: 29.74391, lng: -95.38123} },
      { name: 'Tacos a Go Go', location: {lat: 29.738444, lng: -95.379889} },
      { name: 'Spicy Girl', location: {lat: 29.738873, lng: -95.380134} },
      { name: 'Hugos', location: {lat: 29.744828 , lng: -95.383524} }
    ],
    filteredLocations: []
  }
  render() {
    return (
      <Route path='/' render={() => (
      <GoogleMaps
        locations={this.state.locations}
        myKey={'AIzaSyBB3j35dbLFQFIqURXBo5X11-9b4MiLTe4'}
        home={{
          lat: 29.742292,
          lng: -95.37718
        }}
      />
      )} />
    );
  }
}

export default App;
