import React from "react";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";

const SIDEBAR_WIDTH = "w-64"; // adjust if needed
const HEADER_HEIGHT = "h-16"; // adjust if needed

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Sidebar (Fixed) */}
      <aside
        className={`fixed top-0 left-0 ${SIDEBAR_WIDTH} h-screen bg-slate-900 text-white z-40`}
      >
        <AdminSidebar />
      </aside>

      {/* Main Wrapper (shifted right because of sidebar) */}
      <div className={`ml-64 flex flex-col min-h-screen`}>
        
        {/* Header (Fixed) */}
        <header
          className={`fixed top-0 left-64 right-0 ${HEADER_HEIGHT} bg-white border-b z-30`}
        >
          <AdminHeader />
        </header>

        {/* Scrollable Content */}
        <main
          className={`mt-16 overflow-y-auto flex-1`}
          style={{ height: "calc(100vh - 4rem)" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
