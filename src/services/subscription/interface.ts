export interface ISubscription {
  id: string;
  email: string;
  userId: string;
  subscriptionType: ESubscriptionType;
  lastSended: string;
  idTemplate: string;
  customTemplate: string;
}

export enum ESubscriptionType {
  Immediately = 0,
  Daily = 1,
  Weekly = 2,
  Monthly = 3,
}
