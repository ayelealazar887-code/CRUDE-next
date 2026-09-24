"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/", icon: "grid" },
  { name: "Orders", href: "/orders", icon: "receipt" },
  { name: "Products", href: "/products", icon: "box" },
  { name: "Users", href: "/users", icon: "users" },
];

function NavigationIcon({ name }: { name: string }) {
  const common = "h-5 w-5 shrink-0";

  if (name === "grid") {
    return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>;
  }

  if (name === "receipt") {
    return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" /><path d="M9 8h6M9 12h6M9 16h3" strokeLinecap="round" /></svg>;
  }

  if (name === "box") {
    return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4.5 7.5 7.5 4 7.5-4M12 12v9" /></svg>;
  }

  return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="8" r="3" /><path d="M3.5 20c.6-3.2 2.4-5 5.5-5s4.9 1.8 5.5 5M16 5.5a3 3 0 0 1 0 5.8M16 15c2.5.2 4 1.8 4.5 5" strokeLinecap="round" /></svg>;
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-20 border-r border-slate-200 bg-white text-slate-900 md:w-64">
      <div className="flex h-20 items-center border-b border-slate-100 px-5 md:px-7">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white shadow-sm">O</div>
          <h1 className="hidden text-lg font-bold tracking-tight md:block">
            Order<span className="text-blue-600">Admin</span>
          </h1>
        </div>
      </div>

      <div className="px-3 pt-8 md:px-4">
        <p className="mb-3 hidden px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 md:block">
          Workspace
        </p>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.name}
                className={`flex items-center justify-center gap-3 rounded-xl px-3 py-3 text-sm font-medium md:justify-start md:px-4 ${
                  active
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                <NavigationIcon name={item.icon} />
                <span className="hidden md:block">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 hidden w-full border-t border-slate-100 p-5 md:block">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">A</div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-900">Admin account</p>
            <p className="text-[11px] text-slate-500">Workspace owner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}