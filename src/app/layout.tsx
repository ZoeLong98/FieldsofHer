import "./globals.css";
import NavBar from "@/components/navBar";
import { AuthProvider } from "@/context/AuthContext";
import Usage from "@/components/Usage";
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
            <div className="fixed bottom-0 right-0 m-4">
              <Usage />
            </div>
          </div>{" "}
        </AuthProvider>
      </body>
    </html>
  );
}
