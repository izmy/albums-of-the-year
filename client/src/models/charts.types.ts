import { Vote } from "./votes.types";

export type ChartType =
  | "global"
  | "czech"
  | "test"
  | "nomination-global-2021"
  | "nomination-czech-2021"
  | "global-2021"
  | "czech-2021";

export type Chart = {
  title: string;
  type: ChartType;
  size: number;
  items: Vote[];
};

export type ChartParameters = Omit<Chart, "items">;
