import { Vote } from "./votes.types";

export type ChartType =
  | "global"
  | "czech"
  | "test"
  | "nomination-global-2024"
  | "nomination-czech-2024"
  | "global-2024"
  | "czech-2024";

export type Chart = {
  title: string;
  type: ChartType;
  size: number;
  items: Vote[];
};

export type ChartParameters = Omit<Chart, "items">;
