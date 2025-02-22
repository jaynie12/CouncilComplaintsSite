import React, { useEffect, useState } from "react";
import { Cases } from './data.ts'
import "./listOfCases.css";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./tableColumns.ts";
import useCases from "./apiCalls.ts";

export const Table = () => {
  const { data: originalData, isValidating, updateRow } = useCases();
  const [data, setData] = useState<Cases[]>([]);
  const [editedRows, setEditedRows] = useState({});
  const [validRows, setValidRows] = useState({});

  useEffect(() => {
    if (isValidating) return;
    setData([...originalData]);
  }, [isValidating]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      validRows,
      setValidRows,
      revertData: (rowIndex: number) => {
        setData((old) =>
          old.map((row, index) =>
            index === rowIndex ? originalData[rowIndex] : row
          )
        );
      },
      updateRow: (rowIndex: number) => {
        updateRow(data[rowIndex].id, data[rowIndex]);
      },
      updateData: (rowIndex: number, columnId: string, value: string, isValid: boolean) => {
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
        setValidRows((old) => ({
          ...old,
          [rowIndex]: { ...old[rowIndex], [columnId]: isValid },
        }));
      },
    },
  });

  return (
    <article className="table-container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: any) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell: any) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(data, null, "\t")}</pre> */}
    </article>

  );
};