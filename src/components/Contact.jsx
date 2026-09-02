import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Inline social icons 
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
  </svg>
);
const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.9 3H22l-7.2 8.2L23.3 21h-6.6l-5.2-6.4L5.6 21H2.4l7.7-8.8L1 3h6.8l4.7 5.9L18.9 3Zm-1.2 16.1h1.7L7.4 4.8H5.6l12.1 14.3Z" />
  </svg>
);
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.3.4a4.6 4.6 0 0 1 2.6 2.6c.2.5.4 1.2.4 2.3.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.4 2.3a4.6 4.6 0 0 1-2.6 2.6c-.5.2-1.2.4-2.3.4-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.3-.4a4.6 4.6 0 0 1-2.6-2.6c-.2-.5-.4-1.2-.4-2.3C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.4-2.3a4.6 4.6 0 0 1 2.6-2.6c.5-.2 1.2-.4 2.3-.4C8.9 2 9.3 2 12 2Zm0 1.8c-2.6 0-3 0-4 .1-.9 0-1.4.2-1.7.3a2.8 2.8 0 0 0-1.6 1.6c-.1.3-.3.8-.3 1.7-.1 1-.1 1.4-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7a2.8 2.8 0 0 0 1.6 1.6c.3.1.8.3 1.7.3 1 .1 1.4.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3a2.8 2.8 0 0 0 1.6-1.6c.1-.3.3-.8.3-1.7.1-1 .1-1.4.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7a2.8 2.8 0 0 0-1.6-1.6c-.3-.1-.8-.3-1.7-.3-1-.1-1.4-.1-4-.1Zm0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm4.9-2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
  </svg>
);
const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6.9 8.4H3.6V20h3.3V8.4ZM5.3 3.4a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 20h-3.3v-6.1c0-1.5 0-3.3-2-3.3s-2.4 1.6-2.4 3.2V20H9.4V8.4h3.2v1.6h.1c.4-.8 1.6-1.7 3.2-1.7 3.4 0 4.5 2.3 4.5 5.2V20Z" />
  </svg>
);

// Reusable scroll-reveal hook 
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// applies the fade-up transition
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

const contactInfo = [
  { icon: Mail, label: "Email", value: "voltix.com" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: MapPin, label: "Address", value: "Chennai, Tamil Nadu" },
];

const socials = [FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon];

function Toast({ toast, onClose }) {
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (!toast) return;
    timerRef.current = setTimeout(onClose, 4000);
    return () => clearTimeout(timerRef.current);
  }, [toast, onClose]);

  return (
    <div className="fixed top-24 right-6 z-[100] pointer-events-none">
      <div
        key={toast ? toast.id : "empty"}
        className={`pointer-events-auto flex items-center gap-3 rounded-2xl px-5 py-4 shadow-2xl border transition-all duration-500 ease-out ${
          toast
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-3 scale-95"
        } ${
          toast?.type === "success"
            ? "bg-green-600 border-green-500 text-white"
            : "bg-red-600 border-red-500 text-white"
        }`}
      >
        {toast?.type === "success" ? (
          <CheckCircle2 size={20} className="shrink-0" />
        ) : (
          <AlertCircle size={20} className="shrink-0" />
        )}
        <p className="text-sm font-medium pr-2">{toast?.message}</p>
        <button
          onClick={onClose}
          className="ml-2 text-white/80 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
function SubmitButton({ status }) {
  return (
    <button
      type="submit"
      disabled={status !== "idle"}
      className={`group relative w-full overflow-hidden rounded-full px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 disabled:cursor-not-allowed ${
        status === "sent" ? "bg-green-500" : "bg-green-600"
      }`}
    >
      {/* Sweeping fill while sending */}
      {status === "sending" && (
        <span className="absolute inset-0 bg-green-500">
          <span className="absolute inset-y-0 left-0 bg-green-400 animate-[fillSweep_1.4s_ease-in-out_forwards]" />
        </span>
      )}

      {/* Hover sheen on idle */}
      {status === "idle" && (
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}

      <span className="relative flex items-center justify-center gap-2">
        {status === "idle" && (
          <>
            Send Message
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </>
        )}

        {status === "sending" && <>Sending...</>}

        {status === "sent" && (
          <>
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M4 12.5l5 5L20 6"
                strokeDasharray="30"
                strokeDashoffset="30"
                className="animate-[drawCheck_0.5s_ease-out_forwards]"
              />
            </svg>
            Message Sent
          </>
        )}
      </span>

      <style>{`
        @keyframes fillSweep {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </button>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); 
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ id: Date.now(), type, message });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) nextErrors.message = "Please enter a message.";
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status !== "idle") return;

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      showToast(
        "error",
        nextErrors.email || "Please fix the highlighted fields."
      );
      return;
    }

    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      showToast("success", "Message sent successfully!");
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", message: "" });
      }, 2000);
    }, 1400);
  };

  return (
    <section   id="contact"   className="relative py-24 lg:py-32 bg-white dark:bg-[#07111D] transition-all duration-500 overflow-hidden">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1450px] mx-auto px-6 lg:px-12 xl:px-16 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <Reveal delay={0}>
              <span className="inline-block text-green-600 font-semibold text-sm tracking-[3px] uppercase">
                Get In Touch
              </span>
              <h2
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="mt-4 text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.15] font-extrabold tracking-[-1.5px] text-gray-900 dark:text-white"
              >
                Let's Build Something{" "}
                <span className="text-green-600">Amazing.</span>
              </h2>
              <p
                style={{ fontFamily: "Manrope, sans-serif" }}
                className="mt-6 text-gray-500 dark:text-gray-300 text-base lg:text-lg leading-8 max-w-md"
              >
                Have a project in mind? Reach out and our team will get back
                to you within one business day.
              </p>
            </Reveal>

            {/* Contact details */}
            <div className="mt-10 space-y-5">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.label} delay={150 + i * 100}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center shrink-0">
                        <Icon className="text-green-600" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                          {item.label}
                        </p>
                        <p className="text-gray-800 dark:text-gray-200 font-medium">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Social icons */}
            <Reveal delay={500}>
              <div className="flex items-center gap-4 mt-10">
                {socials.map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-11 h-11 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-green-600 hover:border-green-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* RIGHT — Glass form */}
          <Reveal delay={200} className="!duration-1000">
            <div className="relative rounded-3xl p-8 lg:p-10 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full rounded-xl px-4 py-3.5 bg-white/70 dark:bg-white/5 border text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 dark:border-gray-700 focus:ring-green-600"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full rounded-xl px-4 py-3.5 bg-white/70 dark:bg-white/5 border text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 dark:border-gray-700 focus:ring-green-600"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className={`w-full rounded-xl px-4 py-3.5 bg-white/70 dark:bg-white/5 border text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 resize-none ${
                      errors.message
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-200 dark:border-gray-700 focus:ring-green-600"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <SubmitButton status={status} />
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}