// import { redirect } from "next/navigation";
// import { useFormState } from "react-dom";

// import { AuthFormState } from "@/features/auth/model/auth.interface";
// import { signUp } from "@/features/sign-up/api/sign-up";
// import { MAIN_PATHNAME } from "@/shared/config/pathname";

// export const useSignUpActionState = () => {
//   const signUpWithFormData = async (
//     prevState: AuthFormState,
//     formData: FormData,
//   ): Promise<AuthFormState> => {
//     "use server";

//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;

//     const { error } = await signUp({ email, password });

//     if (error) {
//       return { message: error.message };
//     }

//     redirect(MAIN_PATHNAME);
//   };

//   const [signUpFormState, singUpAndLoginAction] = useFormState<
//     AuthFormState,
//     FormData
//   >(signUpWithFormData, null);

//   return { signUpFormState, singUpAndLoginAction };
// };
