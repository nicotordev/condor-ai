import { auth } from "@/auth";
import AppConversationsNav from "@/components/App/Layout/AppConversationsNav";
import AppNav from "@/components/App/Layout/AppNav/AppNav";

export default async function AppRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <>
      <div className="flex h-screen overflow-clip">
        <AppConversationsNav />
        <AppNav session={session}>{children}</AppNav>
      </div>
    </>
  );
}
