import {
  TestIds,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  RewardedAd,
  AdEventType,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";

// TODO: Ad unit IDs - replace with your actual ad unit IDs in production
const adUnitIds = {
  banner: __DEV__ ? TestIds.BANNER : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy",
  interstitial: __DEV__
    ? TestIds.INTERSTITIAL
    : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy",
  rewarded: __DEV__
    ? TestIds.REWARDED
    : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy",
};

// TODO: customize based on your app
const keywords = ["fashion", "clothing"];

class AdsHelper {
  private static interstitial: InterstitialAd | null = null;
  private static rewarded: RewardedAd | null = null;

  static initializeInterstitial() {
    this.interstitial = InterstitialAd.createForAdRequest(
      adUnitIds.interstitial,
      {
        keywords,
      }
    );

    return this.interstitial;
  }

  static initializeRewarded() {
    this.rewarded = RewardedAd.createForAdRequest(adUnitIds.rewarded, {
      keywords,
    });

    return this.rewarded;
  }

  static async showInterstitial(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.interstitial) {
        this.interstitial = this.initializeInterstitial();
      }

      const unsubscribeLoaded = this.interstitial.addAdEventListener(
        AdEventType.LOADED,
        () => {
          this.interstitial?.show();
        }
      );

      const unsubscribeClosed = this.interstitial.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          unsubscribeLoaded();
          unsubscribeClosed();
          this.interstitial = null;
          resolve(true);
        }
      );

      const unsubscribeError = this.interstitial.addAdEventListener(
        AdEventType.ERROR,
        () => {
          unsubscribeLoaded();
          unsubscribeClosed();
          unsubscribeError();
          this.interstitial = null;
          resolve(false);
        }
      );

      this.interstitial.load();
    });
  }

  static async showRewarded(): Promise<{
    success: boolean;
    reward?: { type: string; amount: number };
  }> {
    return new Promise((resolve) => {
      if (!this.rewarded) {
        this.rewarded = this.initializeRewarded();
      }

      let reward: { type: string; amount: number } | undefined;

      const unsubscribeLoaded = this.rewarded.addAdEventListener(
        RewardedAdEventType.LOADED,
        () => {
          this.rewarded?.show();
        }
      );

      const unsubscribeEarned = this.rewarded.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        (rewardData) => {
          reward = rewardData;
        }
      );

      const unsubscribeClosed = this.rewarded.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          unsubscribeLoaded();
          unsubscribeEarned();
          unsubscribeClosed();
          this.rewarded = null;
          resolve({ success: true, reward });
        }
      );

      const unsubscribeError = this.rewarded.addAdEventListener(
        AdEventType.ERROR,
        () => {
          unsubscribeLoaded();
          unsubscribeEarned();
          unsubscribeClosed();
          unsubscribeError();
          this.rewarded = null;
          resolve({ success: false });
        }
      );

      this.rewarded.load();
    });
  }

  static getBannerAdUnitId() {
    return adUnitIds.banner;
  }
}

export { AdsHelper, BannerAd, BannerAdSize };
