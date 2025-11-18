import countries from "@/assets/countries.json";
type ValidationResult = {
  errors: string[];
  isValid: boolean;
};

/**
 * Validates a new user registration
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @param {string} confirmPassword - The user's password confirmation
 * @returns {ValidationResult} - An object containing an array of errors and a boolean indicating whether the validation was successful or not
 */
export const validateNewUser = (
  email: string,
  password: string,
  confirmPassword?: string,
  location?: string
) : ValidationResult => {
  const errors: string[] = [];
  if (!email || !password) {
    errors.push("Email and password are required");
  }
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  if (confirmPassword && password !== confirmPassword) {
    errors.push("Passwords do not match");
  }
   console.log(errors);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

// More comprehensive special characters
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^=+~_\-])[A-Za-z\d@$!%*?&.#^=+~_\-]{8,}$/;
  if (!passwordRegex.test(password)) {
    errors.push(
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    );
  }
  // validate location
  
  if (location && !countries.find((country) => country.name === location)) {
    errors.push('Please enter your location');
    
  }

  if (errors.length > 0) {
    console.log(password);
    console.log(errors);
    return { errors, isValid: false };
  } else {
    return { errors: [], isValid: true };
  }
};

export const validateNewEmployer = (
  fullName:string,
  email:string,
  password:string,
  confirmPassword:string,
  company:string,

)=>{
  const errors :string[]= []

  if(!fullName || !email || !password || !confirmPassword || !company){
    errors.push("All fields are required");
  }

  if(fullName.length>100){
    errors.push("Full name cannot exceed 100 characters");
  }
  if(company.length>150){
    errors.push("Company name cannot exceed 150 characters");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }

  // More comprehensive special characters
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^=+~_\-])[A-Za-z\d@$!%*?&.#^=+~_\-]{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.push(
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
      );
    }

  if(password !== confirmPassword){
    errors.push("Passwords do not match");
  }

  if(errors.length>0){
    return {errors,isValid:false};
  }else{
    return {errors:[],isValid:true};
  }
}
