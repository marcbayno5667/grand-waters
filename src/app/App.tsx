import { useState, useRef, useCallback, useEffect } from "react";
import logoImg from "@/imports/299327617_410754531152643_7181097851927378017_n.jpg";
import imgA from "@/imports/A.png";
import imgB from "@/imports/b.png";
import imgC from "@/imports/c.png";
import imgD from "@/imports/d.png";
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
  ArrowRight,
  CalendarCheck,
  Handshake,
  Timer,
  Menu,
  X,
  CheckCircle2,
  Droplets,
  FlaskConical,
  Waves,
  Lock,
  LogOut,
  Pencil,
  Trash2,
  Plus,
  ImagePlus,
} from "lucide-react";

const NAV_LINKS = ["Home", "Services", "Projects", "About Us"];
const NAV_HREFS: Record<string, string> = {
  Home: "#home",
  Services: "#services",
  Projects: "#projects",
  "About Us": "#about",
  Contact: "#contact",
};

const SERVICES = [
  {
    num: "01",
    icon: <Droplets size={22} />,
    title: "Water Filtration System Installation",
    desc: "We design and install multi-stage filtration systems tailored to your water source. Our systems effectively remove dirt, sediment, rust, chlorine, and other harmful impurities — ensuring clean, safe water for residential, commercial, and industrial use.",
    img: imgA,
  },
  {
    num: "02",
    icon: <Waves size={22} />,
    title: "Water Softener Installation",
    desc: "Hard water causes scale buildup in pipes, appliances, and fixtures. Our water softener installations use ion-exchange technology to reduce hardness minerals like calcium and magnesium, extending the life of your equipment and improving water quality.",
    img: imgD,
  },
  {
    num: "03",
    icon: <FlaskConical size={22} />,
    title: "Reverse Osmosis (RO) Systems",
    desc: "Our RO systems use a semi-permeable membrane to remove up to 99% of dissolved contaminants including heavy metals, bacteria, nitrates, and salts. Ideal for drinking water purification in homes, offices, restaurants, and manufacturing facilities.",
    img: imgB,
  },
  {
    num: "04",
    icon: <Shield size={22} />,
    title: "Water Tank & System Cleaning",
    desc: "Over time, tanks and pipes accumulate sediment, algae, and bacteria that compromise water quality. We perform thorough cleaning and sanitation of water storage tanks, distribution pipes, and filtration systems to restore safe, hygienic water supply.",
    img: imgC,
  },
  {
    num: "05",
    icon: <CheckCircle2 size={22} />,
    title: "Water Testing & Treatment Consultation",
    desc: "Not sure what your water needs? Our certified technicians conduct on-site water quality testing to identify contaminants and hardness levels. We then recommend the most effective and cost-efficient treatment system specifically matched to your water profile.",
    img: imgE,
  },
];

const PROJECTS = [
  {
    category: "FILTRATION",
    title: "Industrial Filtration System",
    location: "Luzon",
    img: imgA,
    filter: "Filtration",
  },
  {
    category: "RO SYSTEM",
    title: "RO Membrane System",
    location: "Visayas",
    img: imgB,
    filter: "RO System",
  },
  {
    category: "RO SYSTEM",
    title: "Outdoor RO Installation",
    location: "Mindanao",
    img: imgC,
    filter: "RO System",
  },
  {
    category: "SOFTENER",
    title: "Water Softener Tank Setup",
    location: "Luzon",
    img: imgD,
    filter: "Softener",
  },
  {
    category: "FILTRATION",
    title: "Large-Scale Treatment Plant",
    location: "Visayas",
    img: imgE,
    filter: "Filtration",
  },
  {
    category: "FILTRATION",
    title: "Multi-Stage Filtration Unit",
    location: "Mindanao",
    img: imgF,
    filter: "Filtration",
  },
];

const PROJECT_FILTERS = ["All", "Filtration", "RO System", "Softener"];

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

const STATS = [
  { value: "2,500+", label: "Happy Clients" },
  { value: "3,800+", label: "Projects Done" },
  { value: "10+", label: "Years Active" },
  { value: "24/7", label: "Emergency Line" },
];

function InquiryModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

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

const PROJECT_GALLERY = [
  {
    imgs: [imgA, imgB, imgE, imgF],
    cat: "FILTRATION",
    title: "Industrial Filtration System",
    loc: "Luzon",
    desc: "A heavy-duty multi-stage filtration system installed for a manufacturing plant in Luzon. The system processes large volumes of water daily, removing sediment, rust, and particulates to meet industrial water quality standards. Components include pre-filters, activated carbon stages, and a final polishing membrane.",
  },
  {
    imgs: [imgB, imgC, imgA, imgD],
    cat: "RO SYSTEM",
    title: "RO Membrane System",
    loc: "Visayas",
    desc: "High-capacity reverse osmosis membrane system deployed for a commercial facility in Visayas. Capable of removing up to 99% of dissolved solids, bacteria, and contaminants, delivering purified water for production processes. Includes automatic flush cycles and real-time TDS monitoring.",
  },
  {
    imgs: [imgC, imgF, imgB, imgE],
    cat: "RO SYSTEM",
    title: "Outdoor RO Installation",
    loc: "Mindanao",
    desc: "Weatherproof outdoor RO installation designed for a remote facility in Mindanao. Custom-built housing protects the system from the elements while maintaining full operational efficiency year-round. Stainless steel framing and UV-resistant enclosures used throughout.",
  },
  {
    imgs: [imgD, imgA, imgC, imgF],
    cat: "SOFTENER",
    title: "Water Softener Tank Setup",
    loc: "Luzon",
    desc: "Ion-exchange water softener installation for a residential complex in Luzon experiencing severe hard water issues. The system significantly reduced scale buildup in pipes and appliances, extending equipment lifespan. Includes automated regeneration cycles and a brine tank for minimal maintenance.",
  },
  {
    imgs: [imgE, imgD, imgA, imgB],
    cat: "FILTRATION",
    title: "Large-Scale Treatment Plant",
    loc: "Visayas",
    desc: "Full-scale water treatment plant built for a commercial estate in Visayas. Integrates pre-filtration, chemical dosing, and UV disinfection stages to deliver consistently safe water across the entire property. Designed to handle peak demand from hundreds of units simultaneously.",
  },
  {
    imgs: [imgF, imgE, imgD, imgC],
    cat: "FILTRATION",
    title: "Multi-Stage Filtration Unit",
    loc: "Mindanao",
    desc: "Compact multi-stage filtration unit installed for a mid-sized office building in Mindanao. Features sediment, carbon, and polishing filter stages — designed for easy maintenance and long service intervals. Each stage is independently serviceable without system shutdown.",
  },
  {
    imgs: [imgA, imgC, imgF, imgD],
    cat: "RO SYSTEM",
    title: "Commercial RO System",
    loc: "Cebu",
    desc: "Custom reverse osmosis system installed for a restaurant group in Cebu City. Provides high-purity drinking water and ice for daily operations, ensuring consistent taste and safety standards across all branches. System produces up to 500 liters of purified water per day.",
  },
  {
    imgs: [imgB, imgF, imgC, imgE],
    cat: "FILTRATION",
    title: "Residential Filter Setup",
    loc: "Cebu",
    desc: "Whole-house filtration system installed for a residential property in Cebu. Addresses local water quality concerns including chlorine, turbidity, and odor — providing clean water at every tap throughout the home. Installation completed in under one day with minimal disruption to the household.",
  },
];

function ProjectEditModal({
  project,
  onSave,
  onClose,
}: {
  project: (typeof PROJECT_GALLERY)[0];
  onSave: (updated: (typeof PROJECT_GALLERY)[0]) => void;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    title: project.title,
    loc: project.loc,
    cat: project.cat,
    desc: project.desc,
  });
  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    onSave({ ...project, ...form });
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-[110] flex items-center justify-center px-4"
      style={{ background: "rgba(5,10,25,0.85)", backdropFilter: "blur(6px)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-[#1558cb] px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-black text-base">Edit Project</h2>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
              Title
            </label>
            <input
              value={form.title}
              onChange={set("title")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                Category
              </label>
              <select
                value={form.cat}
                onChange={set("cat")}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition"
              >
                <option value="FILTRATION">FILTRATION</option>
                <option value="RO SYSTEM">RO SYSTEM</option>
                <option value="SOFTENER">SOFTENER</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                Location
              </label>
              <input
                value={form.loc}
                onChange={set("loc")}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
              Description
            </label>
            <textarea
              value={form.desc}
              onChange={set("desc")}
              rows={5}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 leading-relaxed focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition resize-none"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-600 font-bold text-sm py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-[#1558cb] hover:bg-blue-700 text-white font-bold text-sm py-2.5 rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof PROJECT_GALLERY)[0];
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const total = project.imgs.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
      style={{ background: "rgba(5,10,25,0.85)", backdropFilter: "blur(6px)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Main photo + controls */}
        <div className="relative" style={{ height: "300px" }}>
          {project.imgs.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${project.title} ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
          >
            <X size={16} />
          </button>

          {/* Prev / Next */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
          >
            <ArrowRight size={15} className="rotate-180" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
          >
            <ArrowRight size={15} />
          </button>

          {/* Title + badge */}
          <div className="absolute bottom-4 left-5 right-16">
            <span className="inline-block bg-[#1558cb] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
              {project.cat}
            </span>
            <h3 className="text-white font-black text-xl leading-tight">
              {project.title}
            </h3>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-4 right-5 flex gap-1.5">
            {project.imgs.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === current ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 px-5 pt-4">
          {project.imgs.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-lg overflow-hidden shrink-0 transition-all ${
                i === current
                  ? "ring-2 ring-[#1558cb] opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
              style={{ width: 64, height: 48 }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Description */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
            <MapPin size={11} />
            <span>{project.loc}</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {project.desc}
          </p>
          <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="text-xs font-bold text-[#1558cb] hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── IndexedDB image store (avoids localStorage 5 MB quota) ── */
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

/* ── Admin login modal ── */
function AdminLoginModal({
  onLogin,
  onClose,
}: {
  onLogin: (u: string, p: string) => Promise<boolean>;
  onClose: () => void;
}) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await onLogin(u, p);

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
              Username
            </label>
            <input
              autoFocus
              value={u}
              onChange={(e) => {
                setU(e.target.value);
                setErr(false);
              }}
              placeholder="Enter username"
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
              Incorrect username or password.
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

/* ── Editable image wrapper ── */
function EditableImage({
  id,
  src,
  alt,
  className,
  wrapperClassName,
  isAdmin,
  store,
  onReplace,
}: {
  id: string;
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  isAdmin: boolean;
  store: Record<string, string>;
  onReplace: (id: string, file: File) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const displayed = store[id] ?? src;
  return (
    <div className={wrapperClassName ?? "relative group/ei w-full h-full"}>
      <img src={displayed} alt={alt} className={className} />
      {isAdmin && (
        <>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) onReplace(id, e.target.files[0]);
            }}
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 group-hover/ei:opacity-100 transition-opacity z-10 cursor-pointer"
          >
            <span className="bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
              <Pencil size={12} />
              Replace Photo
            </span>
          </button>
        </>
      )}
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-px bg-[#1558cb]" />
      <span className="text-[#1558cb] text-[11px] font-bold tracking-[0.22em] uppercase">
        {text}
      </span>
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSvc, setActiveSvc] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    (typeof PROJECT_GALLERY)[0] | null
  >(null);

  /* Admin state */
  const [isAdmin, setIsAdmin] = useState(
    () => localStorage.getItem("gw_admin") === "true"
  );
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [imgStore, setImgStore] = useState<Record<string, string>>({});
  const [projects, setProjects] = useState<typeof PROJECT_GALLERY>(() => {
    try {
      const s = localStorage.getItem("gw_projects");
      return s ? JSON.parse(s) : PROJECT_GALLERY;
    } catch {
      return PROJECT_GALLERY;
    }
  });

  const [svcOverrides, setSvcOverrides] = useState<
    Record<number, { title: string; desc: string }>
  >(() => {
    try {
      return JSON.parse(localStorage.getItem("gw_svcs") ?? "{}");
    } catch {
      return {};
    }
  });

  const saveSvc = (i: number, field: "title" | "desc", val: string) => {
    setSvcOverrides((prev) => {
      const next = {
        ...prev,
        [i]: {
          title: prev[i]?.title ?? SERVICES[i].title,
          desc: prev[i]?.desc ?? SERVICES[i].desc,
          [field]: val,
        },
      };
      localStorage.setItem("gw_svcs", JSON.stringify(next));
      return next;
    });
  };

  const [statsOverrides, setStatsOverrides] = useState<
    Record<number, { value: string; label: string }>
  >(() => {
    try {
      return JSON.parse(localStorage.getItem("gw_stats") ?? "{}");
    } catch {
      return {};
    }
  });

  const saveStat = (i: number, field: "value" | "label", val: string) => {
    setStatsOverrides((prev) => {
      const next = {
        ...prev,
        [i]: {
          value: prev[i]?.value ?? STATS[i].value,
          label: prev[i]?.label ?? STATS[i].label,
          [field]: val,
        },
      };
      localStorage.setItem("gw_stats", JSON.stringify(next));
      return next;
    });
  };

  const login = async (u: string, p: string) => {
    try {
      const response = await fetch(
        "https://grand-waters-backend.vercel.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: u,
            password: p,
          }),
        }
      );

      const loadCoverPhoto = async () => {
        try {
          const response = await fetch(
            "https://grand-waters-backend.vercel.app/api/cover-photo",
            {
              method: "GET",
              cache: "no-store",
            }
          );
      
          if (!response.ok) {
            throw new Error(`Cover photo GET failed: ${response.status}`);
          }
      
          // Because the backend redirects to the actual image URL
          const coverUrl = response.url;
      
          console.log("Cover photo URL:", coverUrl);
      
          setImgStore(prev => ({
            ...prev,
            "hero-bg": `${coverUrl}?t=${Date.now()}`,
          }));
      
        } catch (error) {
          console.error("Cover photo GET error:", error);
        }
      };

      if (response.ok && data.success) {
        localStorage.setItem("gw_admin", "true");
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

  const logout = () => {
    localStorage.removeItem("gw_admin");
    setIsAdmin(false);
  };

  useEffect(() => {
    idbLoadAll()
      .then(all => {
        if (Object.keys(all).length) {
          setImgStore(all);
        }
      })
      .catch(() => {});
  
    const loadCoverPhoto = async () => {
      try {
        const response = await fetch(
          "https://grand-waters-backend.vercel.app/api/cover-photo",
          {
            method: "GET",
            cache: "no-store",
            redirect: "follow",
          }
        );
  
        if (!response.ok) {
          throw new Error(`Cover photo GET failed: ${response.status}`);
        }
  
        // Get the actual Supabase URL after the 302 redirect
        const coverUrl = response.url;
  
        console.log("FINAL COVER URL:", coverUrl);
  
        setImgStore(prev => ({
          ...prev,
          "hero-bg": coverUrl,
        }));
  
      } catch (error) {
        console.error("Cover photo GET error:", error);
      }
    };
  
    loadCoverPhoto();
  }, []);

  const replaceImage = useCallback(async (id: string, file: File) => {
    console.log("REPLACE IMAGE CALLED:", id, file.name);
  
    if (id === "hero-bg") {
      console.log("UPLOADING COVER PHOTO...");
  
      try {
        const formData = new FormData();
        formData.append("coverPhoto", file);
  
        console.log("CALLING POST API...");
  
        const response = await fetch(
          "https://grand-waters-backend.vercel.app/api/cover-photo",
          {
            method: "POST",
            body: formData,
          }
        );
  
        console.log("POST RESPONSE:", response.status);
  
        const data = await response.json();
  
        console.log("POST DATA:", data);
  
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Upload failed");
        }
  
        setImgStore(prev => ({
          ...prev,
          "hero-bg": `${data.url}?t=${Date.now()}`,
        }));
  
        console.log("COVER PHOTO UPDATED!");
  
      } catch (error) {
        console.error("COVER PHOTO UPLOAD ERROR:", error);
        alert("Failed to upload cover photo.");
      }
  
      return;
    }
  
    // Existing behavior for other images
    const reader = new FileReader();
  
    reader.onload = e => {
      const url = e.target?.result as string;
  
      idbSave(id, url).catch(() => {});
  
      setImgStore(prev => ({
        ...prev,
        [id]: url,
      }));
    };
  
    reader.readAsDataURL(file);
  }, []);

  const [editingProjectIdx, setEditingProjectIdx] = useState<number | null>(
    null
  );

  const updateProject = (idx: number, updated: (typeof PROJECT_GALLERY)[0]) => {
    setProjects((prev) => {
      const next = prev.map((p, i) => (i === idx ? updated : p));
      localStorage.setItem("gw_projects", JSON.stringify(next));
      return next;
    });
  };

  const removeProject = (idx: number) => {
    if (!window.confirm("Remove this project?")) return;
    setProjects((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      localStorage.setItem("gw_projects", JSON.stringify(next));
      return next;
    });
  };

  const addProject = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        const title =
          window.prompt("Project title:", "New Project") ?? "New Project";
        const loc = window.prompt("Location (e.g. Cebu):", "Cebu") ?? "Cebu";
        const cat =
          window
            .prompt(
              "Category (FILTRATION / RO SYSTEM / SOFTENER):",
              "FILTRATION"
            )
            ?.toUpperCase() ?? "FILTRATION";
        const desc = window.prompt("Short description:", "") ?? "";
        const newEntry = { imgs: [url, url, url, url], cat, title, loc, desc };
        setProjects((prev) => {
          const next = [...prev, newEntry];
          localStorage.setItem("gw_projects", JSON.stringify(next));
          return next;
        });
      };
      reader.readAsDataURL(file);
    };
  };

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className={`min-h-screen bg-[#f8f9fb] text-gray-900 ${
        isAdmin ? "pt-9" : ""
      }`}
    >
      {showModal && <InquiryModal onClose={() => setShowModal(false)} />}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      {showAdminLogin && (
        <AdminLoginModal
          onLogin={login}
          onClose={() => setShowAdminLogin(false)}
        />
      )}
      {editingProjectIdx !== null && (
        <ProjectEditModal
          project={projects[editingProjectIdx]}
          onSave={(updated) => updateProject(editingProjectIdx, updated)}
          onClose={() => setEditingProjectIdx(null)}
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
        <div className="max-w-5xl mx-auto px-6">
          <SectionLabel text="What We Do" />
          <h2 className="font-black text-3xl lg:text-4xl text-gray-900 mb-10 leading-tight">
            Our Services
          </h2>

          <div className="divide-y divide-gray-100 border-t border-gray-100">
            {SERVICES.map((s, i) => {
              const open = activeSvc === i;
              const title = svcOverrides[i]?.title ?? s.title;
              const desc = svcOverrides[i]?.desc ?? s.desc;
              const imgSrc = imgStore[`svc-${i}`] ?? s.img;
              return (
                <div key={s.num}>
                  <button
                    onClick={() => setActiveSvc(open ? -1 : i)}
                    className="w-full text-left flex items-center gap-4 py-5 group"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        open
                          ? "bg-[#1558cb]"
                          : "bg-gray-100 group-hover:bg-blue-50"
                      }`}
                    >
                      <span className={open ? "text-white" : "text-[#1558cb]"}>
                        {s.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-black ${
                            open ? "text-[#1558cb]" : "text-gray-300"
                          }`}
                        >
                          {s.num}
                        </span>
                        <span
                          className={`font-bold text-base ${
                            open
                              ? "text-[#1558cb]"
                              : "text-gray-800 group-hover:text-gray-900"
                          }`}
                        >
                          {title}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                        open
                          ? "border-[#1558cb] bg-[#1558cb] rotate-90"
                          : "border-gray-200 group-hover:border-[#1558cb]"
                      }`}
                    >
                      <ArrowRight
                        size={13}
                        className={
                          open
                            ? "text-white"
                            : "text-gray-400 group-hover:text-[#1558cb]"
                        }
                      />
                    </div>
                  </button>

                  {open && (
                    <div className="flex flex-col sm:flex-row gap-5 pb-7 pl-16">
                      <div
                        className="sm:w-52 shrink-0 rounded-xl overflow-hidden"
                        style={{ height: "140px" }}
                      >
                        <EditableImage
                          id={`svc-${i}`}
                          src={imgSrc}
                          alt={title}
                          className="w-full h-full object-cover"
                          wrapperClassName="relative group/ei w-full h-full"
                          isAdmin={isAdmin}
                          store={imgStore}
                          onReplace={replaceImage}
                        />
                      </div>
                      <div className="flex-1">
                        {isAdmin ? (
                          <div className="space-y-2">
                            <div>
                              <label className="block text-[10px] font-bold text-[#1558cb] uppercase tracking-widest mb-1">
                                Service Title
                              </label>
                              <input
                                value={title}
                                onChange={(e) =>
                                  saveSvc(i, "title", e.target.value)
                                }
                                className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-[#1558cb] uppercase tracking-widest mb-1">
                                Description
                              </label>
                              <textarea
                                value={desc}
                                onChange={(e) =>
                                  saveSvc(i, "desc", e.target.value)
                                }
                                rows={4}
                                className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm text-gray-600 leading-relaxed focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition resize-none"
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {desc}
                            </p>
                            <button
                              onClick={() => setShowModal(true)}
                              className="mt-4 inline-flex items-center gap-2 text-[#1558cb] font-semibold text-sm hover:underline"
                            >
                              <CalendarCheck size={14} />
                              Book this service
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grand Waters background banner */}
      <section className="relative py-24 overflow-hidden">
        <img
          src={imgE}
          alt="Grand Waters facility"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(5,10,28,0.88) 0%, rgba(21,88,203,0.70) 100%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#4e8ef7] text-[11px] font-bold tracking-[0.3em] uppercase mb-3">
              Trusted Since 2012
            </p>
            <h2 className="font-black text-white text-3xl lg:text-5xl leading-tight">
              Grand Waters by the Numbers
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s, i) => {
              const value = statsOverrides[i]?.value ?? s.value;
              const label = statsOverrides[i]?.label ?? s.label;
              return (
                <div
                  key={i}
                  className="text-center px-4 py-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  {isAdmin ? (
                    <div className="space-y-2">
                      <input
                        value={value}
                        onChange={(e) => saveStat(i, "value", e.target.value)}
                        className="w-full text-center font-black text-3xl bg-transparent border-b border-[#4e8ef7]/60 focus:border-[#4e8ef7] focus:outline-none text-[#4e8ef7] pb-1 transition"
                      />
                      <input
                        value={label}
                        onChange={(e) => saveStat(i, "label", e.target.value)}
                        className="w-full text-center text-sm bg-transparent border-b border-white/20 focus:border-white/60 focus:outline-none text-gray-300 pb-1 transition"
                      />
                    </div>
                  ) : (
                    <>
                      <div
                        className="font-black text-4xl lg:text-5xl mb-2"
                        style={{ color: "#4e8ef7" }}
                      >
                        {value}
                      </div>
                      <div className="text-gray-300 text-sm font-medium">
                        {label}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-[#f8f9fb]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <SectionLabel text="Our Work" />
            <h2 className="font-black text-3xl lg:text-4xl text-gray-900">
              Projects
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {projects.map((p, i) => {
              const cover = imgStore[`proj-${i}`] ?? p.imgs[0];
              return (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden group cursor-pointer aspect-square"
                  onClick={() =>
                    !isAdmin &&
                    setSelectedProject({
                      ...p,
                      imgs: p.imgs.map(
                        (img, j) => imgStore[`proj-${i}-${j}`] ?? img
                      ),
                    })
                  }
                >
                  <img
                    src={cover}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block bg-[#1558cb] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1">
                      {p.cat}
                    </span>
                    <p className="text-white font-semibold text-xs leading-tight">
                      {p.title}
                    </p>
                    <div className="flex items-center gap-1 text-gray-300 text-[10px] mt-0.5">
                      <MapPin size={8} />
                      {p.loc}
                    </div>
                  </div>
                  {isAdmin && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <label className="flex items-center gap-1.5 bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer shadow">
                        <Pencil size={11} />
                        Replace Photo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0])
                              replaceImage(`proj-${i}`, e.target.files[0]);
                          }}
                        />
                      </label>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProjectIdx(i);
                        }}
                        className="flex items-center gap-1.5 bg-[#1558cb] hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow transition-colors"
                      >
                        <Pencil size={11} />
                        Edit Details
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeProject(i);
                        }}
                        className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow transition-colors"
                      >
                        <Trash2 size={11} />
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            {isAdmin && (
              <button
                onClick={addProject}
                className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-[#1558cb] flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-[#1558cb] transition-colors group/add bg-white"
              >
                <ImagePlus
                  size={26}
                  className="group-hover/add:scale-110 transition-transform"
                />
                <span className="text-xs font-semibold">Add Project</span>
              </button>
            )}
          </div>
        </div>
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
                {[
                  "Water Filtration Installation",
                  "Water Softener Installation",
                  "Reverse Osmosis Systems",
                  "Tank & System Cleaning",
                  "Water Testing & Consultation",
                ].map((s) => (
                  <li key={s}>
                    <a
                      href="#services"
                      className="hover:text-white transition-colors"
                    >
                      {s}
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
