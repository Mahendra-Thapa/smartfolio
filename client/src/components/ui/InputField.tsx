import { ChangeEvent, InputHTMLAttributes } from "react";
import { MdError } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showPassword?: boolean; // Optional for password toggle
  togglePassword?: () => void; // Optional toggle function
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  disabled,
  type = "text",
  placeholder,
  showPassword,
  togglePassword,
  ...rest
}) => {
  // Check if it's a password field for showing toggle icon
  const isPasswordField = type === "password" || type === "text";

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-slate-200 mb-2.5"
      >
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`w-full pr-10 px-4 py-3.5 bg-slate-950/60 border-[1.5px] ${
          error ? "border-red-500" : "border-slate-700/50"
        } rounded-xl text-white text-sm placeholder:text-slate-500 focus:border-blue-500 focus:bg-slate-950/80 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
        {...rest} // Spread any other native input props like autoComplete, maxLength, etc.
      />

      {/* Password toggle icon */}
      {togglePassword && isPasswordField && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-14 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="w-5 h-5" />
          ) : (
            <AiOutlineEye className="w-5 h-5" />
          )}
        </button>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center gap-1.5">
          <MdError className="w-4 h-4" /> {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
