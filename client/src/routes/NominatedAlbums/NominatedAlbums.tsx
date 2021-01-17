import * as React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { NominatedAlbums } from "../../models/nominatedAlbums.types";
import { Results } from "../../models/results.types";
import { getNominatedAlbums } from "../../services/api/nominatedAlbumsApi";
import { getResults } from "../../services/api/resultsApi";
import { ResultsListTable } from "../Results/ResultsListTable";
import { NominatedAlbumsListTable } from "./NominatedAlbumsTable";

export const NominatedAlbumsList: React.FC = () => {
  const [results, setResults] = React.useState<Results[]>([]);
  const [nominatedAlbums, setNominatedAlbums] = React.useState<
    NominatedAlbums[]
  >([]);
  const [submenu, setSubmenu] = React.useState("RESULTS");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const nominatedAlbums = await getNominatedAlbums([
        "nomination-global-2020",
        "nomination-czech-2020",
      ]);
      setNominatedAlbums(nominatedAlbums.data);

      const results = await getResults();
      setResults(results.data);

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
            value="RESULTS"
            control={<Radio />}
            label="Seřazené výsledky"
          />
          <FormControlLabel
            value="NOMINATED"
            control={<Radio />}
            label="Abecední seznam"
          />
        </RadioGroup>
      </FormControl>

      {submenu === "NOMINATED" ? (
        <>
          <h2>Zahraniční alba</h2>
          <NominatedAlbumsListTable
            results={
              nominatedAlbums.filter(
                (vote) => vote.type === "nomination-global-2020"
              )[0]?.results ?? []
            }
          />
          <h2>Česká alba</h2>
          <NominatedAlbumsListTable
            results={
              nominatedAlbums.filter(
                (vote) => vote.type === "nomination-czech-2020"
              )[0]?.results ?? []
            }
          />{" "}
        </>
      ) : null}

      {submenu === "RESULTS" ? (
        <>
          <h2>Zahraniční alba</h2>
          <ResultsListTable
            results={
              results.filter(
                (vote) => vote.type === "nomination-global-2020"
              )[0]?.results ?? []
            }
            showWriteColumn={false}
          />

          <h2>Česká alba</h2>
          <ResultsListTable
            results={
              results.filter((vote) => vote.type === "nomination-czech-2020")[0]
                ?.results ?? []
            }
            showWriteColumn={false}
          />
        </>
      ) : null}
    </div>
  );
};
