import React from 'react';
import FormField, { inputClass } from './FormField';

/**
 * EducationDetails.jsx
 * Section 4: educational background.
 * Conditional field: when "Other" qualification is selected, an extra
 * text input appears to specify the qualification.
 */
function EducationDetails({ formData, errors, handleChange }) {
  const qualifications = [
    'Matric',
    'Intermediate',
    "Bachelor's Degree",
    "Master's Degree",
    'PhD',
    'Other',
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Education Information</h2>
      <p className="text-sm text-gray-500 mb-4">Tell us about your education.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Highest Qualification"
          name="qualification"
          required
          error={errors.qualification}
        >
          <select
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className={inputClass(errors.qualification)}
          >
            <option value="">Select qualification</option>
            {qualifications.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormField>

        {/* Conditional field: only shown when "Other" is selected */}
        {formData.qualification === 'Other' && (
          <FormField
            label="Specify Qualification"
            name="otherQualification"
            required
            error={errors.otherQualification}
          >
            <input
              id="otherQualification"
              name="otherQualification"
              type="text"
              value={formData.otherQualification}
              onChange={handleChange}
              placeholder="e.g. Diploma in Software Engineering"
              className={inputClass(errors.otherQualification)}
            />
          </FormField>
        )}

        <FormField
          label="Institute / University Name"
          name="institute"
          required
          error={errors.institute}
        >
          <input
            id="institute"
            name="institute"
            type="text"
            value={formData.institute}
            onChange={handleChange}
            placeholder="e.g. University of the Punjab"
            className={inputClass(errors.institute)}
          />
        </FormField>

        <FormField label="Graduation Year" name="graduationYear" required error={errors.graduationYear}>
          <input
            id="graduationYear"
            name="graduationYear"
            type="number"
            min="1950"
            max="2099"
            value={formData.graduationYear}
            onChange={handleChange}
            placeholder="e.g. 2024"
            className={inputClass(errors.graduationYear)}
          />
        </FormField>

        <FormField
          label="CGPA / Percentage"
          name="cgpa"
          required
          error={errors.cgpa}
        >
          <input
            id="cgpa"
            name="cgpa"
            type="text"
            value={formData.cgpa}
            onChange={handleChange}
            placeholder="e.g. 3.5 / 4.0 or 85%"
            className={inputClass(errors.cgpa)}
          />
        </FormField>
      </div>
    </div>
  );
}

export default EducationDetails;
