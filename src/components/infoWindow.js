import React from 'react';

export default class InfoWindow extends React.Component {
    constructor(props) {
        super(props);

    }

    render () {
        let active = this.props.active;
        return (
            <div className="infoWindow">
                Infowindow<br/>
                {active}
            </div>
        )
    }
}