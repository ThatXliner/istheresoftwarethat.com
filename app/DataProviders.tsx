"use client";
import { SoftwareProvider, UserProvider } from "@/lib/contexts";

export default function DataProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <SoftwareProvider>
        <main className="flex-grow">{children}</main>
      </SoftwareProvider>
    </UserProvider>
  );
}
