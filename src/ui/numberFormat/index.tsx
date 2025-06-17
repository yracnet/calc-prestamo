import styled from "styled-components";

const NumberLayout = styled.span`
  display: flex;
  flex-wrap: nowrap;
  justify-content: end;
  line-height: 1em;
  padding: 3px 0;
  > * {
    padding: 0;
  }
  > .value {
    font-size: 1em;
  }
  > .point {
    color: black;
  }
  > .decimal {
    font-size: 0.8em;
    line-height: 0.8em;
    color: #868686;
  }
  > .sufix {
    padding-left: 5px;
  }
  > .prefix {
    padding-right: 5px;
  }
`;

interface NumberFormatProps {
  value?: number;
  decimal?: number;
  sufix?: string;
  prefix?: string;
}

export const NumberFormat: React.FC<NumberFormatProps> = ({
  value = 0,
  decimal = 3,
  sufix = "",
  prefix = "",
}) => {
  const [a, b] = parseFloat(value.toString()).toFixed(decimal).split(".");

  return (
    <NumberLayout>
      {prefix && <span className="prefix"> {prefix} </span>}
      <span className="value">{a}</span>
      {decimal > 0 && (
        <>
          <span className="point">.</span>
          <span className="decimal">{b}</span>
        </>
      )}
      {sufix && <span className="sufix"> {sufix} </span>}
    </NumberLayout>
  );
};
