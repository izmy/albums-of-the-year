import { Chart } from "../models/charts.types";
import { Vote } from "../models/votes.types";
import { convertChartsToVotes } from "./votes.utils";

describe("Votes utils", () => {
  it("convert charts to votes", () => {
    const inputCharts: Chart[] = [
      {
        title: "test",
        type: "test",
        size: 2,
        items: [
          {
            album: "abc",
            artist: "bandA",
            rank: 1,
            type: "global",
            wantWrite: false,
            write: false,
          },
          {
            album: "xyz",
            artist: "bandB",
            rank: 2,
            type: "global",
            wantWrite: false,
            write: false,
          },
        ],
      },
    ];

    const expectedVotes: Vote[] = [
      {
        album: "abc",
        artist: "bandA",
        rank: 1,
        type: "global",
        wantWrite: false,
        write: false,
        userId: "1",
      },
      {
        album: "xyz",
        artist: "bandB",
        rank: 2,
        type: "global",
        wantWrite: false,
        write: false,
        userId: "1",
      },
    ];

    expect(convertChartsToVotes(inputCharts, "1")).toEqual(expectedVotes);
  });
});
