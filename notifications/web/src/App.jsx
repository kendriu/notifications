import React from 'react';
import {render} from 'react-dom';
import NotificationSystem from 'react-notification-system';


class App extends React.Component {

  constructor (props) {
    super(props);
    this._notificationSystem = null;
    this._addNotification = this._addNotification.bind(this);
  }

  componentDidMount () {
    this._notificationSystem = this.refs.notificationSystem;
  }

  _addNotification (event) {
    event.preventDefault();
    this._notificationSystem.addNotification({
      message: 'Notification message',
      level: 'success'
    });
  }

   render () {
     return  (
         <div>
         <button onClick={this._addNotification}>Add notification</button>
         <NotificationSystem ref="notificationSystem" />
         </div>
     );
   }

}
render(<App/>, document.getElementById('app'));
