import {
  TestIds,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  RewardedAd,
  AdEventType,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";

// Ad unit IDs - replace with your actual ad unit IDs in production
const adUnitIds = {
  banner: __DEV__ ? TestIds.BANNER : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy",
  interstitial: __DEV__
    ? TestIds.INTERSTITIAL
    : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy",
  rewarded: __DEV__
    ? TestIds.REWARDED
    : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy",
};

// Private variables for managing ad instances
let interstitialInstance: InterstitialAd | null = null;
let rewardedInstance: RewardedAd | null = null;

/**
 * Initialize an interstitial ad
 */
export const initializeInterstitial = (): InterstitialAd => {
  interstitialInstance = InterstitialAd.createForAdRequest(
    adUnitIds.interstitial,
    {
      keywords: ["fashion", "clothing"], // customize based on your app
    }
  );
  
  return interstitialInstance;
};

/**
 * Initialize a rewarded ad
 */
export const initializeRewarded = (): RewardedAd => {
  rewardedInstance = RewardedAd.createForAdRequest(adUnitIds.rewarded, {
    keywords: ["fashion", "clothing"], // customize based on your app
  });
  
  return rewardedInstance;
};

/**
 * Show an interstitial ad to the user
 * @returns Promise that resolves to true if ad was shown successfully
 */
export const showInterstitial = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!interstitialInstance) {
      interstitialInstance = initializeInterstitial();
    }

    const unsubscribeLoaded = interstitialInstance.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitialInstance?.show();
      }
    );

    const unsubscribeClosed = interstitialInstance.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        unsubscribeLoaded();
        unsubscribeClosed();
        interstitialInstance = null;
        resolve(true);
      }
    );

    const unsubscribeError = interstitialInstance.addAdEventListener(
      AdEventType.ERROR,
      () => {
        unsubscribeLoaded();
        unsubscribeClosed();
        unsubscribeError();
        interstitialInstance = null;
        resolve(false);
      }
    );

    interstitialInstance.load();
  });
};

/**
 * Show a rewarded ad to the user
 * @returns Promise that resolves with reward info if ad was shown and reward earned
 */
export const showRewarded = async (): Promise<{
  success: boolean;
  reward?: { type: string; amount: number };
}> => {
  return new Promise((resolve) => {
    if (!rewardedInstance) {
      rewardedInstance = initializeRewarded();
    }

    let reward: { type: string; amount: number } | undefined;

    const unsubscribeLoaded = rewardedInstance.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        rewardedInstance?.show();
      }
    );

    const unsubscribeEarned = rewardedInstance.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (rewardData) => {
        reward = rewardData;
      }
    );

    const unsubscribeClosed = rewardedInstance.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        unsubscribeLoaded();
        unsubscribeEarned();
        unsubscribeClosed();
        rewardedInstance = null;
        resolve({ success: true, reward });
      }
    );

    const unsubscribeError = rewardedInstance.addAdEventListener(
      AdEventType.ERROR,
      () => {
        unsubscribeLoaded();
        unsubscribeEarned();
        unsubscribeClosed();
        unsubscribeError();
        rewardedInstance = null;
        resolve({ success: false });
      }
    );

    rewardedInstance.load();
  });
};

/**
 * Get the banner ad unit ID for displaying banner ads
 */
export const getBannerAdUnitId = (): string => {
  return adUnitIds.banner;
};

export { BannerAd, BannerAdSize };

export default {
  initializeInterstitial,
  initializeRewarded,
  showInterstitial,
  showRewarded,
  getBannerAdUnitId
};