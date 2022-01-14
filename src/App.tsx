import { Chart } from "./components/Chart";

function App() {
  return (
    <div className="App h-screen w-screen">
      <div className="flex items-center justify-center content-center h-full w-full">
        <Chart
          edgeTitles={{ one: "One", two: "Two", three: "Three" }}
          lines={[
            {
              label: "goal",
              color: "blue",
              values: {
                one: 0.5,
                two: 0.5,
                three: 0.5,
              },
            },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
