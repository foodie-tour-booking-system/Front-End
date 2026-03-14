import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Trash2,
  Loader2,
  X,
  AlertTriangle,
  Lock,
  Search,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  PermissionService,
  type PermissionCreateRequest,
  type PermissionResponse,
} from "@/services/PermissionService";

// ─── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status?: string }) {
  const map: Record<string, string> = {
    ACTIVE: "bg-green-100/20 text-green-600",
    DISABLE: "bg-yellow-100/20 text-yellow-600",
    DELETED: "bg-red-100/20 text-red-500",
  };
  const dot: Record<string, string> = {
    ACTIVE: "bg-green-500",
    DISABLE: "bg-yellow-500",
    DELETED: "bg-red-500",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        map[status ?? ""] ?? "bg-gray-100/20 text-gray-400"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status ?? ""] ?? "bg-gray-400"}`} />
      {status ?? "—"}
    </span>
  );
}

// ─── Create Permission Modal ───────────────────────────────────────────────────

interface CreateModalProps {
  onClose: () => void;
  onSaved: () => void;
}

function CreatePermissionModal({ onClose, onSaved }: CreateModalProps) {
  const [form, setForm] = useState<PermissionCreateRequest>({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setError("");
    setLoading(true);
    try {
      await PermissionService.create_1({ name: form.name.trim(), description: form.description.trim() });
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err?.message ?? "Failed to create permission.");
    } finally {
      setLoading(false);
    }
  };

  const labelCls = "block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1";
  const inputCls = "block w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Create Permission</h2>
          <button onClick={onClose} disabled={loading} className="text-muted-foreground hover:text-foreground">
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
            <label className={labelCls}>Permission Name *</label>
            <input
              className={inputCls}
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. MANAGE_TOURS"
              disabled={loading}
              autoFocus
            />
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea
              className={`${inputCls} resize-none h-20`}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="What does this permission allow?"
              disabled={loading}
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-secondary/20">
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button
            onClick={handleSubmit as any}
            disabled={loading || !form.name.trim()}
            className="font-bold text-primary-foreground min-w-[130px]"
          >
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating…</> : "Create Permission"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Permission Modal ───────────────────────────────────────────────────

interface DeleteModalProps {
  permission: PermissionResponse;
  onClose: () => void;
  onDeleted: () => void;
}

function DeletePermissionModal({ permission, onClose, onDeleted }: DeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await PermissionService.delete_1({ id: permission.permissionId! });
      onDeleted();
      onClose();
    } catch (err: any) {
      setError(err?.message ?? "Failed to delete permission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100/30">
            <Trash2 className="w-5 h-5 text-red-500" />
          </div>
          <h2 className="text-base font-bold text-foreground">Delete Permission</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-1">Are you sure you want to delete:</p>
        <p className="text-sm font-semibold text-foreground mb-5">"{permission.name}"</p>
        {error && (
          <div className="mb-4 text-xs text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2">{error}</div>
        )}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleDelete} disabled={loading} className="bg-red-500 hover:bg-red-600 text-white font-bold min-w-[90px]">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function AdminPermissionManager() {
  const [permissions, setPermissions] = useState<PermissionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modal, setModal] = useState<null | "create" | { type: "delete"; perm: PermissionResponse }>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const fetchPermissions = async (status?: string) => {
    setLoading(true);
    try {
      const result = await PermissionService.getAll_1(status ? { status } : undefined);
      setPermissions(result);
    } catch (err) {
      console.error("Failed to fetch permissions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions(statusFilter || undefined);
  }, [statusFilter]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {}, 0);
  };

  const filtered = permissions.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
  });

  const refresh = () => fetchPermissions(statusFilter || undefined);
  const closeModal = () => setModal(null);

  return (
    <>
      {/* Create Modal */}
      {modal === "create" && (
        <CreatePermissionModal onClose={closeModal} onSaved={refresh} />
      )}

      {/* Delete Modal */}
      {modal !== null && modal !== "create" && modal.type === "delete" && (
        <DeletePermissionModal
          permission={modal.perm}
          onClose={closeModal}
          onDeleted={refresh}
        />
      )}

      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 bg-background min-h-full">
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-foreground tracking-tight mb-1">Permission Catalog</h2>
              <p className="text-muted-foreground text-base">
                Define system-wide permissions that can be assigned to roles.
              </p>
            </div>
            <Button
              onClick={() => setModal("create")}
              className="bg-[#f1c40f] hover:bg-[#d4ac0d] text-slate-900 font-bold py-2.5 px-6 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Permission
            </Button>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-10 h-11"
                placeholder="Search by name or description..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            {/* Status filter pills */}
            <div className="flex gap-2 flex-wrap items-center">
              {["", "ACTIVE", "DISABLE", "DELETED"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                    statusFilter === s
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                  }`}
                >
                  {s === "" ? "All" : s}
                </button>
              ))}
            </div>
          </div>

          {/* Permission Table */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary/50 border-b border-border text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-4 w-12 text-center">ID</th>
                    <th className="px-6 py-4">Permission Name</th>
                    <th className="px-6 py-4 hidden md:table-cell">Description</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                        Loading permissions…
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                        No permissions found.{" "}
                        <button onClick={() => setModal("create")} className="text-primary font-semibold hover:underline">
                          Create one?
                        </button>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((perm) => {
                      const isDisabled = perm.status === "DELETED" || perm.status === "DISABLE";
                      return (
                        <tr key={perm.permissionId} className={`group hover:bg-secondary/20 transition-colors ${isDisabled ? "opacity-60" : ""}`}>
                          <td className="px-6 py-4 text-center text-xs text-muted-foreground font-mono">
                            #{perm.permissionId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {isDisabled && <Lock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
                              <span className="font-semibold text-foreground group-hover:text-primary transition-colors font-mono text-xs tracking-wide">
                                {perm.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell text-muted-foreground">
                            {perm.description || "—"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={perm.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                              <button
                                title="Delete"
                                onClick={() => setModal({ type: "delete", perm })}
                                disabled={isDisabled}
                                className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            {!loading && (
              <div className="px-6 py-3 border-t border-border bg-secondary/20 text-xs text-muted-foreground">
                {filtered.length} permission{filtered.length !== 1 ? "s" : ""}
                {search && ` matching "${search}"`}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
