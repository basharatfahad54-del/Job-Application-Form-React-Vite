import React from 'react';

/**
 * FormField.jsx
 * A reusable wrapper that renders a label, an input control, and an error
 * message. It keeps the styling consistent across every section of the form.
 *
 * Props:
 * - label: the field label text
 * - name: unique field name (used as id / htmlFor)
 * - error: error message string ('' or undefined when there is no error)
 * - required: adds the red * marker and "Required" hint
 * - hint: optional help text shown under the label
 * - children: the actual input / select / textarea element
 */
function FormField({ label, name, error, required = false, hint, children }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {hint && <p className="text-xs text-gray-500 mb-1">{hint}</p>}

      {children}

      {/* Error message shown in red below the field */}
      {error && (
        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
          <svg className="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-9-4a1 1 0 112 0v4a1 1 0 11-2 0V6zm0 8a1 1 0 112 0 1 1 0 01-2 0z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;

/**
 * Common Tailwind classes shared by inputs, selects and textareas.
 * Exported so every section component uses exactly the same look.
 */
export const inputClass = (hasError) =>
  `w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400
   transition duration-150 outline-none
   focus:ring-2 focus:border-indigo-500
   ${
     hasError
       ? 'border-red-400 focus:ring-red-200 bg-red-50/40'
       : 'border-gray-300 focus:ring-indigo-200 hover:border-indigo-400'
   }`;
