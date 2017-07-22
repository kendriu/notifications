import React from 'react';
import {render} from 'react-dom';
import NotificationSystem from 'react-notification-system';
import Push from 'push.js';


class App extends React.Component {

  constructor (props) {
    super(props);
    this._notificationSystem = null;
    this._websocket = null;
    this._addNotification = this._addNotification.bind(this);
    this._sendNotification = this._sendNotification.bind(this);
    this._onWebsocketError = this._onWebsocketError.bind(this);
    this._sendMessage = this._sendMessage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount () {
    this._notificationSystem = this.refs.notificationSystem;
  }

  _sendMessage(message){

    if ( this._websocket === null ||
         this._websocket.readyState === this._websocket.CLOSED ||
         this._websocket.readyState === this._websocket.CLOSING) {
      this._websocket = new WebSocket('ws://' + window.location.host + '/ws');
      this._websocket.onmessage = this._addNotification;
      this._websocket.onerror = this._onWebsocketError;
      this._websocket.onopen = function() {this.send(message);};
    } else {
      this._websocket.send(message);
    }
  }

  _onWebsocketError(event) {
    this._notificationSystem.addNotification({
      message: 'Not connected to the server. Try again.',
      level: 'error'
    });
  }

  _sendNotification(event) {
    event.preventDefault();
    let message = event.target.getElementsByTagName('textarea')[0].value;
    this._sendMessage(message);
  }

  _addNotification (event) {
    this._notificationSystem.addNotification({
      message: event.data,
      level: 'success'
    });
    Push.create(event.data);

  }

   render () {
     return  (
         <div>
           <form onSubmit={this._sendNotification}>
             <textarea></textarea>
             <br />
             <input type="submit" value="send" />
           </form>
           <NotificationSystem ref="notificationSystem" />
         </div>
     );
   }

}

render(<App/>, document.getElementById('app'));
