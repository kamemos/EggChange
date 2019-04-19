import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Route from "./routes";
import { Navbar } from "./components";
import { Provider } from "react-redux";
import getStore from './redux/store'

class App extends Component {
  state = {
    width: -1
  }
  onResize = (e) => {
    if (this._isMounted) {
      this.setState({ width: document.body.clientWidth })
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this._isMounted = true;
    this.onResize();
  }
  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.onResize);
  }
  render() {
    return (
      <Provider store={getStore()}>
        <BrowserRouter>
          <Navbar windowWidth={this.state.width} />

          <Route/>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
