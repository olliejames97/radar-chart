//@ts-ignore
import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";

type Props = {
  // {id: title}
  edgeTitles: Record<string, string>;
  lines: {
    label: string;
    color: string;
    // {id: number}
    values: Record<string, number>;
  }[];
};

export const Chart = ({ edgeTitles, lines }: Props) => {
  return (
    <div className="flex">
      <div className="flex-1">
        <RadarChart
          captions={edgeTitles}
          data={lines.map((line) => ({
            data: line.values,
            meta: { color: line.color },
          }))}
          size={450}
        />
      </div>
      <div className="w-100">
        {lines.map((line) => {
          return <p style={{ color: line.color }}>{line.label}</p>;
        })}
      </div>
    </div>
  );
};
