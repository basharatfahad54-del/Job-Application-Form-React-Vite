import React from 'react';
import FormField, { inputClass } from './FormField';

/**
 * ExperienceDetails.jsx
 * Section 3: previous work experience with nested conditional rendering.
 *
 * - "Experienced" -> shows previous job fields.
 * - "Fresher"     -> shows internship / projects / skills fields.
 * - Internship "Yes" -> shows internship company + duration.
 *
 * Hidden values are cleared by useEffect in App.jsx when the controlling
 * selection changes.
 */
function ExperienceDetails({ formData, errors, handleChange }) {
  const experienceLevels = ['Fresher', 'Experienced'];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Experience Information</h2>
      <p className="text-sm text-gray-500 mb-4">Do you have previous work experience?</p>

      {/* Question rendered as selectable radio-style cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {experienceLevels.map((level) => {
          const selected = formData.experienceLevel === level;
          return (
            <label
              key={level}
              className={`flex cursor-pointer items-center justify-center rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition duration-150
                ${
                  selected
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:bg-indigo-50/50'
                }`}
            >
              <input
                type="radio"
                name="experienceLevel"
                value={level}
                checked={selected}
                onChange={handleChange}
                className="sr-only"
              />
              {level}
            </label>
          );
        })}
      </div>
      {errors.experienceLevel && (
        <p className="-mt-2 mb-4 text-xs text-red-600">{errors.experienceLevel}</p>
      )}

      {/* Conditional rendering 1: fields for Experienced applicants */}
      {formData.experienceLevel === 'Experienced' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border border-indigo-100 bg-indigo-50/50 p-4">
          <FormField label="Previous Company Name" name="prevCompany" required error={errors.prevCompany}>
            <input
              id="prevCompany"
              name="prevCompany"
              type="text"
              value={formData.prevCompany}
              onChange={handleChange}
              placeholder="e.g. Systems Ltd"
              className={inputClass(errors.prevCompany)}
            />
          </FormField>

          <FormField label="Previous Job Title" name="prevJobTitle" required error={errors.prevJobTitle}>
            <input
              id="prevJobTitle"
              name="prevJobTitle"
              type="text"
              value={formData.prevJobTitle}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              className={inputClass(errors.prevJobTitle)}
            />
          </FormField>

          <FormField
            label="Years of Experience"
            name="yearsExperience"
            required
            error={errors.yearsExperience}
          >
            <input
              id="yearsExperience"
              name="yearsExperience"
              type="number"
              min="0"
              step="0.5"
              value={formData.yearsExperience}
              onChange={handleChange}
              placeholder="e.g. 3"
              className={inputClass(errors.yearsExperience)}
            />
          </FormField>

          <FormField
            label="Previous Salary"
            name="prevSalary"
            required
            hint="Monthly salary in PKR"
            error={errors.prevSalary}
          >
            <input
              id="prevSalary"
              name="prevSalary"
              type="number"
              min="0"
              value={formData.prevSalary}
              onChange={handleChange}
              placeholder="e.g. 70000"
              className={inputClass(errors.prevSalary)}
            />
          </FormField>

          <FormField
            label="Reason for Leaving"
            name="reasonForLeaving"
            required
            error={errors.reasonForLeaving}
          >
            <textarea
              id="reasonForLeaving"
              name="reasonForLeaving"
              rows={2}
              value={formData.reasonForLeaving}
              onChange={handleChange}
              placeholder="Why did you leave your last job?"
              className={`${inputClass(errors.reasonForLeaving)} resize-none`}
            />
          </FormField>

          <FormField label="Notice Period" name="noticePeriod" required error={errors.noticePeriod}>
            <input
              id="noticePeriod"
              name="noticePeriod"
              type="text"
              value={formData.noticePeriod}
              onChange={handleChange}
              placeholder="e.g. 1 month / 2 weeks"
              className={inputClass(errors.noticePeriod)}
            />
          </FormField>
        </div>
      )}

      {/* Conditional rendering 2: fields for Fresher applicants */}
      {formData.experienceLevel === 'Fresher' && (
        <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Internship Experience"
              name="internshipExperience"
              required
              error={errors.internshipExperience}
            >
              <select
                id="internshipExperience"
                name="internshipExperience"
                value={formData.internshipExperience}
                onChange={handleChange}
                className={inputClass(errors.internshipExperience)}
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </FormField>

            {/* Conditional rendering 3: internship details only when "Yes" */}
            {formData.internshipExperience === 'Yes' && (
              <>
                <FormField
                  label="Internship Company Name"
                  name="internshipCompany"
                  required
                  error={errors.internshipCompany}
                >
                  <input
                    id="internshipCompany"
                    name="internshipCompany"
                    type="text"
                    value={formData.internshipCompany}
                    onChange={handleChange}
                    placeholder="e.g. TechVerse Solutions"
                    className={inputClass(errors.internshipCompany)}
                  />
                </FormField>
                <FormField
                  label="Internship Duration"
                  name="internshipDuration"
                  required
                  error={errors.internshipDuration}
                >
                  <input
                    id="internshipDuration"
                    name="internshipDuration"
                    type="text"
                    value={formData.internshipDuration}
                    onChange={handleChange}
                    placeholder="e.g. 3 months (Jun 2024 - Aug 2024)"
                    className={inputClass(errors.internshipDuration)}
                  />
                </FormField>
              </>
            )}
          </div>

          <FormField
            label="Academic Projects"
            name="academicProjects"
            required
            error={errors.academicProjects}
          >
            <textarea
              id="academicProjects"
              name="academicProjects"
              rows={3}
              value={formData.academicProjects}
              onChange={handleChange}
              placeholder="Briefly describe your academic / personal projects"
              className={`${inputClass(errors.academicProjects)} resize-none`}
            />
          </FormField>

          <FormField
            label="Relevant Skills"
            name="relevantSkills"
            required
            hint="Comma separated"
            error={errors.relevantSkills}
          >
            <input
              id="relevantSkills"
              name="relevantSkills"
              type="text"
              value={formData.relevantSkills}
              onChange={handleChange}
              placeholder="e.g. HTML, CSS, JavaScript, React"
              className={inputClass(errors.relevantSkills)}
            />
          </FormField>
        </div>
      )}
    </div>
  );
}

export default ExperienceDetails;
