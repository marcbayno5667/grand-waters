import React from "react";
import logoImg from "@/imports/299327617_410754531152643_7181097851927378017_n.jpg";
import imgE from "@/imports/e.png";
import imgF from "@/imports/f.png";
import {
  Phone,
  Mail,
  Facebook,
  MapPin,
  Shield,
  Send,
  DollarSign,
  Handshake,
  Timer,
  Menu,
  X,
  Lock,
  LogOut,
} from "lucide-react";
import { API_ENDPOINT, API_HEADER } from "./utils/constants";
import { SectionLabel, EditableImage } from "./utils/services";
import { ServiceData } from "./components/Service/Service";
import ServiceComponent from "./components/Service/Service.widget";
import ProjectComponent from "./components/Project/Project.widget";
import StatsComponent from "./components/Stats/Stats.widget";
import Login from "./components/Login/Login.widget";

const NAV_LINKS = ["Home", "Services", "Projects", "About Us"];
const NAV_HREFS: Record<string, string> = {
  Home: "#home",
  Services: "#services",
  Projects: "#projects",
  "About Us": "#about",
  Contact: "#contact",
};

const WHY = [
  {
    icon: <Handshake size={26} strokeWidth={1.5} />,
    title: "Professional Staff",
    desc: "Licensed & background-checked technicians on every job.",
  },
  {
    icon: <DollarSign size={26} strokeWidth={1.5} />,
    title: "Upfront Pricing",
    desc: "Flat-rate quotes with no hidden fees — ever.",
  },
  {
    icon: <Timer size={26} strokeWidth={1.5} />,
    title: "On-Time Guarantee",
    desc: "If we're late, you don't pay the service fee.",
  },
  {
    icon: <Shield size={26} strokeWidth={1.5} />,
    title: "100% Satisfaction",
    desc: "We stand behind every installation and repair.",
  },
];

function InquiryModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = React.useState(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Inquiry from ${form.name || "Website Visitor"} – Grand Waters`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:grandwaters2012@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: "rgba(7,12,24,0.72)", backdropFilter: "blur(4px)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-[#1558cb] px-6 py-5 flex items-start justify-between">
          <div>
            <h2 className="text-white font-black text-lg leading-tight">
              Schedule a Consultation
            </h2>
            <p className="text-blue-200 text-xs mt-1">
              {"We'll get back to you within 24 hours."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white transition-colors mt-0.5"
          >
            <X size={18} />
          </button>
        </div>

        {sent ? (
          <div className="px-6 py-10 text-center">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <Send size={24} className="text-[#1558cb]" />
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">
              Message Sent!
            </h3>
            <p className="text-gray-500 text-sm">
              Your email client should have opened. {"We'll"} respond to you
              shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-[#1558cb] hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Juan dela Cruz"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="09XX XXX XXXX"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@email.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Your Inquiry / Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={form.message}
                onChange={set("message")}
                rows={4}
                placeholder="Describe your water treatment needs, property type, or any questions..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#1558cb] hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-lg transition-colors"
            >
              <Send size={14} />
              Send Inquiry
            </button>
            <p className="text-gray-400 text-[10px] text-center leading-relaxed">
              Clicking Send will open your email app with this message
              pre-filled and addressed to grandwaters2012@gmail.com.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

const IDB_NAME = "gw_image_db";
const IDB_STORE = "images";

function openImageDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(IDB_STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbSave(id: string, dataUrl: string) {
  const db = await openImageDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readwrite");
    tx.objectStore(IDB_STORE).put(dataUrl, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function idbLoadAll(): Promise<Record<string, string>> {
  const db = await openImageDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readonly");
    const result: Record<string, string> = {};
    const cursor = tx.objectStore(IDB_STORE).openCursor();
    cursor.onsuccess = () => {
      const c = cursor.result;
      if (c) {
        result[c.key as string] = c.value as string;
        c.continue();
      } else resolve(result);
    };
    cursor.onerror = () => reject(cursor.error);
  });
}

/* ── Admin top bar ── */
function AdminBar({ onLogout }: { onLogout: () => void }) {
  return (
    <div
      className="fixed top-0 inset-x-0 z-[150] bg-[#1558cb] text-white flex items-center justify-between px-5 py-2 shadow-lg"
      style={{ fontSize: 11 }}
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
        <span className="font-semibold">
          Admin Mode — hover any photo to replace it · use project controls to
          add / remove entries
        </span>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center gap-1.5 font-bold bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded transition-colors shrink-0 ml-4"
      >
        <LogOut size={11} />
        Log Out
      </button>
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(
    () => localStorage.getItem("gw_admin") === "true"
  );
  const [showAdminLogin, setShowAdminLogin] = React.useState(false);
  const [imgStore, setImgStore] = React.useState<Record<string, string>>({});
  const [services, setServices] = React.useState<ServiceData[]>([]);

  const logout = () => {
    localStorage.removeItem("gw_admin");
    setIsAdmin(false);
  };

  React.useEffect(() => {
    idbLoadAll()
      .then((all) => {
        if (Object.keys(all).length) {
          setImgStore(all);
        }
      })
      .catch(() => {});

    const loadCoverPhoto = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/api/cover-photo`, {
          method: "GET",
          cache: "no-store",
          redirect: "follow",
        });

        if (!response.ok) {
          throw new Error(`Cover photo GET failed: ${response.status}`);
        }

        // Get the actual Supabase URL after the 302 redirect
        const coverUrl = response.url;
        setImgStore((prev) => ({
          ...prev,
          "hero-bg": coverUrl,
        }));
      } catch (error) {}
    };

    loadCoverPhoto();
  }, []);

  const replaceImage = React.useCallback(async (id: string, file: File) => {
    if (id === "hero-bg") {
      try {
        const formData = new FormData();
        formData.append("coverPhoto", file);

        const response = await fetch(`${API_ENDPOINT}/api/cover-photo`, {
          method: "POST",
          headers: API_HEADER,
          body: formData,
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Upload failed");
        }

        setImgStore((prev) => ({
          ...prev,
          "hero-bg": `${data.url}?t=${Date.now()}`,
        }));
      } catch (error) {
        alert("Failed to upload cover photo.");
      }

      return;
    }

    // Existing behavior for other images
    const reader = new FileReader();

    reader.onload = (e) => {
      const url = e.target?.result as string;

      idbSave(id, url).catch(() => {});

      setImgStore((prev) => ({
        ...prev,
        [id]: url,
      }));
    };

    reader.readAsDataURL(file);
  }, []);

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className={`min-h-screen bg-[#f8f9fb] text-gray-900 ${
        isAdmin ? "pt-9" : ""
      }`}
    >
      {showModal && <InquiryModal onClose={() => setShowModal(false)} />}

      {showAdminLogin && (
        <Login
          setIsAdmin={setIsAdmin}
          setShowAdminLogin={setShowAdminLogin}
          onClose={() => setShowAdminLogin(false)}
        />
      )}

      {isAdmin && <AdminBar onLogout={logout} />}

      <div className="bg-[#0b1120] text-gray-500 text-[11px] py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-5">
            <a
              href="tel:+639688537723"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone size={10} />
              0968 853 7723
            </a>
            <a
              href="mailto:grandwaters2012@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail size={10} />
              grandwaters2012@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              24/7 Emergency Service
            </span>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/grandwaters2012"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Facebook size={12} />
              </a>
              <a
                href="https://www.facebook.com/grandwaters2012"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <Facebook size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowAdminLogin(true)}
              title="Admin Login"
              className="focus:outline-none hover:opacity-80 transition-opacity"
            >
              <img
                src={logoImg}
                alt="Grand Waters Logo"
                className="h-10 w-auto object-contain"
              />
            </button>
            <a href="#home" className="leading-none">
              <div className="font-black text-sm tracking-tight text-[#0b1120]">
                GRAND
              </div>
              <div className="font-black text-sm tracking-tight text-[#1558cb]">
                WATERS
              </div>
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={NAV_HREFS[l]}
                className={`text-sm font-medium transition-colors ${
                  l === "Home"
                    ? "text-[#1558cb]"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="hidden lg:inline-flex bg-[#1558cb] hover:bg-blue-700 text-white text-sm font-bold px-5 py-2 rounded transition-colors"
            >
              Contact Us
            </button>
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="lg:hidden border-t bg-white px-6 py-4 space-y-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={NAV_HREFS[l]}
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-gray-700 py-1"
              >
                {l}
              </a>
            ))}
            <button
              onClick={() => {
                setShowModal(true);
                setMobileOpen(false);
              }}
              className="w-full text-center bg-[#1558cb] text-white text-sm font-bold py-2.5 rounded"
            >
              Contact Us
            </button>
          </div>
        )}
      </header>

      <section
        id="home"
        className="relative flex flex-col justify-end"
        style={{ minHeight: "100vh" }}
      >
        <EditableImage
          id="hero-bg"
          src={imgE}
          alt="Grand Waters facility"
          wrapperClassName="absolute inset-0 group/ei"
          className="w-full h-full object-cover object-center"
          isAdmin={isAdmin}
          store={imgStore}
          onReplace={replaceImage}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(5,10,28,0.95) 0%, rgba(8,16,38,0.80) 45%, rgba(10,20,45,0.40) 100%)",
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            {/* Logo + name side by side */}
            <div className="flex items-center justify-center gap-5 mb-6">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-40"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(78,142,247,0.7) 0%, transparent 70%)",
                  }}
                />
                <img
                  src={logoImg}
                  alt="Grand Waters Logo"
                  className="relative h-24 w-24 object-contain drop-shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 0 18px rgba(78,142,247,0.55))",
                  }}
                />
              </div>
              <div className="text-left">
                <div
                  className="font-black leading-none tracking-tight"
                  style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
                >
                  <span className="text-white">Grand </span>
                  <span style={{ color: "#4e8ef7" }}>Waters</span>
                </div>
              </div>
            </div>

            <p className="text-[#4e8ef7] text-[11px] font-bold tracking-[0.35em] uppercase mb-5">
              Design · Build · Supply
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-[#4e8ef7] w-10" />
              <p
                className="text-gray-200 font-medium italic"
                style={{ fontSize: "clamp(0.95rem, 2vw, 1.2rem)" }}
              >
                "Bad Waters Deserve A Second Chance"
              </p>
              <div className="h-px bg-[#4e8ef7] w-10" />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white">
        <ServiceComponent
          isAdmin={isAdmin}
          setShowModal={setShowModal}
          extractServices={setServices}
        />
      </section>

      {/* Grand Waters background banner */}
      <section className="relative py-24 overflow-hidden">
        <StatsComponent isAdmin={isAdmin}/>
      </section>

      <section id="projects" className="py-20 bg-[#f8f9fb]">
        <ProjectComponent isAdmin={isAdmin} />
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel text="Our Edge" />
            <h2 className="font-black text-3xl lg:text-4xl text-gray-900 mb-10 leading-tight">
              Why Grand Waters?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHY.map((w, i) => (
                <div
                  key={w.title}
                  className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-[#1558cb]/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1558cb] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <span className="text-white">{w.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-[#1558cb]/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-bold text-sm text-gray-900">
                        {w.title}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {w.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block" style={{ height: "460px" }}>
            <img
              src={imgE}
              alt="treatment plant"
              className="absolute top-0 left-0 w-[70%] h-60 object-cover rounded-2xl shadow-md"
            />
            <img
              src={imgF}
              alt="filtration unit"
              className="absolute bottom-0 right-0 w-[68%] h-56 object-cover rounded-2xl shadow-md"
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1558cb] rounded-2xl w-24 h-24 flex flex-col items-center justify-center text-white shadow-lg z-10">
              <span className="font-black text-2xl">10+</span>
              <span className="text-[10px] text-blue-200 text-center leading-tight">
                Years of Experience
              </span>
            </div>
          </div>
        </div>
      </section>

      <div id="contact" />

      <footer className="bg-[#070c18] text-gray-600 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={logoImg}
                  alt="Grand Waters Logo"
                  className="h-8 w-auto object-contain"
                />
                <div className="leading-none">
                  <div className="font-black text-sm text-white">GRAND</div>
                  <div className="font-black text-sm text-[#1558cb]">
                    WATERS
                  </div>
                </div>
              </div>
              <p className="text-xs leading-relaxed mb-4">
                "Bad Waters Deserve A Second Chance"
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/grandwaters2012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <Facebook size={13} />
                </a>
                <a
                  href="https://www.facebook.com/grandwaters2012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <Facebook size={13} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white text-[11px] font-bold uppercase tracking-widest mb-4">
                Services
              </h4>
              <ul className="space-y-2.5 text-xs">
                {services.map((s) => (
                  <li key={s.id}>
                    <a
                      href="#services"
                      className="hover:text-white transition-colors"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-[11px] font-bold uppercase tracking-widest mb-4">
                Company
              </h4>
              <ul className="space-y-2.5 text-xs">
                {(["Home", "About Us", "Projects", "Contact"] as const).map(
                  (l) => (
                    <li key={l}>
                      <a
                        href={NAV_HREFS[l] ?? "#home"}
                        className="hover:text-white transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-[11px] font-bold uppercase tracking-widest mb-4">
                Contact
              </h4>
              <ul className="space-y-3 text-xs">
                <li className="flex items-start gap-2">
                  <Phone size={11} className="mt-0.5 shrink-0 text-[#1558cb]" />
                  0968 853 7723
                </li>
                <li className="flex items-start gap-2">
                  <Mail size={11} className="mt-0.5 shrink-0 text-[#1558cb]" />
                  grandwaters2012@gmail.com
                </li>
                <li className="flex items-start gap-2">
                  <MapPin
                    size={11}
                    className="mt-0.5 shrink-0 text-[#1558cb]"
                  />
                  Woodland Heights Subd, R Duterte St, Banawa, Guadalupe, Cebu
                  City, Philippines 6000
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-5 text-center text-[11px] text-gray-700">
            © 2026 Grand Waters. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
