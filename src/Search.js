import React, { Component } from 'react';

class Search extends Component {
    
    render() {
        const {locations, filteredLocations, selectedLocation, selectLocation, queryUpdate} = this.props; 
        let locs = filteredLocations === [] ? locations : filteredLocations;   
        return (
            <div className='search-and-list'>
                <div>
                    <input type="text" placeholder='Restaurant Name' onChange={event => queryUpdate(event.target.value)}/>
                </div>
                <ul>
                    {
                        locs.map((location, index) => {
                            const isSelected = (location.id === selectedLocation.id ? 'row-selected' : '');
                            return (
                                <li 
                                    key={index} 
                                    onClick={ () => selectLocation(location)}
                                    className={isSelected}
                                    >
                                    <span>{location.name}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Search;