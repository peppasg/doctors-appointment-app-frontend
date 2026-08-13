import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const RouterLayout = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto min-h-[95vh] pt-36">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default RouterLayout;
