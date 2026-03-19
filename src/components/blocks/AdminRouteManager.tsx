import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  RouteService,
  type RouteRequest,
  type RouteDetailRequest,
  type RouteResponse,
} from "@/services/RouteService";
import { TourService, type TourResponse } from "@/services/TourService";
import {
  Plus,
  Trash2,
  Pencil,
  X,
  Loader2,
  AlertTriangle,
  Navigation,
  MapPin,
  ChevronDown,
  ChevronUp,
  GripVertical,
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_OPTIONS = ["DRAFT", "ACTIVE", "INACTIVE", "DELETED"] as const;

const EMPTY_STOP: RouteDetailRequest = {
  locationName: "",
  locationOrder: 1,
  durationAtLocation: 30,
  routeDetailStatus: "ACTIVE",
};

const EMPTY_FORM: RouteRequest = {
  routeName: "",
  tourId: undefined,
  routeStatus: "DRAFT",
  routeDetails: [],
};

// ─── Route Form Modal ─────────────────────────────────────────────────────────

type ModalMode = "create" | "edit";

interface RouteFormModalProps {
  mode: ModalMode;
  initial: RouteRequest;
  editId?: number;
  onClose: () => void;
  onSaved: () => void;
  tours: TourResponse[];
}

function RouteFormModal({ mode, initial, editId, onClose, onSaved, tours }: RouteFormModalProps) {
  const [form, setForm] = useState<RouteRequest>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setField = <K extends keyof RouteRequest>(k: K, v: RouteRequest[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const addStop = () => {
    const stops = form.routeDetails ?? [];
    setField("routeDetails", [
      ...stops,
      { ...EMPTY_STOP, locationOrder: stops.length + 1 },
    ]);
  };

  const removeStop = (idx: number) =>
    setField(
      "routeDetails",
      (form.routeDetails ?? []).filter((_, i) => i !== idx).map((s, i) => ({ ...s, locationOrder: i + 1 }))
    );

  const updateStop = <K extends keyof RouteDetailRequest>(idx: number, key: K, val: RouteDetailRequest[K]) =>
    setField(
      "routeDetails",
      (form.routeDetails ?? []).map((s, i) => (i === idx ? { ...s, [key]: val } : s))
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "create") {
        await RouteService.createRoute(form);
      } else {
        await RouteService.updateRoute({ id: editId! }, form);
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
      <div className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <h2 className="text-lg font-bold text-foreground">
            {mode === "create" ? "Create New Route" : "Edit Route"}
          </h2>
          <button onClick={onClose} disabled={loading} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5 overflow-y-auto flex-1">
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {/* Route Name */}
          <div>
            <label className={labelCls}>Route Name *</label>
            <input
              className={inputCls}
              required
              value={form.routeName ?? ""}
              onChange={(e) => setField("routeName", e.target.value)}
              disabled={loading}
              placeholder="e.g. Saigon Street Food Route"
            />
          </div>

          {/* Tour select & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Tour (optional)</label>
              <select
                className={`${inputCls} cursor-pointer`}
                value={form.tourId ?? ""}
                onChange={(e) => setField("tourId", e.target.value ? Number(e.target.value) : undefined)}
                disabled={loading}
              >
                <option value="">— No tour —</option>
                {tours.map((t) => (
                  <option key={t.tourId} value={t.tourId}>
                    {t.tourName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select
                className={`${inputCls} cursor-pointer`}
                value={form.routeStatus ?? "DRAFT"}
                onChange={(e) => setField("routeStatus", e.target.value as RouteRequest["routeStatus"])}
                disabled={loading}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Route Stops */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={`${labelCls} mb-0`}>
                Route Stops ({(form.routeDetails ?? []).length})
              </label>
              <button
                type="button"
                onClick={addStop}
                disabled={loading}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded-lg hover:bg-primary/10"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Stop
              </button>
            </div>

            {(form.routeDetails ?? []).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-border rounded-xl text-muted-foreground gap-2">
                <MapPin className="w-6 h-6 opacity-40" />
                <p className="text-sm">No stops added yet.</p>
                <button
                  type="button"
                  onClick={addStop}
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  + Add first stop
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {(form.routeDetails ?? []).map((stop, idx) => (
                  <div
                    key={idx}
                    className="border border-border rounded-xl p-4 bg-secondary/20 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          Stop #{idx + 1}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeStop(idx)}
                        disabled={loading}
                        className="p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className={labelCls}>Location Name</label>
                        <input
                          className={inputCls}
                          value={stop.locationName ?? ""}
                          onChange={(e) => updateStop(idx, "locationName", e.target.value)}
                          disabled={loading}
                          placeholder="e.g. Ben Thanh Market"
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Duration (min)</label>
                        <input
                          type="number"
                          min={1}
                          className={inputCls}
                          value={stop.durationAtLocation ?? ""}
                          onChange={(e) => updateStop(idx, "durationAtLocation", Number(e.target.value))}
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Stop Status</label>
                        <select
                          className={`${inputCls} cursor-pointer`}
                          value={stop.routeDetailStatus ?? "ACTIVE"}
                          onChange={(e) => updateStop(idx, "routeDetailStatus", e.target.value as RouteDetailRequest["routeDetailStatus"])}
                          disabled={loading}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-secondary/20 flex-shrink-0">
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleSubmit as any} disabled={loading} className="font-bold text-primary-foreground min-w-[110px]">
            {loading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving…</>
            ) : mode === "create" ? "Create Route" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

interface DeleteConfirmModalProps {
  route: RouteResponse;
  onClose: () => void;
  onDeleted: () => void;
}

function DeleteConfirmModal({ route, onClose, onDeleted }: DeleteConfirmModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      // RouteService has no delete in generated service – call via updateRoute with DELETED status
      await RouteService.updateRoute({ id: route.routeId! }, {
        routeName: route.routeName,
        routeStatus: "DELETED",
        tourId: route.tourId,
        routeDetails: route.routeDetails,
      });
      onDeleted();
      onClose();
    } catch (err: any) {
      setError(err?.message ?? "Failed to delete route.");
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
          <h2 className="text-base font-bold text-foreground">Delete Route</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-1">Are you sure you want to delete:</p>
        <p className="text-sm font-semibold text-foreground mb-2">"{route.routeName}"</p>
        <p className="text-xs text-muted-foreground mb-5">(This will mark the route as DELETED)</p>
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

// ─── Route Card ───────────────────────────────────────────────────────────────

interface RouteCardProps {
  route: RouteResponse;
  onEdit: () => void;
  onDelete: () => void;
  tourName?: string;
}

function RouteCard({ route, onEdit, onDelete, tourName }: RouteCardProps) {
  const [expanded, setExpanded] = useState(false);
  const stops = route.routeDetails ?? [];

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
      {/* Card header */}
      <div className="flex items-start justify-between p-5">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0 mt-0.5">
            <Navigation className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-foreground text-base leading-tight">{route.routeName}</span>
            </div>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-xs text-muted-foreground">ID #{route.routeId}</span>
              {tourName && (
                <span className="text-xs text-muted-foreground">{tourName}</span>
              )}
              <span className="text-xs text-muted-foreground">{stops.length} stop{stops.length !== 1 ? "s" : ""}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <button
            onClick={onEdit}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stops toggle */}
      {stops.length > 0 && (
        <div className="border-t border-border">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-3 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              View {stops.length} stop{stops.length !== 1 ? "s" : ""}
            </span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {expanded && (
            <div className="px-5 pb-4">
              <ol className="relative border-l border-primary/30 ml-2 space-y-3">
                {stops
                  .slice()
                  .sort((a, b) => (a.locationOrder ?? 0) - (b.locationOrder ?? 0))
                  .map((stop, idx) => (
                    <li key={idx} className="ml-4">
                      <div className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full bg-primary border-2 border-card" />
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{stop.locationName || "—"}</p>
                          <p className="text-xs text-muted-foreground">
                            {stop.durationAtLocation ? `${stop.durationAtLocation} min` : "No duration set"}
                          </p>
                        </div>
                        {stop.routeDetailStatus && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${
                            stop.routeDetailStatus === "ACTIVE"
                              ? "bg-green-100/20 text-green-600"
                              : "bg-gray-100/20 text-gray-500"
                          }`}>
                            {stop.routeDetailStatus}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AdminRouteManager() {
  const [routes, setRoutes] = useState<RouteResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [tours, setTours] = useState<TourResponse[]>([]);

  const getTourName = (id?: number) =>
    tours.find((t) => t.tourId === id)?.tourName;

  const [modal, setModal] = useState<null | { mode: ModalMode; route?: RouteResponse }>(null);
  const [deleteTarget, setDeleteTarget] = useState<RouteResponse | null>(null);

  const fetchRoutes = async (status?: string) => {
    setLoading(true);
    try {
      const result = await RouteService.getAllRoutes(status ? { routeStatus: status } : undefined);
      setRoutes(result);
    } catch (err) {
      console.error("Failed to fetch routes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes(statusFilter || undefined);
    TourService.getAllTours().then(setTours).catch(console.error);
  }, [statusFilter]);

  const refresh = () => fetchRoutes(statusFilter || undefined);
  const closeModal = () => setModal(null);

  return (
    <>
      {modal && (
        <RouteFormModal
          mode={modal.mode}
          initial={modal.route ? {
            routeName: modal.route.routeName,
            tourId: modal.route.tourId,
            routeStatus: "ACTIVE",
            routeDetails: (modal.route.routeDetails ?? []).map((d) => ({ ...d })),
          } : EMPTY_FORM}
          editId={modal.route?.routeId}
          onClose={closeModal}
          onSaved={refresh}
          tours={tours}
        />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          route={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDeleted={refresh}
        />
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black text-foreground tracking-tight mb-1">Route Manager</h2>
              <p className="text-muted-foreground text-base">Design and manage tour routes with location stops.</p>
            </div>
            <Button onClick={() => setModal({ mode: "create" })} className="font-bold py-2.5 px-5 text-primary-foreground flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Route
            </Button>
          </div>

          {/* Status Filters */}
          <div className="flex gap-2 flex-wrap mb-6">
            {["", "ACTIVE", "INACTIVE", "DRAFT", "DELETED"].map((s) => (
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

          {/* Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              Loading routes…
            </div>
          ) : routes.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No routes found.{" "}
              <button onClick={() => setModal({ mode: "create" })} className="text-primary font-semibold hover:underline">
                Create one?
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...routes].sort((a, b) => (a.routeId ?? 0) - (b.routeId ?? 0)).map((route) => (
                <RouteCard
                  key={route.routeId}
                  route={route}
                  tourName={getTourName(route.tourId)}
                  onEdit={() => setModal({ mode: "edit", route })}
                  onDelete={() => setDeleteTarget(route)}
                />
              ))}
            </div>
          )}

          {!loading && routes.length > 0 && (
            <p className="text-xs text-muted-foreground text-center mt-6">
              {routes.length} route{routes.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>
      </div>
    </>
  );
}
