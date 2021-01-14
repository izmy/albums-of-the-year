import {
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@material-ui/core";
import * as React from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { StyledTableCell, StyledTableRow } from "../../components/StyledTable";
import { NominatedAlbums } from "../../models/nominatedAlbums.types";
import { Results } from "../../models/results.types";
import { getNominatedAlbums } from "../../services/api/nominatedAlbumsApi";
import { getResults, getUsersVotesCount } from "../../services/api/resultsApi";
import { UserContext } from "../../services/UserContext";
import { isAdmin } from "../../utils/users.utils";
import { ResultsListTable } from "../Results/ResultsListTable";
import { NominatedAlbumsListTable } from "./NominatedAlbumsTable";

export const NominatedAlbumsList: React.FC = () => {
  const { userData } = React.useContext(UserContext);
  const [results, setResults] = React.useState<Results[]>([]);
  const [nominatedAlbums, setNominatedAlbums] = React.useState<
    NominatedAlbums[]
  >([]);
  const [usersVotesCount, setUsersVotesCount] = React.useState<any[]>([]);
  const [submenu, setSubmenu] = React.useState("NOMINATED");
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

      const usersVotesCount = await getUsersVotesCount();
      console.log(usersVotesCount);
      setUsersVotesCount(usersVotesCount.data);

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
          {isAdmin(userData?.user?.role ?? []) ? (
            <>
              <FormControlLabel
                value="RESULTS"
                control={<Radio />}
                label="Seřazené výsledky"
              />
              <FormControlLabel
                value="VOTERS"
                control={<Radio />}
                label="Hlasující"
              />
            </>
          ) : null}
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

      {submenu === "VOTERS" ? (
        <>
          <h2>Seznam hlasujících</h2>
          <TableContainer component={Paper}>
            <Table aria-label="Tabulka hlasů">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Jméno</StyledTableCell>
                  <StyledTableCell>Zahraniční nominace</StyledTableCell>
                  <StyledTableCell>České nominace</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {usersVotesCount.map((u) => (
                  <StyledTableRow key={u.user}>
                    <StyledTableCell scope="row">{u.user}</StyledTableCell>
                    <StyledTableCell scope="row">
                      {u.votes.find(
                        (vote) => vote.type === "nomination-global-2020"
                      )?.count ?? 0}
                    </StyledTableCell>
                    <StyledTableCell scope="row">
                      {u.votes.find(
                        (vote) => vote.type === "nomination-czech-2020"
                      )?.count ?? 0}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : null}
    </div>
  );
};
