import { AuthUI } from "@/components/ui/animated-auth";




const SignIn = () => {
  return (
    <AuthUI 
      mode="signin"
      signInContent={{
        image: {
          src:  '',// ← Change this image URL
          alt: ""
        },
        quote: {
          text: "Welcome Back! The journey continues...", // ← Change this quote
          author: "AI Learn" // ← Change this author
        }
      }}
    />
  );
};

export default SignIn;
