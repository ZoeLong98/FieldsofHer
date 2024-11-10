import "./globals.css";
import NavBar from "@/components/navBar";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen bg-black">
            <NavBar />
            {children}
          </div>{" "}
        </AuthProvider>
      </body>
    </html>
  );
}
