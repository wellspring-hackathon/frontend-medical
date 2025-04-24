import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPasswword] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      redirect: false,
      email,
      password
    }).then((callback) => {
      if (callback?.url === null) {
        toast.error("Username or password incorrect", {
          style: {
            background: "red",
            color: "white",
            fontSize: "16px"
          },
          position: "top-center"
        });
        setLoading(false);
      }
      if (callback?.error === null) {
        //  okay you guys should write where it should go to
        push("/dashboard/");
      }
    });
  }

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
