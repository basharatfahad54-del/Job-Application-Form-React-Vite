/**
 * validateForm.js
 * Reusable validation functions for the Job Application Form.
 *
 * IMPORTANT: Only fields that are currently visible and applicable are
 * validated. Hidden conditional fields are skipped on purpose.
 */

// ---------- Helpers ----------

/** Basic email format check. */
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/** Phone must contain 10-15 digits (after removing spaces, dashes, brackets). */
export const isValidPhone = (phone) => {
  const digits = phone.replace(/[^0-9]/g, '');
  return digits.length >= 10 && digits.length <= 15;
};

/** Expected / previous salary must be a valid positive number. */
export const isValidSalary = (value) => {
  const num = Number(value);
  return value !== '' && !Number.isNaN(num) && num > 0;
};

/** Graduation year: 4 digits within a sensible range. */
export const isValidGraduationYear = (value) => {
  const num = Number(value);
  const currentYear = new Date().getFullYear();
  return (
    /^\d{4}$/.test(value) && num >= 1950 && num <= currentYear + 10
  );
};

/** Accepted resume file types and max size (5 MB). */
export const ACCEPTED_RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
export const MAX_RESUME_SIZE_MB = 5;

/** Check the uploaded resume type and size. Returns an error message or ''. */
export const validateResumeFile = (file) => {
  if (!file) return 'Resume is required.';
  if (!ACCEPTED_RESUME_TYPES.includes(file.type)) {
    return 'Please upload a PDF or DOC/DOCX file.';
  }
  if (file.size > MAX_RESUME_SIZE_MB * 1024 * 1024) {
    return `File size must not exceed ${MAX_RESUME_SIZE_MB} MB.`;
  }
  return '';
};

// ---------- Full form validation ----------

/**
 * Validates the whole form.
 * @param {object} values - All current form values.
 * @returns {object} errors - An object mapping field names to error messages.
 */
export const validateForm = (values) => {
  const errors = {};

  // ----- Personal Information -----
  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }
  if (!values.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!isValidPhone(values.phone)) {
    errors.phone = 'Phone number must contain 10-15 digits.';
  }
  if (!values.dob) {
    errors.dob = 'Date of birth is required.';
  }
  if (!values.gender) {
    errors.gender = 'Please select your gender.';
  }
  if (!values.address.trim()) {
    errors.address = 'Current address is required.';
  }
  if (!values.city.trim()) {
    errors.city = 'City is required.';
  }
  if (!values.country.trim()) {
    errors.country = 'Country is required.';
  }

  // ----- Job Information -----
  if (!values.position) {
    errors.position = 'Please select the position you are applying for.';
  }
  if (!values.employmentType) {
    errors.employmentType = 'Please select an employment type.';
  } else if (values.employmentType === 'Other' && !values.otherEmploymentType.trim()) {
    // Conditional field: only required when "Other" is selected.
    errors.otherEmploymentType = 'Please specify the employment type.';
  }
  if (!isValidSalary(values.expectedSalary)) {
    errors.expectedSalary = 'Expected salary must be a valid positive number.';
  }
  if (!values.joiningDate) {
    errors.joiningDate = 'Available joining date is required.';
  }

  // ----- Experience Information (conditional) -----
  if (!values.experienceLevel) {
    errors.experienceLevel = 'Please select an option.';
  }

  if (values.experienceLevel === 'Experienced') {
    // These fields only exist when "Experienced" is selected.
    if (!values.prevCompany.trim()) errors.prevCompany = 'Previous company name is required.';
    if (!values.prevJobTitle.trim()) errors.prevJobTitle = 'Previous job title is required.';
    if (!values.yearsExperience) {
      errors.yearsExperience = 'Years of experience is required.';
    } else if (Number(values.yearsExperience) < 0) {
      errors.yearsExperience = 'Years of experience cannot be negative.';
    }
    if (!isValidSalary(values.prevSalary)) {
      errors.prevSalary = 'Previous salary must be a valid positive number.';
    }
    if (!values.reasonForLeaving.trim()) errors.reasonForLeaving = 'Reason for leaving is required.';
    if (!values.noticePeriod.trim()) errors.noticePeriod = 'Notice period is required.';
  }

  if (values.experienceLevel === 'Fresher') {
    if (!values.internshipExperience) {
      errors.internshipExperience = 'Please select yes or no.';
    } else if (values.internshipExperience === 'Yes') {
      // Internship details only required when internship = Yes.
      if (!values.internshipCompany.trim()) {
        errors.internshipCompany = 'Internship company name is required.';
      }
      if (!values.internshipDuration.trim()) {
        errors.internshipDuration = 'Internship duration is required.';
      }
    }
    if (!values.academicProjects.trim()) errors.academicProjects = 'Academic projects are required.';
    if (!values.relevantSkills.trim()) errors.relevantSkills = 'Relevant skills are required.';
  }

  // ----- Education Information -----
  if (!values.qualification) {
    errors.qualification = 'Please select your highest qualification.';
  } else if (values.qualification === 'Other' && !values.otherQualification.trim()) {
    // Conditional field: only required when "Other" is selected.
    errors.otherQualification = 'Please specify your qualification.';
  }
  if (!values.institute.trim()) errors.institute = 'Institute / university name is required.';
  if (!isValidGraduationYear(values.graduationYear)) {
    errors.graduationYear = 'Enter a valid 4-digit graduation year.';
  }
  if (!values.cgpa.trim()) errors.cgpa = 'CGPA / percentage is required.';

  // ----- Skills and Documents -----
  if (!values.technicalSkills.trim()) errors.technicalSkills = 'Technical skills are required.';
  if (!values.professionalSkills.trim()) errors.professionalSkills = 'Professional skills are required.';

  const resumeError = validateResumeFile(values.resume);
  if (resumeError) errors.resume = resumeError;

  // Optional fields: validate format only if the user typed something.
  if (values.portfolioUrl.trim() && !/^https?:\/\/.+/.test(values.portfolioUrl.trim())) {
    errors.portfolioUrl = 'Enter a valid URL (starting with http:// or https://).';
  }
  if (values.linkedinUrl.trim() && !/^https?:\/\/.+/.test(values.linkedinUrl.trim())) {
    errors.linkedinUrl = 'Enter a valid URL (starting with http:// or https://).';
  }

  return errors;
};

/** Returns true when there are no validation errors. */
export const isValid = (errors) => Object.keys(errors).length === 0;
