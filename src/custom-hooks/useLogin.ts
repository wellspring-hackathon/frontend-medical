import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPasswword] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    await signIn("credentials", {
      redirect: false,
      email: email,
      password: password
    }).then((callback) => {
      if (callback?.url === null) {
        toast.error("Username or password incorrect");
        setLoading(false);
      }
      if (callback?.error === null) {
        //  okay you guys should write where it should go to
        push("/dashboard/");
      }
    });
  };

  return {
    handleSubmit,
    email,
    password,
    setEmail,
    setPasswword,
    loading,
    setLoading
  };
};
