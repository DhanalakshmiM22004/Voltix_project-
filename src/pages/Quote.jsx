import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Phone,
  Mail,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Award,
  Clock,
  Briefcase,
  Sparkles,
} from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,15}$/;

// Reusable scroll-reveal hook — re-triggers every time the element
// enters or leaves the viewport, so it animates on every scroll pass.
function useInView(threshold = 0.15) {
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

const services = [
  "Solar Energy",
  "Wind Energy",
  "Battery Storage",
  "EV Charging",
  "Energy Consulting",
  "Maintenance",
];

const budgets = ["Below ₹1 Lakh", "₹1L - ₹5L", "₹5L - ₹10L", "₹10L+", "Not Sure"];

const timelines = [
  "Immediately",
  "Within 1 Month",
  "Within 3 Months",
  "Just Exploring",
];

const whyUs = [
  { icon: Sparkles, text: "Free Consultation" },
  { icon: ShieldCheck, text: "Certified Engineers" },
  { icon: Award, text: "10+ Years Experience" },
  { icon: Briefcase, text: "250+ Projects" },
  { icon: Clock, text: "24 Hour Response" },
  { icon: CheckCircle2, text: "Custom Solutions" },
];

const stats = [
  { value: "250+", label: "Projects" },
  { value: "98%", label: "Happy Clients" },
  { value: "500MW", label: "Energy Generated" },
  { value: "10+", label: "Years" },
];

const fieldClass = (hasError) =>
  `w-full rounded-xl px-4 py-3.5 bg-white dark:bg-white/5 border text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
    hasError
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-200 dark:border-gray-700 focus:ring-green-600"
  }`;

export default function Quote() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    location: "",
    budget: "",
    timeline: "",
    message: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim()) {
      next.phone = "Please enter your phone number.";
    } else if (!PHONE_REGEX.test(form.phone.trim())) {
      next.phone = "Please enter a valid phone number.";
    }
    if (!form.agree) next.agree = "Please accept the Privacy Policy to continue.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;

    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    // Simulated submit — replace with your real API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-20 bg-white dark:bg-[#07111D] transition-all duration-500">
      <div className="max-w-[1250px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <Reveal delay={0}>
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-green-600 text-xs sm:text-sm font-bold tracking-[2px] uppercase">
              <Zap size={13} />
              Get a Free Quote
            </span>
            <h1
              style={{ fontFamily: "Manrope, sans-serif" }}
              className="mt-5 text-[30px] sm:text-[38px] lg:text-[44px] leading-[1.15] font-extrabold tracking-[-1px] text-gray-900 dark:text-white"
            >
              Let's Build Your Renewable Energy Solution
            </h1>
            <p
              style={{ fontFamily: "Manrope, sans-serif" }}
              className="mt-4 text-gray-500 dark:text-gray-300 text-base leading-7"
            >
              Tell us about your project and our experts will contact you
              within 24 hours.
            </p>
          </div>
        </Reveal>

        {/* Content */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 mt-14">
          {/* FORM */}
          <Reveal delay={100}>
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-[#0F2233] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 sm:p-8 space-y-8"
            >
              {/* Personal info */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-5">
                  Your Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={fieldClass(errors.name)}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={fieldClass(errors.email)}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={fieldClass(errors.phone)}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Optional"
                      className={fieldClass(false)}
                    />
                  </div>
                </div>
              </div>

              {/* Project details */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-5 mt-6">
                  Project Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Service
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={`${fieldClass(false)} appearance-none pr-10`}
                    >
                      <option value="">Choose a service</option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={18}
                      className="absolute right-3.5 top-[42px] text-gray-400 pointer-events-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Location
                    </label>
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="City, State"
                      className={fieldClass(false)}
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Estimated Budget
                    </label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className={`${fieldClass(false)} appearance-none pr-10`}
                    >
                      <option value="">Select a range</option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={18}
                      className="absolute right-3.5 top-[42px] text-gray-400 pointer-events-none"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={form.timeline}
                      onChange={handleChange}
                      className={`${fieldClass(false)} appearance-none pr-10`}
                    >
                      <option value="">Select a timeline</option>
                      {timelines.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={18}
                      className="absolute right-3.5 top-[42px] text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 mt-6">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your renewable energy requirements..."
                  className={`${fieldClass(false)} resize-none`}
                />
              </div>

              {/* Agreement + submit */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-5">
                <div className="mt-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={form.agree}
                      onChange={handleChange}
                      className="mt-0.5 w-4 h-4 accent-green-600 shrink-0"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      I agree to the{" "}
                      <span className="text-green-600 font-medium">
                        Privacy Policy
                      </span>
                    </span>
                  </label>
                  {errors.agree && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.agree}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white font-semibold rounded-full px-8 py-4 shadow-lg hover:shadow-green-500/30 transition-all duration-300"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Request Free Quote"
                  )}
                </button>
              </div>
            </form>

            {/* Need help */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Need Help?
              </span>
              <span className="flex items-center gap-2">
                <Phone size={15} className="text-green-600" />
                +91 98765 43210
              </span>
              <span className="flex items-center gap-2">
                <Mail size={15} className="text-green-600" />
                hello@voltix.com
              </span>
            </div>
          </Reveal>

          {/* SIDE INFO CARD */}
          <Reveal delay={200} className="!duration-1000">
            <div className="lg:sticky lg:top-28 bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <Zap size={20} />
                <h3
                  style={{ fontFamily: "Manrope, sans-serif" }}
                  className="text-xl font-bold"
                >
                  Why Choose Voltix?
                </h3>
              </div>
              <ul className="space-y-4">
                {whyUs.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.text} className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                        <Icon size={16} />
                      </span>
                      <span className="text-sm font-medium text-white/95">
                        {item.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Bottom statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100}>
              <div className="text-center">
                <p
                  style={{ fontFamily: "Manrope, sans-serif" }}
                  className="text-3xl sm:text-4xl font-extrabold text-green-600"
                >
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Success popup */}
      {submitted && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-5 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white dark:bg-[#0F2233] rounded-3xl p-8 sm:p-10 max-w-md w-full text-center shadow-2xl animate-[popIn_0.4s_ease-out]">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="text-green-600" size={32} />
            </div>
            <h3
              style={{ fontFamily: "Manrope, sans-serif" }}
              className="mt-5 text-2xl font-extrabold text-gray-900 dark:text-white"
            >
              Thank You!
            </h3>
            <p className="mt-3 text-gray-500 dark:text-gray-400 leading-6">
              Your request has been submitted successfully. Our renewable
              energy expert will contact you within 24 hours.
            </p>
            <Link
              to="/"
              className="inline-block mt-7 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-8 py-3.5 transition-colors duration-300"
            >
              Back Home
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </section>
  );
}