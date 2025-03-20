"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Search, Filter, CheckCircle2, Loader2 } from "lucide-react";
import GlassmorphicCard from "@/components/ui-custom/GlassmorphicCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const dummyTemplates = [
  { id: "1", name: "Service Agreement", category: "Legal", description: "Standard service agreement with terms and conditions" },
  { id: "2", name: "Non-Disclosure Agreement", category: "Legal", description: "Confidentiality agreement for business relationships" },
  { id: "3", name: "Invoice Template", category: "Financial", description: "Professional invoice with itemized billing" },
  { id: "4", name: "Employment Contract", category: "HR", description: "Standard employment agreement with terms and benefits" },
  { id: "5", name: "Project Proposal", category: "Business", description: "Business project proposal with timeline and budget" },
  { id: "6", name: "Lease Agreement", category: "Real Estate", description: "Residential or commercial property lease contract" },
];

const categories = ["All", "Legal", "Financial", "HR", "Business", "Real Estate"];

const AllTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

  const filteredTemplates = dummyTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container pt-24">
      <h1 className="text-3xl font-bold mb-2">Available Templates</h1>
      <p className="text-muted mb-8">Select a template to begin filling out your document</p>

      <GlassmorphicCard className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Filter className="mr-2 h-4 w-4" />
                {selectedCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((category) => (
                <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                  {category}
                  {selectedCategory === category && <CheckCircle2 className="ml-2 h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </GlassmorphicCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <GlassmorphicCard key={template.id} className="cursor-pointer">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FileText className="mr-3" />
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                </div>
                <p className="text-sm text-muted mb-4">{template.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800">{template.category}</span>
                  <Button size="sm">Select</Button>
                </div>
              </div>
            </GlassmorphicCard>
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-lg text-muted">No templates found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTemplates;