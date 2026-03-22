import { useState, useEffect, useMemo } from "react";
import { ReportService, type ReportResponse } from "@/services/ReportService";
import { format } from "date-fns";
import { CalendarDays, DollarSign, Activity, Users, FileText, ArrowUpRight, ArrowDownRight, RefreshCw, AlertTriangle, PieChart as PieChartIcon, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";

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

  const { pieData, lineData } = useMemo(() => {
    if (!reportData) return { pieData: [], lineData: [] };

    const pData = [
      { name: "Completed", value: reportData.bookingCompleted || 0, color: "#3b82f6" },
      { name: "Cancelled", value: reportData.bookingCancelled || 0, color: "#f97316" }
    ];

    const lMap = new Map<string, { dateStr: string; timestamp: number; income: number; revenue: number }>();

    reportData.incomeList?.forEach((t: any) => {
      if (t.createdAt) {
        const dStr = format(new Date(t.createdAt), "MMM dd");
        const ts = new Date(t.createdAt).getTime();
        if (!lMap.has(dStr)) lMap.set(dStr, { dateStr: dStr, timestamp: ts, income: 0, revenue: 0 });
        const cur = lMap.get(dStr)!;
        cur.income += t.amount || 0;
        if (ts < cur.timestamp) cur.timestamp = ts;
      }
    });

    // The user strictly asked to "sort theo field createdAt" which means Bookings might have createdAt (or fallback)
    reportData.bookingCompletedList?.forEach((b: any) => {
      const bDate = b.createdAt || b.departureTime;
      if (bDate) {
        const dStr = format(new Date(bDate), "MMM dd");
        const ts = new Date(bDate).getTime();
        if (!lMap.has(dStr)) lMap.set(dStr, { dateStr: dStr, timestamp: ts, income: 0, revenue: 0 });
        const cur = lMap.get(dStr)!;
        cur.revenue += b.totalPrice || 0;
        if (ts < cur.timestamp) cur.timestamp = ts;
      }
    });

    const lData = Array.from(lMap.values())
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(item => ({
        date: item.dateStr,
        Income: item.income,
        Revenue: item.revenue
      }));

    return { pieData: pData, lineData: lData };
  }, [reportData]);

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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
              {/* Pie Chart */}
              <div className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-primary" />
                  Booking Status Ratio
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value: any) => [value, "Bookings"]} contentStyle={{ borderRadius: "8px" }} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Line Chart */}
              <div className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-4 lg:col-span-2">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Income vs Revenue Timeline
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis 
                        stroke="#888888" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => `₫${(value/1000000).toFixed(1)}M`}
                      />
                      <RechartsTooltip 
                        formatter={(value: any) => formatCurrency(Number(value) || 0)}
                        contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Line type="monotone" dataKey="Income" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="Revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
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
