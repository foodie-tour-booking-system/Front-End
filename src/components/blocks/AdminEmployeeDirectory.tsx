import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  ChevronDown,
  Pencil,
  Trash2,
  Loader2,
  X,
  AlertTriangle,
  ShieldCheck,
  UserCheck,
  UserX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  EmployeeService,
  type EmployeeCreateRequest,
  type EmployeeResponse,
  type EmployeeUpdateRequest,
} from "@/services/EmployeeService";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function avatar(name?: string) {
  return (name ?? "?").charAt(0).toUpperCase();
}

function StatusBadge({ status }: { status?: string }) {
  const map: Record<string, string> = {
    ACTIVE: "bg-green-100/20 text-green-600",
    INACTIVE: "bg-yellow-100/20 text-yellow-600",
    DELETED: "bg-red-100/20 text-red-500",
  };
  const dot: Record<string, string> = {
    ACTIVE: "bg-green-500",
    INACTIVE: "bg-yellow-500",
    DELETED: "bg-red-500",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        map[status ?? ""] ?? "bg-gray-100/20 text-gray-400"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dot[status ?? ""] ?? "bg-gray-400"}`}
      />
      {status ?? "—"}
    </span>
  );
}

// ─── Create / Edit Modal ───────────────────────────────────────────────────────

interface FormModalProps {
  mode: "create" | "edit";
  initial?: EmployeeResponse;
  onClose: () => void;
  onSaved: () => void;
}

const EMPTY_CREATE: EmployeeCreateRequest = {
  employeeName: "",
  email: "",
  phone: "",
  roleId: 0,
};

function EmployeeFormModal({ mode, initial, onClose, onSaved }: FormModalProps) {
  const [form, setForm] = useState<EmployeeCreateRequest>({
    employeeName: initial?.employeeName ?? "",
    email: initial?.email ?? "",
    phone: initial?.phone ?? "",
    roleId: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof EmployeeCreateRequest>(
    k: K,
    v: EmployeeCreateRequest[K]
  ) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "create") {
        await EmployeeService.create_2(form);
      } else {
        const updateBody: EmployeeUpdateRequest = {
          employeeName: form.employeeName,
          email: form.email,
          phone: form.phone,
        };
        await EmployeeService.update({ id: initial!.employeeId! }, updateBody);
      }
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err?.message ?? "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const labelCls =
    "block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1";
  const inputCls =
    "block w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">
            {mode === "create" ? "Add New Employee" : "Edit Employee"}
          </h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className={labelCls}>Full Name *</label>
            <input
              className={inputCls}
              required
              value={form.employeeName}
              onChange={(e) => set("employeeName", e.target.value)}
              placeholder="Nguyen Van A"
              disabled={loading}
            />
          </div>

          <div>
            <label className={labelCls}>Email *</label>
            <input
              type="email"
              className={inputCls}
              required
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="employee@example.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className={labelCls}>Phone *</label>
            <input
              type="tel"
              className={inputCls}
              required
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="0901234567"
              disabled={loading}
            />
          </div>

          {mode === "create" && (
            <div>
              <label className={labelCls}>Role ID *</label>
              <input
                type="number"
                min={1}
                className={inputCls}
                required
                value={form.roleId || ""}
                onChange={(e) => set("roleId", Number(e.target.value))}
                placeholder="e.g. 1"
                disabled={loading}
              />
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-secondary/20">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit as any}
            disabled={loading}
            className="font-bold text-primary-foreground min-w-[110px]"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving…</>
            ) : mode === "create" ? (
              "Add Employee"
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Change Status Modal ──────────────────────────────────────────────────────

interface ChangeStatusModalProps {
  employee: EmployeeResponse;
  targetStatus: "ACTIVE" | "INACTIVE" | "DELETED";
  onClose: () => void;
  onDone: () => void;
}

function ChangeStatusModal({
  employee,
  targetStatus,
  onClose,
  onDone,
}: ChangeStatusModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isDelete = targetStatus === "DELETED";
  const label = isDelete ? "Delete" : targetStatus === "ACTIVE" ? "Activate" : "Deactivate";
  const Icon = isDelete ? Trash2 : targetStatus === "ACTIVE" ? UserCheck : UserX;
  const colorCls = isDelete
    ? "bg-red-500 hover:bg-red-600"
    : targetStatus === "ACTIVE"
    ? "bg-green-600 hover:bg-green-700"
    : "bg-yellow-500 hover:bg-yellow-600";

  const handleConfirm = async () => {
    setLoading(true);
    setError("");
    try {
      await EmployeeService.changeStatus(
        { id: employee.employeeId! },
        { status: targetStatus }
      );
      onDone();
      onClose();
    } catch (err: any) {
      setError(err?.message ?? "Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${isDelete ? "bg-red-100/30" : "bg-yellow-100/30"}`}>
            <Icon className={`w-5 h-5 ${isDelete ? "text-red-500" : "text-yellow-600"}`} />
          </div>
          <h2 className="text-base font-bold text-foreground">{label} Employee</h2>
        </div>

        <p className="text-sm text-muted-foreground mb-1">
          {isDelete
            ? "Are you sure you want to delete:"
            : `Are you sure you want to ${label.toLowerCase()}:`}
        </p>
        <p className="text-sm font-semibold text-foreground mb-5">
          "{employee.employeeName}"
        </p>

        {error && (
          <div className="mb-4 text-xs text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2">
            {error}
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className={`${colorCls} text-white font-bold min-w-[100px]`}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : label}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Change Role Modal ────────────────────────────────────────────────────────

interface ChangeRoleModalProps {
  employee: EmployeeResponse;
  onClose: () => void;
  onDone: () => void;
}

function ChangeRoleModal({ employee, onClose, onDone }: ChangeRoleModalProps) {
  const [roleId, setRoleId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!roleId) {
      setError("Please enter a valid Role ID.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await EmployeeService.updateRole(
        { id: employee.employeeId! },
        { roleId }
      );
      onDone();
      onClose();
    } catch (err: any) {
      setError(err?.message ?? "Failed to update role.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "block w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100/30">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Change Role</h2>
            <p className="text-xs text-muted-foreground">{employee.employeeName}</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wide">Current Role</p>
        <p className="text-sm font-semibold text-foreground mb-4">{employee.roleName ?? "—"}</p>

        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
          New Role ID *
        </label>
        <input
          type="number"
          min={1}
          className={inputCls}
          value={roleId || ""}
          onChange={(e) => setRoleId(Number(e.target.value))}
          placeholder="Enter role ID"
          disabled={loading}
        />

        {error && (
          <div className="mt-3 text-xs text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2">
            {error}
          </div>
        )}

        <div className="flex gap-3 justify-end mt-5">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="font-bold text-primary-foreground min-w-[110px]"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Role"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface AdminEmployeeDirectoryProps {
  onNavigateToPermissions: (userId: string) => void;
  onNavigateToEdit: (userId: string) => void;
}

type StatusFilter = "" | "ACTIVE" | "INACTIVE" | "DELETED";

type ModalState =
  | null
  | { type: "create" }
  | { type: "edit"; employee: EmployeeResponse }
  | { type: "changeStatus"; employee: EmployeeResponse; targetStatus: "ACTIVE" | "INACTIVE" | "DELETED" }
  | { type: "changeRole"; employee: EmployeeResponse };

export function AdminEmployeeDirectory({
  onNavigateToPermissions,
  onNavigateToEdit,
}: AdminEmployeeDirectoryProps) {
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("");
  const [modal, setModal] = useState<ModalState>(null);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // ── Fetch ────────────────────────────────────────────────────────────────────

  const fetchEmployees = async (status?: string) => {
    setLoading(true);
    try {
      const result = await EmployeeService.getAll_2(
        status ? { status } : undefined
      );
      setEmployees(result);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(statusFilter || undefined);
  }, [statusFilter]);

  // ── Search (client-side filter) ──────────────────────────────────────────────

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {}, 0); // debounce placeholder
  };

  const filtered = employees.filter((e) => {
    if (!searchValue.trim()) return true;
    const q = searchValue.toLowerCase();
    return (
      e.employeeName?.toLowerCase().includes(q) ||
      e.email?.toLowerCase().includes(q) ||
      e.phone?.toLowerCase().includes(q)
    );
  });

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const closeModal = () => setModal(null);
  const refresh = () => fetchEmployees(statusFilter || undefined);

  return (
    <>
      {/* Create / Edit Modal */}
      {(modal?.type === "create" || modal?.type === "edit") && (
        <EmployeeFormModal
          mode={modal.type}
          initial={modal.type === "edit" ? modal.employee : undefined}
          onClose={closeModal}
          onSaved={refresh}
        />
      )}

      {/* Change Status Modal */}
      {modal?.type === "changeStatus" && (
        <ChangeStatusModal
          employee={modal.employee}
          targetStatus={modal.targetStatus}
          onClose={closeModal}
          onDone={refresh}
        />
      )}

      {/* Change Role Modal */}
      {modal?.type === "changeRole" && (
        <ChangeRoleModal
          employee={modal.employee}
          onClose={closeModal}
          onDone={refresh}
        />
      )}

      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 bg-background min-h-full">
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Employee Directory
              </h2>
              <p className="text-muted-foreground">
                Manage staff members and their access permissions.
              </p>
            </div>
            <Button
              onClick={() => setModal({ type: "create" })}
              className="bg-[#f1c40f] hover:bg-[#d4ac0d] text-slate-900 font-bold py-2.5 px-6 rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Employee
            </Button>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-card p-4 rounded-xl shadow-sm border border-border flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                className="pl-10 h-11"
                type="text"
                placeholder="Search by name, email or phone..."
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="relative min-w-[160px]">
              <select
                className="appearance-none w-full bg-secondary border-transparent text-foreground py-2.5 pl-4 pr-10 rounded-lg text-sm font-medium focus:ring-1 focus:ring-primary cursor-pointer outline-none h-11"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              >
                <option value="">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="DELETED">Deleted</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground w-4 h-4" />
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary/50 border-b border-border text-muted-foreground uppercase tracking-wider text-xs font-semibold">
                  <tr>
                    <th scope="col" className="px-6 py-4">Name</th>
                    <th scope="col" className="px-6 py-4 hidden sm:table-cell">Email</th>
                    <th scope="col" className="px-6 py-4 hidden md:table-cell">Phone</th>
                    <th scope="col" className="px-6 py-4">Role</th>
                    <th scope="col" className="px-6 py-4">Status</th>
                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                        Loading directory…
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        No employees found.{" "}
                        <button
                          onClick={() => setModal({ type: "create" })}
                          className="text-primary font-semibold hover:underline"
                        >
                          Add one?
                        </button>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((emp) => (
                      <tr
                        key={emp.employeeId}
                        className="hover:bg-secondary/30 transition-colors group"
                      >
                        {/* Name */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20 shrink-0">
                              {avatar(emp.employeeName)}
                            </div>
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {emp.employeeName}
                            </span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-6 py-4 whitespace-nowrap text-muted-foreground hidden sm:table-cell">
                          {emp.email ?? "—"}
                        </td>

                        {/* Phone */}
                        <td className="px-6 py-4 whitespace-nowrap text-muted-foreground hidden md:table-cell">
                          {emp.phone ?? "—"}
                        </td>

                        {/* Role */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100/20 text-blue-600">
                            {emp.roleName ?? "—"}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={emp.status} />
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">

                            {/* Edit */}
                            <button
                              title="Edit"
                              onClick={() => setModal({ type: "edit", employee: emp })}
                              className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>

                            {/* Change Role */}
                            <button
                              title="Change Role"
                              onClick={() => setModal({ type: "changeRole", employee: emp })}
                              className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                            >
                              <ShieldCheck className="w-4 h-4" />
                            </button>

                            {/* Toggle Active/Inactive */}
                            {emp.status === "ACTIVE" ? (
                              <button
                                title="Deactivate"
                                onClick={() =>
                                  setModal({
                                    type: "changeStatus",
                                    employee: emp,
                                    targetStatus: "INACTIVE",
                                  })
                                }
                                className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-yellow-600 hover:bg-yellow-500/10 transition-colors"
                              >
                                <UserX className="w-4 h-4" />
                              </button>
                            ) : emp.status === "INACTIVE" ? (
                              <button
                                title="Activate"
                                onClick={() =>
                                  setModal({
                                    type: "changeStatus",
                                    employee: emp,
                                    targetStatus: "ACTIVE",
                                  })
                                }
                                className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-green-600 hover:bg-green-500/10 transition-colors"
                              >
                                <UserCheck className="w-4 h-4" />
                              </button>
                            ) : null}

                            {/* Delete */}
                            {emp.status !== "DELETED" && (
                              <button
                                title="Delete"
                                onClick={() =>
                                  setModal({
                                    type: "changeStatus",
                                    employee: emp,
                                    targetStatus: "DELETED",
                                  })
                                }
                                className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}

                            {/* View Permissions */}
                            <button
                              title="View Permissions"
                              onClick={() => onNavigateToPermissions(String(emp.employeeId))}
                              className="text-[#f1c40f] hover:text-[#d4ac0d] font-medium text-xs px-2 py-1 rounded hover:underline"
                            >
                              Permissions
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            {!loading && (
              <div className="px-6 py-3 border-t border-border bg-secondary/20 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {filtered.length} employee{filtered.length !== 1 ? "s" : ""} found
                  {searchValue && ` for "${searchValue}"`}
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
