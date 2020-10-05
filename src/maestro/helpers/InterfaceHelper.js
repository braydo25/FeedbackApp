import { Helper } from 'react-native-maestro';

export default class InterfaceHelper extends Helper {
  static get instanceKey() {
    return 'interfaceHelper';
  }

  showError = ({ message, delay }) => {
    message = (typeof message === 'object') ? message.message : message;

    this.showOverlay({
      name: 'Error',
      data: { message, delay },
    });
  }

  showOverlay = ({ name, data }) => {
    this.maestro.dispatchEvent('OVERLAYS:SHOW', { name, data });
  };

  hideOverlay = name => {
    this.maestro.dispatchEvent('OVERLAYS:HIDE', { name });
  }
}
