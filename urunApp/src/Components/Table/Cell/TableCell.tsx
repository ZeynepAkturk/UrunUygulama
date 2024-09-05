import { useState, useEffect, ChangeEvent, createElement } from "react";

type TableCellProps = {
  getValue: any;
  row: any;
  column: any;
  table: any;
};


export const TableCell = (props: TableCellProps) => {
  const initialValue = props.getValue();
  const columnMeta = props.column.columnDef.meta;
  const tableMeta = props.table.options.meta;
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    tableMeta?.updateData(props.row.index, props.column.id, value);
  };
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    tableMeta?.updateData(props.row.index, props.column.id, e.target.value);
  };

  if (tableMeta?.editedRows[props.row.id]) {
    if (columnMeta?.CellEditor) {
      return createElement(columnMeta.CellEditor, {
        ...props,
        setEditCell: (val?: any) => {
          tableMeta?.updateData(props.row.index, props.column.id, val);
        },
        setEditRow: (val?: any) => {
          tableMeta?.updateRow(props.row.index, val);
        },
      });
    }

    return columnMeta?.type === "select" ? (
      <select onChange={onSelectChange} value={initialValue}>
        {columnMeta?.options?.map((option: any) => (
          <option
            key={option?.[columnMeta?.valueExpression ?? "id"]}
            value={option?.[columnMeta?.valueExpression ?? "id"]}
          >
            {option?.[columnMeta?.displayExpression ?? "deger"]}
          </option>
        ))}
      </select>
    ) : (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
        required={columnMeta?.required}
        pattern={columnMeta?.pattern}
        readOnly={columnMeta?.readOnly}
      ></input>
    );
  }

  const lastResult =
    columnMeta?.type === "select"
      ? columnMeta?.options?.find(
          (x: any) => x?.[columnMeta?.valueExpression ?? "id"] === value
        )?.[columnMeta?.displayExpression ?? "deger"]
      : value;

  return <>{lastResult}</>;
};
