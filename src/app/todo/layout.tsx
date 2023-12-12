import "@/styles/globals.css";

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="m-20 flex w-full flex-col items-center justify-start">
      {children}
    </main>
  );
}
