import * as React from "react";
import { Button, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Vote } from "../../models/votes.types";
import { addItemsToCharts, updateChart } from "../../utils/charts.utils";
import { convertChartsToVotes } from "../../utils/votes.utils";
import { getUserVotes, saveVotes } from "../../services/api/votesApi";
import { NominateList } from "./NominateList";
import SaveIcon from "@material-ui/icons/Save";
import { UserContext } from "../../services/UserContext";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { nominationChartsParameters } from "../../config/config";

export const Nominate: React.FC = () => {
  const { userData } = React.useContext(UserContext);
  const [charts, setCharts] = React.useState(
    nominationChartsParameters.map(addItemsToCharts)
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

  const handleSwapVotes = React.useCallback((vote: Vote, type: string) => {
    const newRank = type === "UP" ? vote.rank - 1 : vote.rank + 1;

    setCharts((charts) => {
      return charts.map((chart) => {
        if (chart.type === vote.type) {
          const voteA = chart.items.find((item) => item.rank === vote.rank);
          const voteB = chart.items.find((item) => item.rank === newRank);

          if (voteA !== undefined && voteB !== undefined) {
            const newItems = chart.items.map((item) => {
              if (item.rank === vote.rank) {
                return { ...item, artist: voteB.artist, album: voteB.album };
              }

              if (item.rank === newRank) {
                return { ...item, artist: voteA.artist, album: voteA.album };
              }

              return item;
            });

            return { ...chart, items: newItems };
          }

          return chart;
        }
        return chart;
      });
    });
  }, []);

  React.useEffect(() => {
    if (userData?.user?._id && loading) {
      const fetchData = async () => {
        if (userData?.user === undefined) return;
        const oldVotes = await getUserVotes(userData.user._id, [
          "nomination-global-2024",
          "nomination-czech-2024",
        ]);

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

  const handleSubmit = async () => {
    const votes = convertChartsToVotes(charts, userData!.user!._id);

    try {
      const saveVotesResult = await saveVotes(votes, [
        "nomination-global-2024",
        "nomination-czech-2024",
      ]);
      if (saveVotesResult.status === 200) {
        setVoteStatus("success");
      } else {
        setVoteStatus("error");
      }
      setShowSnackbar(true);
    } catch (err) {
      setVoteStatus("error");
      setShowSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => setShowSnackbar(false);

  return (
    <div>
      <h1>Nominovat</h1>
      {loading ? <LoadingSpinner /> : null}
      <div style={{ display: loading ? "none" : "block" }}>
        {charts.map((chart) => (
          <NominateList
            key={chart.type}
            heading={chart.title}
            items={chart.items}
            onSetNominateList={handleSetChart}
            onSwapVotes={handleSwapVotes}
          />
        ))}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
          startIcon={<SaveIcon />}
          style={{ marginTop: "50px" }}
        >
          {edit ? "Změnit nominaci" : "Nominovat alba"}
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
          <Alert severity="success">Nominace proběhla úspěšně.</Alert>
        ) : (
          <Alert severity="error">Při nominaci došlo k chybě.</Alert>
        )}
      </Snackbar>
    </div>
  );
};
