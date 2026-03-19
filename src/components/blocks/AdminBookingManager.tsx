import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookingService,
  type BookingResponse,
  type BookingLogResponse,
  type RelocateBookingResponse,
} from "@/services/BookingService";
import {
  Search,
  Loader2,
  AlertTriangle,
  BookOpen,
  X,
  ClipboardList,
  RefreshCw,
  ArrowLeftRight,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Clock,
  MapPin,
  Hash,
  CreditCard,
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso?: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("vi-VN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function formatDateRange(startIso?: string, duration?: number) {
  if (!startIso) return "—";
  try {
    const start = new Date(startIso);
    const durMs = duration ? (duration > 24 ? duration * 60 * 1000 : duration * 60 * 60 * 1000) : 0;
    const end = durMs ? new Date(start.getTime() + durMs) : null;
    
    const dateStr = start.toLocaleDateString("vi-VN", { dateStyle: "medium" });
    const startTimeStr = start.toLocaleTimeString("vi-VN", { timeStyle: "short" });
    
    if (!end) return `${dateStr}, ${startTimeStr}`;
    
    if (start.getDate() === end.getDate()) {
       return `${dateStr}, ${startTimeStr} - ${end.toLocaleTimeString("vi-VN", { timeStyle: "short" })}`;
    } else {
       return `${startTimeStr} ${dateStr} - ${end.toLocaleTimeString("vi-VN", { timeStyle: "short" })} ${end.toLocaleDateString("vi-VN", { dateStyle: "medium" })}`;
    }
  } catch {
    return startIso;
  }
}

function formatCurrency(amount?: number) {
  if (amount === undefined || amount === null) return "—";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function BookingStatusBadge({ status }: { status?: string }) {
  const colorMap: Record<string, string> = {
    PENDING: "bg-yellow-100/20 text-yellow-600 border-yellow-300/30",
    CONFIRMED: "bg-green-100/20 text-green-600 border-green-300/30",
    COMPLETED: "bg-green-100/20 text-green-600 border-green-300/30",
    RESCHEDULED: "bg-blue-100/20 text-blue-600 border-blue-300/30",
    CANCELLED: "bg-red-100/20 text-red-500 border-red-300/30",
  };
  const dotMap: Record<string, string> = {
    PENDING: "bg-yellow-500",
    CONFIRMED: "bg-green-500",
    COMPLETED: "bg-green-500",
    RESCHEDULED: "bg-blue-500",
    CANCELLED: "bg-red-500",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
        colorMap[status ?? ""] ?? "bg-gray-100/20 text-gray-400 border-gray-300/30"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotMap[status ?? ""] ?? "bg-gray-400"}`} />
      {status ?? "—"}
    </span>
  );
}

function RelocateStatusBadge({ status }: { status?: string }) {
  const colorMap: Record<string, string> = {
    PENDING: "bg-yellow-100/20 text-yellow-600 border-yellow-300/30",
    APPROVED: "bg-green-100/20 text-green-600 border-green-300/30",
    REJECTED: "bg-red-100/20 text-red-500 border-red-300/30",
  };
  const dotMap: Record<string, string> = {
    PENDING: "bg-yellow-500",
    APPROVED: "bg-green-500",
    REJECTED: "bg-red-500",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
        colorMap[status ?? ""] ?? "bg-gray-100/20 text-gray-400 border-gray-300/30"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotMap[status ?? ""] ?? "bg-gray-400"}`} />
      {status ?? "—"}
    </span>
  );
}

// ─── Booking Detail Modal ─────────────────────────────────────────────────────

interface BookingDetailModalProps {
  bookingCode: string;
  onClose: () => void;
}

function BookingDetailModal({ bookingCode, onClose }: BookingDetailModalProps) {
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [logs, setLogs] = useState<BookingLogResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"details" | "logs">("details");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [bookingData, logsData] = await Promise.all([
          BookingService.getBookingById({ bookingCode }),
          BookingService.getLogsByBookingId({ bookingCode }),
        ]);
        setBooking(bookingData);
        setLogs(logsData);
      } catch (err: any) {
        setError(err?.message ?? "Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookingCode]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              Booking: <span className="text-primary font-mono">{bookingCode}</span>
            </h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("details")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === "details"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            Chi tiết
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === "logs"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Clock className="w-4 h-4" />
            Activity Logs {logs.length > 0 && <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded-full text-xs">{logs.length}</span>}
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[65vh] overflow-y-auto p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground text-sm">Loading booking data...</p>
            </div>
          ) : error ? (
            <div className="flex items-start gap-2 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          ) : activeTab === "details" && booking ? (
            <div className="space-y-4">
              {/* Status Row */}
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Hash className="w-4 h-4" />
                  <span className="font-mono font-semibold text-foreground">{booking.bookingCode ?? "—"}</span>
                </div>
                <BookingStatusBadge status={booking.bookingStatus} />
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary/20 rounded-xl p-4 border border-border">
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide font-medium">Tổng tiền</p>
                  <p className="text-base font-bold text-foreground">{formatCurrency(booking.totalPrice)}</p>
                </div>
                <div className="bg-secondary/20 rounded-xl p-4 border border-border">
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide font-medium">Lịch trình</p>
                  <p className="text-sm font-semibold text-foreground">{formatDateRange(booking.departureTime, booking.duration)}</p>
                </div>
              </div>

              {/* Pickup Location */}
              {booking.pickupLocation && (
                <div className="flex items-start gap-3 p-4 bg-secondary/20 rounded-xl border border-border">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wide font-medium">Điểm đón</p>
                    <p className="text-sm font-semibold text-foreground">{booking.pickupLocation}</p>
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === "logs" ? (
            <div className="space-y-3">
              {logs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">Không có activity logs nào.</div>
              ) : (
                logs.map((log, idx) => (
                  <div
                    key={log.bookingLogId ?? idx}
                    className="flex gap-3 p-3 bg-secondary/20 rounded-xl border border-border"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{log.description ?? "—"}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(log.createAt)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-border bg-secondary/20">
          <Button variant="outline" onClick={onClose}>Đóng</Button>
        </div>
      </div>
    </div>
  );
}

// ─── Relocate Process Modal ───────────────────────────────────────────────────

interface RelocateProcessModalProps {
  request: RelocateBookingResponse;
  onClose: () => void;
  onProcessed: () => void;
}

function RelocateProcessModal({ request, onClose, onProcessed }: RelocateProcessModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleProcess = async (approved: boolean) => {
    setLoading(true);
    setError("");
    try {
      await BookingService.processRequest({
        relocateRequestId: request.relocateRequestId,
        isApproved: approved,
      });
      onProcessed();
      onClose();
    } catch (err: any) {
      setError(err?.message ?? "Failed to process request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <ArrowLeftRight className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Xử lý Relocate Request</h2>
            <p className="text-xs text-muted-foreground">#{request.relocateRequestId}</p>
          </div>
        </div>

        <div className="bg-secondary/30 rounded-xl border border-border p-4 mb-5 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Booking Code</span>
            <span className="font-mono font-semibold text-foreground">{request.bookingCode ?? "—"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Ngày đi mới</span>
            <span className="font-semibold text-foreground">{formatDate(request.departureAt)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Trạng thái</span>
            <RelocateStatusBadge status={request.relocateRequestStatus} />
          </div>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose} disabled={loading}>Hủy</Button>
          <Button
            onClick={() => handleProcess(false)}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white font-bold min-w-[90px] gap-1.5"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><XCircle className="w-4 h-4" /> Từ chối</>}
          </Button>
          <Button
            onClick={() => handleProcess(true)}
            disabled={loading}
            className="font-bold min-w-[90px] gap-1.5 text-primary-foreground"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle2 className="w-4 h-4" /> Chấp nhận</>}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type BookingTab = "search" | "relocate";

export function AdminBookingManager() {
  const [activeTab, setActiveTab] = useState<BookingTab>("search");

  // ── Search tab state ──
  const [searchCode, setSearchCode] = useState("");
  const [searchedCode, setSearchedCode] = useState("");
  const [searchedBooking, setSearchedBooking] = useState<BookingResponse | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [detailModal, setDetailModal] = useState<string | null>(null);

  // ── Relocate tab state ──
  const [relocateRequests, setRelocateRequests] = useState<RelocateBookingResponse[]>([]);
  const [relocateLoading, setRelocateLoading] = useState(false);
  const [relocateError, setRelocateError] = useState("");
  const [relocateFilter, setRelocateFilter] = useState<string>("");
  const [processModal, setProcessModal] = useState<RelocateBookingResponse | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // ── Search booking ──
  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const code = searchCode.trim();
    if (!code) return;
    setSearchLoading(true);
    setSearchError("");
    setSearchedBooking(null);
    try {
      const result = await BookingService.getBookingById({ bookingCode: code });
      setSearchedBooking(result);
      setSearchedCode(code);
    } catch (err: any) {
      setSearchError(err?.message ?? "Không tìm thấy booking với mã này.");
    } finally {
      setSearchLoading(false);
    }
  };

  // ── Fetch relocate requests ──
  const fetchRelocateRequests = async () => {
    setRelocateLoading(true);
    setRelocateError("");
    try {
      const result = await BookingService.getAllRelocateRequest();
      setRelocateRequests(result);
    } catch (err: any) {
      setRelocateError(err?.message ?? "Không thể tải danh sách relocate requests.");
    } finally {
      setRelocateLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "relocate") {
      fetchRelocateRequests();
    }
  }, [activeTab]);

  const filteredRelocate = [...relocateRequests]
    .filter((r) => !relocateFilter || r.relocateRequestStatus === relocateFilter)
    .sort((a, b) => (a.relocateRequestId ?? 0) - (b.relocateRequestId ?? 0));

  return (
    <>
      {/* Detail Modal */}
      {detailModal && (
        <BookingDetailModal
          bookingCode={detailModal}
          onClose={() => setDetailModal(null)}
        />
      )}

      {/* Process Modal */}
      {processModal && (
        <RelocateProcessModal
          request={processModal}
          onClose={() => setProcessModal(null)}
          onProcessed={fetchRelocateRequests}
        />
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black text-foreground tracking-tight mb-1">Booking Manager</h2>
              <p className="text-muted-foreground text-base">Tra cứu booking và xử lý yêu cầu đổi lịch.</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 p-1 bg-secondary/30 rounded-xl border border-border w-fit mb-8">
            <button
              onClick={() => setActiveTab("search")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "search"
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Search className="w-4 h-4" />
              Tra cứu Booking
            </button>
            <button
              onClick={() => setActiveTab("relocate")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "relocate"
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ArrowLeftRight className="w-4 h-4" />
              Relocate Requests
              {relocateRequests.filter((r) => r.relocateRequestStatus === "PENDING").length > 0 && (
                <span className="bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                  {relocateRequests.filter((r) => r.relocateRequestStatus === "PENDING").length}
                </span>
              )}
            </button>
          </div>

          {/* ── Search Tab ── */}
          {activeTab === "search" && (
            <div className="space-y-6">
              {/* Search Box */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-foreground mb-4">Tìm kiếm theo Booking Code</h3>
                <form onSubmit={handleSearch} className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                      ref={searchInputRef}
                      className="pl-10 h-11"
                      placeholder="Nhập mã booking... (ví dụ: BK-2024-001)"
                      value={searchCode}
                      onChange={(e) => setSearchCode(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={searchLoading || !searchCode.trim()}
                    className="h-11 px-6 font-bold text-primary-foreground min-w-[110px]"
                  >
                    {searchLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Tìm kiếm"}
                  </Button>
                </form>
              </div>

              {/* Search Error */}
              {searchError && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                  <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">Không tìm thấy</p>
                    <p>{searchError}</p>
                  </div>
                </div>
              )}

              {/* Search Result */}
              {searchedBooking && (
                <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-border bg-secondary/20">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Kết quả tìm kiếm</p>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-lg font-bold text-foreground">{searchedBooking.bookingCode ?? searchedCode}</span>
                            <BookingStatusBadge status={searchedBooking.bookingStatus} />
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <CreditCard className="w-3 h-3" />
                              {formatCurrency(searchedBooking.totalPrice)}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDateRange(searchedBooking.departureTime, searchedBooking.duration)}
                            </span>
                            {searchedBooking.pickupLocation && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {searchedBooking.pickupLocation}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="gap-2 font-semibold flex-shrink-0"
                        onClick={() => setDetailModal(searchedCode)}
                      >
                        Xem chi tiết
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty state */}
              {!searchedBooking && !searchError && !searchLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Tra cứu Booking</h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    Nhập mã booking vào ô tìm kiếm bên trên để xem thông tin chi tiết và lịch sử hoạt động của booking.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── Relocate Tab ── */}
          {activeTab === "relocate" && (
            <div className="space-y-5">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {["", "PENDING", "APPROVED", "REJECTED"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setRelocateFilter(s)}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                        relocateFilter === s
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                      }`}
                    >
                      {s === "" ? "Tất cả" : s}
                      {s === "PENDING" && relocateRequests.filter((r) => r.relocateRequestStatus === "PENDING").length > 0 && (
                        <span className="ml-1.5 bg-yellow-500/20 text-yellow-600 px-1.5 py-0.5 rounded-full text-xs">
                          {relocateRequests.filter((r) => r.relocateRequestStatus === "PENDING").length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchRelocateRequests}
                  disabled={relocateLoading}
                  className="gap-2 font-medium"
                >
                  <RefreshCw className={`w-4 h-4 ${relocateLoading ? "animate-spin" : ""}`} />
                  Làm mới
                </Button>
              </div>

              {/* Error */}
              {relocateError && (
                <div className="flex items-start gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  {relocateError}
                </div>
              )}

              {/* Table */}
              <div className="bg-card shadow-sm border border-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-secondary/50">
                      <tr>
                        {["Request ID", "Booking Code", "Ngày đi mới", "Trạng thái", "Hành động"].map((h, i) => (
                          <th
                            key={h}
                            scope="col"
                            className={`px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider ${
                              i === 4 ? "text-right" : "text-left"
                            } ${i === 2 ? "hidden sm:table-cell" : ""}`}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {relocateLoading ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                            Đang tải...
                          </td>
                        </tr>
                      ) : filteredRelocate.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground text-sm">
                            Không có relocate request nào{relocateFilter ? ` với trạng thái "${relocateFilter}"` : ""}.
                          </td>
                        </tr>
                      ) : (
                        filteredRelocate.map((req) => (
                          <tr key={req.relocateRequestId} className="hover:bg-secondary/30 transition-colors group">
                            {/* Request ID */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 flex-shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
                                  #{req.relocateRequestId}
                                </div>
                              </div>
                            </td>
                            {/* Booking Code */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => setDetailModal(req.bookingCode!)}
                                className="font-mono text-sm font-semibold text-primary hover:underline"
                              >
                                {req.bookingCode ?? "—"}
                              </button>
                            </td>
                            {/* New Departure */}
                            <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell text-sm text-foreground">
                              {formatDate(req.departureAt)}
                            </td>
                            {/* Status */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <RelocateStatusBadge status={req.relocateRequestStatus} />
                            </td>
                            {/* Actions */}
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              {req.relocateRequestStatus === "PENDING" ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setProcessModal(req)}
                                  className="gap-1.5 font-semibold text-xs opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                                >
                                  <ArrowLeftRight className="w-3.5 h-3.5" />
                                  Xử lý
                                </Button>
                              ) : (
                                <span className="text-xs text-muted-foreground italic">Đã xử lý</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {!relocateLoading && filteredRelocate.length > 0 && (
                  <div className="px-6 py-3 border-t border-border bg-secondary/20 text-xs text-muted-foreground">
                    {filteredRelocate.length} request{filteredRelocate.length !== 1 ? "s" : ""} found
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
