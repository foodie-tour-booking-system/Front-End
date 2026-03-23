import { useState } from "react";
import { X, Eye, EyeOff, CheckCircle, Circle, Loader2, AlertCircle } from "lucide-react";
import { EmployeeService } from "@/services/EmployeeService";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  // ─── Password strength indicators ─────────────────────────────────────────
  const hasLength = newPassword.length >= 8;
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[^0-9a-zA-Z]/.test(newPassword);
  const strength = [hasLength, hasNumber, hasSpecial].filter(Boolean).length;

  const getStrengthLabel = () => {
    if (strength <= 1) return "Yếu";
    if (strength === 2) return "Trung bình";
    return "Mạnh";
  };

  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;

  // ─── Reset & close ─────────────────────────────────────────────────────────
  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  // ─── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setError(null);

    if (!currentPassword) {
      setError("Vui lòng nhập mật khẩu hiện tại.");
      return;
    }
    if (!hasLength || !hasNumber || !hasSpecial) {
      setError("Mật khẩu mới chưa đủ mạnh (≥8 ký tự, có số và ký tự đặc biệt).");
      return;
    }
    if (!passwordsMatch) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: verify current password → server returns a short-lived Access-Token
      const accessToken = await EmployeeService.verifyCurrentPassword({
        password: currentPassword,
      });

      // Step 2: update password, sending the Access-Token from step 1 as header
      await EmployeeService.updatePassword(
        { newPassword, confirmPassword },
        accessToken
      );

      setSuccess(true);
    } catch (err: any) {
      const msg =
        err?.message ??
        err?.body?.message ??
        "Đổi mật khẩu thất bại. Vui lòng kiểm tra lại mật khẩu hiện tại.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={!loading ? handleClose : undefined}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1a202c] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800 animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20">
          <div>
            <h3 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight font-serif">
              Đổi mật khẩu
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Cập nhật mật khẩu để bảo vệ tài khoản của bạn.
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-gray-400 hover:text-[#f1c40f] transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* ── Success State ── */}
        {success ? (
          <div className="p-10 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="w-9 h-9 text-green-500" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Đổi mật khẩu thành công!</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Mật khẩu của bạn đã được cập nhật. Vui lòng dùng mật khẩu mới cho lần đăng nhập tiếp theo.
            </p>
            <button
              onClick={handleClose}
              className="mt-2 px-6 py-3 rounded-lg text-sm font-bold text-slate-900 bg-[#f1c40f] hover:bg-[#d4ac0d] transition-all shadow-lg shadow-[#f1c40f]/20 focus:outline-none"
            >
              Đóng
            </button>
          </div>
        ) : (
          <>
            {/* Form Body */}
            <div className="p-8 space-y-6">

              {/* Error Banner */}
              {error && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Current Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-900 dark:text-gray-200" htmlFor="emp-current-password">
                  Mật khẩu hiện tại
                </label>
                <div className="relative group">
                  <input
                    id="emp-current-password"
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Nhập mật khẩu hiện tại"
                    disabled={loading}
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all placeholder:text-gray-400 disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f1c40f] transition-colors focus:outline-none"
                  >
                    {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* New Password Section */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900 dark:text-gray-200" htmlFor="emp-new-password">
                    Mật khẩu mới
                  </label>
                  <div className="relative group">
                    <input
                      id="emp-new-password"
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Tạo mật khẩu mới"
                      disabled={loading}
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f] transition-all placeholder:text-gray-400 disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f1c40f] transition-colors focus:outline-none"
                    >
                      {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Strength Meter */}
                <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Độ mạnh</span>
                    <span className={`text-xs font-medium ${strength >= 3 ? "text-green-500" : strength === 2 ? "text-yellow-500" : "text-red-500"}`}>
                      {getStrengthLabel()}
                    </span>
                  </div>
                  <div className="flex gap-1 h-1.5 mb-4">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`flex-1 rounded-full h-full transition-colors ${
                          level <= strength && newPassword.length > 0
                            ? strength >= 3 ? "bg-green-500" : strength === 2 ? "bg-yellow-500" : "bg-red-500"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                  <ul className="space-y-2">
                    <li className={`flex items-center text-xs ${hasLength ? "text-green-600 dark:text-green-500" : "text-gray-500 dark:text-gray-400"}`}>
                      {hasLength ? <CheckCircle className="w-4 h-4 mr-2" /> : <Circle className="w-4 h-4 mr-2 opacity-50" />}
                      Ít nhất 8 ký tự
                    </li>
                    <li className={`flex items-center text-xs ${hasNumber ? "text-green-600 dark:text-green-500" : "text-gray-500 dark:text-gray-400"}`}>
                      {hasNumber ? <CheckCircle className="w-4 h-4 mr-2" /> : <Circle className="w-4 h-4 mr-2 opacity-50" />}
                      Chứa ít nhất một chữ số
                    </li>
                    <li className={`flex items-center text-xs ${hasSpecial ? "text-green-600 dark:text-green-500" : "text-gray-500 dark:text-gray-400"}`}>
                      {hasSpecial ? <CheckCircle className="w-4 h-4 mr-2" /> : <Circle className="w-4 h-4 mr-2 opacity-50" />}
                      Chứa ký tự đặc biệt
                    </li>
                  </ul>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2 pt-2">
                  <label className="block text-sm font-medium text-slate-900 dark:text-gray-200" htmlFor="emp-confirm-password">
                    Xác nhận mật khẩu mới
                  </label>
                  <div className="relative group">
                    <input
                      id="emp-confirm-password"
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu mới"
                      disabled={loading}
                      className={`w-full bg-gray-50 dark:bg-black/20 border text-slate-900 dark:text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 disabled:opacity-60 ${
                        confirmPassword.length > 0
                          ? passwordsMatch
                            ? "border-green-400 focus:ring-green-400/30 focus:border-green-400"
                            : "border-red-400 focus:ring-red-400/30 focus:border-red-400"
                          : "border-gray-200 dark:border-gray-700 focus:ring-[#f1c40f]/50 focus:border-[#f1c40f]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f1c40f] transition-colors focus:outline-none"
                    >
                      {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && !passwordsMatch && (
                    <p className="text-xs text-red-500 mt-1">Mật khẩu không khớp.</p>
                  )}
                  {confirmPassword.length > 0 && passwordsMatch && (
                    <p className="text-xs text-green-500 mt-1">Mật khẩu khớp.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-gray-50/50 dark:bg-black/20 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={handleClose}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-bold text-slate-900 bg-[#f1c40f] hover:bg-[#d4ac0d] shadow-lg shadow-[#f1c40f]/20 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f1c40f] dark:focus:ring-offset-[#1a202c] uppercase tracking-wide disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  "Cập nhật mật khẩu"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
