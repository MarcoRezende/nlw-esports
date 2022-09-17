export interface GameParams {
  id: string;
  name: string;
  bannerUrl: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Game: GameParams;
    }
  }
}
