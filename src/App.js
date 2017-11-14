import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/searchBar';
import Form from './components/form';
import InfoWindow from './components/infoWindow';
import Map from './components/map';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive : ''
    };
    this.clickEvent = this.clickEvent.bind(this);
  }

  clickEvent(e){
    this.setState({
      isActive : e
    })
  }


  render() {

    let data = ["thomas", "marc", "yann"];

    return (
        <div className="App">
          <div id="map">
            <Map onClickEvent={this.clickEvent} datas={data} active={this.state.isActive} />
          </div>
          <div className="secondSide">
            <SearchBar />
            <Form />
            <InfoWindow active={this.state.isActive}/>
          </div>
        </div>
    );
  }
}

export default App;
