import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { TourService, type TourRequest, type TourResponse } from "@/services/TourService";
import { TourImageService, type TourImageResponse } from "@/services/TourImageService";
import { ImageService } from "@/services/ImageService";
import { Pencil, Trash2, X, Loader2, Plus, Search, AlertTriangle, ImageIcon, Star, Upload, RefreshCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ModalMode = "create" | "edit";

const EMPTY_FORM: TourRequest = {
  tourName: "",
  tourDescription: "",
  basePriceAdult: 0,
  basePriceChild: 0,
  duration: 1,
  tourType: "GROUP",
  tourStatus: "DRAFT",
};

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status?: string }) {
  const map: Record<string, string> = {
    ACTIVE: "bg-green-100/20 text-green-600",
    DRAFT: "bg-gray-100/20 text-gray-500",
    INACTIVE: "bg-yellow-100/20 text-yellow-600",
    DELETED: "bg-red-100/20 text-red-500",
  };
  const dotMap: Record<string, string> = {
    ACTIVE: "bg-green-500",
    DRAFT: "bg-gray-400",
    INACTIVE: "bg-yellow-500",
    DELETED: "bg-red-500",
  };
  const cls = map[status ?? ""] ?? "bg-gray-100/20 text-gray-400";
  const dot = dotMap[status ?? ""] ?? "bg-gray-400";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status ?? "—"}
    </span>
  );
}

// ─── Tour Form Modal ──────────────────────────────────────────────────────────

interface TourFormModalProps {
  mode: ModalMode;
  initial: TourRequest;
  onClose: () => void;
  onSaved: () => void;
  editId?: number;
}

function TourFormModal({ mode, initial, onClose, onSaved, editId }: TourFormModalProps) {
  const [form, setForm] = useState<TourRequest>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof TourRequest>(k: K, v: TourRequest[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "create") {
        await TourService.createTour(form);
      } else {
        await TourService.updateTour({ tourId: editId! }, form);
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
            {mode === "create" ? "Create New Tour" : "Edit Tour"}
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
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {/* Tour Name */}
          <div>
            <label className={labelCls}>Tour Name *</label>
            <input
              className={inputCls}
              required
              value={form.tourName ?? ""}
              onChange={(e) => set("tourName", e.target.value)}
              placeholder="e.g. Saigon Night Food Tour"
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>Description</label>
            <textarea
              className={`${inputCls} resize-none h-24`}
              value={form.tourDescription ?? ""}
              onChange={(e) => set("tourDescription", e.target.value)}
              placeholder="Describe the tour experience..."
              disabled={loading}
            />
          </div>

          {/* Prices row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Adult Price (VND) *</label>
              <input
                type="number"
                min={0}
                className={inputCls}
                required
                value={form.basePriceAdult ?? ""}
                onChange={(e) => set("basePriceAdult", Number(e.target.value))}
                disabled={loading}
              />
            </div>
            <div>
              <label className={labelCls}>Child Price (VND)</label>
              <input
                type="number"
                min={0}
                className={inputCls}
                value={form.basePriceChild ?? ""}
                onChange={(e) => set("basePriceChild", Number(e.target.value))}
                disabled={loading}
              />
            </div>
          </div>

          {/* Duration, Type, Status row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Duration (hrs) *</label>
              <input
                type="number"
                min={1}
                className={inputCls}
                required
                value={form.duration ?? ""}
                onChange={(e) => set("duration", Number(e.target.value))}
                disabled={loading}
              />
            </div>
            <div>
              <label className={labelCls}>Type</label>
              <select
                className={`${inputCls} cursor-pointer`}
                value={form.tourType ?? "GROUP"}
                onChange={(e) => set("tourType", e.target.value as TourRequest["tourType"])}
                disabled={loading}
              >
                <option value="GROUP">Group</option>
                <option value="PRIVATE">Private</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select
                className={`${inputCls} cursor-pointer`}
                value={form.tourStatus ?? "DRAFT"}
                onChange={(e) => set("tourStatus", e.target.value as TourRequest["tourStatus"])}
                disabled={loading}
              >
                <option value="DRAFT">Draft</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="DELETED">Deleted</option>
              </select>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-secondary/20">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit as any} disabled={loading} className="font-bold text-primary-foreground min-w-[100px]">
            {loading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving…</>
            ) : mode === "create" ? (
              "Create Tour"
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Tour Image Manager Modal ─────────────────────────────────────────────────

interface TourImageManagerModalProps {
  tour: TourResponse;
  onClose: () => void;
}

function TourImageManagerModal({ tour, onClose }: TourImageManagerModalProps) {
  const [images, setImages] = useState<TourImageResponse[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  // Upload state
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  // Setting-primary state
  const [settingPrimaryId, setSettingPrimaryId] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = async () => {
    if (!tour.tourId) return;
    setLoadingImages(true);
    try {
      const data = await TourImageService.getImages({ tourId: tour.tourId });
      setImages(data);
    } catch (err) {
      console.error("Failed to fetch tour images:", err);
    } finally {
      setLoadingImages(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [tour.tourId]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !tour.tourId) return;
    setUploadError("");
    setUploadSuccess("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      // Step 1: Upload image to get imageId
      const imageResponse = await ImageService.uploadImage(formData, description ? { description } : undefined);
      // Step 2: Link image to tour
      const nextOrder = images.length + 1;
      await TourImageService.addImage(
        { tourId: tour.tourId },
        { imageId: imageResponse.imageId, isPrimary: images.length === 0, displayOrder: nextOrder }
      );
      setUploadSuccess("Image uploaded and linked successfully!");
      setFile(null);
      setDescription("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchImages();
    } catch (err: any) {
      setUploadError(err?.message ?? "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSetPrimary = async (tourImageId: number) => {
    if (!tour.tourId) return;
    setSettingPrimaryId(tourImageId);
    try {
      await TourImageService.setPrimary({ tourId: tour.tourId, tourImageId });
      fetchImages();
    } catch (err) {
      console.error("Failed to set primary:", err);
    } finally {
      setSettingPrimaryId(null);
    }
  };

  const labelCls = "block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1";
  const inputCls =
    "block w-full px-3 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              Manage Images
              <span className="ml-2 text-sm font-normal text-muted-foreground">— {tour.tourName}</span>
            </h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {/* Upload Section */}
          <div className="px-6 py-5 border-b border-border">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Upload className="w-4 h-4 text-primary" />
              Upload New Image
            </h3>
            <form onSubmit={handleUpload} className="space-y-3">
              {uploadError && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  {uploadError}
                </div>
              )}
              {uploadSuccess && (
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-sm">
                  {uploadSuccess}
                </div>
              )}

              <div>
                <label className={labelCls}>Image File *</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  required
                  disabled={uploading}
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer disabled:opacity-50"
                />
              </div>

              <div>
                <label className={labelCls}>Description (optional)</label>
                <input
                  className={inputCls}
                  placeholder="Brief description of this image..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={uploading}
                />
              </div>

              {/* Preview */}
              {file && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/40 border border-border">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="h-16 w-16 rounded-lg object-cover border border-border flex-shrink-0"
                  />
                  <div className="text-xs text-muted-foreground">
                    <div className="font-semibold text-foreground truncate max-w-[280px]">{file.name}</div>
                    <div>{(file.size / 1024).toFixed(1)} KB</div>
                  </div>
                </div>
              )}

              <Button type="submit" disabled={uploading || !file} className="font-bold w-full">
                {uploading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Uploading…</>
                ) : (
                  <><Upload className="w-4 h-4 mr-2" />Upload Image</>
                )}
              </Button>
            </form>
          </div>

          {/* Gallery Section */}
          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" />
                Image Gallery
                {images.length > 0 && (
                  <span className="ml-1 text-xs font-normal text-muted-foreground">({images.length} image{images.length !== 1 ? "s" : ""})</span>
                )}
              </h3>
              <button
                onClick={fetchImages}
                disabled={loadingImages}
                className="text-muted-foreground hover:text-primary transition-colors"
                title="Refresh"
              >
                <RefreshCcw className={`w-4 h-4 ${loadingImages ? "animate-spin" : ""}`} />
              </button>
            </div>

            {loadingImages ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : images.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                <ImageIcon className="w-10 h-10 mb-2 opacity-30" />
                <p className="text-sm">No images yet. Upload one above!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img) => (
                  <div
                    key={img.tourImageId}
                    className={`relative rounded-xl overflow-hidden border-2 transition-colors ${
                      img.isPrimary ? "border-primary" : "border-border"
                    } bg-secondary/30 group`}
                  >
                    {/* Image thumbnail */}
                    <div className="aspect-[4/3] overflow-hidden bg-secondary">
                      {img.imageUrl ? (
                        <img
                          src={img.imageUrl}
                          alt={`Tour image ${img.tourImageId}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-muted-foreground opacity-40" />
                        </div>
                      )}
                    </div>

                    {/* Primary badge */}
                    {img.isPrimary && (
                      <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow">
                        <Star className="w-3 h-3 fill-current" />
                        Primary
                      </div>
                    )}

                    {/* Order badge */}
                    {img.displayOrder != null && (
                      <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/50 text-white text-xs">
                        #{img.displayOrder}
                      </div>
                    )}

                    {/* Set primary button */}
                    {!img.isPrimary && (
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                        <button
                          onClick={() => handleSetPrimary(img.tourImageId!)}
                          disabled={settingPrimaryId === img.tourImageId}
                          className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-60"
                        >
                          {settingPrimaryId === img.tourImageId ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Star className="w-3 h-3" />
                          )}
                          Set Primary
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-border bg-secondary/20 flex-shrink-0">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

interface DeleteConfirmModalProps {
  tour: TourResponse;
  onClose: () => void;
  onDeleted: () => void;
}

function DeleteConfirmModal({ tour, onClose, onDeleted }: DeleteConfirmModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await TourService.deleteTour({ tourId: tour.tourId! });
      onDeleted();
      onClose();
    } catch (err: any) {
      setError(err?.message ?? "Failed to delete tour.");
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
          <h2 className="text-base font-bold text-foreground">Delete Tour</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-1">
          Are you sure you want to delete:
        </p>
        <p className="text-sm font-semibold text-foreground mb-5">"{tour.tourName}"</p>

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
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white font-bold min-w-[90px]"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AdminTourInventory() {
  const [tours, setTours] = useState<TourResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  // Modal state
  const [modal, setModal] = useState<null | { mode: ModalMode; tour?: TourResponse }>(null);
  const [deleteTarget, setDeleteTarget] = useState<TourResponse | null>(null);
  const [imageManagerTour, setImageManagerTour] = useState<TourResponse | null>(null);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const fetchTours = async (search?: string) => {
    setLoading(true);
    try {
      if (search && search.trim()) {
        const result = await TourService.searchTour({
          tourName: search.trim(),
          pageable: { page: 0, size: 100 },
        });
        setTours(result.content ?? []);
      } else {
        const result = await TourService.getAllTours();
        setTours(result);
      }
    } catch (err) {
      console.error("Failed to fetch tours:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // ── Search (debounce 400ms) ────────────────────────────────────────────────

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      fetchTours(value);
    }, 400);
  };

  // ── Handlers ───────────────────────────────────────────────────────────────

  const openCreate = () => setModal({ mode: "create" });
  const openEdit = (tour: TourResponse) => setModal({ mode: "edit", tour });
  const closeModal = () => setModal(null);

  const openDelete = (tour: TourResponse) => setDeleteTarget(tour);
  const closeDelete = () => setDeleteTarget(null);

  const openImageManager = (tour: TourResponse) => setImageManagerTour(tour);
  const closeImageManager = () => setImageManagerTour(null);

  const onSaved = () => fetchTours(searchValue);
  const onDeleted = () => fetchTours(searchValue);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Create / Edit Modal */}
      {modal && (
        <TourFormModal
          mode={modal.mode}
          initial={modal.tour ? {
            tourName: modal.tour.tourName,
            tourDescription: modal.tour.tourDescription,
            basePriceAdult: modal.tour.basePriceAdult,
            basePriceChild: modal.tour.basePriceChild,
            duration: modal.tour.duration,
            tourType: modal.tour.tourType,
            tourStatus: modal.tour.tourStatus,
          } : EMPTY_FORM}
          editId={modal.tour?.tourId}
          onClose={closeModal}
          onSaved={onSaved}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          tour={deleteTarget}
          onClose={closeDelete}
          onDeleted={onDeleted}
        />
      )}

      {/* Tour Image Manager Modal */}
      {imageManagerTour && (
        <TourImageManagerModal
          tour={imageManagerTour}
          onClose={closeImageManager}
        />
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black text-foreground tracking-tight mb-1">Tour Inventory</h2>
              <p className="text-muted-foreground text-base">Manage and organize your river tour experiences.</p>
            </div>
            <Button onClick={openCreate} className="font-bold py-2.5 px-5 transition-all text-primary-foreground flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create New Tour
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                className="pl-10 h-11"
                placeholder="Search tours by name..."
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Tour Table */}
          <div className="bg-card shadow-sm border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-secondary/50">
                  <tr>
                    {["Tour Info", "Type", "Duration", "Price (Adult)", "Status", "Actions"].map((h, i) => (
                      <th
                        key={h}
                        scope="col"
                        className={`px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider ${
                          i === 5 ? "text-right" : "text-left"
                        } ${i === 1 || i === 2 ? "hidden sm:table-cell" : ""}`}
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
                        Loading tour inventory…
                      </td>
                    </tr>
                  ) : tours.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        No tours found.{" "}
                        <button onClick={openCreate} className="text-primary font-semibold hover:underline">
                          Create one?
                        </button>
                      </td>
                    </tr>
                  ) : (
                    tours.map((tour) => (
                      <tr key={tour.tourId} className="hover:bg-secondary/30 transition-colors group">
                        {/* Tour Info */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
                              #{tour.tourId}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors max-w-[220px] truncate">
                                {tour.tourName}
                              </div>
                              <div className="text-xs text-muted-foreground line-clamp-1 max-w-[220px]">
                                {tour.tourDescription || "—"}
                              </div>
                            </div>
                          </div>
                        </td>
                        {/* Type */}
                        <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100/20 text-orange-600">
                            {tour.tourType ?? "—"}
                          </span>
                        </td>
                        {/* Duration */}
                        <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell text-sm text-foreground">
                          {tour.duration ? `${tour.duration}h` : "—"}
                        </td>
                        {/* Price */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-foreground">
                            {tour.basePriceAdult?.toLocaleString("vi-VN") ?? "0"} ₫
                          </div>
                          {tour.basePriceChild != null && (
                            <div className="text-xs text-muted-foreground">
                              Child: {tour.basePriceChild.toLocaleString("vi-VN")} ₫
                            </div>
                          )}
                        </td>
                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={tour.tourStatus} />
                        </td>
                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Manage Images"
                              onClick={() => openImageManager(tour)}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                            >
                              <ImageIcon className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Edit"
                              onClick={() => openEdit(tour)}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Delete"
                              onClick={() => openDelete(tour)}
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

            {/* Footer summary */}
            {!loading && tours.length > 0 && (
              <div className="px-6 py-3 border-t border-border bg-secondary/20 text-xs text-muted-foreground">
                {tours.length} tour{tours.length !== 1 ? "s" : ""} found
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
