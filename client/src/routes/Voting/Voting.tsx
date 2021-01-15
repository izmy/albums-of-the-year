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
import { getResults } from "../../services/api/resultsApi";
import { Results } from "../../models/results.types";
import GetAppIcon from "@material-ui/icons/GetApp";
import { ChartType } from "../../models/charts.types";

export const Voting: React.FC = () => {
  const { userData } = React.useContext(UserContext);
  const [charts, setCharts] = React.useState(
    chartsParameters.map(addItemsToCharts)
  );
  const [nominatedAlbumsResults, setNominatedAlbumsResults] = React.useState<
    Results[]
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
        const results = await getResults();
        const topResults = results.data.map((results) => {
          if (results.type === "nomination-global-2020") {
            return {
              ...results,
              results: results.results.slice(0, 60),
            };
          }
          if (results.type === "nomination-czech-2020") {
            return {
              ...results,
              results: results.results.slice(0, 30),
            };
          }
          return results;
        });

        setNominatedAlbumsResults(topResults);

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

  const handleLoadNominatedAlbums = async () => {
    if (
      userData?.user?._id &&
      window.confirm("Chcete načíst své nominace do formuláře?")
    ) {
      const nominationVotes = await getUserVotes(userData.user._id, [
        "nomination-global-2020",
        "nomination-czech-2020",
      ]);

      const cleanNominationVotes = nominationVotes.data.map((vote) => ({
        artist: vote.artist,
        album: vote.album,
      }));

      const globalNomination = nominatedAlbumsResults
        .find((albums) => albums.type === "nomination-global-2020")
        ?.results.map((vote) => ({
          artist: vote.artist,
          album: vote.album,
        }));

      const intersectionGlobalNomination = cleanNominationVotes
        .filter((a) => globalNomination?.some((b) => a.artist === b.artist))
        .map((item, index) => ({
          ...item,
          rank: index + 1,
          write: false,
          type: "global-2020" as ChartType,
        }));

      const czechNomination = nominatedAlbumsResults
        .find((albums) => albums.type === "nomination-czech-2020")
        ?.results.map((vote) => ({
          artist: vote.artist,
          album: vote.album,
        }));

      const intersectionCzechNomination = cleanNominationVotes
        .filter((a) => czechNomination?.some((b) => a.artist === b.artist))
        .map((item, index) => ({
          ...item,
          rank: index + 1,
          write: false,
          type: "czech-2020" as ChartType,
        }));

      setCharts((charts) => {
        return charts.map((chart) => {
          if (chart.type === "global-2020") {
            const items = chart.items.map((item, index) => {
              if (intersectionGlobalNomination[index] !== undefined) {
                return intersectionGlobalNomination[index];
              }
              return item;
            });
            chart.items = items;
          }
          if (chart.type === "czech-2020") {
            const items = chart.items.map((item, index) => {
              if (intersectionCzechNomination[index] !== undefined) {
                return intersectionCzechNomination[index];
              }
              return item;
            });
            chart.items = items;
          }
          return chart;
        });
      });
    }
  };

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
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleLoadNominatedAlbums}
        startIcon={<GetAppIcon />}
      >
        Načíst hlasy z nominací
      </Button>
      {loading ? <LoadingSpinner /> : null}
      <div style={{ display: loading ? "none" : "block" }}>
        <VotingList
          heading={charts[0].title}
          items={charts[0].items}
          nominatedAlbumsResults={
            nominatedAlbumsResults
              .find((vote) => vote.type === "nomination-global-2020")
              ?.results.sort((a, b) => a.artist.localeCompare(b.artist)) ?? []
          }
          onSetVotingList={handleSetChart}
          onSwapVotes={handleSwapVotes}
        />
        <VotingList
          heading={charts[1].title}
          items={charts[1].items}
          nominatedAlbumsResults={
            nominatedAlbumsResults
              .find((vote) => vote.type === "nomination-czech-2020")
              ?.results.sort((a, b) => a.artist.localeCompare(b.artist)) ?? []
          }
          onSetVotingList={handleSetChart}
          onSwapVotes={handleSwapVotes}
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
