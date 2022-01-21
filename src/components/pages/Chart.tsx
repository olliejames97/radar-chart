import { useParams } from "react-router-dom";
import { useGetData } from "../../storage";
import { Chart } from "../Chart";

export const ChartPage = () => {
  const { id } = useParams();
  const { response, error, loading } = useGetData(id ?? "");

  return (
    <div className="h-screen">
      <div className="h-full">
        {loading ? "loading" : null}
        {error ? (
          <>
            <h2>Error</h2>
            <p>{JSON.stringify(error.message, null, 2)}</p>
          </>
        ) : null}
        {response && JSON.stringify(response).length > 4 ? (
          <>
            <Chart {...response} />
          </>
        ) : null}
      </div>
    </div>
  );
};
