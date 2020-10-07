import { Helper } from 'react-native-maestro';

export default class LevelsHelper extends Helper {
  static get instanceKey() {
    return 'levelsHelper';
  }

  constant = 0.2;
  commentExp = 50;

  expToLevel = exp => {
    return Math.max(Math.floor(this.constant * Math.sqrt(exp)), 1);
  }

  expForLevel = level => {
    if (level === 1) {
      return 0;
    }

    return Math.ceil(Math.pow(level, 2) / Math.pow(this.constant, 2));
  }

  relativeLevelExp = exp => {
    if (this.expToLevel(exp) === 1) {
      return exp;
    }

    return exp - this.expForLevel(this.expToLevel(exp));
  }

  relativeExpForNextLevel = currentExp => {
    const currentLevel = this.expToLevel(currentExp);

    return this.expForLevel(currentLevel + 1) - this.expForLevel(currentLevel);
  }
}
