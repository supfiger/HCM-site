// constants
const signForm = document.querySelector(".signForm");
const fullName = signForm.querySelector(`input[name="fullName"]`);
const email = signForm.querySelector(`input[name="email"]`);
const password = signForm.querySelector(`input[name="password"]`);
const checkbox = signForm.querySelector(`input[name="checkbox"]`);
const inputs = signForm.querySelectorAll("input");

// functions
function validate(e) {
  e.preventDefault();

  const isSignInForm = signForm.classList.contains("signInForm");
  const isSignUpForm = signForm.classList.contains("signUpForm");

  if (isSignInForm) validateSignIn();
  if (isSignUpForm) validateSignUp();
}

const errorMessage = ({ type, value, minLength = 3, signForm }) => {
  const isEmpty = type !== "checkbox" && value.length === 0;
  const isLength = type !== "checkbox" && value.length <= minLength;
  const isInvalidEmail = type === "email" && !/(.+)@(.+){2,}\.(.+){2,}/.test(value);
  const isNotChecked = signForm === "signUp" && value === false;

  let message;
  switch (true) {
    case isEmpty:
    case isNotChecked:
      message = "Required";
      break;
    case isLength:
      message = `Too shot — should be ${minLength} chars at least`;
      break;
    case isInvalidEmail:
      message = "Invalid email format";
      break;
    default:
      message = "";
      break;
  }

  return { message };
};

const appendError = ({ input, message }) => {
  const signFormItem = input.closest(".signFormItem");
  const errorMessage = signFormItem.querySelector(".errorMessage");

  errorMessage.innerText = message;
};

const validateSignIn = () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  const isEmailError = errorMessage({ type: "email", value: emailValue });
  const isPasswordError = errorMessage({ type: "password", value: passwordValue, minLength: 6 });

  if (isEmailError) appendError({ input: email, message: isEmailError.message });
  if (isPasswordError) appendError({ input: password, message: isPasswordError.message });
};

const validateSignUp = () => {
  const fullNameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const checkboxValue = checkbox.checked;

  const isFullNameError = errorMessage({ type: "text", value: fullNameValue });
  const isEmailError = errorMessage({ type: "email", value: emailValue });
  const isPasswordError = errorMessage({ type: "password", value: passwordValue, minLength: 6 });
  const isCheckboxError = errorMessage({ type: "checkbox", value: checkboxValue, signForm: "signUp" });

  if (isFullNameError) appendError({ input: fullName, message: isFullNameError.message });
  if (isEmailError) appendError({ input: email, message: isEmailError.message });
  if (isPasswordError) appendError({ input: password, message: isPasswordError.message });
  if (isCheckboxError) appendError({ input: checkbox, message: isCheckboxError.message });
};

// event listener
inputs.forEach((item) => item.addEventListener("input", validate));
signForm.addEventListener("submit", validate);
