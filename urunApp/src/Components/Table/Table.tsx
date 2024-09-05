import { HTMLProps, useEffect, useMemo, useRef, useState } from "react";
import { EditCell } from "./Cell/EditCell";
import { FooterCell } from "./Cell/FooterCell";
import { TableCell } from "./Cell/TableCell";
import { v4 as uuidv4 } from "uuid";
import RecordModal from "./Modal/RecordModal"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  GroupingState,
  getGroupedRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { HeaderCell } from "./Cell/HeaderCell";

export type TableProps = {

  onRowUpdated?: (data?: any) => void;
  onRowRemove?: (data?: any) => void;
  getCanMultiSelect?: boolean;
  data: any;
  columns?: any;
  uniqueAccessorKey?: string;
  
  theRowStyle?: (row?: any) => any & TableProps;
  edit?: boolean;
  stok?: boolean;
  delete?: boolean; //delete olacak mı olmayacak mı
  selection?: boolean;
  singleSelection?: boolean;
  hideNewButton?: boolean; //buton sakla
  footerActions?: React.ReactNode[];
  hideEditButton?: boolean;
  onRowSelectionChange?: (value?: any) => void;
  toggleAllPageRowsSelected?: (value: boolean) => void;
  calisan?: boolean;
};

export type cellProps = {
  table?: any;
  row?: any;
};
//tablonun propsu olacak
export const Table = (props: TableProps) => {
  const [data, setData] = useState(() => [...props.data]); //propsun datası
  const [originalData, setOriginalData] = useState(() => [...props.data]);
  const [editedRows, setEditedRows] = useState({});
  const [filtering, setFiltering] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({}); //sütunların görünülürlüğü ile ilgili
  const [grouping, setGrouping] = useState<GroupingState>([]); //satır gruplama

  useEffect(() => {setData(props.data)},[JSON.stringify(props.data)])

  const getColumns = () => {
    let col = props.columns.map((item: any) => ({ ...item, cell: TableCell }));
    props.selection &&
      (col = [
        {
          id: "select",
          enableGrouping: false,
          cell: (props1: cellProps) => (
            <div className="px-1">
              <IndeterminateCheckbox
                {...{
                  checked: props1.row.getIsSelected(),
                  disabled: !props1.row.getCanSelect(),
                  indeterminate: props1.row.getIsSomeSelected(),
                  onChange: () => {
                    props.singleSelection
                      ? (table.resetRowSelection(), props1.row.toggleSelected())
                      : props1.row.toggleSelected();
                  },
                }}
              />
            </div>
          ),
        },
        ...col,
      ]);

    props.edit &&
      (col = [
        ...col,
        {
          accessorKey: "edit",
          cell: EditCell,
          header: "",
          enableColumnFilter: false,
          enableGrouping: false,
        },
      ]);
    return col;
  };

  const table = useReactTable({
    data,
    columns: getColumns(),
    getGroupedRowModel: getGroupedRowModel(), //gruplama
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getExpandedRowModel: getExpandedRowModel(),
    onGroupingChange: setGrouping, //gruplama
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters: columnFilters,
      globalFilter: filtering,
      rowSelection,
      grouping,
    
      columnVisibility, //sütun görünülürlüğü
    },

    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setFiltering,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    
   
    
    meta: {
      getCanMultiSelect: props.getCanMultiSelect,
      footerActions: props.footerActions,
      hideNewButton: props.hideNewButton,
      hideEditButton: props.hideEditButton,
      delete: props.delete,
      selection: props.selection,
      singleSelection: props.singleSelection,
      calisan:props.calisan,

      onRowRemove: props.onRowRemove,
      onRowUpdated: props.onRowUpdated,
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {

                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      updateRow: (rowIndex: number, value: any) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return value;
            }
            return row;
          })
        );
      },
      addRow: () => {
        const newRow: any = {}; //yeni satır ekle
        props.columns.map(
          (item: any) =>
            (newRow[item.accessorKey] =
              props.uniqueAccessorKey === item.accessorKey
                ? uuidv4()
                : item?.meta?.defaultValue ?? "")
        );

        const setFunc = (old: (typeof props.data)[]) => [...old, newRow];
        setData(setFunc);
        setOriginalData(setFunc);
        setEditedRows((old: any) => ({
          ...old,
          [table.getRowModel().rows[table.getRowModel().rows.length - 1]?.id]:
            true,
        }));
        props.calisan? <RecordModal table={table}/>: null
      },
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: (typeof props.data)[]) =>
          old.filter(
            (_row: (typeof props.data)[], index: number) => index !== rowIndex
          );

        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },

      removeSelectedRows: (selectedRows: number[]) => {
        const setFilterFunc = (old: (typeof props.data)[]) =>
          old.filter((_row, index) => !selectedRows.includes(index));
        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
    },
  });

  useEffect(() => {
    const selectedValue = Object.keys(rowSelection);
    const selectedData = data.filter((x, i) =>
      selectedValue?.includes(i.toString())
    );
    props.onRowSelectionChange && props.onRowSelectionChange(selectedData);
  }, [rowSelection]);

  return (
    <>
      <input
        className="urunAramaInput"
        type="text"
        placeholder="Aramak istediğinizi giriniz."
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      ></input>

      <table>
        <thead>
          <tr>
            <td colSpan={table.getCenterLeafColumns().length} align="left">
            <HeaderCell table={table} />
            </td>
          </tr>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <>
                      {header.column.getCanGroup() ? (
                        // If the header can be grouped, let's add a toggle
                        <button
                          {...{
                            onClick: header.column.getToggleGroupingHandler(),

                            style: {
                              borderStyle: "none",
                              backgroundColor: "yellowgreen",
                              cursor: "pointer",
                            },
                          }}
                        >
                          {header.column.getIsGrouped() ? `ᐃ ` : `ᐁ`}
                        </button>
                      ) : null}{" "}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                {...{
                  onClick: () =>
                    !editedRows?.[row?.id as keyof typeof editedRows] &&
                    row.toggleSelected(),
                  // style:props.theRowStyle ? props.theRowStyle(row) : undefined,
                    
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      {...{
                        key: cell.id,
                      }}
                    >
                      {cell.getIsGrouped() ? (
                        <button
                          {...{
                            onClick: row.getToggleExpandedHandler(),
                            style: {
                              borderStyle: "none",
                              backgroundColor: "transparent",
                              cursor: row.getCanExpand() ? "pointer" : "normal",
                            },
                          }}
                        >
                          {row.getIsExpanded() ? "ᐁ" : "ᐅ"}{" "}
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}{" "}
                          ({row.subRows.length})
                        </button>
                      ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={table.getCenterLeafColumns().length} align="right">
              <FooterCell table={table} />
            </td>
          </tr>
        </tfoot>
      </table>
      {/* <pre>{JSON.stringify(grouping, null, 2)}</pre> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <button  className="paginationButton"  onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button className="paginationButton" onClick={() => table.previousPage()}disabled={!table.getCanPreviousPage()}>
          Previous Page
        </button>
        <button className="paginationButton" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next Page
        </button>
        <button className="paginationButton" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}
        >
           {" "}
          {">>"}
        </button>
      </div>
      {/* <hr></hr> */}
    </>
  );
};

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);
  return (
    <label className="container">
      {" "}
      <input className="checkmark" type="checkbox" ref={ref} {...rest} />{" "}
      <span className="checkmark"></span>
    </label>
  );
}

function Filter({ column, table }: { column: any; table: any }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>

      <datalist id={column.id +"liste"}>
        {column.columnDef.meta?.options?.map((value: any) => (
          <option value={value.deger} key={value.id} />
        ))}
      </datalist>

      {column.columnDef.meta.type == "select" ? (
        <DebouncedInput
          type="text"
          value={"" as string}
          onChange={(value) => (
            column.columnDef.meta.options.map((item: any) =>
              item.deger == value ? (value = item.id) : value
            ),
            column.setFilterValue(value)
          )}
          placeholder={`Seç`}
          list={column.id + "liste"}
        />
      ) : (
        <DebouncedInput
          type="text"
          value={(columnFilterValue ?? "") as string}
          onChange={(value) => column.setFilterValue(value)}
          placeholder={`Ara...`}
          list={column.id + "list"}
        />
      )}
      <div className="h-1" />
    </>
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}


