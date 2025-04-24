import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { type z } from "zod";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
import { useState } from "react";
// import { insertCoreUser } from "@/server-action/Insert/InsertNewUser";
import { RegisterSchema, type RegisterSchemaType } from "@/utils/ZodSchema";

export const useRegister = () => {
  // const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    }
  });
  const onSubmit = async () =>
    // _data: z.infer<typeof RegisterSchema>
    {
      setLoading(true);
      // const { duplicate, error, success } = await insertCoreUser(data);
      // if (success) {
      //   //  push to successful link
      //     push(`/onboarding/`);
      //     localStorage.setItem("user", JSON.stringify(data));
      // }
      // if (duplicate) {
      //   setLoading(false);
      //   toast.error("User with Email already exists", {
      //     style: {
      //       background: 'red',
      //       color: 'white',
      //       fontSize: '16px',
      //     },
      //     position: "top-center"
      //   });
      //   form.resetField("email");
      // }
      // if (error) {
      //   setLoading(false);
      //   toast.error("Error while registering", {
      //     style: {
      //       background: 'red',
      //       color: 'white',
      //       fontSize: '16px',
      //     },
      //     position: "top-center"
      //   });
      // }
    };
  return { loading, form, onSubmit };
};
