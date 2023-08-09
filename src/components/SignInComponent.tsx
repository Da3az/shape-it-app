import { SignIn } from "@clerk/nextjs";

const SignInComponent = () => (
  <button className="bg-blue-200 p-4 relative">

  <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </button>
  );

export default SignInComponent;