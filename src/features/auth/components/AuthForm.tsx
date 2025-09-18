import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthForm = () => {
	const [isSignUp, setIsSignUp] = useState(true);

	return (
		<div>
			{isSignUp ? <SignUpForm /> : <SignInForm />}

			<div className="text-center text-sm mt-4">
				{isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
				<button
					type="button"
					onClick={() => setIsSignUp(!isSignUp)}
					className="text-blue-500 underline"
				>
					{isSignUp ? "Sign In" : "Sign Up"}
				</button>
			</div>
		</div>
	);
};

export default AuthForm;
