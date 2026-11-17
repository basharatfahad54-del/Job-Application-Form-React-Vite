import React from 'react';
import FormField, { inputClass } from './FormField';

/**
 * JobDetails.jsx
 * Section 2: the job the applicant is applying for.
 * Includes Conditional Field 1: when Employment Type is "Other" an extra
 * text input appears to specify the type.
 */
function JobDetails({ formData, errors, handleChange }) {
  const positions = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'Software Engineer',
  ];
  const employmentTypes = ['Full-Time', 'Part-Time', 'Internship', 'Other'];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Job Information</h2>
      <p className="text-sm text-gray-500 mb-4">What role are you interested in?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Position Applied For"
          name="position"
          required
          error={errors.position}
        >
          <select
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className={inputClass(errors.position)}
          >
            <option value="">Select a position</option>
            {positions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Employment Type" name="employmentType" required error={errors.employmentType}>
          <select
            id="employmentType"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className={inputClass(errors.employmentType)}
          >
            <option value="">Select employment type</option>
            {employmentTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormField>

        {/* Conditional Field 1: only shown when "Other" is selected */}
        {formData.employmentType === 'Other' && (
          <FormField
            label="Specify Employment Type"
            name="otherEmploymentType"
            required
            error={errors.otherEmploymentType}
          >
            <input
              id="otherEmploymentType"
              name="otherEmploymentType"
              type="text"
              value={formData.otherEmploymentType}
              onChange={handleChange}
              placeholder="e.g. Contract, Freelance, Remote"
              className={inputClass(errors.otherEmploymentType)}
            />
          </FormField>
        )}

        <FormField
          label="Expected Salary"
          name="expectedSalary"
          required
          hint="Monthly salary in PKR"
          error={errors.expectedSalary}
        >
          <input
            id="expectedSalary"
            name="expectedSalary"
            type="number"
            min="0"
            value={formData.expectedSalary}
            onChange={handleChange}
            placeholder="e.g. 80000"
            className={inputClass(errors.expectedSalary)}
          />
        </FormField>

        <FormField label="Available Joining Date" name="joiningDate" required error={errors.joiningDate}>
          <input
            id="joiningDate"
            name="joiningDate"
            type="date"
            value={formData.joiningDate}
            onChange={handleChange}
            className={inputClass(errors.joiningDate)}
          />
        </FormField>
      </div>
    </div>
  );
}

export default JobDetails;
