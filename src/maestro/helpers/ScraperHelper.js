import { Helper } from 'react-native-maestro';
import mime from 'react-native-mime-types';

export default class ScraperHelper extends Helper {
  static get instanceKey() {
    return 'scraperHelper';
  }

  async scrapeUrlAudioData(url) {
    url = (url.includes('https://')) ? url : `https://${url}`;

    const { apiHelper } = this.maestro.helpers;
    const result = await fetch(url);
    const html = await result.text();
    const response = await apiHelper.post({
      path: '/scraper',
      data: { url, html },
    });

    if (response.code !== 200) {
      throw new Error(response.body);
    }

    const audioUrl = response.body.audio;

    if (!audioUrl) {
      throw new Error('Could not find any audio for this URL.');
    }

    const audio = await fetch(audioUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9',
      },
    });

    const audioHeaders = audio.headers;
    const audioContentType = audioHeaders.map['content-type'];
    const audioExtension = mime.extension(audioContentType);
    const audioBlob = await audio.blob();
    const fileName = audioUrl.split('/').pop().split('?')[0];

    audioBlob.data.name = (fileName.includes('.') ? fileName : `${fileName}.${audioExtension}`);

    if (audioBlob.size < 1000) {
      throw new Error('Audio retrieval failed. Try uploading your audio file instead.');
    }

    return {
      ...response.body,
      blob: audioBlob,
    };
  }
}
