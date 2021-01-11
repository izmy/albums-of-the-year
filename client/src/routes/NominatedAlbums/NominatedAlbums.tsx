import * as React from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { NominatedAlbums } from "../../models/nominatedAlbums.types";
import { getNominatedAlbums } from "../../services/api/nominatedAlbumsApi";
import { NominatedAlbumsListTable } from "./NominatedAlbumsTable";

export const NominatedAlbumsList: React.FC = () => {
  const [results, setResults] = React.useState<NominatedAlbums[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const results = await getNominatedAlbums([
        "nomination-global-2020",
        "nomination-czech-2020",
      ]);

      setResults(results.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Nominovaná alba</h1>

      <h2>Zahraniční alba</h2>
      <NominatedAlbumsListTable
        results={
          results.filter((vote) => vote.type === "nomination-global-2020")[0]
            ?.results ?? []
        }
      />

      <h2>Česká alba</h2>
      <NominatedAlbumsListTable
        results={
          results.filter((vote) => vote.type === "nomination-czech-2020")[0]
            ?.results ?? []
        }
      />
    </div>
  );
};
