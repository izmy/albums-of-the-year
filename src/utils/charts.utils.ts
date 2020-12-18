import { Chart, ChartParameters, ChartType } from "../models/charts.types";
import { Vote } from "../models/votes.types";

export const createAlbumsArray = (size: number, type: ChartType): Vote[] =>
  new Array<Vote>(size)
    .fill({
      rank: 0,
      artist: "",
      album: "",
      write: false,
    })
    .map((vote, index) => ({ ...vote, type, rank: index + 1 }));

export const addItemsToCharts = (charts: ChartParameters): Chart => ({
  ...charts,
  items: createAlbumsArray(charts.size, charts.type),
});

export const updateChart = (chart: Chart, vote: Vote): Chart =>
  chart.type === vote.type
    ? {
        ...chart,
        items: chart.items.map((item) =>
          item.rank === vote.rank ? vote : item
        ),
      }
    : chart;
