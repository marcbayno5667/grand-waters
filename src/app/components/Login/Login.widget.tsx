import * as React from "react";
import { X, Lock } from "lucide-react";
import logoImg from "@/imports/299327617_410754531152643_7181097851927378017_n.jpg";
import { API_ENDPOINT } from "@/app/utils/constants";

export const Login = ({
  setIsAdmin,
  setShowAdminLogin,
  onClose,
}: {
  setIsAdmin: (isAdmin: boolean) => void;
  setShowAdminLogin: (show: boolean) => void;
  onClose: () => void;
}) => {
  const [email, setEmail] = React.useState("");
  const [p, setP] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return false;
      }

      if (data.success && data.session?.access_token) {
        localStorage.setItem("gw_access_token", data.session.access_token);

        localStorage.setItem("gw_refresh_token", data.session.refresh_token);

        setIsAdmin(true);
        setShowAdminLogin(false);

        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(email, p);

    if (!success) {
      setErr(true);
      setP("");
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      style={{ background: "rgba(5,10,28,0.88)", backdropFilter: "blur(8px)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="bg-[#0b1840] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="" className="h-9 w-auto object-contain" />
            <div>
              <div className="text-white font-black text-sm">Admin Portal</div>
              <div className="text-blue-400 text-xs">Grand Waters</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <form onSubmit={submit} className="px-6 py-6 space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
            <Lock size={20} className="text-[#1558cb]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email
            </label>
            <input
              autoFocus
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErr(false);
              }}
              placeholder="Enter email"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={p}
                onChange={(e) => {
                  setP(e.target.value);
                  setErr(false);
                }}
                placeholder="Enter password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-xs"
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {err && (
            <p className="text-red-500 text-xs font-medium">
              Incorrect email or password.
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-[#1558cb] hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-sm transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
