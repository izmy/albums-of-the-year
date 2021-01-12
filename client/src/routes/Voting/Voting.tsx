import * as React from "react";
import { Button, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Vote } from "../../models/votes.types";
import { addItemsToCharts, updateChart } from "../../utils/charts.utils";
import { convertChartsToVotes } from "../../utils/votes.utils";
import { getUserVotes, saveVotes } from "../../services/api/votesApi";
import SaveIcon from "@material-ui/icons/Save";
import { UserContext } from "../../services/UserContext";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { chartsParameters } from "../../config/config";
import { VotingList } from "./VotingList";
import { getNominatedAlbums } from "../../services/api/nominatedAlbumsApi";
import { NominatedAlbums } from "../../models/nominatedAlbums.types";

export const Voting: React.FC = () => {
  const { userData } = React.useContext(UserContext);
  const [charts, setCharts] = React.useState(
    chartsParameters.map(addItemsToCharts)
  );
  const [nominatedAlbums, setNominatedAlbums] = React.useState<
    NominatedAlbums[]
  >([]);
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
        const resultsNominatedAlbums = await getNominatedAlbums([
          "nomination-global-2020",
          "nomination-czech-2020",
        ]);

        setNominatedAlbums(resultsNominatedAlbums.data);

        if (userData?.user === undefined) return;
        const oldVotes = await getUserVotes(userData.user._id, [
          "global-2020",
          "czech-2020",
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
        "global-2020",
        "czech-2020",
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
      <h1>Hlasovat</h1>
      {loading ? <LoadingSpinner /> : null}
      <div style={{ display: loading ? "none" : "block" }}>
        <VotingList
          heading={charts[0].title}
          items={charts[0].items}
          nominatedAlbums={
            nominatedAlbums.filter(
              (vote) => vote.type === "nomination-global-2020"
            )[0]?.results ?? []
          }
          onSetVotingList={handleSetChart}
        />
        <VotingList
          heading={charts[1].title}
          items={charts[1].items}
          nominatedAlbums={
            nominatedAlbums.filter(
              (vote) => vote.type === "nomination-czech-2020"
            )[0]?.results ?? []
          }
          onSetVotingList={handleSetChart}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
          startIcon={<SaveIcon />}
          style={{ marginTop: "50px" }}
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
