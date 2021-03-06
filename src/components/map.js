import React from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';
import axios from 'axios';

//import Marker from '../Marker';
//import ClusterMarker from '../ClusterMarker';

//import { markersData, susolvkaCoords } from '../../fakeData';

const markersData = [
    {
        id : 1,
        lat :  48.8364146,
        lng : 2.2337976,
        mercato : 'lolas'
    },
    {
        id : 2,
        lat :  48.836555,
        lng : 2.2392393
    },
    {
        id : 3,
        lat :  48.8346037,
        lng : 2.2383958
    }
];


const MAP = {
    defaultZoom: 17,
    defaultCenter: {lat: 48.834016, lng: 2.236963},
    options: {
        maxZoom: 19
    }
};

export default class GoogleMap extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mapOptions: {
                center: MAP.defaultCenter,
                zoom: MAP.defaultZoom
            },
            clusters: [],
            places : []
        };
    }

    componentDidMount() {
        axios.get("http://10.150.14.40:8000/api/places")
            .then(res => {
                let datas = res.data.places;
                let reformatedDatas = [];
                datas.forEach((element, index) => {
                    reformatedDatas.push(
                        {
                            id : index,
                            lat : element.coordsLatitude,
                            lng :  element.coordsLongitude,
                            name : element.name,
                            adress : element.adress,
                            likeSpot : element.likeSpot
                        }
                    )
                });
                this.setState({
                    places : reformatedDatas
                }, () => {
                    // After having setState places, we create clusters
                    this.createClusters(this.props);
                })
            })
            .catch(error => console.log(error));
    }

    getClusters = props => {
        // C'est ici qu'on passe nos marqueurs - MarkersData
        const clusters = supercluster(this.state.places, {
            minZoom: 0,
            maxZoom: 16,
            radius: 20
        });

        return clusters(this.state.mapOptions);
    };

    createClusters = props => {
        this.setState({
            clusters: this.state.mapOptions.bounds
                ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
                lat: wy,
                lng: wx,
                numPoints,
                id: `${numPoints}_${points[0].id}`,
                points
            }))
                : []
        })
    };

    handleMapChange = ({ center, zoom, bounds }) => {
        //console.log(center, zoom, bounds, 'in it');
        // bounds : limits North East West South of the map
        this.setState(
            {
                mapOptions: {
                    center,
                    zoom,
                    bounds
                }
            },
            () => {
                this.createClusters(this.props);
            }
        );
    };

    render() {
        return (
                <GoogleMapReact
                    defaultZoom={MAP.defaultZoom}
                    defaultCenter={MAP.defaultCenter}
                    options={MAP.options}
                    onChange={this.handleMapChange}
                    bootstrapURLKeys={{ key: 'AIzaSyAS3ix4rVY4A-T4yPzWlEi766ycl2mY818' }}
                >


                    {this.state.clusters.map(item => {
                        if (item.numPoints === 1) {
                            return (
                                <div className="small"
                                    key={item.id}
                                    lat={item.points[0].lat}
                                    lng={item.points[0].lng}
                                ></div>
                            );
                        }

                        return (
                            <div className="big"
                                key={item.id}
                                lat={item.lat}
                                lng={item.lng}
                                points={item.points.length}
                            >
                                {item.points.length}
                            </div>
                        );
                    })}


                </GoogleMapReact>
        );
    }
}
