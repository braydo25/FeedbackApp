import { Helper } from 'react-native-maestro';
import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'now',
    ss: '%ss',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1M',
    MM: '%dM',
    y: '1Y',
    yy: '%dY',
  },
});

export default class TimeHelper extends Helper {
  static get instanceKey() {
    return 'timeHelper';
  }

  fromNow(time) {
    return moment(time).fromNow(true);
  }

  calendarTime(time) {
    return moment(time).calendar(null, {
      sameDay: '[Today] [at] LT',
      nextDay: '[Tomorrow] [at] LT',
      nextWeek: 'dddd [at] LT',
      lastDay: '[Yesterday] [at] LT',
      lastWeek: 'MM/DD/YYYY LT',
      sameElse: 'MM/DD/YYYY LT',
    });
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
