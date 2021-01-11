import { Vote } from "./votes.types";

export type ChartType =
  | "global"
  | "czech"
  | "test"
  | "nomination-global-2020"
  | "nomination-czech-2020"
  | "global-2020"
  | "czech-2020";

export type Chart = {
  title: string;
  type: ChartType;
  size: number;
  items: Vote[];
};

export type ChartParameters = Omit<Chart, "items">;
