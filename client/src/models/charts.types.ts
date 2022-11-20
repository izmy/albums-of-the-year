import { Vote } from "./votes.types";

export type ChartType =
  | "global"
  | "czech"
  | "test"
  | "nomination-global-2022"
  | "nomination-czech-2022"
  | "global-2022"
  | "czech-2022";

export type Chart = {
  title: string;
  type: ChartType;
  size: number;
  items: Vote[];
};

export type ChartParameters = Omit<Chart, "items">;
