import React, { Component } from 'react';

class GoogleMaps extends Component {
    state = {
        myMap: {},
        markers: []
    }

    componentWillMount() {
        let bodyEl = document.querySelector('body');
        let mapElement = document.createElement('div');
        mapElement.id = 'map';
        bodyEl.appendChild(mapElement);
        let scriptElement = document.createElement('script');
        scriptElement.async = true;
        scriptElement.defer = true;
        scriptElement.src = `https://maps.googleapis.com/maps/api/js?key=${this.props.myKey}&v=3&callback=initMap`;
        bodyEl.appendChild(scriptElement);
        window.initMap = this.initMap;
    }

    initMap = () => {
        const mapWindow = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: this.props.home.lat, lng: this.props.home.lng }, 
            zoom: 15
        });
        this.setState({myMap: mapWindow}, ( () => {
            //Initialize all markers
            const locations = this.props.locations;
            const theMap = this.state.myMap
            const infoWindow = new window.google.maps.InfoWindow();
            const bounds = new window.google.maps.LatLngBounds();
            let markers = locations.map((loc, i) => {
                const marker = new window.google.maps.Marker({
                    map: theMap,
                    position: loc.location,
                    title: loc.name,
                    animation: window.google.maps.Animation.DROP,
                    id: loc.id
                });
                bounds.extend(marker.position);
                marker.addListener('click', () => {
                    this.populateInfoWindow(marker, infoWindow, theMap);
                });
                return marker
            })
            theMap.fitBounds(bounds);
            this.setState({markers});
        }));
    }

    populateInfoWindow = (marker, infoWindow, theMap) =>{
        if(infoWindow.marker !== marker){
            infoWindow.marker = marker;
            infoWindow.setContent('<div>' + marker.title + '</div>')
            infoWindow.open(theMap, marker);
            infoWindow.addListener('closeClick', () => {
                infoWindow.setMarker(null);
            });
        }
    };

    //Removes or adds animation to a marker
    // animation 1 = BOUNCE
    isSelected = (marker) => {
        // debugger
        const selectedLoc = this.props.selectedLocation;
        // if (selectedLoc !== '') {
        //     if(marker.animating) {
        //         return null
        //     }
            return marker.id === selectedLoc.id ? 1 : null
        // } 
        // return null
    };

    showHideMarker = (markers, filteredLocations) => {
        // if (filteredLocations.findIndex(loc => loc.id === marker.id) !== -1) {
        //     marker.setMap(this.state.myMap);
        // } else {
        //     marker.setMap(null);
        // }
        let newMarkers = markers.map(marker => {
            if (filteredLocations.findIndex(loc => loc.id === marker.id) !== -1) {
                return marker.setMap(this.state.myMap);
            } else {
                return marker.setMap(null);
            }
        })
        
    };
    
    render() {
        const {filteredLocations} = this.props;
        const markers = this.state.markers
        return (
            <div>
                {
                    markers.map( marker => {
                        return marker.setAnimation(this.isSelected(marker));
                    })
                }
                
            </div>
        );
    }
}

export default GoogleMaps