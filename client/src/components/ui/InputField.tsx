import { ChangeEvent } from "react";
import { MdError } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  type?: string;
  showPassword?: boolean;
  togglePassword?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  type = "text",
  showPassword,
  togglePassword,
}) => {
  const isPassword = type === "password" || togglePassword;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={id} //Keep this
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={!!error}
          className={`w-full px-4 py-3.5 ${togglePassword ? "pr-12" : ""} 
        bg-white/60 dark:bg-slate-900/60 border-[1.5px] ${
          error
            ? "border-red-500 dark:border-red-400"
            : "border-slate-300/50 dark:border-slate-700/50"
        } rounded-xl text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500
        focus:border-blue-500 focus:bg-white/80 dark:focus:bg-slate-950/80 focus:outline-none focus:ring-4 focus:ring-blue-500/10
        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
        />

        {isPassword && togglePassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <MdError /> {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
