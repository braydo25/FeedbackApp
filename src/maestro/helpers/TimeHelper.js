import { Helper } from 'react-native-maestro';

export default class TimeHelper extends Helper {
  static get instanceKey() {
    return 'timeHelper';
  }

  secondsToTime(seconds) {
    const numberSeconds = parseInt(seconds, 10);
    const calculatedHours = Math.floor(numberSeconds / 3600);
    const calculatedMinutes = Math.floor((numberSeconds - (calculatedHours * 3600)) / 60);
    const calculatedSeconds = numberSeconds - (calculatedHours * 3600) - (calculatedMinutes * 60);
    const paddedHours = (calculatedHours < 10) ? `0${calculatedHours}` : calculatedHours;
    const paddedMinutes = (calculatedMinutes < 10) ? `0${calculatedMinutes}` : calculatedHours;
    const paddedSeconds = (calculatedSeconds < 10) ? `0${calculatedSeconds}` : calculatedSeconds;

    return (calculatedHours > 0) ? `${paddedHours}:${paddedMinutes}:${paddedSeconds}` : `${paddedMinutes}:${paddedSeconds}`;
  }
}
