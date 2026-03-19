import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Trash2,
  Loader2,
  X,
  AlertTriangle,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Save,
  Lock,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  RoleService,
  type RoleCreateRequest,
  type RoleResponse,
} from "@/services/RoleService";
import {
  PermissionService,
  type PermissionResponse,
} from "@/services/PermissionService";

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        map[status ?? ""] ?? "bg-gray-100/20 text-gray-400"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status ?? ""] ?? "bg-gray-400"}`} />
      {status ?? "—"}
    </span>
  );
}

// ─── Create Role Modal ─────────────────────────────────────────────────────────

interface CreateRoleModalProps {
  onClose: () => void;
  onSaved: () => void;
}

function CreateRoleModal({ onClose, onSaved }: CreateRoleModalProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setError("");
    setLoading(true);
    try {
      const body: RoleCreateRequest = { name: name.trim() };
      await RoleService.create(body);
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err?.message ?? "Failed to create role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Create New Role</h2>
          <button onClick={onClose} disabled={loading} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
              Role Name *
            </label>
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tour Manager"
              disabled={loading}
              autoFocus
            />
          </div>
        </form>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-secondary/20">
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleSubmit as any} disabled={loading || !name.trim()} className="font-bold text-primary-foreground min-w-[110px]">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating…</> : "Create Role"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Role Modal ─────────────────────────────────────────────────────────

interface DeleteRoleModalProps {
  role: RoleResponse;
  onClose: () => void;
  onDeleted: () => void;
}

function DeleteRoleModal({ role, onClose, onDeleted }: DeleteRoleModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await RoleService.delete({ id: role.roleId! });
      onDeleted();
      onClose();
    } catch (err: any) {
      setError(err?.message ?? "Failed to delete role.");
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
          <h2 className="text-base font-bold text-foreground">Delete Role</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-1">Are you sure you want to delete:</p>
        <p className="text-sm font-semibold text-foreground mb-5">"{role.name}"</p>
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

// ─── Permission Assignment Panel ───────────────────────────────────────────────

interface PermissionPanelProps {
  role: RoleResponse;
  onBack: () => void;
  onSaved: () => void;
}

function PermissionAssignmentPanel({ role, onBack, onSaved }: PermissionPanelProps) {
  const [allPermissions, setAllPermissions] = useState<PermissionResponse[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loadingPerms, setLoadingPerms] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const initial = new Set<number>(
      (role.permissionDtoList ?? []).map((p) => p.permissionId!).filter(Boolean)
    );
    setSelected(initial);

    PermissionService.getAll_1()
      .then(setAllPermissions)
      .catch(console.error)
      .finally(() => setLoadingPerms(false));
  }, [role]);

  const toggle = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setSuccess(false);
  };

  const toggleAll = () => {
    if (selected.size === allPermissions.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(allPermissions.map((p) => p.permissionId!)));
    }
    setSuccess(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      await RoleService.customRolePermission(
        { id: role.roleId! },
        { permissionIds: Array.from(selected) }
      );
      setSuccess(true);
      onSaved();
    } catch (err: any) {
      setError(err?.message ?? "Failed to update permissions.");
    } finally {
      setSaving(false);
    }
  };

  const allChecked = allPermissions.length > 0 && selected.size === allPermissions.length;
  const indeterminate = selected.size > 0 && selected.size < allPermissions.length;

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-background min-h-full pb-32">
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">

        {/* Breadcrumb */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Roles
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-primary/10">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-black text-foreground tracking-tight">{role.name}</h2>
              <StatusBadge status={role.status} />
            </div>
            <p className="text-sm text-muted-foreground">
              Assign which permissions this role grants to all employees with it.
            </p>
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            <span className="text-foreground font-bold">{selected.size}</span> of {allPermissions.length} permissions selected
          </div>
        </div>

        {/* Error / Success */}
        {error && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-sm font-medium">
            ✓ Permissions updated successfully!
          </div>
        )}

        {/* Permission List */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          {/* Select-all header */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-border bg-secondary/30">
            <input
              type="checkbox"
              checked={allChecked}
              ref={(el) => { if (el) el.indeterminate = indeterminate; }}
              onChange={toggleAll}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary cursor-pointer"
            />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Select All Permissions
            </span>
          </div>

          {loadingPerms ? (
            <div className="py-12 flex items-center justify-center text-muted-foreground gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading permissions…
            </div>
          ) : allPermissions.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground text-sm">No permissions found.</div>
          ) : (
            <ul className="divide-y divide-border">
              {allPermissions.map((perm) => {
                const isChecked = selected.has(perm.permissionId!);
                const isDisabled = perm.status === "DELETED" || perm.status === "DISABLE";
                return (
                  <li key={perm.permissionId}>
                    <label
                      className={`flex items-start gap-4 px-6 py-5 transition-colors cursor-pointer ${
                        isDisabled
                          ? "opacity-50 cursor-not-allowed bg-secondary/10"
                          : isChecked
                          ? "bg-primary/5 hover:bg-primary/10"
                          : "hover:bg-secondary/20"
                      }`}
                    >
                      <div className="flex items-center mt-0.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={isDisabled}
                          onChange={() => !isDisabled && toggle(perm.permissionId!)}
                          className="h-5 w-5 rounded border-input text-primary focus:ring-primary cursor-pointer disabled:cursor-not-allowed"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-semibold ${isChecked ? "text-primary" : "text-foreground"}`}>
                            {perm.name}
                          </span>
                          {isDisabled && (
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-muted-foreground border border-border px-1.5 py-0.5 rounded bg-secondary">
                              <Lock className="w-2.5 h-2.5" /> {perm.status}
                            </span>
                          )}
                          {!isDisabled && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                              perm.status === "ACTIVE"
                                ? "bg-green-100/20 text-green-600"
                                : "bg-gray-100/20 text-gray-400"
                            }`}>
                              {perm.status}
                            </span>
                          )}
                        </div>
                        {perm.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">{perm.description}</p>
                        )}
                        <p className="text-xs text-muted-foreground/60 mt-0.5">ID: {perm.permissionId}</p>
                      </div>
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 p-5 bg-card/95 backdrop-blur-md border-t border-border z-20 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground hidden sm:block">
            <span className="font-semibold text-foreground">{selected.size}</span> permissions will be assigned to <span className="font-semibold text-foreground">"{role.name}"</span>
          </p>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" onClick={onBack} className="flex-1 sm:flex-none">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 sm:flex-none font-bold text-primary-foreground min-w-[130px]"
            >
              {saving ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving…</>
              ) : (
                <><Save className="w-4 h-4 mr-2" />Save Permissions</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────── 

export function AdminRoleManager() {
  const [roles, setRoles] = useState<RoleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [modal, setModal] = useState<null | "create" | { type: "delete"; role: RoleResponse }>(null);
  const [editingRole, setEditingRole] = useState<RoleResponse | null>(null);

  const fetchRoles = async (status?: string) => {
    setLoading(true);
    try {
      const result = await RoleService.getAll(status ? { status } : undefined);
      setRoles(result);
    } catch (err) {
      console.error("Failed to fetch roles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles(statusFilter || undefined);
  }, [statusFilter]);

  const refresh = () => fetchRoles(statusFilter || undefined);
  const closeModal = () => setModal(null);

  // If editing permissions for a role, show the assignment panel
  if (editingRole) {
    return (
      <PermissionAssignmentPanel
        role={editingRole}
        onBack={() => setEditingRole(null)}
        onSaved={refresh}
      />
    );
  }

  return (
    <>
      {/* Create Modal */}
      {modal === "create" && (
        <CreateRoleModal onClose={closeModal} onSaved={refresh} />
      )}

      {/* Delete Modal */}
      {modal !== null && modal !== "create" && modal.type === "delete" && (
        <DeleteRoleModal
          role={modal.role}
          onClose={closeModal}
          onDeleted={refresh}
        />
      )}

      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 bg-background min-h-full">
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-foreground tracking-tight mb-1">Roles & Access</h2>
              <p className="text-muted-foreground text-base">
                Create roles and control which permissions each role grants.
              </p>
            </div>
            <Button
              onClick={() => setModal("create")}
              className="bg-[#f1c40f] hover:bg-[#d4ac0d] text-slate-900 font-bold py-2.5 px-6 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Role
            </Button>
          </div>

          {/* Filter */}
          <div className="flex gap-3 flex-wrap">
            {["", "ACTIVE", "INACTIVE", "DELETED"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                  statusFilter === s
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                }`}
              >
                {s === "" ? "All" : s}
              </button>
            ))}
          </div>

          {/* Role Cards Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              Loading roles…
            </div>
          ) : roles.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No roles found.{" "}
              <button onClick={() => setModal("create")} className="text-primary font-semibold hover:underline">
                Create one?
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...roles].sort((a, b) => (a.roleId ?? 0) - (b.roleId ?? 0)).map((role) => (
                <div
                  key={role.roleId}
                  className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/40 transition-all group"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-base leading-tight">{role.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {role.roleId}</p>
                      </div>
                    </div>
                    <StatusBadge status={role.status} />
                  </div>

                  {/* Permissions preview */}
                  <div className="mb-4 min-h-[48px]">
                    {(role.permissionDtoList ?? []).length === 0 ? (
                      <p className="text-xs text-muted-foreground italic">No permissions assigned</p>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {(role.permissionDtoList ?? []).slice(0, 4).map((p) => (
                          <span
                            key={p.permissionId}
                            className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-secondary text-muted-foreground border border-border"
                          >
                            {p.name}
                          </span>
                        ))}
                        {(role.permissionDtoList ?? []).length > 4 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-secondary text-muted-foreground border border-border">
                            +{(role.permissionDtoList ?? []).length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-border">
                    <button
                      onClick={() => setEditingRole(role)}
                      className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors py-1.5 rounded-lg hover:bg-primary/10"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Manage Permissions
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setModal({ type: "delete", role })}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Delete role"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer count */}
          {!loading && roles.length > 0 && (
            <p className="text-xs text-muted-foreground text-center">
              {roles.length} role{roles.length !== 1 ? "s" : ""} found
            </p>
          )}

        </div>
      </div>
    </>
  );
}
