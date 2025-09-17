import { AuthUI } from "@/components/ui/animated-auth";
// import Signup from "@/assets/images/Signup.jpg"

const SignUp = () => {
  return (
    <AuthUI 
      mode="signup"
      signUpContent={{
        image: {
          src: '', // ← Change this image URL
          alt: "Sign up background"
        },
        quote: {
          text: "A New language, A New World...", // ← Change this quote
          author: "AI Learn" // ← Change this author
        }
      }}
    />
  );
};

export default SignUp;
