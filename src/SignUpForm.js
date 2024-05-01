import React from "react";

const SignUpForm = () => {
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up form submission
    console.log("Sign Up Form Submitted");
  };

  return (
    <form onSubmit={handleSignUpSubmit}>
      <h2>Sign Up</h2>
      {/* Sign-up form inputs */}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
