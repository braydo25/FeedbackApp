import { Helper } from 'react-native-maestro';

export default class ScraperHelper extends Helper {
  static get instanceKey() {
    return 'scraperHelper';
  }

  async scrapeUrl(url) {
    const result = await fetch(url);

    return result.text();
  };
}
