import { Chart } from "../models/charts.types";
import { Vote } from "../models/votes.types";

export const convertChartsToVotes = (charts: Chart[], userId: string): Vote[] =>
  charts
    .map((chart) =>
      chart.items
        .filter((vote) => vote.artist !== "" && vote.album !== "")
        .map((vote) => ({ ...vote, userId }))
    )
    .reduce((acc, curr) => acc.concat(curr), []);
