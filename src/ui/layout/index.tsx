import type { FC, ReactNode } from "react";
import styled from "styled-components";

interface CellProps {
  index?: number | string;
  children: ReactNode;
}

interface CellLabelProps extends CellProps {
  label: string;
}

export const BaseLayout = styled.div`
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, max-content);
  grid-template-rows: repeat(12, min-content);
  gap: 0px 5px;
  ${["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => [
    `> .label${i} { grid-area: l${i}; }`,
    `> .value${i} { grid-area: v${i}; }`,
    `> .title${i} { grid-area: t${i}; }`,
    `> .action${i} { grid-area: a${i}; }`,
    `> .cell${i}  { grid-area: c${i}; }`,
  ])}
  > .title {
    > h1,
    > h2,
    > h3,
    > h4,
    > h5 {
      margin: 0;
      padding: 0;
    }
  }
  > .label {
    font-size: 0.85em;
    color: #575757;
  }
  > .value {
    input,
    select {
      width: calc(100% - 5px);
      background-color: white;
      border: 1px solid black;
    }
  }
`;

export const CellTitle: FC<CellProps> = ({ index = "1", children }) => {
  return <div className={`title title${index}`}>{children}</div>;
};

export const CellItem: FC<CellProps> = ({ index = "1", children }) => {
  return <div className={`cell cell${index}`}>{children}</div>;
};

export const CellAction: FC<CellProps> = ({ index = "1", children }) => {
  return <div className={`action action${index}`}>{children}</div>;
};

export const CellLabel: FC<CellLabelProps> = ({
  index = "1",
  label,
  children,
}) => {
  return (
    <>
      <div className={`label label${index}`}>{label}</div>
      <div className={`value value${index}`}>{children}</div>
    </>
  );
};

export const TemplateLayout = styled(BaseLayout)`
  grid-template-columns: repeat(2, max-content);
  grid-template-rows: repeat(2, min-content);
  grid-template-areas:
    "c1 c1"
    "c2 c3";
`;

export const FormLayout = styled(BaseLayout)`
  max-width: 800px;
  grid-template-columns: repeat(5, minmax(max-content, 1fr));
  grid-template-rows: repeat(3, min-content);
  grid-template-areas:
    "t1 t1 t1 t1 a1"
    "l1 l2 l3 l4 l5"
    "v1 v2 v3 v4 v5";
  padding-bottom: 10px;
  > .label {
    padding: 2px 5px 0px 5px;
  }
  > .value {
    padding: 0px 5px 2px 5px;
    > span {
      border: 1px solid black;
      padding: 2px 5px 2px 5px;
    }
  }
  > .action {
    button {
      padding: 2px 5px;
      background-color: white;
      min-width: 80px;
      font-weight: bold;
    }
  }
`;

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
    }
  }
`;
