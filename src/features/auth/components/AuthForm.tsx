import { useState } from "react";
import Button from "@/shared/components/ui/Button";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthForm = () => {
	const [isSignIn, setIsSignIn] = useState(true);

	return (
		<div>
			{isSignIn ? <SignInForm /> : <SignUpForm />}

			<div className="text-center text-sm mt-4">
				{isSignIn ? "Already have an account?" : "Don't have an account?"}{" "}
				<Button variant="link" onClick={() => setIsSignIn(!isSignIn)}>
					{isSignIn ? "Sign Up" : "Sign In"}
				</Button>
			</div>
		</div>
	);
};

export default AuthForm;
