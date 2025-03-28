import Link from "next/link";
import { microsoftLogo } from "@/assets/assets";
import Image from "next/image";
import SignUp from "@/components/Auth/SignUp";
import { PagePropsCommon } from "@/types/pages";
import { decryptData } from "@/lib/crypto";
import { SignUpState } from "@/types/auth";
import { SignUpPageStep } from "@/types/auth.enum";
import AuthGoogleSignIn from "@/components/Auth/AuthGoogleSignIn";

export default async function SignUpPage({ searchParams }: PagePropsCommon) {
  const _searchParams = await searchParams;
  const state: SignUpState | null =
    typeof _searchParams.state === "string"
      ? decryptData<SignUpState>(_searchParams.state)
      : null;

  return (
    <div className="min-h-screen w-full bg-white dark:bg-shark-950 text-black dark:text-white transition-colors">
      <div className="mx-auto max-w-xs mt-16">
        <h2 className="!font-paragraph font-bold text-dark-text-primary dark:text-white text-3xl text-center">
          Crear una Cuenta
        </h2>

        <SignUp
          state={{
            ...state,
            step: Object.values(SignUpPageStep).includes(
              state?.step as SignUpPageStep
            )
              ? (state?.step as SignUpPageStep)
              : SignUpPageStep.email,
            email: state?.email || "",
            password: state?.password || "",
            error: state?.error || "",
          }}
        />

        {state?.step !== SignUpPageStep.password && (
          <>
            {/* Enlace para iniciar sesión */}
            <div className="flex items-center justify-center mt-4">
              <span className="flex items-center justify-center gap-1 text-xs font-medium">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  href="/auth/sign-in"
                  className="text-primary-600 dark:text-primary-400 hover:underline transition-colors"
                >
                  Inicia sesión
                </Link>
              </span>
            </div>

            {/* Separador visual */}
            <div className="flex items-center mt-6">
              <hr className="w-full h-px bg-gray-300 dark:bg-shark-700 border-none" />
              <span className="mx-2 text-sm dark:text-gray-400">o</span>
              <hr className="w-full h-px bg-gray-300 dark:bg-shark-700 border-none" />
            </div>

            {/* Proveedores */}
            <div className="mt-6 flex flex-col gap-4">
              <AuthGoogleSignIn />
              <button className="px-4 rounded-lg py-2 border border-gray-300 dark:border-shark-600 bg-transparent hover:bg-gray-100 dark:hover:bg-shark-800 transition-colors !font-inter flex items-center justify-start gap-2 text-xs text-black dark:text-white">
                <Image
                  src={microsoftLogo}
                  alt="Microsoft Logo"
                  width={14}
                  height={14}
                />
                Continuar con Microsoft
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
