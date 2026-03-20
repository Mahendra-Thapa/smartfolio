import { useGrammar } from "@/hooks/useGrammar";
import { useAutocomplete } from "@/hooks/useAutocomplete";
import { useRewrite } from "@/hooks/useRewrite";
import { useBanner } from "@/hooks/useBanner";
import {
  SpellCheck,
  Wand2,
  RefreshCw,
  Loader2,
  Sparkles,
  CheckCheck,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface Field {
  label: string;
  key: string;
  rows?: number;
  placeholder :string;
}

interface PortfolioFieldProps {
  field: Field;
  value: string;
  onChange: (val: string) => void;
}

// ── Sub-components ───────────────────────────────────────────────────────────

interface ActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
  label: string;
  variant?: "default" | "accent";
}

function ActionButton({
  onClick,
  disabled,
  icon,
  label,
  variant = "default",
}: ActionButtonProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50";
  const styles: Record<string, string> = {
    default:
      "bg-zinc-800 hover:bg-zinc-700/90 border border-zinc-700/60 hover:border-zinc-600 text-zinc-300 hover:text-white",
    accent:
      "bg-violet-600/15 hover:bg-violet-600/25 border border-violet-500/25 hover:border-violet-500/45 text-violet-300 hover:text-violet-100",
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${styles[variant]}`}>
      {icon}
      {label}
    </button>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function PortfolioField({
  field,
  value,
  onChange,
}: PortfolioFieldProps) {
  const { banner, showBanner } = useBanner();
  const { fixGrammar, loading: loadGrammar } = useGrammar(onChange);
  const {
    getSuggestions,
    completions,
    setCompletions,
    loading: loadComplete,
  } = useAutocomplete();
  const {
    rewriteText,
    rewrite,
    setRewrite,
    loading: loadRewrite,
  } = useRewrite();

  const isLoading = loadGrammar || loadComplete || loadRewrite;

  const handleGrammar = () => fixGrammar(value, showBanner);

  const handleAutocomplete = () => {
    setRewrite(null);
    getSuggestions(value, showBanner);
  };

  const handleRewrite = () => {
    setCompletions([]);
    rewriteText(value, field.key, showBanner);
  };

  const applyCompletion = (text: string) => {
    onChange(value + " " + text);
    setCompletions([]);
  };

  const applyRewrite = () => {
    if (rewrite?.rewritten) {
      onChange(rewrite.rewritten);
      showBanner("Text rewritten!", true);
    }
    setRewrite(null);
  };

  return (
    <div className="group relative rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-4 transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/70 hover:shadow-2xl hover:shadow-black/40">

      {/* Subtle gradient top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-zinc-600/40 to-transparent" />

      {/* ── Label row ── */}
      <div className="flex items-center justify-between mb-3">
        <label className="text-[11px] font-bold tracking-[0.14em] text-zinc-400 uppercase select-none">
          {field.label}
        </label>
        <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/8 border border-violet-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-violet-400 tracking-wide select-none">
          <Sparkles size={9} strokeWidth={2.5} />
          AI Enhanced
        </span>
      </div>

      {/* ── Textarea ── */}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={field.rows ?? 4}
          placeholder={`${field.placeholder}`}
          className="w-full resize-none rounded-xl bg-zinc-950/70 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-600/70 p-3 pr-10 leading-relaxed transition-all duration-200 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 focus:bg-zinc-950/90"
        />
        {isLoading && (
          <div className="absolute top-3 right-3 flex items-center justify-center">
            <Loader2 size={14} className="animate-spin text-violet-400/80" />
          </div>
        )}
      </div>

      {/* ── Action buttons ── */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <ActionButton
          onClick={handleGrammar}
          disabled={isLoading}
          icon={<SpellCheck size={12} strokeWidth={2.2} />}
          label="Fix Grammar"
        />
        <ActionButton
          onClick={handleAutocomplete}
          disabled={isLoading}
          icon={<Wand2 size={12} strokeWidth={2.2} />}
          label="Autocomplete"
        />
        <ActionButton
          onClick={handleRewrite}
          disabled={isLoading}
          icon={<RefreshCw size={12} strokeWidth={2.2} />}
          label="Rewrite"
          variant="accent"
        />
      </div>

      {/* ── Banner ── */}
      {banner && (
        <div
          className={`mt-3 flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium border transition-all duration-200 ${
            banner.success
              ? "bg-emerald-500/8 border-emerald-500/20 text-emerald-400"
              : "bg-amber-500/8 border-amber-500/20 text-amber-400"
          }`}
        >
          {banner.success ? (
            <CheckCircle2 size={13} strokeWidth={2} className="flex-shrink-0" />
          ) : (
            <AlertCircle size={13} strokeWidth={2} className="flex-shrink-0" />
          )}
          <span className="flex-1">{banner.msg}</span>
        </div>
      )}

      {/* ── Autocomplete suggestions ── */}
      {completions.length > 0 && (
        <div className="mt-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold tracking-[0.12em] text-zinc-500 uppercase">
              Suggestions
            </p>
            <button
              onClick={() => setCompletions([])}
              className="text-zinc-600 hover:text-zinc-400 transition-colors"
              aria-label="Dismiss suggestions"
            >
              <X size={11} />
            </button>
          </div>
          <div className="space-y-1.5">
            {completions.map((c, i) => (
              <button
                key={i}
                onClick={() => applyCompletion(c)}
                className="group/item flex w-full items-start gap-2.5 rounded-xl bg-zinc-800/50 hover:bg-zinc-800/90 border border-zinc-700/30 hover:border-violet-500/25 px-3 py-2.5 text-xs text-zinc-400 hover:text-zinc-100 text-left transition-all duration-150"
              >
                <ChevronRight
                  size={11}
                  strokeWidth={2.5}
                  className="mt-0.5 flex-shrink-0 text-zinc-600 group-hover/item:text-violet-400 transition-colors"
                />
                <span className="leading-relaxed">{c}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Rewrite panel ── */}
      {rewrite?.rewritten && (
        <div className="mt-3 rounded-xl bg-violet-950/20 border border-violet-500/15 overflow-hidden">
          {/* Panel header */}
          <div className="flex items-center justify-between px-3 pt-3 pb-2 border-b border-violet-500/10">
            <p className="text-[10px] font-bold tracking-[0.12em] text-violet-400 uppercase">
              Suggested Rewrite
            </p>
            <button
              onClick={() => setRewrite(null)}
              className="text-zinc-600 hover:text-zinc-400 transition-colors"
              aria-label="Dismiss rewrite"
            >
              <X size={11} />
            </button>
          </div>
          {/* Panel body */}
          <div className="px-3 py-3">
            <p className="text-xs text-zinc-300/90 leading-relaxed mb-3">
              {rewrite.rewritten}
            </p>
            <button
              onClick={applyRewrite}
              className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 active:bg-violet-700 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-150 shadow-lg shadow-violet-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
            >
              <CheckCheck size={12} strokeWidth={2.5} />
              Apply Rewrite
            </button>
          </div>
        </div>
      )}
    </div>
  );
}