// GWA (General Weighted Average) calculator.
// Uses the standard weighted formula: GWA = Σ(grade × units) / Σ(units)
// Grades follow the Philippine university grading system (1.0 highest, 5.0 failing).

/**
 * Compute the General Weighted Average from an array of grade records.
 * @param {Array<{units: number, grade: number}>} grades
 * @returns {number} GWA rounded to 2 decimal places
 */
const computeGWA = (grades) => {
  if (!grades || grades.length === 0) return 0;

  const totalWeightedGrade = grades.reduce((sum, { units, grade }) => sum + units * grade, 0);
  const totalUnits = grades.reduce((sum, { units }) => sum + units, 0);

  if (totalUnits === 0) return 0;

  return Math.round((totalWeightedGrade / totalUnits) * 100) / 100;
};

/**
 * Return a remarks string based on the computed GWA.
 * Follows a typical Philippine university honor system.
 * @param {number} gwa
 * @returns {string}
 */
const getRemarks = (gwa) => {
  if (gwa === 0) return 'No grades';
  if (gwa >= 1.0 && gwa <= 1.2) return 'Summa Cum Laude';
  if (gwa > 1.2 && gwa <= 1.45) return 'Magna Cum Laude';
  if (gwa > 1.45 && gwa <= 1.75) return 'Cum Laude';
  if (gwa > 1.75 && gwa <= 3.0) return 'Passed';
  if (gwa > 3.0 && gwa < 5.0) return 'Conditional';
  if (gwa >= 5.0) return 'Failed';
  return 'Unknown';
};

module.exports = { computeGWA, getRemarks };
