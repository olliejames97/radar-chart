import { useState } from "react";
import { useForm } from "react-hook-form";
import { times } from "lodash";
import { ChartData } from "../../data";
import { Chart } from "../Chart";
import { HexColorPicker } from "react-colorful";

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
  primaryColor: "#ffe8a2",
  backgroundColor: "#ffe8a2",
  textColor: "#ffffff",
};

const ChartForm = ({ onUpdate }: { onUpdate: (c: ChartData) => void }) => {
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  watch();
  const onSubmit = (values: any) => {
    let myData = {
      title: values.title ? values.title : defaults.title,
      primaryColor: values.primaryColor
        ? values.primaryColor
        : defaults.primaryColor,
      backgroundColor: values.backgroundColor ?? defaults.backgroundColor,
      textColor: values.textColor ? values.textColor : defaults.textColor,
      edgeTitles: Object.assign(
        {},
        times(
          numEdges,
          (index) => values.edge[index].title || `Step ${index + 1}`
        )
      ),
      lines: times(numLines, (index) => {
        const label = values.line[index].label || `Line ${index + 1}`;
        const color = values.line[index].color || `green`;
        const data = Object.assign(
          {},
          times(numEdges, (edgeIndex) => {
            return Number(values.line[index].values[edgeIndex]) || 1;
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
      style={{ maxHeight: "90vh", overflowY: "scroll" }}
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
        <ColorField
          color={getValues("primaryColor") || "#ff0000"}
          onChangeColor={(col) => {
            setValue("primaryColor", col);
          }}
          placeholder={defaults.primaryColor}
          value={getValues("primaryColor") || "#ff0000"}
          className="ml-4"
          type="text"
          {...register("primaryColor", { required: true })}
        />
        {errors.primaryColor && errors.primaryColor.message}
      </div>
      <div>
        <p>Background Colour</p>
        <ColorField
          color={getValues("backgroundColor") || defaults.backgroundColor}
          onChangeColor={(col) => {
            setValue("backgroundColor", col);
          }}
          placeholder={defaults.backgroundColor}
          value={getValues("backgroundColor") || defaults.backgroundColor}
          className="ml-4"
          type="text"
          {...register("backgroundColor", { required: true })}
        />
        {errors.backgroundColor && errors.backgroundColor.message}
      </div>
      <div>
        <p>Text Colour</p>
        <ColorField
          color={getValues("textColor") || defaults.textColor}
          onChangeColor={(col) => {
            setValue("textColor", col);
          }}
          placeholder={defaults.backgroundColor}
          value={getValues("textColor") || defaults.textColor}
          className="ml-4"
          type="text"
          {...register("textColor", { required: true })}
        />
        {errors.textColor && errors.textColor.message}
      </div>
      <div className="">
        <p>Edges</p>
        <div className="ml-4 space-y-2">
          {Array.from({ length: numEdges }, (_, index) => {
            const edgeIndex = index;
            return (
              <div className="p-2 rounded-lg bg-green-500">
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
        <div className="ml-4 space-y-2">
          {times(numLines, (index) => {
            const lineIndex = index;
            return (
              <div
                key={lineIndex}
                style={{
                  backgroundColor:
                    getValues(`line.${lineIndex}.color`) || undefined,
                }}
                className="p-4 rounded-lg"
              >
                <p>{lineIndex}</p>
                <div className="space-y-1">
                  <p>Label</p>
                  <input
                    placeholder={`Line ${lineIndex + 1}`}
                    className="ml-4"
                    type="text"
                    {...register(`line.${lineIndex}.label`, { required: true })}
                  />
                  <p>Color</p>
                  <ColorField
                    color={getValues(`line.${lineIndex}.color`) || "green"}
                    onChangeColor={(col) => {
                      setValue(`line.${lineIndex}.color`, col);
                    }}
                    placeholder={defaults.backgroundColor}
                    value={getValues(`line.${lineIndex}.color`) || "green"}
                    className="ml-4"
                    type="text"
                    {...register(`line.${lineIndex}.color`, { required: true })}
                  />

                  <p>Values</p>
                  <div className="space-y-1">
                    {times(numEdges, (index) => {
                      const key =
                        getValues(`edge.${index}.title`) || `Step ${index + 1}`;
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
            onClick={() => setNumLines(numLines + 1)}
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

const ColorField = ({
  onChangeColor,
  color,
  ...otherProps
}: {
  onChangeColor: (col: string) => void;
  color: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  return (
    <div
      onFocus={(e) => {
        setIsPickerVisible(true);
      }}
      onBlur={(e) => {
        setIsPickerVisible(false);
      }}
    >
      <input
        type="text"
        {...otherProps}
        style={{ backgroundColor: color, cursor: "pointer" }}
      />
      {isPickerVisible && (
        <HexColorPicker
          color={color}
          onChange={onChangeColor}
          style={{ marginLeft: 8 }}
        />
      )}
    </div>
  );
};
