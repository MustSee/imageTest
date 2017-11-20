import React from 'react';
import axios from 'axios';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : ''
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    handleUserInput(e){
        console.log(e.target.files[0]);
        this.setState({
            file : e.target.files[0]
        })
    }

    handleChangeName(e) {
        this.setState({
            name : e.target.value
        })
    }

    fileUpload(file) {
        const url = 'http://10.150.14.40:8000/api/test';
        /*
        As with regular form data, you can append multiple values with the same name.
        For example (and being compatible with PHP's naming conventions by adding [] to the name):
        formData.append('userpic[]', myFileInput1.files[0], 'chris1.jpg');
        formData.append('userpic[]', myFileInput2.files[0], 'chris2.jpg');
        This technique makes it simpler to process multi-file uploads because the resultant data structure
        is more conducive to looping.
         */
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', this.state.name);
        const config = {
            headers : {
                'content-type' : 'multipart/form-data'
            }
        };
        return axios.post(url, formData, config)
    }


    handleSubmit(e) {
        e.preventDefault();
        this.fileUpload(this.state.file).then((response) => {
            console.log(response.data);
        });

    }


    render () {
        console.log(this.state.name);
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
                        <br/>
                        <input type="text"
                               value={this.state.name}
                               onChange={this.handleChangeName}
                        />
                        </div>
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        )
    }
}