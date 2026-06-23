import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

// Fuzzy filter: all typed chars must appear in order within the cell value
const fuzzyFilter = (row, columnId, filterValue) => {
  const cell = String(row.getValue(columnId) ?? "").toLowerCase();
  const term = String(filterValue).toLowerCase().trim();
  if (!term) return true;
  let ti = 0;
  for (let i = 0; i < cell.length && ti < term.length; i++) {
    if (cell[i] === term[ti]) ti++;
  }
  return ti === term.length;
};
fuzzyFilter.autoRemove = (val) => !val;
import { MoreVertical, Pencil, Search, Trash, UserPlus, SearchX, History } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { WarningModal } from "./common/WarningModal";
import EditPatient from "./common/EditPatient";
import PatientHistoryModal from "./common/PatientHistoryModal";
import { deletePatient } from "../apis";
import { toast } from "react-toastify";


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

const PatientsTableView = ({ patients, loading, module, onSendReminder, onSendBill, onRefresh, onAdd }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [delLoading, setDelLoading] = useState(false);

const data = useMemo(() => patients ?? [], [patients]);

  const handleDelPatient = async () => {
    setDelLoading(true);
    try {
      await deletePatient(selectedPatient.id);
      toast.success("Patient deleted successfully");
      setShowDelModal(false);
      onRefresh?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete patient");
    } finally {
      setDelLoading(false);
    }
  };

  const saveDetails = () => {
    setShowEditModal(false);
    onRefresh?.();
  };

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
      {
        id: "sno",
        header: "S.No",
        cell: ({ row }) => row.index + 1,
        size: 60,
      },
      {
        accessorKey: "patient_pid",
        header: () => <div className="flex items-center gap-1">ID</div>,
        size: 60,
      },
      {
        accessorKey: "name",
        header: () => <div className="flex items-center gap-1">Name</div>,
        cell: ({ row }) => (
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={row.original.image || "https://via.placeholder.com/40"}
              alt={row.original.name}
              className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
            />
            <span className="font-medium text-gray-800 truncate max-w-[140px]">{row.original.name}</span>
          </div>
        ),
        size: 200,
      },
      module === "patient_module" ? {
        accessorKey: "treatment",
        header: "Treatment",
        size: 100,
      } : null,
      module === "patient_module" ? {
        accessorKey: "appointment_date",
        header: "Appointment Date",
        size: 100,
      } : null,
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
      module === "patient_module" ? {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded hover:bg-gray-100">
                <MoreVertical size={18} className="text-gray-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => {
                  setShowEditModal(true);
                  setSelectedPatient(row.original);
                }}
                className="cursor-pointer"
              >
                <Pencil size={14} className="mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setShowHistoryModal(true);
                  setSelectedPatient(row.original);
                }}
                className="cursor-pointer"
              >
                <History size={14} className="mr-2" />
                View History
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setShowDelModal(true);
                  setSelectedPatient(row.original);
                }}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <Trash size={14} className="mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        size: 80,
      } : null,
      module !== "patient_module" ? {
        id: "billing",
        header: "Billing",
        cell: () => (
          <span title="Coming soon" style={{ cursor: "not-allowed" }}>
            <button
              style={{ opacity: 0.4, pointerEvents: "none" }}
              className="bg-secondary1 text-white px-2 py-1 rounded-lg text-xs"
            >
              Generate Bill
            </button>
          </span>
        ),
        size: 120,
      } : null,
    ].filter(Boolean),
    [module]
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    columnResizeMode: "onChange",
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    autoResetPageIndex: true,
  });

  if (loading) return (
    <div className="w-full flex items-center justify-center py-16 text-gray-400 text-sm">
      Loading patients…
    </div>
  );

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-4 pt-4">
        <SearchData globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </div>

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
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`absolute right-0 top-0 h-full w-0.5 cursor-col-resize transition-colors ${
                        header.column.getIsResizing() ? "bg-blue-500 opacity-80" : "bg-gray-200"
                      }`}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-sm text-gray-700">
            {table.getRowModel().rows?.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-16 text-center">
                  {data.length === 0 ? (
                    <div className="flex flex-col items-center gap-3">
                      <UserPlus size={36} className="text-gray-300" />
                      <p className="text-gray-500 font-medium">No patients yet</p>
                      <p className="text-gray-400 text-xs">Add your first patient to get started</p>
                      {onAdd && (
                        <button
                          onClick={onAdd}
                          className="mt-1 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition cursor-pointer"
                        >
                          <UserPlus size={15} /> Add Patient
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <SearchX size={32} className="text-gray-300" />
                      <p className="text-gray-500 font-medium">No results for &quot;{globalFilter}&quot;</p>
                      <button
                        onClick={() => setGlobalFilter("")}
                        className="text-blue-600 text-sm hover:underline cursor-pointer"
                      >
                        Clear search
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows?.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
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
              ))
            )}
          </tbody>
        </table>
      </div>

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

      {showEditModal && (
        <EditPatient
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          patient={selectedPatient}
          onSave={saveDetails}
        />
      )}
      {showDelModal && (
        <WarningModal
          isOpen={showDelModal}
          onClose={() => setShowDelModal(false)}
          onConfirm={handleDelPatient}
          patientName={selectedPatient?.name}
          type="patient"
          loading={delLoading}
        />
      )}
      {showHistoryModal && (
        <PatientHistoryModal
          isOpen={showHistoryModal}
          onClose={() => setShowHistoryModal(false)}
          patient={selectedPatient}
        />
      )}
    </div>
  );
};

export default PatientsTableView;
