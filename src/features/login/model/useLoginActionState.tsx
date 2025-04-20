// import { redirect } from "next/navigation";
// import { useFormState } from "react-dom";

// import { AuthFormState } from "@/features/auth/model/auth.interface";
// import { login } from "@/features/login/api/login";
// import { MAIN_PATHNAME } from "@/shared/config/pathname";

// export const useLoginActionState = () => {
//   const loginWithFormData = async (
//     prevState: AuthFormState,
//     formData: FormData,
//   ): Promise<AuthFormState> => {
//     "use server";

//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;

//     const { error } = await login({ email, password });

//     if (error) {
//       return { message: error.message };
//     }

//     redirect(MAIN_PATHNAME);
//   };

//   const [loginFormState, loginFormAction] = useFormState<
//     AuthFormState,
//     FormData
//   >(loginWithFormData, null);

//   return { loginFormState, loginFormAction };
// };
