import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  ScheduleService,
  type ScheduleRequest,
  type ScheduleResponse,
} from "@/services/ScheduleService";
import { TourService, type TourResponse } from "@/services/TourService";
import { RouteService, type RouteResponse } from "@/services/RouteService";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
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

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  } catch {
    return dateStr;
  }
}

function formatTime(timeStr?: string) {
  if (!timeStr) return "—";
  if (timeStr.includes("T")) {
    const timePart = timeStr.split("T")[1];
    return timePart.slice(0, 5);
  }
  return timeStr.slice(0, 5);
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
  startDate: "",
  endDate: "",
  time: "08:00:00",
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

          {/* Departure Date/Time Selection Mode */}
          <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
            <label className="flex items-center gap-2 mb-4 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                checked={form.isTemplate ?? false}
                onChange={(e) => set("isTemplate", e.target.checked)}
                disabled={loading}
              />
              <span className="text-sm font-bold text-foreground">Set as Fixed Hour (Template)</span>
            </label>

            {form.isTemplate ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Start Date</label>
                    <input
                      type="date"
                      className={inputCls}
                      value={form.startDate ?? ""}
                      onChange={(e) => set("startDate", e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>End Date</label>
                    <input
                      type="date"
                      className={inputCls}
                      value={form.endDate ?? ""}
                      onChange={(e) => set("endDate", e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Hour *</label>
                  <input
                    type="time"
                    className={inputCls}
                    required
                    value={form.time ?? "08:00:00"}
                    onChange={(e) => set("time", `${e.target.value}:00`)}
                    disabled={loading}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Departure Date *</label>
                  <input
                    type="date"
                    className={inputCls}
                    required={!form.isTemplate}
                    value={form.departureAt ? form.departureAt.split("T")[0] : ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      const time = form.departureAt?.split("T")[1] || "08:00:00";
                      set("departureAt", val ? `${val}T${time}` : "");
                    }}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className={labelCls}>Departure Time *</label>
                  <input
                    type="time"
                    className={inputCls}
                    required={!form.isTemplate}
                    value={form.departureAt && form.departureAt.includes("T") ? form.departureAt.split("T")[1].slice(0, 5) : ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      const date = form.departureAt?.split("T")[0] || new Date().toISOString().split("T")[0];
                      set("departureAt", `${date}T${val}:00`);
                    }}
                    disabled={loading}
                  />
                </div>
              </div>
            )}
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
  const [idFilter, setIdFilter] = useState("");
  // Name lookup lists for modals and table display
  const [tours, setTours] = useState<TourResponse[]>([]);
  const [routes, setRoutes] = useState<RouteResponse[]>([]);

  const tourName = (id?: number) => tours.find((t) => t.tourId === id)?.tourName ?? `Tour #${id ?? "—"}`;
  const routeName = (id?: number) => routes.find((r) => r.routeId === id)?.routeName ?? `Route #${id ?? "—"}`;

  const [modal, setModal] = useState<null | { mode: ModalMode; schedule?: ScheduleResponse }>(null);
  const [deleteTarget, setDeleteTarget] = useState<ScheduleResponse | null>(null);


  const fetchSchedules = async (status?: string, id?: string) => {
    setLoading(true);
    try {
      const query: { scheduleStatus?: string; scheduleId?: number } = {};
      if (status) query.scheduleStatus = status;
      if (id && id.trim()) query.scheduleId = Number(id);
      const result = await ScheduleService.getSchedules(query);
      setSchedules(result);
    } catch (err) {
      console.error("Failed to fetch schedules:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules(statusFilter || undefined, idFilter || undefined);
    TourService.getAllTours({ status: "ACTIVE" }).then(setTours).catch(console.error);
    RouteService.getAllRoutes({ routeStatus: "ACTIVE" }).then(setRoutes).catch(console.error);
  }, [statusFilter]);


  const closeModal = () => setModal(null);
  const refresh = () => fetchSchedules(statusFilter || undefined, idFilter || undefined);

  const handleIdSearch = (val: string) => {
    setIdFilter(val);
    fetchSchedules(statusFilter || undefined, val);
  };

  const filteredSchedules = [...schedules]
    .sort((a, b) => (a.scheduleId ?? 0) - (b.scheduleId ?? 0));

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
            isTemplate: modal.schedule.isTemplate ?? false,
            startDate: modal.schedule.startDate ?? "",
            endDate: modal.schedule.endDate ?? "",
            time: modal.schedule.time ?? "08:00:00",
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-black text-foreground tracking-tight mb-1 font-outfit uppercase">Schedule Manager</h2>
              <p className="text-muted-foreground text-base">Create and manage departure schedules for tours.</p>
            </div>
            <Button
              onClick={() => setModal({ mode: "create" })}
              className="gap-2 font-black text-primary-foreground min-w-[160px] shadow-xl hover:scale-105 transition-transform"
            >
              <Plus className="w-5 h-5 stroke-[3]" />
              ADD NEW
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center mb-10">
            {/* ID Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                className="pl-10 h-11 bg-card border-border/60"
                placeholder="Search by ID..."
                value={idFilter}
                onChange={(e) => handleIdSearch(e.target.value)}
              />
            </div>

            {/* Status Filter Buttons */}
            <div className="flex bg-secondary/30 p-1 rounded-2xl border border-border shadow-sm">
              {[
                { label: "ALL", value: "" },
                { label: "Active", value: "ACTIVE" },
                { label: "Inactive", value: "INACTIVE" },
                { label: "Draft", value: "DRAFT" },
              ].map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStatusFilter(s.value)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    statusFilter === s.value
                      ? "bg-card text-foreground shadow-md border border-border scale-[1.02]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {s.label}
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
                        Loading data…
                      </td>
                    </tr>
                  ) : filteredSchedules.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        No results found for current filters.{" "}
                        <button onClick={() => setModal({ mode: "create" })} className="text-primary font-semibold hover:underline">
                          Create one?
                        </button>
                      </td>
                    </tr>
                  ) : (
                    filteredSchedules.map((sch) => (
                      <tr key={sch.scheduleId} className="hover:bg-secondary/30 transition-colors group">
                        {/* ID / Note */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
                              #{sch.scheduleId}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="text-sm font-bold text-foreground">{sch.scheduleNote || "—"}</div>
                                {sch.isTemplate && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-blue-100 text-blue-600 uppercase tracking-tighter">
                                    Template
                                  </span>
                                )}
                              </div>
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
                          {sch.isTemplate ? (
                            <div className="flex flex-col">
                              <span className="font-semibold">{formatDate(sch.startDate)} – {formatDate(sch.endDate)}</span>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground italic">
                                Fixed hour: {sch.time?.slice(0, 5) ?? "—"}
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col">
                              <span className="font-semibold">{formatDate(sch.departureAt)}</span>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {formatTime(sch.departureAt)}
                              </div>
                            </div>
                          )}
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
            {!loading && filteredSchedules.length > 0 && (
              <div className="px-6 py-3 border-t border-border bg-secondary/20 text-xs text-muted-foreground">
                Displaying {filteredSchedules.length} schedule{filteredSchedules.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
