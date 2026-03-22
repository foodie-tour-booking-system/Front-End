import { useState, useEffect } from "react";
import { ReportService, type ReportResponse } from "@/services/ReportService";
import { format } from "date-fns";
import { CalendarDays, DollarSign, Activity, Users, FileText, ArrowUpRight, ArrowDownRight, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminReportManager() {
  const [reportData, setReportData] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Default to this month
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [dateFrom, setDateFrom] = useState<string>(format(firstDay, "yyyy-MM-dd"));
  const [dateTo, setDateTo] = useState<string>(format(lastDay, "yyyy-MM-dd"));

  const fetchOverview = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ReportService.getOverview({
        from: dateFrom ? `${dateFrom}T00:00:00` : undefined,
        to: dateTo ? `${dateTo}T23:59:59` : undefined
      });
      setReportData(data);
    } catch (err: any) {
      setError(err?.message || "Failed to load report data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const formatCurrency = (amount: number | undefined) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 bg-background min-h-full">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-card border border-border p-6 rounded-2xl shadow-sm">
          <div className="space-y-1">
            <h2 className="text-3xl font-display font-bold tracking-tight text-foreground flex items-center gap-3">
              <Activity className="w-8 h-8 text-primary" />
              Reporting & Analytics
            </h2>
            <p className="text-muted-foreground text-sm">
              View financial summaries, transactions, and booking statistics.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-36">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="date" 
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none text-sm transition-colors"
                />
              </div>
              <span className="text-muted-foreground text-sm font-medium">to</span>
              <div className="relative flex-1 sm:w-36">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="date" 
                  value={dateTo}
                  min={dateFrom}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background focus:ring-1 focus:ring-primary focus:outline-none text-sm transition-colors"
                />
              </div>
            </div>
            <Button 
              onClick={fetchOverview}
              disabled={loading}
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-6 shadow-sm flex items-center gap-2"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Apply Filter"}
            </Button>
          </div>
        </div>

        {error ? (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500">
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <RefreshCw className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground font-medium animate-pulse">Generating Report Data...</p>
          </div>
        ) : reportData ? (
          <>
            {/* Core Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <DollarSign className="w-24 h-24" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">Total Revenue</h3>
                </div>
                <div className="text-3xl font-black text-foreground">{formatCurrency(reportData.totalRevenue)}</div>
              </div>

              <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <ArrowUpRight className="w-24 h-24" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-600">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">Total Income</h3>
                </div>
                <div className="text-2xl font-bold text-foreground">{formatCurrency(reportData.income)}</div>
              </div>

              <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <ArrowDownRight className="w-24 h-24" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                    <ArrowDownRight className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">Total Outcome</h3>
                </div>
                <div className="text-2xl font-bold text-foreground">{formatCurrency(reportData.outcome)}</div>
              </div>

              <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider mb-1">Bookings Completed</h3>
                  <div className="text-2xl font-black text-foreground">{reportData.bookingCompleted}</div>
                </div>
              </div>

              <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider mb-1">Bookings Cancelled</h3>
                  <div className="text-2xl font-black text-foreground">{reportData.bookingCancelled}</div>
                </div>
              </div>

              <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider mb-1">Total Customers Served</h3>
                  <div className="text-2xl font-black text-foreground">{reportData.totalCustomer}</div>
                </div>
              </div>
            </div>

            {/* List Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
              
              {/* Income List Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5 text-green-500" />
                  Recent Income Transactions
                </h3>
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-secondary/50 border-b border-border text-xs uppercase text-muted-foreground font-semibold">
                      <tr>
                        <th className="px-5 py-3">Date</th>
                        <th className="px-5 py-3">Method</th>
                        <th className="px-5 py-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {reportData.incomeList?.length > 0 ? reportData.incomeList.slice(0, 8).map((t, idx) => (
                        <tr key={idx} className="hover:bg-muted/30 transition-colors">
                          <td className="px-5 py-3 whitespace-nowrap text-muted-foreground">
                            {format(new Date(t.createdAt), "MMM dd, yyyy HH:mm")}
                          </td>
                          <td className="px-5 py-3 font-medium text-foreground">
                            {t.paymentMethod}
                          </td>
                          <td className="px-5 py-3 text-right font-bold text-green-600">
                            +{formatCurrency(t.amount)}
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan={3} className="p-8 text-center text-muted-foreground text-sm">No recent income data found.</td></tr>
                      )}
                    </tbody>
                  </table>
                  {reportData.incomeList?.length > 8 && (
                    <div className="px-5 py-3 bg-secondary/30 text-center text-xs font-semibold text-primary cursor-pointer hover:bg-secondary/50">
                      View all via individual API
                    </div>
                  )}
                </div>
              </div>

              {/* Completed Bookings Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Recently Completed Bookings
                </h3>
                <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-secondary/50 border-b border-border text-xs uppercase text-muted-foreground font-semibold">
                      <tr>
                        <th className="px-5 py-3">Code</th>
                        <th className="px-5 py-3">Pax</th>
                        <th className="px-5 py-3">Departure</th>
                        <th className="px-5 py-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {reportData.bookingCompletedList?.length > 0 ? reportData.bookingCompletedList.slice(0, 8).map((b, idx) => (
                        <tr key={idx} className="hover:bg-muted/30 transition-colors">
                          <td className="px-5 py-3 whitespace-nowrap font-bold text-primary">
                            #{b.bookingCode}
                          </td>
                          <td className="px-5 py-3 text-foreground font-medium">
                            {b.totalCustomers}
                          </td>
                          <td className="px-5 py-3 text-muted-foreground">
                            {format(new Date(b.departureTime), "MMM dd, yyyy HH:mm")}
                          </td>
                          <td className="px-5 py-3 text-right font-bold text-foreground">
                            {formatCurrency(b.totalPrice)}
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan={4} className="p-8 text-center text-muted-foreground text-sm">No recent bookings found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </>
        ) : null}

      </div>
    </div>
  );
}
