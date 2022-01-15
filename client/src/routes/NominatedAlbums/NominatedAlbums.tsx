import * as React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import {
  NominatedAlbum,
  NominatedAlbums,
} from "../../models/nominatedAlbums.types";
import { Results } from "../../models/results.types";
import { getNominatedAlbums } from "../../services/api/nominatedAlbumsApi";
import {
  getResults,
  getResultsWithParams,
} from "../../services/api/resultsApi";
import { ResultsListTable } from "../Results/ResultsListTable";
import { NominatedAlbumsListTable } from "./NominatedAlbumsTable";
import { isAdmin } from "../../utils/users.utils";
import { UserContext } from "../../services/UserContext";

export const NominatedAlbumsList: React.FC = () => {
  const [results, setResults] = React.useState<Results[]>([]);
  const [nominatedAlbums, setNominatedAlbums] = React.useState<
    NominatedAlbums[]
  >([]);
  const [votingGlobal, setVotingGlobal] = React.useState<NominatedAlbum[]>([]);
  const [votingCzech, setVotingCzech] = React.useState<NominatedAlbum[]>([]);

  const [submenu, setSubmenu] = React.useState("NOMINATED");
  const [loading, setLoading] = React.useState(true);
  const { userData } = React.useContext(UserContext);

  React.useEffect(() => {
    const fetchData = async () => {
      const nominatedAlbums = await getNominatedAlbums([
        "nomination-global-2021",
        "nomination-czech-2021",
      ]);
      setNominatedAlbums(nominatedAlbums.data);

      const results = await getResults();
      setResults(results.data);

      const votingGlobal = await getResultsWithParams({
        type: "nomination-global-2021",
        limit: 60,
        includeFirst: true,
      });
      setVotingGlobal(votingGlobal.data);

      const votingCzech = await await getResultsWithParams({
        type: "nomination-czech-2021",
        limit: 30,
        includeFirst: true,
      });
      setVotingCzech(votingCzech.data);

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChangeTable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubmenu((event.target as HTMLInputElement).value);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Nominovaná alba</h1>

      <FormControl>
        <RadioGroup
          row
          aria-label="submenu"
          name="submenu"
          value={submenu}
          onChange={handleChangeTable}
        >
          <FormControlLabel
            value="NOMINATED"
            control={<Radio />}
            label="Abecední seznam"
          />
          <FormControlLabel
            value="VOTING"
            control={<Radio />}
            label="Postupující alba"
          />
          {userData?.user ? (
            isAdmin(userData?.user?.role) || userData?.phase === "RESULTS" ? (
              <FormControlLabel
                value="RESULTS"
                control={<Radio />}
                label="Seřazené výsledky"
              />
            ) : null
          ) : null}
        </RadioGroup>
      </FormControl>

      {submenu === "NOMINATED" ? (
        <>
          <h2>Zahraniční alba</h2>
          <NominatedAlbumsListTable
            results={
              nominatedAlbums.filter(
                (vote) => vote.type === "nomination-global-2021"
              )[0]?.results ?? []
            }
          />
          <h2>Česká alba</h2>
          <NominatedAlbumsListTable
            results={
              nominatedAlbums.filter(
                (vote) => vote.type === "nomination-czech-2021"
              )[0]?.results ?? []
            }
          />{" "}
        </>
      ) : null}

      {submenu === "VOTING" ? (
        <>
          <h2>Zahraniční alba</h2>
          <NominatedAlbumsListTable results={votingGlobal} />
          <h2>Česká alba</h2>
          <NominatedAlbumsListTable results={votingCzech} />{" "}
        </>
      ) : null}

      {submenu === "RESULTS" ? (
        <>
          <h2>Zahraniční alba</h2>
          <ResultsListTable
            results={
              results.filter(
                (vote) => vote.type === "nomination-global-2021"
              )[0]?.results ?? []
            }
            showWriteColumn={false}
          />

          <h2>Česká alba</h2>
          <ResultsListTable
            results={
              results.filter((vote) => vote.type === "nomination-czech-2021")[0]
                ?.results ?? []
            }
            showWriteColumn={false}
          />
        </>
      ) : null}
    </div>
  );
};
