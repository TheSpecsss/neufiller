"use client"
import { useState } from "react";
import { Search, Filter, Clock, AlertCircle, FileText, UserCheck, Settings, CheckCircle2 } from "lucide-react";
import GlassmorphicCard from "@/components/ui-custom/GlassmorphicCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data for audit logs
const mockLogs = [
  { id: 1, action: "Document Generated", user: "Alex Johnson", details: "Generated Service Agreement", timestamp: "2024-02-15T09:30:00", type: "document" },
  { id: 2, action: "User Login", user: "Sarah Miller", details: "Successful login from 192.168.1.1", timestamp: "2024-02-15T09:15:00", type: "security" },
  { id: 3, action: "Template Modified", user: "Emily Taylor", details: "Updated NDA Template", timestamp: "2024-02-15T08:45:00", type: "template" },
  { id: 4, action: "Settings Changed", user: "David Chen", details: "Updated email notifications", timestamp: "2024-02-14T17:20:00", type: "system" },
  { id: 5, action: "Document Generated", user: "Michael Brown", details: "Generated Invoice #1024", timestamp: "2024-02-14T16:10:00", type: "document" },
  { id: 6, action: "User Created", user: "Admin", details: "Created user account for james@example.com", timestamp: "2024-02-14T15:30:00", type: "security" },
  { id: 7, action: "Template Created", user: "Lisa Wang", details: "Created Employment Contract template", timestamp: "2024-02-14T14:45:00", type: "template" },
  { id: 8, action: "System Backup", user: "System", details: "Automated system backup completed", timestamp: "2024-02-14T14:00:00", type: "system" },
];

const actionTypes = ["All Types", "Document", "Security", "Template", "System"];

const getActionIcon = (type: string) => {
  switch (type) {
    case "document":
      return <FileText className="h-4 w-4" />;
    case "security":
      return <UserCheck className="h-4 w-4" />;
    case "template":
      return <FileText className="h-4 w-4" />;
    case "system":
      return <Settings className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All Types" || 
      log.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="page-container pt-24">
      <h1 className="text-3xl font-bold mb-8 animate-fade-in">Audit Logs</h1>
      
      {/* Search and filters */}
      <GlassmorphicCard className="mb-8 animate-slide-up">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neu-gray dark:text-neu-light-gray" />
            <Input
              placeholder="Search audit logs..."
              className="pl-10 input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="secondary-button">
                  <Filter className="mr-2 h-4 w-4" />
                  {selectedType}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-panel">
                {actionTypes.map((type) => (
                  <DropdownMenuItem 
                    key={type} 
                    onClick={() => setSelectedType(type)}
                    className={selectedType === type ? "font-medium" : ""}
                  >
                    {type}
                    {selectedType === type && (
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </GlassmorphicCard>
      
      {/* Logs table */}
      <GlassmorphicCard className="animate-slide-up">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neu-light-gray dark:border-neu-dark-gray">
                <th className="text-left py-4 px-6 font-medium">Action</th>
                <th className="text-left py-4 px-6 font-medium">User</th>
                <th className="text-left py-4 px-6 font-medium">Details</th>
                <th className="text-left py-4 px-6 font-medium">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr 
                  key={log.id} 
                  className="border-b border-neu-light-gray/50 dark:border-neu-dark-gray/50 hover:bg-neu-light-gray/30 dark:hover:bg-neu-dark-gray/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className="p-1 rounded-full bg-neu-light-gray dark:bg-neu-dark-gray mr-3">
                        {getActionIcon(log.type)}
                      </span>
                      <span>{log.action}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">{log.user}</td>
                  <td className="py-4 px-6">{log.details}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-neu-gray dark:text-neu-light-gray">
                      <Clock className="h-4 w-4 mr-2" />
                      {formatDate(log.timestamp)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default AuditLogs;
