/**
 * Generate a South African ID number based on the provided age, optional month, and day.
 *
 * @param {number} age - The age of the person (required).
 * @param {number} [month] - The month of birth (optional, defaults to random).
 * @param {number} [day] - The day of birth (optional, defaults to random).
 * @return {string} The generated South African ID number.
 * @customfunction
 */
function GENERATE_SA_ID(age, month = Math.ceil(Math.random() * 12), day = Math.ceil(Math.random() * 28)) {
  const currentYear = new Date().getFullYear();
  const yearOfBirth = currentYear - age;

  const gender = Math.random() < 0.5 ? '4' : '5'; // Random gender (female: 4, male: 5)
  const sequence = '800'; // Default sequence
  const citizenship = '0'; // Assume SA citizenship
  const eight = '8'; // Constant value for the eighth digit
  
  // Helper to pad values to two digits
  const pad = (num) => ('0' + num).slice(-2);
  
  // Construct the ID without the check digit
  const idWithoutCheckDigit = `${pad(yearOfBirth % 100)}${pad(month)}${pad(day)}${gender}${sequence}${citizenship}${eight}`;

  // Function to calculate Luhn algorithm check digit
  const calculateCheckDigit = (digitsAsString) => {
    const digits = digitsAsString.split('').map(d => Number(d));
    const checkSum = digits.reverse().map((d, ix) => {
      if (ix % 2 === 0) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      return d;
    }).reduce((acc, d) => acc + d, 0);
    return (checkSum * 9) % 10;
  };

  // Calculate the final check digit
  const checkDigit = calculateCheckDigit(idWithoutCheckDigit);

  // Return the complete ID number
  return idWithoutCheckDigit + checkDigit;
}
