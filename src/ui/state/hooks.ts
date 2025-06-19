import { useState } from "react";
import { useRecoilState, type RecoilState } from "recoil";

export const useOnChange = (
  state: RecoilState<any>,
  attr: string,
  inputType: "integer" | "float" | "text" | "date" = "text"
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useRecoilState(state);
  const [internalValue, setInternalValue] = useState<string>(value[attr]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: any = e.target.value;
    setInternalValue(newValue);

    if (inputType === "integer") {
      newValue = parseInt(e.target.value) || 0;
    } else if (inputType === "float") {
      newValue = parseFloat(e.target.value) || 0;
    } else if (inputType === "date") {
      newValue = e.target.value;
    }

    setValue((prevValue: any) => ({
      ...prevValue,
      [attr]: newValue,
    }));
  };

  return [internalValue, onChange] as const;
};
