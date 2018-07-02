import React, { Component } from 'react';

class GoogleMaps extends React.Component {
    state = {
        myMap: {},
        markers: []
    }

    componentWillMount(){
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
        this.setState({myMap: mapWindow});
        //delete this below
        console.log('INIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIT')
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
    
    render() {
        const {locations} = this.props;
        if(Object.keys(this.state.myMap).length > 0) {
            const theMap = this.state.myMap
            const infoWindow = new window.google.maps.InfoWindow();
            const bounds = new window.google.maps.LatLngBounds();
            let markers = locations.map((loc, i) => {
                const marker = new window.google.maps.Marker({
                    map: theMap,
                    position: loc.location,
                    title: loc.name,
                    animation: window.google.maps.Animation.DROP,
                    id: i
                })
                bounds.extend(marker.position);
                marker.addListener('click', () => {
                    this.populateInfoWindow(marker, infoWindow, theMap);
                });
                return marker
            })
            theMap.fitBounds(bounds);
        }
        return (
            null
        );
    }
}

export default GoogleMaps