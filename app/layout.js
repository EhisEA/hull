"use client";
import { Inter } from "next/font/google";
import store from "../store/store";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import ProgressBar from "@/components/ProgressBar";
import ApplicationsProvider from "@/components/contexts/applicationsProvider";
import UserProvider from "@/components/contexts/userProvider";
import TransactionsProvider from "@/components/contexts/transactionsProvider";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <ProgressBar />
        <Provider store={store}>
          <ToastContainer
            position="top-center"
            pauseOnHover={false}
            closeOnClick
            closeButton={true}
          />
          <UserProvider>
            <ApplicationsProvider>
              <TransactionsProvider>
                <div>
                  <div>{children}</div>
                </div>
              </TransactionsProvider>
            </ApplicationsProvider>
          </UserProvider>
        </Provider>
      </body>
    </html>
  );
}
