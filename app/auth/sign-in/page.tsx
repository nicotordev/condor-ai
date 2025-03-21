import Link from "next/link";
import { googleLogo, microsoftLogo } from "@/assets";
import Image from "next/image";
import SignIn from "@/components/Auth/SignIn";
import { PagePropsCommon } from "@/types/pages";
import { SignInState } from "@/types/auth";
import { decryptData } from "@/lib/crypto";
export default async function SignInPage({ searchParams }: PagePropsCommon) {
  const _searchParams = await searchParams;
  const state: SignInState | null =
    typeof _searchParams.state === "string"
      ? decryptData<SignInState>(_searchParams.state)
      : null;

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto max-w-xs mt-16">
        <h2 className="!font-paragraph font-bold text-dark-text-primary text-3xl text-center">
          Bienvenido
        </h2>
        <SignIn state={state} />
        <div className="flex items-center justify-center mt-4">
          <span className="flex items-center justify-center gap-1 text-xs font-medium">
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/sign-up" className="text-primary-600">
              Suscríbete
            </Link>
          </span>
        </div>
        <div className="flex items-center mt-4">
          <hr className="w-full h-px bg-gray-300 opacity-100 border-none" />
          <span className="mx-2">o</span>
          <hr className="w-full h-px bg-gray-300 opacity-100 border-none" />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <button className="px-4 rounded-lg py-2 border border-gray-300 border-solid bg-transparent !font-inter flex items-center justify-start gap-2 text-xs">
            <Image src={googleLogo} alt="Google Logo" width={16} height={16} />
            Continuar con Google
          </button>
          <button className="px-4 rounded-lg py-2 border border-gray-300 border-solid bg-transparent !font-inter flex items-center justify-start gap-2 text-xs">
            <Image
              src={microsoftLogo}
              alt="Microsoft Logo"
              width={14}
              height={14}
            />
            Continuar con Microsoft
          </button>
        </div>
        <div className="mt-12 flex items-center justify-center gap-2 text-xs">
          <Link href="/auth/sign-up" className="text-primary-600">
            Terminos de uso
          </Link>
          |
          <Link href="/auth/sign-up" className="text-primary-600">
            Politica y privacidad
          </Link>
        </div>
      </div>
    </div>
  );
}
