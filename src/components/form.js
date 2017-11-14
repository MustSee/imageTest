import React from 'react';
import axios from 'axios';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture : ""
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserInput(e){
        console.log(e.target);
        this.setState({
            picture : e.target.value
        })
    }



    handleSubmit(e) {
        e.preventDefault();
        let path = this.state.picture;
        let file = this.refs.file.files[0];
        console.log(file);
        let name = file.name;
        let size = file.size;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            let pic64 = reader.result;
            // data:image/png;base64,iVBOR
            let pic64v2 = pic64.split(',');
            let contentType = pic64v2[0];
            contentType = contentType.substring(5, 14);
            console.log(contentType);
            let picB64 = pic64v2[1];

            let mak = (picB64, contentType, sliceSize) => {
                contentType = contentType || '';
                sliceSize = sliceSize || 512;

                var byteCharacters = atob(picB64);
                var byteArrays = [];

                console.log('in Blob');

                for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);

                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    var byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                var blob = new Blob(byteArrays, {type: contentType});
                return blob;
            };

            var blobPic = mak(picB64, contentType);
            console.log(blobPic);


            console.log('contentType : ', contentType);
            console.log(typeof pic64, pic64);
            axios.post('http://10.150.14.40:8000/api/test', {
                pic64 : blobPic,
                path : path
            }).then(res => console.log(res))
                .catch(error => console.log(error));
        }
    }


    render () {

        console.log(this.state.picture);

        return (
            <div className="form">
                Form
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="picture">AJOUTER UNE PHOTO</label>
                        <input type="file" className="form-control" name="picture"
                               autoComplete="off"
                               value={this.state.picture}
                               onChange={this.handleUserInput}
                               ref="file"
                        />
                        </div>
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        )
    }
}