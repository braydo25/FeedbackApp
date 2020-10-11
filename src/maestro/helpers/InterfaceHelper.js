import { Helper } from 'react-native-maestro';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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

  deviceValue = options => {
    let result = options.default;

    result = (width < 411 && options.xs) ? options.xs : result;
    result = (width >= 411 && options.sm) ? options.sm : result;
    result = (width >= 568 && options.md) ? options.md : result;
    result = (width >= 768 && options.lg) ? options.lg : result;
    result = (width >= 1024 && options.xl) ? options.xl : result;
    result = (width >= 1280 & options.xxl) ? options.xxl : result;

    return result;
  }
}
