import { useState } from "react";
import { useForm } from "react-hook-form";
import { times } from "lodash";
import { ChartData } from "../../data";
import { Chart } from "../Chart";
export const NewPage = () => {
  const [chartData, setChartData] = useState<any>({});
  return (
    <>
      <div className="flex flex-row">
        <div className="max-w-md absolute right-8">
          <ChartForm onUpdate={setChartData} />
        </div>
        <div style={{ flex: 1 }}>
          <Chart {...chartData} />
        </div>
      </div>
    </>
  );
};

const defaults = {
  title: "My Chart",
  primaryColor: "#ff0000",
  backgroundColor: "#ffffff",
  textColor: "#000000",
};

const ChartForm = ({ onUpdate }: { onUpdate: (c: ChartData) => void }) => {
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  watch();
  const onSubmit = (values: any) => {
    console.log(values);
    let myData = {
      title: values.title ? values.title : defaults.title,
      primaryColor: values.primaryColor
        ? values.primaryColor
        : defaults.primaryColor,
      backgroundColor: values.backgroundColor ?? defaults.backgroundColor,
      textColor: values.textColor ? values.textColor : defaults.textColor,
      edgeTitles: Object.assign(
        {},
        times(numEdges, (index) =>
          `edge.${index}.title` in values
            ? values[`edge.${index}.title`]
            : `Step ${index + 1}`
        )
      ),
      lines: times(numLines, (index) => {
        const label =
          `line.${index}.label` in values
            ? values[`line.${index}.label`]
            : `Line ${index + 1}`;
        const color =
          `lines.${index}.color` in values
            ? values[`lines.${index}.color`]
            : `green`;

        const data = Object.assign(
          {},
          times(numEdges, (edgeIndex) => {
            return `line.${index}.values.${edgeIndex}` in values
              ? values[`line.${index}.values.${edgeIndex}`]
              : 1;
          })
        );

        return { label, color, values: data };
      }),
    };

    onUpdate(myData as any);
    console.log(myData);
  };
  const [numEdges, setNumEdges] = useState(1);
  const [numLines, setNumLines] = useState(1);
  return (
    <form
      className="flex-col flex space-y-4 text-sm bg-green-400 p-4 rounded"
      onSubmit={onSubmit}
    >
      <div>
        <p>Title</p>
        <input
          placeholder={defaults.title}
          className="ml-4"
          type="text"
          {...register("title", { required: true })}
        />
        {errors.title && errors.title.message}
      </div>
      <div>
        <p>Primary Colour</p>
        <input
          placeholder={defaults.primaryColor}
          className="ml-4"
          type="text"
          {...register("primaryColor", { required: true })}
        />
        {errors.primaryColor && errors.primaryColor.message}
      </div>
      <div>
        <p>Background Colour</p>
        <input
          placeholder={defaults.backgroundColor}
          className="ml-4"
          type="text"
          {...register("backgroundColor", { required: true })}
        />
        {errors.backgroundColor && errors.backgroundColor.message}
      </div>
      <div>
        <p>Text Colour</p>
        <input
          placeholder={defaults.textColor}
          className="ml-4"
          type="text"
          {...register("textColor", { required: true })}
        />
        {errors.textColor && errors.textColor.message}
      </div>
      <div className="">
        <p>Edges</p>
        <div className="ml-4 space-y-1">
          {Array.from({ length: numEdges }, (_, index) => {
            const edgeIndex = index;
            return (
              <div>
                <p>{edgeIndex}</p>
                <div className="ml-4">
                  <p>Title</p>
                  <input
                    placeholder={`Step ${edgeIndex + 1}`}
                    className="ml-4"
                    type="text"
                    {...register(`edge.${edgeIndex}.title`, { required: true })}
                  />
                </div>
              </div>
            );
          })}
          <button
            className="underline"
            type="button"
            onClick={() => setNumEdges(numEdges + 1)}
          >
            Add Edge
          </button>
        </div>
      </div>
      <div>
        <p>Lines</p>
        <div className="ml-4 space-y-1">
          {times(numLines, (index) => {
            const lineIndex = index;
            return (
              <div key={lineIndex}>
                <p>{lineIndex}</p>
                <div className="ml-4 space-y-1">
                  <p>Label</p>
                  <input
                    placeholder={`Line ${lineIndex + 1}`}
                    className="ml-4"
                    type="text"
                    {...register(`line.${lineIndex}.label`, { required: true })}
                  />
                  <p>Color</p>
                  <input
                    className="ml-4"
                    placeholder="green"
                    type="text"
                    {...register(`line.${lineIndex}.color`, { required: true })}
                  />
                  <p>Values</p>
                  <div className="space-y-1">
                    {times(numEdges, (index) => {
                      const key =
                        getValues(`edge.${index}.title`) ?? `Step ${index + 1}`;
                      return (
                        <div className="ml-4" key={key}>
                          <p>{key}</p>
                          <input
                            className="ml-4"
                            placeholder="1"
                            type="number"
                            {...register(`line.${lineIndex}.values.${index}`, {
                              required: true,
                            })}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <button
            className="underline"
            type="button"
            onClick={() => setNumLines(numEdges + 1)}
          >
            Add Line
          </button>
        </div>
        <button
          value="submit"
          type="button"
          onClick={() => {
            onSubmit(getValues());
          }}
          className="pt-4 underline"
        >
          Save
        </button>
      </div>
    </form>
  );
};
