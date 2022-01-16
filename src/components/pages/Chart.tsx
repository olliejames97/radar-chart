import { Chart } from "../Chart";

export const ChartPage = () => {
  return (
    <div className="h-screen w-screen">
      <div className="flex items-center justify-center content-center h-full w-full">
        <Chart
          title="My example title"
          primaryColor="orange"
          backgroundColor="#6da6d8"
          textColor="white"
          edgeTitles={{ one: "One", two: "Two", three: "Three" }}
          lines={[
            {
              label: "Goal",
              color: "blue",
              values: {
                one: 0.5,
                two: 0.5,
                three: 0.5,
              },
            },
            {
              label: "Current",
              color: "red",
              values: {
                one: 0.1,
                two: 0.2,
                three: 0.1,
              },
            },
          ]}
        />
      </div>
    </div>
  );
};
