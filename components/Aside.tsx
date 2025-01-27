"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarLink,
  SidebarLinks,
} from "@/components/Sidebar";
import {
  ChartNoAxesColumn,
  NotebookText,
  Settings,
  Workflow,
  CircleHelp,
  ChartCandlestick,
} from "lucide-react";
import { SidebarLinksT, UserObject } from "@/types/type";
import { UserMenu } from "./UserMenu";

const links: SidebarLinksT[] = [
  {
    icon: <NotebookText size={16} />,
    label: "Forms",
    href: "/dashboard",
  },
  {
    icon: <ChartCandlestick size={16} />,
    label: "Responses",
    href: "/responses",
  },
  {
    icon: <ChartNoAxesColumn size={16} />,
    label: "Analytics",
    href: "/analytics",
  },
  {
    icon: <Workflow size={16} />,
    label: "Integrations",
    href: "/integrations",
  },
  {
    icon: <Settings size={16} />,
    label: "Settings",
    href: "/settings",
  },
  {
    icon: <CircleHelp size={16} />,
    label: "Help",
    href: "/help",
  },
];
interface AsideProps {
  user: UserObject;
}
const Aside = ({ user }: AsideProps) => {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <h4 className="text-[1.4rem] text-black font-[600]">Gather</h4>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarLinks>
          {links.map((l, i) => {
            return (
              <SidebarLink
                key={i}
                icon={l.icon}
                href={l.href}
                label={l.label}
                active={pathname == l.href}
              />
            );
          })}
        </SidebarLinks>
      </SidebarContent>
      <SidebarFooter>
        <UserMenu user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default Aside;
