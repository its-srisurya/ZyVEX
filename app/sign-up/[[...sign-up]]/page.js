import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen py-10">
      <SignUp 
        path="/sign-up" 
        routing="path" 
        signInUrl="/sign-in" 
        afterSignUpUrl="/userDashboard"
      />
    </div>
  );
} 