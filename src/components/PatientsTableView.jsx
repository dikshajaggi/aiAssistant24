import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { MoreVertical, Pencil, Search, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";


const SearchData = ({globalFilter, setGlobalFilter}) => {
  return (
    <div className="relative w-full mb-4 sm:w-64">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder="Search patients..."
        className="w-full border border-gray-200 bg-gray-50 hover:bg-white rounded-xl pl-9 pr-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 transition-all shadow-sm hover:shadow focus:outline-none focus:ring-0 focus:border-gray-300"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
    </div>
  )
}

const PatientsTableView = ({ patients, loading, module, onSendReminder, onSendBill}) => {
  console.log(patients, "patients", module, onSendBill)
  const [globalFilter, setGlobalFilter] = useState("");

  const data = useMemo(() => patients, [patients]);

  // 🔹 Define columns with icons where appropriate
  const columns = useMemo(
    () => [
        {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      size: 50,
    },

    // ============================
    // 2️⃣ Serial Number Column
    // ============================
    {
      id: "sno",
      header: "S.No",
      cell: ({ row }) => row.index + 1,
      size: 60,
    },

      {
        accessorKey: "patient_pid",
        header: () => (
          <div className="flex items-center gap-1">
            {/* <Users size={14} className="text-gray-400" />  */}
            ID
          </div>
        ),
        size: 60,
      },
      {
        accessorKey: "name",
        header: () => (
          <div className="flex items-center gap-1">
            {/* <User size={14} className="text-gray-400" />  */}
            Name
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <img
              src={row.original.image || "https://via.placeholder.com/40"}
              alt={row.original.name}
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
            <span className="font-medium text-gray-800">{row.original.name}</span>
          </div>
        ),
        size: 200,
      },
      //  {
      //   accessorKey: "age",
      //   header: "Age",
      //   size: 100,
      // },
      module==="patient_module" ? {
        accessorKey: "treatment",
        header: "Treatment",
        size: 100,
      } : null,
      module==="patient_module" ? {
        accessorKey: "appointment_date",
        header: "Appointment Date",
        size: 100,
      } : null,
      // {
      //   accessorKey: "gender",
      //   header: "Gender",
      //   size: 100,
      // },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 100,
      },
      module === "reminder_module" ? {
        id: "reminder",
        header: "Reminder",
        cell: ({ row }) => (
          <button
            onClick={() => onSendReminder(row.original)}
            className="bg-primary1 text-white px-2 py-1 rounded-lg text-base hover:opacity-90 cursor-pointer"
          >
            Send Appointment Reminder
          </button>
        ),
        size: 150,
      } : null,
      module==="patient_module" ? {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const employee = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded hover:bg-gray-100">
                  <MoreVertical size={18} className="text-gray-600" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem
                  onClick={() => console.log("Edit", employee)}
                  className="cursor-pointer"
                >
                  <Pencil size={14} className="mr-2" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => console.log("Delete", employee)}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <Trash size={14} className="mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        size: 80,
      } : null,
      module!=="patient_module" ? {
        id: "billing",
        header: "Billing",
        cell: ({ row }) => (
          <button
            onClick={() => onSendBill(row.original)}
            className="cursor-pointer bg-primary1 text-white px-2 py-1 rounded-lg text-xs hover:opacity-90"
          >
            Generate Bill
          </button>
        ),
        size: 120,
      } : null
    ].filter(Boolean), [module]
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter},
    columnResizeMode: "onChange",
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  if(loading) return "Loading patients..."

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      {/* Toolbar */}
      <SearchData globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm font-medium">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="relative px-4 py-3 text-left whitespace-nowrap select-none border-r border-gray-200"
                    style={{ width: header.getSize() }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}

                    {/* Resize Line */}
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`absolute right-0 top-0 h-full w-0.5 cursor-col-resize transition-colors ${
                        header.column.getIsResizing()
                          ? "bg-blue-500 opacity-80"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-sm text-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 whitespace-nowrap border-r border-gray-100"
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 flex items-center justify-between">
        <button
          className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100 transition cursor-pointer"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100 transition cursor-pointer"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientsTableView;
