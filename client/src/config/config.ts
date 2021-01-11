import { ChartParameters } from "../models/charts.types";

export const nominationChartsParameters: ChartParameters[] = [
  { title: "Zahraniční desky", type: "nomination-global-2020", size: 40 },
  { title: "České desky", type: "nomination-czech-2020", size: 20 },
];

export const chartsParameters: ChartParameters[] = [
  { title: "Zahraniční desky", type: "global", size: 20 },
  { title: "České desky", type: "czech", size: 10 },
];

export const deadline = {
  nomination: new Date(2020, 0, 13),
  voting: new Date(2020, 0, 15),
};
