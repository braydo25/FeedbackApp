import { Helper } from 'react-native-maestro';
import { Alert } from 'react-native';
import * as StoreReview from 'expo-store-review';

const reviewRequestTitle = 'Rate Soundhouse';
const reviewRequestText = "If you enjoy using Soundhouse, would you mind taking a moment to rate it? It won't take more than a minute. We really appreciate the support!";
const minimumTimeSinceLastRequest = 1 * 24 * 60 * 60 * 1000; // 1 day

const LAST_REVIEW_REQUEST_KEY = 'LAST_REVIEW_REQUEST';
const REVIEWED_APP_KEY = 'REVIEWED_APP';

export default class AppStoreReviewHelper extends Helper {
  static get instanceKey() {
    return 'appStoreReviewHelper';
  }

  async requestRating() {
    const { asyncStorageHelper } = this.maestro.helpers;
    const lastRequestAt = await asyncStorageHelper.getItem(LAST_REVIEW_REQUEST_KEY);
    const reviewedApp = await asyncStorageHelper.getItem(REVIEWED_APP_KEY);

    if (!(await StoreReview.isAvailableAsync()) || reviewedApp || (Date.now() - (lastRequestAt || 0)) < minimumTimeSinceLastRequest) {
      return;
    }

    asyncStorageHelper.setItem(LAST_REVIEW_REQUEST_KEY, Date.now());

    Alert.alert(reviewRequestTitle, reviewRequestText, [
      {
        text: 'Rate App',
        onPress: () => {
          asyncStorageHelper.setItem(REVIEWED_APP_KEY, true);
          StoreReview.requestReview();
        },
      },
      {
        text: 'Not Now',
        style: 'cancel',
      },
    ]);
  }
}
