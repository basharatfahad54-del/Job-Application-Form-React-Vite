import React, { useEffect, useRef, useState } from 'react';
import PersonalInfo from './components/PersonalInfo';
import JobDetails from './components/JobDetails';
import ExperienceDetails from './components/ExperienceDetails';
import EducationDetails from './components/EducationDetails';
import SkillsAndDocuments from './components/SkillsAndDocuments';
import FormSuccess from './components/FormSuccess';
import { validateForm, isValid, validateResumeFile } from './validation/validateForm';

/**
 * Initial (empty) shape of the form data.
 * Keeping it here makes it easy to reset the whole form after submission.
 */
const initialFormData = {
  // Personal information
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  gender: '',
  address: '',
  city: '',
  country: '',
  // Job information
  position: '',
  employmentType: '',
  otherEmploymentType: '',
  expectedSalary: '',
  joiningDate: '',
  // Experience information
  experienceLevel: '',
  prevCompany: '',
  prevJobTitle: '',
  yearsExperience: '',
  prevSalary: '',
  reasonForLeaving: '',
  noticePeriod: '',
  internshipExperience: '',
  internshipCompany: '',
  internshipDuration: '',
  academicProjects: '',
  relevantSkills: '',
  // Education information
  qualification: '',
  otherQualification: '',
  institute: '',
  graduationYear: '',
  cgpa: '',
  // Skills and documents
  technicalSkills: '',
  professionalSkills: '',
  resume: null,
  portfolioUrl: '',
  linkedinUrl: '',
};

/**
 * Returns the list of required field names that are currently VISIBLE and
 * applicable. Used only for the progress indicator, so the bar reflects
 * exactly what the user still has to fill in.
 */
const getVisibleRequiredFields = (f) => {
  const fields = [
    'fullName', 'email', 'phone', 'dob', 'gender', 'address', 'city', 'country',
    'position', 'employmentType', 'expectedSalary', 'joiningDate',
    'experienceLevel', 'qualification', 'institute', 'graduationYear', 'cgpa',
    'technicalSkills', 'professionalSkills', 'resume',
  ];
  if (f.employmentType === 'Other') fields.push('otherEmploymentType');
  if (f.experienceLevel === 'Experienced') {
    fields.push('prevCompany', 'prevJobTitle', 'yearsExperience', 'prevSalary',
      'reasonForLeaving', 'noticePeriod');
  }
  if (f.experienceLevel === 'Fresher') {
    fields.push('internshipExperience', 'academicProjects', 'relevantSkills');
    if (f.internshipExperience === 'Yes') fields.push('internshipCompany', 'internshipDuration');
  }
  if (f.qualification === 'Other') fields.push('otherQualification');
  return fields;
};

/**
 * App.jsx
 * The parent component: owns ALL form state (lifting state up) and passes it
 * down to the section components through props.
 */
function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const topRef = useRef(null);

  // Generic change handler shared by every input (controlled components).
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Special handler for the resume file input (value is a File, not a string).
  const handleResumeChange = (event) => {
    const file = event.target.files[0] || null;
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  /**
   * useEffect: clear the values of HIDDEN conditional fields as soon as the
   * controlling selection changes, so stale data is never submitted.
   */
  useEffect(() => {
    setFormData((prev) => {
      let next = { ...prev };

      // Employment type: clear "Other" text unless "Other" is selected.
      if (prev.employmentType !== 'Other' && prev.otherEmploymentType !== '') {
        next.otherEmploymentType = '';
      }

      // Qualification: clear "Other" text unless "Other" is selected.
      if (prev.qualification !== 'Other' && prev.otherQualification !== '') {
        next.otherQualification = '';
      }

      // Experience level switched: clear the fields of the hidden branch.
      if (prev.experienceLevel === 'Experienced') {
        next.internshipExperience = '';
        next.internshipCompany = '';
        next.internshipDuration = '';
      }
      if (prev.experienceLevel === 'Fresher') {
        next.prevCompany = '';
        next.prevJobTitle = '';
        next.yearsExperience = '';
        next.prevSalary = '';
        next.reasonForLeaving = '';
        next.noticePeriod = '';
      }

      // Internship answered "No" (or cleared): clear internship details.
      if (prev.internshipExperience !== 'Yes') {
        next.internshipCompany = '';
        next.internshipDuration = '';
      }

      return next;
    });
  }, [formData.experienceLevel, formData.internshipExperience, formData.employmentType, formData.qualification]);

  /**
   * useEffect: live re-validation once the user has tried to submit, so
   * errors disappear immediately when a field is corrected.
   */
  useEffect(() => {
    if (attemptedSubmit) {
      setErrors(validateForm(formData));
    }
  }, [formData, attemptedSubmit]);

  /** Scroll smoothly back to the top of the form. */
  const scrollToTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  /**
   * Submission handler: validate everything, block invalid submissions,
   * simulate a successful submission and reset the form.
   */
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent default browser form submission

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    setAttemptedSubmit(true);

    if (!isValid(validationErrors)) {
      // Validation failed: keep the data, let the user fix the red fields.
      scrollToTop();
      return;
    }

    // Validation succeeded -> simulate submission (no backend needed).
    setSubmittedData(formData);

    // Reset the form for the next applicant.
    setFormData(initialFormData);
    setErrors({});
    setAttemptedSubmit(false);
    scrollToTop();
  };

  /** "Start New Application" button on the success screen. */
  const handleStartNew = () => setSubmittedData(null);

  // ----- Progress indicator values -----
  const visibleFields = getVisibleRequiredFields(formData);
  const filledFields = visibleFields.filter((name) =>
    name === 'resume' ? formData.resume !== null : formData[name].trim() !== ''
  );
  const progress = Math.round((filledFields.length / visibleFields.length) * 100);

  const sections = [
    { title: 'Personal Info', done: ['fullName', 'email', 'phone', 'dob', 'gender', 'address', 'city', 'country'].every((k) => formData[k].trim() !== '') },
    { title: 'Job Details', done: formData.position !== '' && formData.employmentType !== '' && formData.expectedSalary !== '' && formData.joiningDate !== '' },
    { title: 'Experience', done: formData.experienceLevel !== '' },
    { title: 'Education', done: formData.qualification !== '' && formData.institute !== '' },
    { title: 'Skills & Docs', done: formData.technicalSkills !== '' && formData.resume !== null },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div ref={topRef} className="mx-auto w-full max-w-3xl scroll-mt-4">
        {/* Page header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Job Application Form</h1>
          <p className="mt-1 text-sm text-gray-500">
            Fill in your details below. Fields marked with <span className="text-red-500">*</span> are required.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
          {submittedData ? (
            // Success confirmation screen
            <FormSuccess submittedData={submittedData} onStartNew={handleStartNew} />
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Progress indicator */}
              <div className="mb-8">
                <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-500">
                  <span>Application progress</span>
                  <span className="text-indigo-600">{progress}% complete</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {/* Section checklist rendered from a list with .map() */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {sections.map((section) => (
                    <span
                      key={section.title}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-150
                        ${
                          section.done
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                    >
                      {section.done ? '✓ ' : ''}
                      {section.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Form sections */}
              <div className="space-y-8">
                <section className="border-b border-gray-100 pb-8">
                  <PersonalInfo formData={formData} errors={errors} handleChange={handleChange} />
                </section>

                <section className="border-b border-gray-100 pb-8">
                  <JobDetails formData={formData} errors={errors} handleChange={handleChange} />
                </section>

                <section className="border-b border-gray-100 pb-8">
                  <ExperienceDetails formData={formData} errors={errors} handleChange={handleChange} />
                </section>

                <section className="border-b border-gray-100 pb-8">
                  <EducationDetails formData={formData} errors={errors} handleChange={handleChange} />
                </section>

                <section>
                  <SkillsAndDocuments
                    formData={formData}
                    errors={errors}
                    handleChange={handleChange}
                    handleResumeChange={handleResumeChange}
                  />
                </section>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="mt-8 w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition duration-150 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
              >
                Submit Application
              </button>
              <p className="mt-2 text-center text-xs text-gray-400">
                By submitting, you confirm that the information provided is accurate.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
