"use client";

export default function DataProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <SoftwareProvider></SoftwareProvider>
    </UserProvider>
  );
}
