import React from 'react';
import FormField, { inputClass } from './FormField';

/**
 * PersonalInfo.jsx
 * Section 1: applicant's personal details.
 * Receives shared form state via props (lifting state up).
 */
function PersonalInfo({ formData, errors, handleChange }) {
  const genderOptions = ['Male', 'Female', 'Other'];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Personal Information</h2>
      <p className="text-sm text-gray-500 mb-4">Tell us a little about yourself.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Full Name" name="fullName" required error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Ali Raza"
            className={inputClass(errors.fullName)}
          />
        </FormField>

        <FormField label="Email Address" name="email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass(errors.email)}
          />
        </FormField>

        <FormField label="Phone Number" name="phone" required error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 03001234567"
            className={inputClass(errors.phone)}
          />
        </FormField>

        <FormField label="Date of Birth" name="dob" required error={errors.dob}>
          <input
            id="dob"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            className={inputClass(errors.dob)}
          />
        </FormField>

        <FormField label="Gender" name="gender" required error={errors.gender}>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={inputClass(errors.gender)}
          >
            <option value="">Select gender</option>
            {/* Render options from a list with .map() */}
            {genderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="City" name="city" required error={errors.city}>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g. Lahore"
            className={inputClass(errors.city)}
          />
        </FormField>

        <FormField label="Current Address" name="address" required error={errors.address}>
          <textarea
            id="address"
            name="address"
            rows={2}
            value={formData.address}
            onChange={handleChange}
            placeholder="House, street, area"
            className={`${inputClass(errors.address)} resize-none`}
          />
        </FormField>

        <FormField label="Country" name="country" required error={errors.country}>
          <input
            id="country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleChange}
            placeholder="e.g. Pakistan"
            className={inputClass(errors.country)}
          />
        </FormField>
      </div>
    </div>
  );
}

export default PersonalInfo;
