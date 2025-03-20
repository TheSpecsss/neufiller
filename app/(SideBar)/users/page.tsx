"use client"
import { useState } from "react";
import { Search, Filter, MoreHorizontal, Shield, Mail, Calendar, CheckCircle2 } from "lucide-react";
import GlassmorphicCard from "@/components/ui-custom/GlassmorphicCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const mockUsers = [
  { id: 1, name: "Alex Johnson", email: "alex.j@example.com", role: "Admin", lastLogin: "2024-02-15 09:30", status: "Active" },
  { id: 2, name: "Sarah Miller", email: "sarah.m@example.com", role: "User", lastLogin: "2024-02-15 10:15", status: "Active" },
  { id: 3, name: "David Chen", email: "david.c@example.com", role: "User", lastLogin: "2024-02-14 16:45", status: "Inactive" },
  { id: 4, name: "Emily Taylor", email: "emily.t@example.com", role: "Admin", lastLogin: "2024-02-15 08:20", status: "Active" },
  { id: 5, name: "Michael Brown", email: "michael.b@example.com", role: "User", lastLogin: "2024-02-14 14:30", status: "Active" },
  { id: 6, name: "Lisa Wang", email: "lisa.w@example.com", role: "User", lastLogin: "2024-02-13 11:25", status: "Active" },
  { id: 7, name: "James Wilson", email: "james.w@example.com", role: "User", lastLogin: "2024-02-15 07:50", status: "Inactive" },
  { id: 8, name: "Anna Martinez", email: "anna.m@example.com", role: "User", lastLogin: "2024-02-14 15:40", status: "Active" },
];

const roles = ["All Roles", "Admin", "User"];
const statuses = ["All Status", "Active", "Inactive"];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "All Roles" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "All Status" || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="page-container pt-24">
      <h1 className="text-3xl font-bold mb-8 animate-fade-in">User Management</h1>
      
      {/* Search and filters */}
      <GlassmorphicCard className="mb-8 animate-slide-up">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neu-gray dark:text-neu-light-gray" />
            <Input
              placeholder="Search users..."
              className="pl-10 input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            {/* Role filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="secondary-button">
                  <Filter className="mr-2 h-4 w-4" />
                  {selectedRole}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-panel">
                {roles.map((role) => (
                  <DropdownMenuItem 
                    key={role} 
                    onClick={() => setSelectedRole(role)}
                    className={selectedRole === role ? "font-medium" : ""}
                  >
                    {role}
                    {selectedRole === role && (
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="secondary-button">
                  <Filter className="mr-2 h-4 w-4" />
                  {selectedStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-panel">
                {statuses.map((status) => (
                  <DropdownMenuItem 
                    key={status} 
                    onClick={() => setSelectedStatus(status)}
                    className={selectedStatus === status ? "font-medium" : ""}
                  >
                    {status}
                    {selectedStatus === status && (
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </GlassmorphicCard>
      
      {/* Users table */}
      <GlassmorphicCard className="animate-slide-up">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neu-light-gray dark:border-neu-dark-gray">
                <th className="text-left py-4 px-6 font-medium">User</th>
                <th className="text-left py-4 px-6 font-medium">Email</th>
                <th className="text-left py-4 px-6 font-medium">Role</th>
                <th className="text-left py-4 px-6 font-medium">Last Login</th>
                <th className="text-left py-4 px-6 font-medium">Status</th>
                <th className="text-right py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id} 
                  className="border-b border-neu-light-gray/50 dark:border-neu-dark-gray/50 hover:bg-neu-light-gray/30 dark:hover:bg-neu-dark-gray/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <span>{user.name}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-neu-gray dark:text-neu-light-gray" />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-neu-gray dark:text-neu-light-gray" />
                      <span>{user.role}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-neu-gray dark:text-neu-light-gray" />
                      <span>{formatDate(user.lastLogin)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      user.status === "Active" 
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" 
                        : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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

export default Users;
