export interface HeartData {
  _id: string;
  count: number;
  window: {
    start: string;
    end: string;
  };
}