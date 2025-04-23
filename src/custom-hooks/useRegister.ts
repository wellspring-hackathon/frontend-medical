import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
// import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { insertCoreUser } from "@/server-action/Insert/InsertNewUser";
import { RegisterSchema } from "@/utils/ZodSchema";

export const useRegister = () => {
  //   const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField
  } = useForm({ resolver: zodResolver(RegisterSchema) });
  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    const { duplicate, error, success } = await insertCoreUser(data);
    if (success) {
      //  push to successful link
      //   push(`/register/onboarding/${data.email}`);
    }
    if (duplicate) {
      setLoading(false);
      toast.error("User with Email already exists");
      resetField("email");
    }
    if (error) {
      setLoading(false);
      toast.error("Error while registering");
    }
  };
  return { loading, register, handleSubmit, errors, onSubmit };
};
