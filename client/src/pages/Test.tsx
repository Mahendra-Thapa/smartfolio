import { useState, useRef, useEffect } from "react";

// ── Config ────────────────────────────────────────────────────────────────
const API_BASE: string = (import.meta as any).env?.VITE_PUBLIC_BASE_AI_URL ?? "";

// ── Types ─────────────────────────────────────────────────────────────────
interface Field {
  key:         string;
  label:       string;
  placeholder: string;
  rows:        number;
}

interface GrammarResponse {
  original:  string;
  corrected: string;
  changed:   boolean;
}

interface AutocompleteResponse {
  seed:        string;
  completions: string[];
  ready:       boolean;
  message?:    string;
}

interface RewriteResponse {
  original:  string;
  rewritten: string;
  changed:   boolean;
  hint?:     string;
}

interface Banner {
  msg: string;
  ok:  boolean;
}

// ── Field definitions ─────────────────────────────────────────────────────
const FIELDS: Field[] = [
  { key: "introduction",          label: "Introduction",          placeholder: "Hi, I am a final year computer science student passionate about…",  rows: 3 },
  { key: "bio",                   label: "About Me / Bio",        placeholder: "Tell us about yourself — your passion, experience, and goals…",       rows: 4 },
  { key: "skills",                label: "Skills",                placeholder: "e.g. Python, React, Machine Learning, PostgreSQL…",                   rows: 3 },
  { key: "projects",              label: "Projects",              placeholder: "Describe projects you built — tech stack and impact…",                 rows: 4 },
  { key: "experience",            label: "Experience",            placeholder: "Describe your roles, responsibilities, and key achievements…",        rows: 4 },
  { key: "additional_experience", label: "Additional Experience", placeholder: "Volunteering, hackathons, open source, clubs, research…",             rows: 3 },
  { key: "qualifications",        label: "Qualifications",        placeholder: "e.g. AWS Certified Developer, Google TensorFlow Certificate…",        rows: 3 },
  { key: "education",             label: "Education Details",     placeholder: "e.g. B.Sc. Computer Science, University Name, 2024, CGPA 3.8…",       rows: 3 },
];

type FieldKey = "introduction" | "bio" | "skills" | "projects" | "experience" | "additional_experience" | "qualifications" | "education";

type FieldsState = Record<FieldKey, string>;

// ── API helper ────────────────────────────────────────────────────────────
async function callAPI<T>(endpoint: string, body: object): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

// ── Animate text word by word ─────────────────────────────────────────────
function animateInsert(current: string, incoming: string, setter: (v: string) => void): void {
  const words  = incoming.trim().split(" ");
  const prefix = current ? current.trimEnd() + " " : "";
  let i = 0;
  const iv = setInterval(() => {
    if (i >= words.length) { clearInterval(iv); return; }
    setter(prefix + words.slice(0, i + 1).join(" "));
    i++;
  }, 70);
}

// ════════════════════════════════════════════════════════════════════════════
// StatusDot component
// ════════════════════════════════════════════════════════════════════════════
function StatusDot({ ready }: { ready: boolean }) {
  return (
    <span className="flex items-center gap-1.5 text-xs font-medium">
      <span className={`w-2 h-2 rounded-full ${
        ready
          ? "bg-emerald-400 shadow-[0_0_6px_#34d399]"
          : "bg-amber-400 animate-pulse"
      }`} />
      <span className={ready ? "text-emerald-400" : "text-amber-400"}>
        {ready ? "AI Ready" : "Training…"}
      </span>
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PortfolioField — all AI state is self-contained here
// ════════════════════════════════════════════════════════════════════════════
function PortfolioField({
  field,
  value,
  onChange,
}: {
  field:    Field;
  value:    string;
  onChange: (v: string) => void;
}) {
  const [completions,  setCompletions]  = useState<string[]>([]);
  const [rewrite,      setRewrite]      = useState<RewriteResponse | null>(null);
  const [banner,       setBanner]       = useState<Banner | null>(null);
  const [loadGrammar,  setLoadGrammar]  = useState<boolean>(false);
  const [loadComplete, setLoadComplete] = useState<boolean>(false);
  const [loadRewrite,  setLoadRewrite]  = useState<boolean>(false);

  const showBanner = (msg: string, ok: boolean): void => {
    setBanner({ msg, ok });
    setTimeout(() => setBanner(null), 4000);
  };

  // ── Grammar fix ──────────────────────────────────────────────────────────
  const handleGrammar = async (): Promise<void> => {
    if (!value.trim()) return;
    setLoadGrammar(true);
    try {
      const data = await callAPI<GrammarResponse>("/api/grammar", { text: value });
      if (data.changed) {
        onChange(data.corrected);
        showBanner("Grammar & spelling fixed!", true);
      } else {
        showBanner("No corrections needed — looks great.", false);
      }
    } catch (e) {
      console.error("[Grammar]", e);
      showBanner("Could not reach AI server.", false);
    } finally {
      setLoadGrammar(false);
    }
  };

  // ── Autocomplete ─────────────────────────────────────────────────────────
  const handleAutocomplete = async (): Promise<void> => {
    if (!value.trim()) return;

    setLoadComplete(true);
    setCompletions([]);
    setRewrite(null);

    try {
      const data = await callAPI<AutocompleteResponse>("/api/autocomplete", {
        text:      value,
        top_k:     5,
        num_words: 5,
      });

      console.log("[Autocomplete]", data);   // check browser console

      if (!data.ready) {
        showBanner("Model still training — try again in a moment.", false);
        return;
      }

      if (!data.completions || data.completions.length === 0) {
        showBanner("No suggestions — type a few more words and try again.", false);
        return;
      }

      setCompletions(data.completions);      // ← this shows the dropdown

    } catch (e) {
      console.error("[Autocomplete]", e);
      showBanner("Could not reach AI server.", false);
    } finally {
      setLoadComplete(false);
    }
  };

  // ── Rewrite ──────────────────────────────────────────────────────────────
  const handleRewrite = async (): Promise<void> => {
    if (!value.trim()) return;
    setLoadRewrite(true);
    setRewrite(null);
    setCompletions([]);
    try {
      const data = await callAPI<RewriteResponse>("/api/rewrite", {
        text:  value,
        field: field.key,
      });
      console.log("[Rewrite]", data);
      setRewrite(data);
    } catch (e) {
      console.error("[Rewrite]", e);
      showBanner("Could not reach AI server.", false);
    } finally {
      setLoadRewrite(false);
    }
  };

  const applyCompletion = (item: string): void => {
    animateInsert(value, item, onChange);
    setCompletions([]);
  };

  const applyRewrite = (): void => {
    if (rewrite?.rewritten) {
      onChange(rewrite.rewritten);
      showBanner("Text rewritten!", true);
    }
    setRewrite(null);
  };

  const isLoading = loadGrammar || loadComplete || loadRewrite;

  return (
    <div>
      {/* Label */}
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
          {field.label}
        </label>
        <span className="text-[10px] px-2 py-0.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 font-medium">
          AI Enhanced
        </span>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          rows={field.rows}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="w-full rounded-xl bg-zinc-900 border border-zinc-700/60 text-zinc-200 text-sm
            placeholder-zinc-600 px-4 py-3 resize-none outline-none
            focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20
            hover:border-zinc-600/80 transition-all duration-200 leading-relaxed"
        />
        {isLoading && (
          <div className="absolute top-3 right-3 w-4 h-4 rounded-full border-2 border-violet-500/30 border-t-violet-400 animate-spin" />
        )}
      </div>

      {/* AI Buttons */}
      <div className="flex flex-wrap gap-2 mt-2">
        <button
          type="button"
          onClick={handleGrammar}
          disabled={loadGrammar}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
            border border-zinc-700/60 bg-zinc-800/60 text-zinc-400
            hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300
            disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
        >
          {loadGrammar ? "Working…" : "✦ Fix Grammar"}
        </button>

        <button
          type="button"
          onClick={handleAutocomplete}
          disabled={loadComplete}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
            border border-zinc-700/60 bg-zinc-800/60 text-zinc-400
            hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300
            disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
        >
          {loadComplete ? "Working…" : "⚡ Autocomplete"}
        </button>

        <button
          type="button"
          onClick={handleRewrite}
          disabled={loadRewrite}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
            border border-zinc-700/60 bg-zinc-800/60 text-zinc-400
            hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300
            disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
        >
          {loadRewrite ? "Working…" : "✎ Rewrite"}
        </button>
      </div>

      {/* Banner */}
      {banner && (
        <div className={`flex items-start gap-2 px-3 py-2 rounded-lg border text-xs mt-2 ${
          banner.ok
            ? "bg-emerald-950/60 border-emerald-700/40 text-emerald-300"
            : "bg-zinc-800/60 border-zinc-700/40 text-zinc-400"
        }`}>
          <span className="mt-0.5">{banner.ok ? "✔" : "✓"}</span>
          <span className="flex-1">{banner.msg}</span>
          <button type="button" onClick={() => setBanner(null)}
            className="opacity-50 hover:opacity-100 transition-opacity">✕
          </button>
        </div>
      )}

      {/* ── Completions dropdown ── */}
      {completions.length > 0 && (
        <div className="mt-2 rounded-xl border border-violet-500/30 bg-zinc-900 overflow-hidden shadow-lg shadow-black/30">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-800/80 border-b border-zinc-700/60">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-violet-400">
              ⚡ LSTM Suggestions
            </span>
            <span className="text-[10px] text-zinc-500">click to append</span>
            <button
              type="button"
              onClick={() => setCompletions([])}
              className="ml-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
            >✕</button>
          </div>

          {/* Suggestion items */}
          <ul className="divide-y divide-zinc-800/50">
            {completions.map((item, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => applyCompletion(item)}
                  className="w-full text-left px-4 py-3 text-sm text-zinc-300
                    hover:bg-violet-600/10 hover:text-violet-200
                    transition-colors duration-100 flex items-start gap-3"
                >
                  <span className="text-violet-500 font-bold mt-0.5 text-xs">{i + 1}</span>
                  <span>{item}</span>
                </button>
              </li>
            ))}
          </ul>

        </div>
      )}

      {/* ── Rewrite result ── */}
      {rewrite && rewrite.changed && (
        <div className="mt-2 rounded-xl border border-violet-500/20 bg-zinc-900/90 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-500">
              ✎ Rewritten Version
            </span>
            <button type="button" onClick={() => setRewrite(null)}
              className="text-zinc-600 hover:text-zinc-400 text-xs">✕
            </button>
          </div>
          <p className="px-4 py-3 text-sm text-zinc-300 leading-relaxed">{rewrite.rewritten}</p>
          {rewrite.hint && (
            <p className="px-4 pb-2 text-xs text-zinc-600 italic">{rewrite.hint}</p>
          )}
          <div className="flex gap-2 px-4 pb-3">
            <button type="button" onClick={applyRewrite}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-violet-600 hover:bg-violet-500 text-white transition-colors">
              Apply this version
            </button>
            <button type="button" onClick={() => setRewrite(null)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors">
              Keep original
            </button>
          </div>
        </div>
      )}

      {rewrite && !rewrite.changed && (
        <div className="mt-2 px-3 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700/40 text-xs text-zinc-500">
          ✓ Text already looks professional — no changes needed.
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Main form component
// ════════════════════════════════════════════════════════════════════════════
export default function PortfolioForm() {
  const [fullName,    setFullName]   = useState<string>("");
  const [contactInfo, setContact]   = useState<string>("");
  const [fields,      setFields]    = useState<FieldsState>({
    introduction:          "",
    bio:                   "",
    skills:                "",
    projects:              "",
    experience:            "",
    additional_experience: "",
    qualifications:        "",
    education:             "",
  });
  const [modelReady, setModelReady] = useState<boolean>(false);
  const [submitted,  setSubmitted]  = useState<boolean>(false);
  const checkedRef = useRef<boolean>(false);

  // Poll model status on mount
  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;

    const check = async (): Promise<void> => {
      try {
        const res  = await fetch(`${API_BASE}/api/status`);
        const data = await res.json();
        setModelReady(data.ready);
        if (!data.ready) {
          const iv = setInterval(async () => {
            try {
              const r = await fetch(`${API_BASE}/api/status`);
              const d = await r.json();
              if (d.ready) { setModelReady(true); clearInterval(iv); }
            } catch {}
          }, 10000);
        }
      } catch {}
    };

    check();
  }, []);

  const updateField = (key: FieldKey) => (val: string): void =>
    setFields(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!fullName.trim()) return;
    setSubmitted(true);
    console.log("Portfolio submitted:", { fullName, contactInfo, ...fields });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-5xl">✦</div>
          <h2 className="text-2xl font-bold text-zinc-100" style={{ fontFamily: "'Syne', sans-serif" }}>
            Portfolio Generated!
          </h2>
          <p className="text-zinc-500 text-sm">Your portfolio has been submitted successfully.</p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
          >
            Edit Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <div className="min-h-screen bg-zinc-950 text-zinc-100">

        {/* Background grid */}
        <div
          className="fixed inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize:  "40px 40px",
          }}
        />

        <div className="relative max-w-2xl mx-auto px-4 py-16 pb-24">

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-bold tracking-tight text-zinc-100" style={{ fontFamily: "'Syne', sans-serif" }}>
                ⬡ SmartFolio<span className="text-violet-400">AI</span>
              </span>
              <StatusDot ready={modelReady} />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-100 mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
              Build your portfolio
            </h1>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Fill in your details. Every field has AI-powered grammar fix, autocomplete, and rewrite.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["✦ Grammar Fix", "⚡ LSTM Autocomplete", "✎ AI Rewrite"].map(f => (
                <span key={f} className="text-[11px] px-2.5 py-1 rounded-full border border-zinc-700/50 bg-zinc-900 text-zinc-500 font-medium">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-2">
                Full Name <span className="text-violet-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. John Doe"
                required
                className="w-full rounded-xl bg-zinc-900 border border-zinc-700/60 text-zinc-200
                  placeholder-zinc-600 px-4 py-3 text-sm outline-none
                  focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20
                  hover:border-zinc-600/80 transition-all duration-200"
              />
            </div>

            <div className="border-t border-zinc-800/80" />

            {/* All 8 AI-enhanced fields */}
            {FIELDS.map(field => (
              <PortfolioField
                key={field.key}
                field={field}
                value={fields[field.key as FieldKey]}
                onChange={updateField(field.key as FieldKey)}
              />
            ))}

            <div className="border-t border-zinc-800/80" />

            {/* Contact Info */}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-2">
                Contact Info
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={e => setContact(e.target.value)}
                placeholder="e.g. email@example.com | github.com/yourname"
                className="w-full rounded-xl bg-zinc-900 border border-zinc-700/60 text-zinc-200
                  placeholder-zinc-600 px-4 py-3 text-sm outline-none
                  focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20
                  hover:border-zinc-600/80 transition-all duration-200"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-sm tracking-wide
                bg-violet-600 hover:bg-violet-500 active:scale-[0.98]
                text-white transition-all duration-150 shadow-lg shadow-violet-900/30"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Generate My Portfolio →
            </button>

          </form>
        </div>
      </div>
    </>
  );
}