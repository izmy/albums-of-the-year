import { Chart, ChartParameters } from "../models/charts.types";
import { Vote } from "../models/votes.types";
import {
  addItemsToCharts,
  createAlbumsArray,
  updateChart,
} from "./charts.utils";

describe("Charts utils", () => {
  it("create one albums array with type test", () => {
    const expectedVote: Vote = {
      album: "",
      artist: "",
      rank: 1,
      type: "test",
      write: false,
    };

    expect(createAlbumsArray(1, "test")).toEqual([expectedVote]);
  });

  it("add items to charts", () => {
    const inputChartParameters: ChartParameters = {
      title: "Global charts",
      type: "test",
      size: 1,
    };

    const expectedChart: Chart = {
      title: "Global charts",
      type: "test",
      size: 1,
      items: [{ album: "", artist: "", rank: 1, type: "test", write: false }],
    };

    expect(addItemsToCharts(inputChartParameters)).toEqual(expectedChart);
  });

  it("update chart", () => {
    const inputChart: Chart = {
      title: "test chart",
      type: "global",
      size: 2,
      items: [
        {
          album: "abc",
          artist: "bandA",
          rank: 1,
          type: "global",
          write: false,
        },
        {
          album: "xyz",
          artist: "bandB",
          rank: 2,
          type: "global",
          write: false,
        },
      ],
    };

    const inputVote: Vote = {
      album: "www",
      artist: "bandC",
      rank: 1,
      type: "global",
      write: true,
    };

    const expectedChart: Chart = {
      title: "test chart",
      type: "global",
      size: 2,
      items: [
        {
          album: "www",
          artist: "bandC",
          rank: 1,
          type: "global",
          write: true,
        },
        {
          album: "xyz",
          artist: "bandB",
          rank: 2,
          type: "global",
          write: false,
        },
      ],
    };
    expect(updateChart(inputChart, inputVote)).toEqual(expectedChart);
  });
});
