import React, {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";

interface InputNumberProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  step?: string | number;
  placeholder?: string;
}

export const InputNumber: React.FC<InputNumberProps> = ({
  value,
  setValue,
  step = "any",
  placeholder,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(e.target.value));
  };

  return (
    <div className="input-container">
      <input
        value={value}
        onChange={handleChange}
        step={step}
        placeholder={placeholder}
      />
    </div>
  );
};

interface InputDateProps {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
}

export const InputDate: React.FC<InputDateProps> = ({
  value,
  setValue,
  placeholder,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="input-container">
      <input
        type="date"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

interface InputOptionsProps {
  value: string;
  setValue: (value: string) => void;
  options: string[];
}

export const InputOptions: React.FC<InputOptionsProps> = ({
  value,
  setValue,
  options,
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="input-container">
      <select value={value} onChange={handleChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
