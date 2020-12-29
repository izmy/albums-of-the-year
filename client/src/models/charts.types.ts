import { Vote } from "./votes.types";

export type ChartType = "global" | "czech" | "test";

export type Chart = {
  title: string;
  type: ChartType;
  size: number;
  items: Vote[];
};

export type ChartParameters = Omit<Chart, "items">;
