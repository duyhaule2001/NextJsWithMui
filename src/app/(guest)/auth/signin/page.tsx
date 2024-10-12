import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthSign from "@/components/auth/auth.signin";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return <AuthSign />;
};
export default SignInPage;
