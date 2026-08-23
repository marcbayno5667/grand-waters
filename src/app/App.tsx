import { useState, useRef } from "react";
import imgA from "@/imports/A.png";
import imgB from "@/imports/b.png";
import imgC from "@/imports/c.png";
import imgD from "@/imports/d.png";
import imgE from "@/imports/e.png";
import imgF from "@/imports/f.png";
import {
  Phone, Mail, Facebook, MapPin, Shield, Send,
  DollarSign, ArrowRight, CalendarCheck, Handshake,
  Timer, Menu, X, CheckCircle2, Droplets, FlaskConical, Waves,
} from "lucide-react";

const NAV_LINKS = ["Home", "Services", "Projects", "About Us", "Contact"];
const NAV_HREFS: Record<string, string> = {
  "Home":     "#home",
  "Services": "#services",
  "Projects": "#projects",
  "About Us": "#about",
  "Contact":  "#contact",
};

const SERVICES = [
  { num: "01", icon: <Droplets size={22}/>,      title: "Water Filtration System Installation", desc: "Install filters to remove dirt, sediment, rust, and other impurities.", img: imgA },
  { num: "02", icon: <Waves size={22}/>,          title: "Water Softener Installation",           desc: "Reduce hard water, scale buildup, and mineral deposits.",             img: imgD },
  { num: "03", icon: <FlaskConical size={22}/>,   title: "Reverse Osmosis (RO) Systems",          desc: "Purify drinking water by removing dissolved contaminants.",           img: imgB },
  { num: "04", icon: <Shield size={22}/>,         title: "Water Tank & System Cleaning",          desc: "Clean and sanitize water tanks, pipes, and filtration systems.",      img: imgC },
  { num: "05", icon: <CheckCircle2 size={22}/>,   title: "Water Testing & Treatment Consultation",desc: "Test water quality and recommend the appropriate treatment system.",   img: imgE },
];

const PROJECTS = [
  { category: "FILTRATION", title: "Industrial Filtration System",  location: "Luzon",    img: imgA, filter: "Filtration" },
  { category: "RO SYSTEM",  title: "RO Membrane System",            location: "Visayas",  img: imgB, filter: "RO System"  },
  { category: "RO SYSTEM",  title: "Outdoor RO Installation",        location: "Mindanao", img: imgC, filter: "RO System"  },
  { category: "SOFTENER",   title: "Water Softener Tank Setup",      location: "Luzon",    img: imgD, filter: "Softener"   },
  { category: "FILTRATION", title: "Large-Scale Treatment Plant",    location: "Visayas",  img: imgE, filter: "Filtration" },
  { category: "FILTRATION", title: "Multi-Stage Filtration Unit",    location: "Mindanao", img: imgF, filter: "Filtration" },
];

const PROJECT_FILTERS = ["All", "Filtration", "RO System", "Softener"];

const WHY = [
  { icon: <Handshake size={26} strokeWidth={1.5}/>, title: "Professional Staff",   desc: "Licensed & background-checked technicians on every job."   },
  { icon: <DollarSign size={26} strokeWidth={1.5}/>, title: "Upfront Pricing",      desc: "Flat-rate quotes with no hidden fees — ever."               },
  { icon: <Timer size={26} strokeWidth={1.5}/>,      title: "On-Time Guarantee",    desc: "If we're late, you don't pay the service fee."              },
  { icon: <Shield size={26} strokeWidth={1.5}/>,     title: "100% Satisfaction",    desc: "We stand behind every installation and repair."             },
];

const STATS = [
  { value: "2,500+", label: "Happy Clients"    },
  { value: "3,800+", label: "Projects Done"    },
  { value: "10+",    label: "Years Active"     },
  { value: "24/7",   label: "Emergency Line"   },
];

function InquiryModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from ${form.name || "Website Visitor"} – Grand Waters`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:grandwaters2012@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: "rgba(7,12,24,0.72)", backdropFilter: "blur(4px)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        <div className="bg-[#1558cb] px-6 py-5 flex items-start justify-between">
          <div>
            <h2 className="text-white font-black text-lg leading-tight">Schedule a Consultation</h2>
            <p className="text-blue-200 text-xs mt-1">{"We'll get back to you within 24 hours."}</p>
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white transition-colors mt-0.5">
            <X size={18}/>
          </button>
        </div>


        {sent ? (
          <div className="px-6 py-10 text-center">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <Send size={24} className="text-[#1558cb]"/>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">Message Sent!</h3>
            <p className="text-gray-500 text-sm">Your email client should have opened. {"We'll"} respond to you shortly.</p>
            <button onClick={onClose} className="mt-6 bg-[#1558cb] hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-colors">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <input
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Juan dela Cruz"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                <input
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="09XX XXX XXXX"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1558cb] focus:ring-1 focus:ring-[#1558cb] transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
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
              <label className="block text-xs font-semibold text-gray-700 mb-1">Your Inquiry / Message <span className="text-red-500">*</span></label>
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
              <Send size={14}/>Send Inquiry
            </button>
            <p className="text-gray-400 text-[10px] text-center leading-relaxed">
              Clicking Send will open your email app with this message pre-filled and addressed to grandwaters2012@gmail.com.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-px bg-[#1558cb]" />
      <span className="text-[#1558cb] text-[11px] font-bold tracking-[0.22em] uppercase">{text}</span>
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSvc, setActiveSvc]       = useState(0);
  const [showModal, setShowModal]       = useState(false);

  const visible = activeFilter === "All" ? PROJECTS : PROJECTS.filter(p => p.filter === activeFilter);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-[#f8f9fb] text-gray-900">
      {showModal && <InquiryModal onClose={() => setShowModal(false)}/>}


      <div className="bg-[#0b1120] text-gray-500 text-[11px] py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-5">
            <a href="tel:+639688537723" className="flex items-center gap-1.5 hover:text-white transition-colors"><Phone size={10}/>0968 853 7723</a>
            <a href="mailto:grandwaters2012@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors"><Mail size={10}/>grandwaters2012@gmail.com</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>24/7 Emergency Service</span>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/grandwaters2012" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook size={12}/></a>
              <a href="https://www.facebook.com/profile.php?id=61553003003029" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook size={12}/></a>
            </div>
          </div>
        </div>
      </div>


      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg width="30" height="30" viewBox="0 0 38 38" fill="none">
              <path d="M19 4C19 4 8 15 8 22.5a11 11 0 0022 0C30 15 19 4 19 4z" fill="#1558cb"/>
              <path d="M19 14C19 14 13 20 13 23.5a6 6 0 0012 0C25 20 19 14 19 14z" fill="white" opacity="0.4"/>
            </svg>
            <div className="leading-none">
              <div className="font-black text-sm tracking-tight text-[#0b1120]">GRAND</div>
              <div className="font-black text-sm tracking-tight text-[#1558cb]">WATERS</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(l => (
              <a key={l} href={NAV_HREFS[l]} className={`text-sm font-medium transition-colors ${l === "Home" ? "text-[#1558cb]" : "text-gray-500 hover:text-gray-900"}`}>{l}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+639688537723" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-[#1558cb] transition-colors">
              <Phone size={13}/>0968 853 7723
            </a>
            <a href="#contact" className="hidden lg:inline-flex bg-[#1558cb] hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded transition-colors">
              Free Quote
            </a>
            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="lg:hidden border-t bg-white px-6 py-4 space-y-3">
            {NAV_LINKS.map(l => <a key={l} href={NAV_HREFS[l]} onClick={() => setMobileOpen(false)} className="block text-sm text-gray-700 py-1">{l}</a>)}
            <a href="#contact" onClick={() => setMobileOpen(false)} className="block text-center bg-[#1558cb] text-white text-sm font-bold py-2.5 rounded">Free Quote</a>
          </div>
        )}
      </header>


      <section id="home" className="relative flex flex-col justify-end" style={{ minHeight: "100vh" }}>

        <img
          src={imgE}
          alt="Water treatment facility"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0" style={{ background: "rgba(10,18,40,0.62)" }} />


        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-12 pb-16 md:pb-24 pt-32">
          <div className="max-w-2xl">

            <div className="inline-flex items-center gap-2 border border-white/30 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4e8ef7]" />
              <span className="text-white text-xs font-medium">Water Treatment Specialists</span>
            </div>

            <h1 className="text-white font-black leading-[1.05] mb-6" style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)" }}>
              From Flow to Purity,<br />
              <span className="text-[#4e8ef7]">We Deliver.</span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
              Commercial and industrial water treatment solutions across Luzon, Visayas, and Mindanao. Professional installations & emergency repairs.
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-bold text-sm px-7 py-3.5 rounded-md transition-colors">
                <CalendarCheck size={15}/>Schedule Consultation
              </button>
              <a href="tel:+639688537723" className="flex items-center gap-2 border border-white/40 hover:border-white text-white font-semibold text-sm px-7 py-3.5 rounded-md transition-colors">
                <Phone size={14} />0968 853 7723
              </a>
            </div>
          </div>
        </div>
      </section>


      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel text="What We Do" />
          <div className="flex flex-col lg:flex-row lg:items-start gap-12">


            <div className="lg:w-[42%] shrink-0">
              <h2 className="font-black text-3xl lg:text-4xl text-gray-900 mb-8 leading-tight">
                Our Services
              </h2>
              <div className="space-y-2">
                {SERVICES.map((s, i) => (
                  <button
                    key={s.num}
                    onClick={() => setActiveSvc(i)}
                    className={`w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${activeSvc === i ? "bg-[#1558cb] shadow-md" : "bg-gray-50 hover:bg-gray-100"}`}
                  >
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-colors ${activeSvc === i ? "bg-white/20" : "bg-white border border-gray-200 group-hover:border-[#1558cb]/30"}`}>
                      <span className={activeSvc === i ? "text-white" : "text-[#1558cb]"}>
                        {s.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-sm leading-snug ${activeSvc === i ? "text-white" : "text-gray-800"}`}>
                        {s.title}
                      </div>
                      {activeSvc === i && (
                        <p className="text-blue-100 text-xs leading-relaxed mt-1">{s.desc}</p>
                      )}
                    </div>
                    <ArrowRight size={14} className={`shrink-0 transition-all ${activeSvc === i ? "text-white" : "text-gray-300 group-hover:text-[#1558cb]"}`}/>
                  </button>
                ))}
              </div>
            </div>


            <div className="flex-1 relative overflow-hidden rounded-2xl" style={{ minHeight: "420px" }}>
              {SERVICES.map((s, i) => (
                <img
                  key={s.num}
                  src={s.img}
                  alt={s.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${activeSvc === i ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <span className="text-[#4e8ef7] text-xs font-semibold tracking-widest uppercase">
                  {SERVICES[activeSvc].num} / {String(SERVICES.length).padStart(2, "0")}
                </span>
                <p className="text-white font-bold text-base mt-1">{SERVICES[activeSvc].title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="projects" className="py-20 bg-[#f8f9fb]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <SectionLabel text="Our Work" />
              <h2 className="font-black text-3xl lg:text-4xl text-gray-900">Recent Projects</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {PROJECT_FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${activeFilter === f ? "bg-[#1558cb] text-white border-[#1558cb]" : "border-gray-300 text-gray-600 hover:border-[#1558cb] hover:text-[#1558cb] bg-white"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>


          <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-3" style={{ height: "480px" }}>
            {visible.slice(0, 1).map(p => (
              <div key={p.title} className="col-span-2 row-span-2 relative rounded-xl overflow-hidden group cursor-pointer">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"/>
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="inline-block bg-[#1558cb] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-2">{p.category}</span>
                  <h3 className="text-white font-bold text-lg leading-tight">{p.title}</h3>
                  <div className="flex items-center gap-1 text-gray-300 text-xs mt-1"><MapPin size={10}/>{p.location}</div>
                </div>
              </div>
            ))}
            {visible.slice(1, 5).map((p, i) => (
              <div key={p.title} className={`relative rounded-xl overflow-hidden group cursor-pointer ${i === 0 || i === 2 ? "col-span-1" : "col-span-1"}`}>
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
                <div className="absolute bottom-3 left-3 right-2">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase mb-1">{p.category}</span>
                  <h4 className="text-white font-semibold text-xs leading-tight">{p.title}</h4>
                  <div className="flex items-center gap-0.5 text-gray-300 text-[10px] mt-0.5"><MapPin size={8}/>{p.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel text="Our Edge" />
            <h2 className="font-black text-3xl lg:text-4xl text-gray-900 mb-10 leading-tight">Why Grand Waters?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHY.map((w, i) => (
                <div key={w.title} className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-[#1558cb]/20 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-[#1558cb] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <span className="text-white">{w.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-[#1558cb]/40">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="font-bold text-sm text-gray-900">{w.title}</h3>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          <div className="relative hidden lg:block" style={{ height: "460px" }}>
            <img src={imgE} alt="treatment plant" className="absolute top-0 left-0 w-[70%] h-60 object-cover rounded-2xl shadow-md"/>
            <img src={imgF} alt="filtration unit" className="absolute bottom-0 right-0 w-[68%] h-56 object-cover rounded-2xl shadow-md"/>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1558cb] rounded-2xl w-24 h-24 flex flex-col items-center justify-center text-white shadow-lg z-10">
              <span className="font-black text-2xl">10+</span>
              <span className="text-[10px] text-blue-200 text-center leading-tight">Years of Experience</span>
            </div>
          </div>
        </div>
      </section>


      <section id="contact" className="relative bg-[#0b1120] overflow-hidden">
        <img src={imgC} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15"/>
        <div className="relative max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <SectionLabel text="Get Started" />
            <h2 className="text-white font-black text-3xl lg:text-4xl leading-tight">
              Need a Water Treatment<br/>Solution?
            </h2>
            <p className="text-gray-500 text-sm mt-3 max-w-md">
              {"We're available 24/7 for consultations, installations, and emergency repairs across the Philippines."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-[#1558cb] hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded text-sm transition-colors">
              <CalendarCheck size={15}/>Schedule Free Consultation
            </button>
            <a href="tel:+639688537723" className="flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-medium px-6 py-3.5 rounded text-sm transition-colors">
              <Phone size={14}/>0968 853 7723
            </a>
          </div>
        </div>
      </section>


      <footer className="bg-[#070c18] text-gray-600 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg width="26" height="26" viewBox="0 0 38 38" fill="none">
                  <path d="M19 4C19 4 8 15 8 22.5a11 11 0 0022 0C30 15 19 4 19 4z" fill="#1558cb"/>
                  <path d="M19 14C19 14 13 20 13 23.5a6 6 0 0012 0C25 20 19 14 19 14z" fill="white" opacity="0.4"/>
                </svg>
                <div className="leading-none">
                  <div className="font-black text-sm text-white">GRAND</div>
                  <div className="font-black text-sm text-[#1558cb]">WATERS</div>
                </div>
              </div>
              <p className="text-xs leading-relaxed mb-4">Reliable water treatment solutions built on trust.</p>
              <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/grandwaters2012" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook size={13}/></a>
                <a href="https://www.facebook.com/profile.php?id=61553003003029" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook size={13}/></a>
              </div>
            </div>

            <div>
              <h4 className="text-white text-[11px] font-bold uppercase tracking-widest mb-4">Services</h4>
              <ul className="space-y-2.5 text-xs">
                {["Water Filtration Installation","Water Softener Installation","Reverse Osmosis Systems","Tank & System Cleaning","Water Testing & Consultation"].map(s => (
                  <li key={s}><a href="#services" className="hover:text-white transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-[11px] font-bold uppercase tracking-widest mb-4">Company</h4>
              <ul className="space-y-2.5 text-xs">
                {(["Home","About Us","Projects","Contact"] as const).map(l => (
                  <li key={l}><a href={NAV_HREFS[l] ?? "#home"} className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-[11px] font-bold uppercase tracking-widest mb-4">Contact</h4>
              <ul className="space-y-3 text-xs">
                <li className="flex items-start gap-2"><Phone size={11} className="mt-0.5 shrink-0 text-[#1558cb]"/>0968 853 7723</li>
                <li className="flex items-start gap-2"><Mail size={11} className="mt-0.5 shrink-0 text-[#1558cb]"/>grandwaters2012@gmail.com</li>
                <li className="flex items-start gap-2"><MapPin size={11} className="mt-0.5 shrink-0 text-[#1558cb]"/>Woodland Heights Subd, R Duterte St, Banawa, Guadalupe, Cebu City, Philippines 6000</li>
              </ul>
            </div>
          </div>
          <div className="pt-5 text-center text-[11px] text-gray-700">
            © 2024 Grand Waters. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
