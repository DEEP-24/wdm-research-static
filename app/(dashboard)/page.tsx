"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CalendarIcon, FileTextIcon, UsersIcon, BriefcaseIcon, ArrowRightIcon } from "lucide-react";
import type { User } from "@/types/user";

const activityData = [
  { name: "Mon", value: 10 },
  { name: "Tue", value: 15 },
  { name: "Wed", value: 8 },
  { name: "Thu", value: 12 },
  { name: "Fri", value: 20 },
  { name: "Sat", value: 5 },
  { name: "Sun", value: 3 },
];

const platformFeatures = [
  { title: "Event Management", description: "Organize and manage research events effortlessly." },
  { title: "Funding Opportunities", description: "Explore and apply for various funding options." },
  {
    title: "Collaboration Tools",
    description: "Connect and collaborate with researchers worldwide.",
  },
  { title: "Resource Sharing", description: "Share and access valuable research resources." },
];

const latestNews = [
  { title: "New Quantum Computing Grant Announced", date: "2023-06-15" },
  { title: "ResearchSphere Reaches 1 Million Users", date: "2023-06-10" },
  { title: "AI Ethics Symposium: Registration Open", date: "2023-06-05" },
];

const quickLinks = [
  { title: "Upcoming Events", href: "/events", icon: CalendarIcon },
  { title: "My Reservations", href: "/reservations", icon: FileTextIcon },
  { title: "Research Projects", href: "/projects", icon: BriefcaseIcon },
  { title: "User Profile", href: "/profile", icon: UsersIcon },
];

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userString = localStorage.getItem("currentUser");
    if (userString) {
      setCurrentUser(JSON.parse(userString));
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Welcome, {currentUser.firstName}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {platformFeatures.map((feature, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <li key={index}>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest News & Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {latestNews.map((news, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <li key={index} className="flex justify-between items-center">
                  <span>{news.title}</span>
                  <span className="text-sm text-gray-500">{news.date}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Link key={index} href={link.href}>
                <Button variant="outline" className="w-full justify-start">
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.title}
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Popular Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Quantum Computing Research</span>
              <Button variant="ghost" size="sm">
                View <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </li>
            <li className="flex justify-between items-center">
              <span>AI Ethics Study</span>
              <Button variant="ghost" size="sm">
                View <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </li>
            <li className="flex justify-between items-center">
              <span>Climate Change Impact Analysis</span>
              <Button variant="ghost" size="sm">
                View <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
