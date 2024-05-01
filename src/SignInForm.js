import React from "react";

const SignInForm = () => {(
  <div className="container">
    <div className="row">
      <div className="col-md-6">
          <h2>Connectez-vous à Jock'Art Formation</h2>
          <p>Ou utilisez votre compte email</p>
          <form>
              <input className="mt-4"  type="email" id="tel" placeholder="Numéro de téléphone"></input>
              <input className="mt-4"  type="password" id="tel" placeholder="Numéro de téléphone"></input>
          </form>
      </div>
      <div className="col-md-6 mt-5">
          <button className="btn btn-success mt-5">Se connecter</button>
      </div>   
    </div>
  </div>

  );
};

export default SignInForm;
