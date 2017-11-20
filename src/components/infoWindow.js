import React from 'react';
import axios from 'axios';

export default class InfoWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file : "",
            imagePreviewUrl: ""
        }

    }

    componentDidMount() {
        axios.get('http://10.150.14.40:8000/api/loadActiveImage/', { responseType:"blob" })
            .then(response => {

                var imageEl = document.getElementsByClassName('infoWindow')[0];
                console.log(imageEl);

                var reader = new window.FileReader();
                reader.readAsDataURL(response.data);
                reader.onload = function() {
                    var imageDataUrl = reader.result;
                    imageEl.setAttribute("src", imageDataUrl);

                };




            })
            .catch(error => console.log(error))
    }

    render () {

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} height="200px" width="200px"/>);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        let active = this.props.active;
        return (
            <img className="infoWindow">

            </img>
        )
    }
}