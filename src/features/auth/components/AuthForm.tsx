import { useState } from "react";
import Button from "@/shared/components/ui/Button";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthForm = () => {
	const [isSignUp, setIsSignUp] = useState(true);

	return (
		<div>
			{isSignUp ? <SignUpForm /> : <SignInForm />}

			<div className="text-center text-sm mt-4">
				{isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
				<Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
					{isSignUp ? "Sign In" : "Sign Up"}
				</Button>
			</div>
		</div>
	);
};

export default AuthForm;
