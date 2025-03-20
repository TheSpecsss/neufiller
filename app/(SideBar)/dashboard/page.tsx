"use client"
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, Users, ClipboardCheck, Eye } from "lucide-react";
import GlassmorphicCard from "@/components/ui-custom/GlassmorphicCard";
import { cn } from "@/lib/utils";

const mockData = {
  stats: [
    { id: 1, title: "Total Documents", value: 2547, icon: <FileText className="h-5 w-5" />, change: "+12%" },
    { id: 2, title: "Active Users", value: 128, icon: <Users className="h-5 w-5" />, change: "+5%" },
    { id: 3, title: "Templates", value: 34, icon: <ClipboardCheck className="h-5 w-5" />, change: "+2%" },
  ],
  activityData: [
    { name: "Jan", documents: 150 },
    { name: "Feb", documents: 230 },
    { name: "Mar", documents: 280 },
    { name: "Apr", documents: 340 },
    { name: "May", documents: 290 },
    { name: "Jun", documents: 380 },
  ],
  recentDocuments: [
    { id: 1, name: "Service Agreement", template: "Legal Contract", user: "Alex Johnson", date: "Today, 2:30 PM" },
    { id: 2, name: "Invoice #1024", template: "Financial", user: "Sarah Miller", date: "Today, 11:15 AM" },
    { id: 3, name: "Non-Disclosure Agreement", template: "Legal Contract", user: "David Chen", date: "Yesterday, 4:45 PM" },
    { id: 4, name: "Project Proposal", template: "Business", user: "Emily Taylor", date: "Yesterday, 1:20 PM" },
  ],
  popularTemplates: [
    { id: 1, name: "Service Agreement", category: "Legal", usage: 347 },
    { id: 2, name: "Invoice", category: "Financial", usage: 289 },
    { id: 3, name: "Non-Disclosure Agreement", category: "Legal", usage: 245 },
    { id: 4, name: "Employment Contract", category: "HR", usage: 198 },
  ],
};

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading for smooth animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-container pt-24">
      <h1 className="text-3xl font-bold mb-8 animate-fade-in">Dashboard</h1>
      
      {/* Stats Cards */}
      <div 
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transition-all duration-1000",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        {mockData.stats.map((stat, index) => (
          <GlassmorphicCard 
            key={stat.id} 
            className="transition-all duration-500"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-neu-light-gray dark:bg-neu-dark-gray mr-4">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-neu-gray dark:text-neu-light-gray">{stat.title}</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">{stat.value.toLocaleString()}</h3>
                  <span className="ml-2 text-xs text-green-500">{stat.change}</span>
                </div>
              </div>
            </div>
          </GlassmorphicCard>
        ))}
      </div>
      
      {/* Chart & Recent Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Chart */}
        <GlassmorphicCard className="lg:col-span-2 animate-slide-up" style={{ height: '400px' }}>
          <h2 className="text-xl font-semibold mb-6">Document Generation Activity</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockData.activityData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' 
                  }} 
                />
                <Bar 
                  dataKey="documents" 
                  fill="currentColor" 
                  className="text-neu-dark-gray dark:text-neu-light-gray" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassmorphicCard>
        
        {/* Recent Documents */}
        <GlassmorphicCard className="animate-slide-up" style={{ height: '400px' }}>
          <h2 className="text-xl font-semibold mb-4">Recent Documents</h2>
          <div className="space-y-4 overflow-auto max-h-[300px] pr-2">
            {mockData.recentDocuments.map((doc) => (
              <div key={doc.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-neu-light-gray/50 dark:hover:bg-neu-dark-gray/50 transition-colors duration-200">
                <div className="p-2 rounded-full bg-neu-light-gray dark:bg-neu-dark-gray">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{doc.name}</p>
                  <p className="text-xs text-neu-gray dark:text-neu-light-gray">
                    {doc.template} • {doc.user}
                  </p>
                  <p className="text-xs text-neu-gray dark:text-neu-light-gray mt-1">
                    {doc.date}
                  </p>
                </div>
                <button className="p-1 rounded-full hover:bg-neu-light-gray dark:hover:bg-neu-dark-gray transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </GlassmorphicCard>
      </div>
      
      {/* Popular Templates */}
      <GlassmorphicCard className="animate-slide-up">
        <h2 className="text-xl font-semibold mb-6">Popular Templates</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neu-light-gray dark:border-neu-dark-gray">
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Category</th>
                <th className="text-left py-3 px-4 font-medium">Usage</th>
              </tr>
            </thead>
            <tbody>
              {mockData.popularTemplates.map((template) => (
                <tr 
                  key={template.id} 
                  className="border-b border-neu-light-gray/50 dark:border-neu-dark-gray/50 hover:bg-neu-light-gray/30 dark:hover:bg-neu-dark-gray/30 transition-colors"
                >
                  <td className="py-4 px-4">{template.name}</td>
                  <td className="py-4 px-4">{template.category}</td>
                  <td className="py-4 px-4">{template.usage} uses</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default Dashboard;
