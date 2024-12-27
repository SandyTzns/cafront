import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

function SignUp() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup-form"); // Navigate to the SignUpForm page
  };

  return (
    <div>
      <h2>Bienvenue</h2>
      <p>Pas encore de compte ?</p>
      <button className="sign-up-button" onClick={handleSignUpClick}>
        S'inscrire
      </button>
    </div>
  );
}

export default SignUp;
