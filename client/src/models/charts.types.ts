import { Vote } from "./votes.types";

export type ChartType =
  | "global"
  | "czech"
  | "test"
  | "nomination-global-2023"
  | "nomination-czech-2023"
  | "global-2023"
  | "czech-2023";

export type Chart = {
  title: string;
  type: ChartType;
  size: number;
  items: Vote[];
};

export type ChartParameters = Omit<Chart, "items">;
