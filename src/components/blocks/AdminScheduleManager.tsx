import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import {
  ScheduleService,
  type ScheduleRequest,
  type ScheduleResponse,
} from "@/services/ScheduleService";
import { TourService, type TourResponse } from "@/services/TourService";
import { RouteService, type RouteResponse } from "@/services/RouteService";
import {
  Plus,
  Trash2,
  Pencil,
  X,
  Loader2,
  AlertTriangle,
  Clock,
  Search,
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status?: string }) {
  const colorMap: Record<string, string> = {
    ACTIVE: "bg-green-100/20 text-green-600",
    INACTIVE: "bg-yellow-100/20 text-yellow-600",
    DRAFT: "bg-gray-100/20 text-gray-500",
  };
  const dotMap: Record<string, string> = {
    ACTIVE: "bg-green-500",
    INACTIVE: "bg-yellow-500",
    DRAFT: "bg-gray-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        colorMap[status ?? ""] ?? "bg-gray-100/20 text-gray-400"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotMap[status ?? ""] ?? "bg-gray-400"}`} />
      {status ?? "—"}
    </span>
  );
}

function formatTime(timeStr?: string) {
  if (!timeStr) return "—";
  if (timeStr.length >= 5) {
    return timeStr.slice(0, 5);
  }
  return timeStr;
}

// ─── Schedule Form Modal ──────────────────────────────────────────────────────

const STATUS_OPTIONS = ["DRAFT", "ACTIVE", "INACTIVE"] as const;

type ModalMode = "create" | "edit";

const EMPTY_FORM: ScheduleRequest = {
  tourId: 0,
  routeId: 0,
  minPax: 1,
  maxPax: undefined,
  departureAt: "",
  scheduleNote: "",
  scheduleDescription: "",
  scheduleStatus: "DRAFT",
  isTemplate: false,
};

interface ScheduleFormModalProps {
  mode: ModalMode;
  initial: ScheduleRequest;
  onClose: () => void;
  onSaved: () => void;
  editId?: number;
  tours: TourResponse[];
  routes: RouteResponse[];
}

function ScheduleFormModal({ mode, initial, onClose, onSaved, editId, tours, routes }: ScheduleFormModalProps) {
  const [form, setForm] = useState<ScheduleRequest>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof ScheduleRequest>(k: K, v: ScheduleRequest[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "create") {
        await ScheduleService.createSchedule(form);
      } else {
        await ScheduleService.updateSchedule({ id: editId! }, form);
      }
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err?.message ?? "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const labelCls = "block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1";
  const inputCls =
    "block w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">
            {mode === "create" ? "Create New Schedule" : "Edit Schedule"}
          </h2>
          <button onClick={onClose} disabled={loading} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {/* Tour & Route selects */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Tour *</label>
              <select
                className={`${inputCls} cursor-pointer`}
                required
                value={form.tourId || ""}
                onChange={(e) => set("tourId", Number(e.target.value))}
                disabled={loading}
              >
                <option value="">— Select tour —</option>
                {tours.map((t) => (
                  <option key={t.tourId} value={t.tourId}>
                    {t.tourName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Route *</label>
              <select
                className={`${inputCls} cursor-pointer`}
                required
                value={form.routeId || ""}
                onChange={(e) => set("routeId", Number(e.target.value))}
                disabled={loading}
              >
                <option value="">— Select route —</option>
                {routes.map((r) => (
                  <option key={r.routeId} value={r.routeId}>
                    {r.routeName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Departure */}
          <div>
            <label className={labelCls}>Departure Time</label>
            <input
              type="time"
              className={inputCls}
              value={form.departureAt ? form.departureAt.slice(0, 5) : ""}
              onChange={(e) => set("departureAt", e.target.value ? `${e.target.value}:00` : "")}
              disabled={loading}
            />
          </div>

          {/* Min/Max Pax */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Min Pax *</label>
              <input
                type="number"
                min={1}
                className={inputCls}
                required
                value={form.minPax || ""}
                onChange={(e) => set("minPax", Number(e.target.value))}
                disabled={loading}
              />
            </div>
            <div>
              <label className={labelCls}>Max Pax</label>
              <input
                type="number"
                min={1}
                className={inputCls}
                value={form.maxPax ?? ""}
                onChange={(e) => set("maxPax", e.target.value ? Number(e.target.value) : undefined)}
                disabled={loading}
                placeholder="Optional"
              />
            </div>
          </div>

          {/* Status and Template */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Status</label>
              <select
                className={`${inputCls} cursor-pointer`}
                value={form.scheduleStatus ?? "DRAFT"}
                onChange={(e) => set("scheduleStatus", e.target.value as ScheduleRequest["scheduleStatus"])}
                disabled={loading}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center mt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  checked={form.isTemplate ?? false}
                  onChange={(e) => set("isTemplate", e.target.checked)}
                  disabled={loading}
                />
                <span className="text-sm font-semibold text-foreground">Save as Template</span>
              </label>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className={labelCls}>Note</label>
            <input
              className={inputCls}
              value={form.scheduleNote ?? ""}
              onChange={(e) => set("scheduleNote", e.target.value)}
              disabled={loading}
              placeholder="Short note..."
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea
              className={`${inputCls} resize-none h-20`}
              value={form.scheduleDescription ?? ""}
              onChange={(e) => set("scheduleDescription", e.target.value)}
              disabled={loading}
              placeholder="Detailed description..."
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-secondary/20">
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleSubmit as any} disabled={loading} className="font-bold text-primary-foreground min-w-[110px]">
            {loading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving…</>
            ) : mode === "create" ? "Create Schedule" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

interface DeleteConfirmModalProps {
  schedule: ScheduleResponse;
  onClose: () => void;
  onDeleted: () => void;
}

function DeleteConfirmModal({ schedule, onClose, onDeleted }: DeleteConfirmModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await ScheduleService.deleteSchedule({ id: schedule.scheduleId! });
      onDeleted();
      onClose();
    } catch (err: any) {
      setError(err?.message ?? "Failed to delete schedule.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-sm bg-card border border-border rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100/30">
            <Trash2 className="w-5 h-5 text-red-500" />
          </div>
          <h2 className="text-base font-bold text-foreground">Deactivate Schedule</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-1">Are you sure you want to mark this schedule as INACTIVE?</p>
        <p className="text-sm font-semibold text-foreground mb-5">
          ID #{schedule.scheduleId} — Tour #{schedule.tourId}
        </p>
        {error && (
          <div className="mb-4 text-xs text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2">{error}</div>
        )}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleDelete} disabled={loading} className="bg-red-500 hover:bg-red-600 text-white font-bold min-w-[90px]">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AdminScheduleManager() {
  const [schedules, setSchedules] = useState<ScheduleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [tourIdFilter, setTourIdFilter] = useState("");

  // Name lookup lists for modals and table display
  const [tours, setTours] = useState<TourResponse[]>([]);
  const [routes, setRoutes] = useState<RouteResponse[]>([]);

  const tourName = (id?: number) => tours.find((t) => t.tourId === id)?.tourName ?? `Tour #${id ?? "—"}`;
  const routeName = (id?: number) => routes.find((r) => r.routeId === id)?.routeName ?? `Route #${id ?? "—"}`;

  const [modal, setModal] = useState<null | { mode: ModalMode; schedule?: ScheduleResponse }>(null);
  const [deleteTarget, setDeleteTarget] = useState<ScheduleResponse | null>(null);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const fetchSchedules = async (tourId?: string, status?: string) => {
    setLoading(true);
    try {
      const query: { tourId?: number; scheduleStatus?: string } = {};
      if (tourId && tourId.trim()) query.tourId = Number(tourId);
      if (status) query.scheduleStatus = status;
      const result = await ScheduleService.getSchedules(query);
      setSchedules(result);
    } catch (err) {
      console.error("Failed to fetch schedules:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules(tourIdFilter, statusFilter || undefined);
    TourService.getAllTours().then(setTours).catch(console.error);
    RouteService.getAllRoutes().then(setRoutes).catch(console.error);
  }, [statusFilter]);

  const handleTourIdChange = (val: string) => {
    setTourIdFilter(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      fetchSchedules(val, statusFilter || undefined);
    }, 400);
  };

  const closeModal = () => setModal(null);
  const refresh = () => fetchSchedules(tourIdFilter, statusFilter || undefined);

  return (
    <>
      {modal && (
        <ScheduleFormModal
          mode={modal.mode}
          initial={modal.schedule ? {
            tourId: modal.schedule.tourId ?? 0,
            routeId: modal.schedule.routeId ?? 0,
            minPax: modal.schedule.minPax ?? 1,
            maxPax: modal.schedule.maxPax,
            departureAt: modal.schedule.departureAt ?? "",
            scheduleNote: modal.schedule.scheduleNote ?? "",
            scheduleDescription: modal.schedule.scheduleDescription ?? "",
            scheduleStatus: modal.schedule.scheduleStatus,
            isTemplate: false,
          } : EMPTY_FORM}
          editId={modal.schedule?.scheduleId}
          onClose={closeModal}
          onSaved={refresh}
          tours={tours}
          routes={routes}
        />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          schedule={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDeleted={refresh}
        />
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black text-foreground tracking-tight mb-1">Schedule Manager</h2>
              <p className="text-muted-foreground text-base">Create and manage tour departure schedules.</p>
            </div>
            <Button onClick={() => setModal({ mode: "create" })} className="font-bold py-2.5 px-5 text-primary-foreground flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Schedule
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                className="pl-10 h-11"
                placeholder="Filter by Tour ID..."
                value={tourIdFilter}
                onChange={(e) => handleTourIdChange(e.target.value)}
                type="number"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["", "ACTIVE", "INACTIVE", "DRAFT"].map((s) => (
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
          </div>

          {/* Table */}
          <div className="bg-card shadow-sm border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-secondary/50">
                  <tr>
                    {["Schedule", "Tour / Route", "Departure", "Pax", "Status", "Actions"].map((h, i) => (
                      <th
                        key={h}
                        scope="col"
                        className={`px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider ${
                          i === 5 ? "text-right" : "text-left"
                        } ${i === 2 || i === 3 ? "hidden sm:table-cell" : ""}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                        Loading schedules…
                      </td>
                    </tr>
                  ) : schedules.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        No schedules found.{" "}
                        <button onClick={() => setModal({ mode: "create" })} className="text-primary font-semibold hover:underline">
                          Create one?
                        </button>
                      </td>
                    </tr>
                  ) : (
                    schedules.map((sch) => (
                      <tr key={sch.scheduleId} className="hover:bg-secondary/30 transition-colors group">
                        {/* ID / Note */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
                              #{sch.scheduleId}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-foreground">{sch.scheduleNote || "—"}</div>
                              <div className="text-xs text-muted-foreground line-clamp-1 max-w-[180px]">{sch.scheduleDescription || ""}</div>
                            </div>
                          </div>
                        </td>
                        {/* Tour / Route */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-foreground font-semibold truncate max-w-[180px]">{tourName(sch.tourId)}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-[180px]">{routeName(sch.routeId)}</div>
                        </td>
                        {/* Departure */}
                        <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell text-sm text-foreground">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                            {formatTime(sch.departureAt)}
                          </div>
                        </td>
                        {/* Pax */}
                        <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell text-sm text-foreground">
                          {sch.minPax ?? "—"}{sch.maxPax ? ` – ${sch.maxPax}` : "+"} pax
                        </td>
                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={sch.scheduleStatus} />
                        </td>
                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Edit"
                              onClick={() => setModal({ mode: "edit", schedule: sch })}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Delete"
                              onClick={() => setDeleteTarget(sch)}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {!loading && schedules.length > 0 && (
              <div className="px-6 py-3 border-t border-border bg-secondary/20 text-xs text-muted-foreground">
                {schedules.length} schedule{schedules.length !== 1 ? "s" : ""} found
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
