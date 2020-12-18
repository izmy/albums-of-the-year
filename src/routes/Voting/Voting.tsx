import { Button } from "@material-ui/core";
import * as React from "react";
import { ChartParameters } from "../../models/charts.types";
import { Vote } from "../../models/votes.types";
import { addItemsToCharts, updateChart } from "../../utils/charts.utils";
import { convertChartsToVotes } from "../../utils/votes.utils";
import { saveVotes } from "../../services/api/votesApi";
import { VotingList } from "./VotingList";
import SaveIcon from "@material-ui/icons/Save";
import { UserContext } from "../../services/UserContext";

const chartsParameters: ChartParameters[] = [
  { title: "Zahraniční desky", type: "global", size: 3 },
  { title: "České desky", type: "czech", size: 3 },
];

export const Voting: React.FC = () => {
  const { user } = React.useContext(UserContext);
  const [charts, setCharts] = React.useState(
    chartsParameters.map(addItemsToCharts)
  );

  const handleSetChart = React.useCallback((vote: Vote) => {
    setCharts((charts) => charts.map((chart) => updateChart(chart, vote)));
  }, []);

  const handleSubmit = () => {
    const votes = convertChartsToVotes(charts, user!.id);

    saveVotes(votes);
  };

  return (
    <div>
      {charts.map((chart) => (
        <VotingList
          key={chart.type}
          heading={chart.title}
          items={chart.items}
          onSetVotingList={handleSetChart}
        />
      ))}
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleSubmit}
        startIcon={<SaveIcon />}
      >
        Hlasovat
      </Button>
    </div>
  );
};
