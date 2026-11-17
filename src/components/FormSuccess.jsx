import React from 'react';

/**
 * FormSuccess.jsx
 * Green confirmation screen shown after a valid submission.
 * Displays the applicant's name and selected position, and offers a button
 * to start a new application (form has already been reset).
 */
function FormSuccess({ submittedData, onStartNew }) {
  return (
    <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
      {/* Success icon */}
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-green-800">Application Submitted!</h2>
      <p className="mt-2 text-sm text-green-700">
        Thank you, <span className="font-semibold">{submittedData.fullName}</span>. Your application
        for the <span className="font-semibold">{submittedData.position}</span> position has been
        received. We will contact you at{' '}
        <span className="font-semibold">{submittedData.email}</span> soon.
      </p>

      {/* Small summary of the submission */}
      <div className="mx-auto mt-6 max-w-sm rounded-lg bg-white p-4 text-left text-sm text-gray-700 shadow-sm">
        <p className="mb-2 font-semibold text-gray-900">Application Summary</p>
        <ul className="space-y-1.5">
          <li className="flex justify-between gap-4">
            <span className="text-gray-500">Applicant</span>
            <span className="text-right font-medium">{submittedData.fullName}</span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-gray-500">Position</span>
            <span className="text-right font-medium">{submittedData.position}</span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-gray-500">Employment Type</span>
            <span className="text-right font-medium">{submittedData.employmentType}</span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-gray-500">Experience Level</span>
            <span className="text-right font-medium">{submittedData.experienceLevel}</span>
          </li>
        </ul>
      </div>

      <button
        type="button"
        onClick={onStartNew}
        className="mt-6 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition duration-150 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        Start New Application
      </button>
    </div>
  );
}

export default FormSuccess;
