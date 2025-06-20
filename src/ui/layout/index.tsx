import type { FC, ReactNode } from "react";
import styled from "styled-components";

const cells = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i)
).flatMap((c) => Array.from({ length: 20 }, (_, j) => `${c}${j + 1}`));

export const BaseLayout = styled.div`
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, max-content);
  grid-template-rows: repeat(12, min-content);
  gap: 0px 5px;
  ${cells.flatMap((cell) => `> .${cell} { grid-area:${cell}; }`)}
  h1, h2, h3, h4, h5 {
    margin: 0;
    padding: 0;
  }
`;

interface CellProps {
  className?: string;
  name?: string;
  children: ReactNode;
}

interface CellLabelProps extends CellProps {
  label: string;
}

export const InputLayout = styled(BaseLayout)`
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content;
  grid-template-areas:
    "a1"
    "b1";
  > .a1 {
    font-size: 0.85em;
    color: #575757;
  }
  > .b1 {
    input,
    select {
      width: calc(100% - 5px);
      background-color: white;
      border: 1px solid black;
    }
  }
`;

export const CellInput: FC<CellLabelProps> = ({
  className = "a1",
  label,
  children,
}) => {
  return (
    <InputLayout className={className}>
      <div className="a1">{label}</div>
      <div className="b1">{children}</div>
    </InputLayout>
  );
};

export const TemplateLayout = styled(BaseLayout)`
  grid-template-columns: repeat(2, max-content);
  grid-template-rows: repeat(2, min-content);
  grid-template-areas:
    "a1 a1"
    "b1 b2";
`;

export const FormLayout = styled(BaseLayout)`
  max-width: 800px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, min-content);
  grid-template-areas:
    "x1 x1 x2"
    "a1 a2 a3"
    "b1 b2 b3"
    "c1 c2 c3";
  padding-bottom: 10px;
`;

// > .label {
//   padding: 2px 5px 0px 5px;
// }
// > .value {
//   padding: 0px 5px 2px 5px;
//   > span {
//     border: 1px solid black;
//     padding: 2px 5px 2px 5px;
//   }
// }
// > .action {
//   button {
//     padding: 2px 5px;
//     background-color: white;
//     min-width: 80px;
//     font-weight: bold;
//   }
// }

export const TableLayout = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid black;
  color: black;
  thead,
  tbody {
    tr {
      th,
      td {
        border: 1px solid black;
        padding: 2px 5px;
        text-align: left;
        font-size: 12px;
      }
      &.paid {
        color: black;
      }
      &.unpaid {
        color: #bfbfbf;
        th,
        td,
        input,
        select {
          border: 1px solid #bfbfbf;
          color: #bfbfbf;
        }
      }
    }
  }
`;
