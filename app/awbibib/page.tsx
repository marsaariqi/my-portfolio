"use client";
import AwAbout from "@/components/admin/About/Hero";
import AwContact from "@/components/admin/Contact/Hero";
import AwHome from "@/components/admin/Home/Hero";
import LoginAwbibib from "@/components/admin/Login/Hero";
import AwProjects from "@/components/admin/Projects/Hero";
import AwSidebar from "@/components/admin/Sidebar";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";

const Page = () => {
  const [activePage, setActivePage] = useState<
    "home" | "about" | "projects" | "contact"
  >("home");
  const [authAwbibib, setAuthAwbibib] = useState(false);

  const [loadingAuth, setLoadingAuth] = useState(true);

  // This useEffect for page navigation is good, leave it as is
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPage = localStorage.getItem("activePage");
      if (
        storedPage &&
        ["home", "about", "projects", "contact"].includes(storedPage)
      ) {
        setActivePage(storedPage as "home" | "about" | "projects" | "contact");
      }
    }
  }, []);

  const handleMenuItemClick = (
    pageName: "home" | "about" | "projects" | "contact"
  ) => {
    setActivePage(pageName);
    if (typeof window !== "undefined") {
      localStorage.setItem("activePage", pageName);
    }
  };

  // 2. REPLACE THE SESSIONSTORAGE USEEFFECT WITH THIS:
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          setAuthAwbibib(true);
        } else {
          setAuthAwbibib(false);
        }
      } catch (e) {
        setAuthAwbibib(false);
      } finally {
        setLoadingAuth(false);
      }
    };

    checkAuth();
  }, []);

  // 3. UPDATE THE LOGOUT FUNCTION
  const Logout = async () => {
    try {
      // Call the logout endpoint to clear the cookie
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      setAuthAwbibib(false);
    }
  };

  // --- ADD THIS LOADING CHECK ---
  if (loadingAuth) {
    return <Loading />;
  }

  if (!authAwbibib) {
    return <LoginAwbibib setAuthAwbibib={setAuthAwbibib} />;
  }

  return (
    <main className="flex flex-col  md:flex-col sm:flex-col lg:flex-row">
      <nav className="top-0 z-10 lg:fixed">
        <AwSidebar onItemClick={handleMenuItemClick} Logout={Logout} />
      </nav>
      <Suspense fallback={<Loading />}>
        <div className="p-6 lg:pl-[22rem] h-[90dvh] w-full">
          {activePage === "home" && <AwHome />}
          {activePage === "about" && <AwAbout />}
          {activePage === "projects" && <AwProjects />}
          {activePage === "contact" && <AwContact />}
        </div>
      </Suspense>
    </main>
  );
};

export default Page;
