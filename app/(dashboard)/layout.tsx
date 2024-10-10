"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { User } from "@/types/user";
import {
  ArrowUpDownIcon,
  BellIcon,
  CalendarCheck2Icon,
  CalendarIcon,
  ChevronDownIcon,
  DollarSignIcon,
  FileTextIcon,
  FolderKanbanIcon,
  HomeIcon,
  MenuIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  ScanEyeIcon,
  SearchIcon,
  SendIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const sidebarItems = [
  { icon: HomeIcon, label: "Dashboard", href: "/" },
  { icon: CalendarIcon, label: "Events", href: "/events" },
  { icon: CalendarCheck2Icon, label: "Reservations", href: "/reservations" },
  { icon: DollarSignIcon, label: "Fundings", href: "/fundings" },
  { icon: FileTextIcon, label: "Grant Applications", href: "/grants" },
  { icon: MessageSquareIcon, label: "Discussions", href: "/discussions" },
  { icon: UserIcon, label: "Profile", href: "/profile" },
  { icon: FolderKanbanIcon, label: "Projects", href: "/projects" },
  { icon: ScanEyeIcon, label: "Review", href: "/review" },
  { icon: ArrowUpDownIcon, label: "File Sharing", href: "/file-sharing" },
  { icon: MessageCircleIcon, label: "Forums", href: "/forums" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userString = localStorage.getItem("currentUser");
    if (userString) {
      setCurrentUser(JSON.parse(userString));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    router.push("/login");
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100 lg:flex-row">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-700 to-indigo-800 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 lg:justify-center">
            <h1 className="text-2xl font-bold flex items-center bg-blue-800 rounded-lg px-4 py-2">
              <span className="text-blue-300 mr-1">R</span>
              <span className="text-white">Sphere</span>
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-blue-600"
            >
              <XIcon className="h-6 w-6" />
            </Button>
          </div>
          <ScrollArea className="flex-1 px-4 mt-3">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link key={item.href} href={item.href} passHref>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-semibold text-white hover:bg-blue-600 hover:text-white transition-colors ${
                      pathname === item.href ? "bg-white/30" : ""
                    }`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-blue-200 p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="lg:hidden mr-2 text-blue-700 hover:text-blue-800 hover:bg-blue-50"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
            <h2 className="text-xl font-semibold text-blue-700 hidden sm:block">
              {sidebarItems.find((item) => item.href === pathname)?.label || "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
              <Input
                className="pl-10 w-64 bg-blue-50 border-blue-300 focus:border-blue-500 transition-all"
                type="search"
                placeholder="Search"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-700 hover:text-blue-800 hover:bg-blue-50 relative"
            >
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt={currentUser.firstName}
                    />
                    <AvatarFallback className="bg-blue-200 text-blue-700">
                      {currentUser.firstName[0]}
                      {currentUser.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block text-blue-700">
                    {currentUser.firstName}
                  </span>
                  <ChevronDownIcon className="h-4 w-4 text-blue-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onSelect={() => router.push("/profile")}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLogout}>
                  <ArrowUpDownIcon className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="pb-16 md:pb-0">{children}</div>
        </main>

        {/* Chat interface */}
        <div className="fixed bottom-0 left-0 right-0 md:right-4 md:left-auto md:bottom-4 z-10">
          {isChatOpen ? (
            <div className="bg-white rounded-t-lg md:rounded-lg shadow-lg flex flex-col h-96 md:w-80 w-full">
              <div className="flex justify-between items-center p-4 border-b bg-blue-600 text-white rounded-t-lg">
                <h3 className="font-semibold">Chat with {currentUser.firstName}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsChatOpen(false)}
                  className="text-white hover:bg-blue-700"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-lg p-2 max-w-[80%]">
                      <span className="text-sm">Hi! How can I assist you today?</span>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex items-center">
                  <Input className="flex-1 mr-2" placeholder="Type your message..." />
                  <Button size="icon" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <SendIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Button
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 rounded-none md:rounded-full py-4 md:py-2"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageCircleIcon className="h-5 w-5 mr-2" />
              Click to Chat
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
