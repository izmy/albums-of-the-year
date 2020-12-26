import * as React from "react";
import { Button, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ChartParameters } from "../../models/charts.types";
import { Vote } from "../../models/votes.types";
import { addItemsToCharts, updateChart } from "../../utils/charts.utils";
import { convertChartsToVotes } from "../../utils/votes.utils";
import { getUserVotes, saveVotes } from "../../services/api/votesApi";
import { VotingList } from "./VotingList";
import SaveIcon from "@material-ui/icons/Save";
import { UserContext } from "../../services/UserContext";
import { LoadingSpinner } from "../../components/LoadingSpinner";

const chartsParameters: ChartParameters[] = [
  { title: "Zahraniční desky", type: "global", size: 20 },
  { title: "České desky", type: "czech", size: 10 },
];

export const Voting: React.FC = () => {
  const { userData } = React.useContext(UserContext);
  const [charts, setCharts] = React.useState(
    chartsParameters.map(addItemsToCharts)
  );
  const [loading, setLoading] = React.useState(true);
  const [edit, setEdit] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [voteStatus, setVoteStatus] = React.useState("");

  const handleSetChart = React.useCallback((vote: Vote) => {
    setCharts((charts) => {
      return charts.map((chart) => updateChart(chart, vote));
    });
  }, []);

  React.useEffect(() => {
    if (userData?.user?._id && loading) {
      const fetchData = async () => {
        const oldVotes = await getUserVotes(userData?.user?._id);

        if (oldVotes.data.length > 0) {
          for (const oldVote of oldVotes.data) {
            handleSetChart({
              rank: oldVote.rank,
              artist: oldVote.artist,
              album: oldVote.album,
              write: oldVote.write,
              type: oldVote.type,
            });
          }
          setEdit(true);
        }
        setLoading(false);
      };

      fetchData();
    }
  }, [userData, loading, handleSetChart]);

  const handleSubmit = () => {
    const votes = convertChartsToVotes(charts, userData!.user!._id);

    saveVotes(votes)
      .then((result) => {
        if (result.status === 200) {
          setVoteStatus("success");
        } else {
          setVoteStatus("error");
        }
        setShowSnackbar(true);
      })
      .catch(() => {
        setVoteStatus("error");
        setShowSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => setShowSnackbar(false);

  return (
    <div>
      <h1>Hlasovat</h1>
      {loading ? <LoadingSpinner /> : null}
      <div style={{ display: loading ? "none" : "block" }}>
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
          size="large"
          onClick={handleSubmit}
          startIcon={<SaveIcon />}
        >
          {edit ? "Změnit hlasy" : "Hlasovat"}
        </Button>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        {voteStatus === "success" ? (
          <Alert severity="success">Hlasování proběhlo úspěšně.</Alert>
        ) : (
          <Alert severity="error">Při hlasování došlo k chybě.</Alert>
        )}
      </Snackbar>
    </div>
  );
};
