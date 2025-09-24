import Link from "next/link";
import {
  Bell,
  Home,
  Users,
  Calendar,
  BarChart2,
  Settings,
  LifeBuoy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "../logo";

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", icon: Home, label: "Dashboard" },
    { href: "/admin/events", icon: Calendar, label: "Events" },
    { href: "/admin/users", icon: Users, label: "Users" },
    { href: "/admin/analytics", icon: BarChart2, label: "Analytics" },
    { href: "/admin/notifications", icon: Bell, label: "Notifications", badge: "5" },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Logo />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  { "bg-muted text-primary": pathname === item.href }
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.badge && (
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                 <Link
                    href="/admin/settings"
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        { "bg-muted text-primary": pathname === "/admin/settings" }
                    )}
                >
                    <Settings className="h-4 w-4" />
                    Settings
                </Link>
                 <Link
                    href="/admin/support"
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        { "bg-muted text-primary": pathname === "/admin/support" }
                    )}
                >
                    <LifeBuoy className="h-4 w-4" />
                    Support
                </Link>
            </nav>
        </div>
      </div>
    </div>
  );
}
