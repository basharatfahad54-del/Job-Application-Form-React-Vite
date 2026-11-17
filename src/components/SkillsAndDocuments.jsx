import React, { useRef } from 'react';
import FormField, { inputClass } from './FormField';
import { MAX_RESUME_SIZE_MB } from '../validation/validateForm';

/**
 * SkillsAndDocuments.jsx
 * Section 5: skills and required documents.
 * The resume upload validates file type (PDF / DOC / DOCX) and size (max 5 MB)
 * as soon as a file is chosen.
 */
function SkillsAndDocuments({ formData, errors, handleChange, handleResumeChange }) {
  const fileInputRef = useRef(null);

  /** Trigger the hidden file input when the styled button is clicked. */
  const handleBrowseClick = () => fileInputRef.current?.click();

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Skills and Documents</h2>
      <p className="text-sm text-gray-500 mb-4">What are you good at, and share your documents.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Technical Skills"
          name="technicalSkills"
          required
          hint="Comma separated"
          error={errors.technicalSkills}
        >
          <input
            id="technicalSkills"
            name="technicalSkills"
            type="text"
            value={formData.technicalSkills}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, Git"
            className={inputClass(errors.technicalSkills)}
          />
        </FormField>

        <FormField
          label="Professional Skills"
          name="professionalSkills"
          required
          hint="Comma separated"
          error={errors.professionalSkills}
        >
          <input
            id="professionalSkills"
            name="professionalSkills"
            type="text"
            value={formData.professionalSkills}
            onChange={handleChange}
            placeholder="e.g. Communication, Teamwork"
            className={inputClass(errors.professionalSkills)}
          />
        </FormField>

        {/* Resume upload */}
        <FormField
          label="Upload Resume"
          name="resume"
          required
          hint={`PDF or DOC/DOCX, max ${MAX_RESUME_SIZE_MB} MB`}
          error={errors.resume}
        >
          {/* Hidden real input + styled drop zone / button */}
          <input
            id="resume"
            name="resume"
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleResumeChange}
            className="sr-only"
          />
          <div
            className={`flex items-center gap-3 rounded-lg border-2 border-dashed px-3 py-3 transition duration-150
              ${
                errors.resume
                  ? 'border-red-300 bg-red-50/50'
                  : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/40'
              }`}
          >
            <button
              type="button"
              onClick={handleBrowseClick}
              className="shrink-0 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition duration-150 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Choose File
            </button>
            <span className="min-w-0 truncate text-sm text-gray-600">
              {formData.resume ? formData.resume.name : 'No file selected'}
            </span>
          </div>
        </FormField>

        <FormField
          label="Portfolio URL (Optional)"
          name="portfolioUrl"
          error={errors.portfolioUrl}
        >
          <input
            id="portfolioUrl"
            name="portfolioUrl"
            type="url"
            value={formData.portfolioUrl}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
            className={inputClass(errors.portfolioUrl)}
          />
        </FormField>

        <FormField
          label="LinkedIn Profile URL (Optional)"
          name="linkedinUrl"
          error={errors.linkedinUrl}
        >
          <input
            id="linkedinUrl"
            name="linkedinUrl"
            type="url"
            value={formData.linkedinUrl}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className={inputClass(errors.linkedinUrl)}
          />
        </FormField>
      </div>
    </div>
  );
}

export default SkillsAndDocuments;
