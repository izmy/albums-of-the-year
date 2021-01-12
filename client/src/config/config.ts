import { ChartParameters } from "../models/charts.types";

export const nominationChartsParameters: ChartParameters[] = [
  { title: "Zahraniční alba", type: "nomination-global-2020", size: 40 },
  { title: "Česká alba", type: "nomination-czech-2020", size: 20 },
];

export const chartsParameters: ChartParameters[] = [
  { title: "Zahraniční alba", type: "global-2020", size: 20 },
  { title: "Česká alba", type: "czech-2020", size: 10 },
];

export const deadline = {
  nomination: new Date(2020, 0, 13),
  voting: new Date(2020, 0, 15),
};
