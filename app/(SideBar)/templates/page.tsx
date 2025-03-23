"use client"
import { useState } from "react";
import { 
  FileText, 
  Upload, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle2,
  AlertCircle,
  X
} from "lucide-react";
import GlassmorphicCard from "@/components/ui-custom/GlassmorphicCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Mock data for templates
const mockTemplates = [
  { id: 1, name: "Service Agreement", category: "Legal", variables: 12, created: "2023-09-15", status: "Active" },
  { id: 2, name: "Non-Disclosure Agreement", category: "Legal", variables: 8, created: "2023-10-02", status: "Active" },
  { id: 3, name: "Invoice Template", category: "Financial", variables: 15, created: "2023-08-21", status: "Active" },
  { id: 4, name: "Employment Contract", category: "HR", variables: 20, created: "2023-07-30", status: "Active" },
  { id: 5, name: "Project Proposal", category: "Business", variables: 18, created: "2023-11-05", status: "Draft" },
  { id: 6, name: "Lease Agreement", category: "Real Estate", variables: 25, created: "2023-10-12", status: "Active" },
  { id: 7, name: "Consulting Contract", category: "Business", variables: 14, created: "2023-09-28", status: "Draft" },
  { id: 8, name: "Partnership Agreement", category: "Legal", variables: 22, created: "2023-08-19", status: "Active" },
];

// Categories for filtering
const categories = ["All", "Legal", "Financial", "HR", "Business", "Real Estate"];

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showNewTemplateDialog, setShowNewTemplateDialog] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [templateDetails, setTemplateDetails] = useState({
    name: "",
    category: "",
    description: ""
  });

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileSelect = (file: File) => {
    setTemplateFile(file);
    toast.info("File selected: " + file.name);
  };

  const handleUpload = () => {
    if (!templateFile) {
      toast.error("Please select a file to upload");
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Move to the next step after upload completes
          setCurrentStep(2);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleFormSubmit = (templateFieldData: any) => {
    // In a real application, we would send this data to the backend
    console.log("Template details:", templateDetails);
    console.log("Template field data:", templateFieldData);
    
    // Close the dialog and show success message
    setShowNewTemplateDialog(false);
    setCurrentStep(1);
    setTemplateFile(null);
    setTemplateDetails({
      name: "",
      category: "",
      description: ""
    });
    
    toast.success("Template created successfully!");
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      // Reset state when dialog is closed
      setCurrentStep(1);
      setTemplateFile(null);
      setUploadProgress(0);
      setIsUploading(false);
      setTemplateDetails({
        name: "",
        category: "",
        description: ""
      });
    }
    setShowNewTemplateDialog(open);
  };

  return (
    <div className="page-container pt-24">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0 animate-fade-in">Template Management</h1>
        
        <Dialog open={showNewTemplateDialog} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button className="primary-button">
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel sm:max-w-[600px]">
            {currentStep === 1 && (
              <>
                <DialogHeader>
                  <DialogTitle>Upload Template</DialogTitle>
                  <DialogDescription>
                    Upload a PDF template with designated fields for AI data insertion.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-6">
                  <div 
                    className="border-2 border-dashed border-neu-light-gray dark:border-neu-dark-gray rounded-lg p-8 text-center cursor-pointer"
                    onClick={() => document.getElementById('template-file-input')?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleFileSelect(e.dataTransfer.files[0]);
                      }
                    }}
                  >
                    <input 
                      id="template-file-input" 
                      type="file" 
                      accept=".pdf,.docx,.doc" 
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileSelect(e.target.files[0]);
                        }
                      }}
                    />
                    <Upload className="mx-auto h-12 w-12 text-neu-gray dark:text-neu-light-gray mb-4" />
                    <h3 className="font-medium mb-2">Drag & Drop your template</h3>
                    <p className="text-sm text-neu-gray dark:text-neu-light-gray mb-4">
                      Supports PDF, DOC, and DOCX files with form fields
                    </p>
                    <Button className="secondary-button">
                      Browse Files
                    </Button>
                    
                    {templateFile && (
                      <div className="mt-4 text-left flex items-center justify-between p-3 bg-neu-light-gray/30 dark:bg-neu-dark-gray/30 rounded-md">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2" />
                          <span className="text-sm truncate max-w-[200px]">{templateFile.name}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setTemplateFile(null);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {isUploading && (
                    <div className="mt-4">
                      <div className="text-sm text-neu-gray dark:text-neu-light-gray flex justify-between mb-2">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="bg-neu-light-gray dark:bg-neu-dark-gray h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-neu-black dark:bg-neu-white h-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="template-name">Template Name</Label>
                      <Input 
                        id="template-name"
                        placeholder="e.g. Employee Onboarding Form"
                        value={templateDetails.name}
                        onChange={(e) => setTemplateDetails({...templateDetails, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="template-category">Category</Label>
                      <Input 
                        id="template-category"
                        placeholder="e.g. HR, Legal, Financial"
                        value={templateDetails.category}
                        onChange={(e) => setTemplateDetails({...templateDetails, category: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="template-description">Description</Label>
                      <Textarea 
                        id="template-description"
                        placeholder="Brief description of what this template is used for"
                        value={templateDetails.description}
                        onChange={(e) => setTemplateDetails({...templateDetails, description: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button 
                    className="secondary-button" 
                    onClick={() => setShowNewTemplateDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="primary-button" 
                    onClick={handleUpload}
                    disabled={isUploading || !templateFile || !templateDetails.name || !templateDetails.category}
                  >
                    {isUploading ? "Uploading..." : "Continue to Field Setup"}
                  </Button>
                </DialogFooter>
              </>
            )}
            
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Search and filters */}
      <GlassmorphicCard className="mb-8 animate-slide-up">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neu-gray dark:text-neu-light-gray" />
            <Input
              placeholder="Search templates..."
              className="pl-10 input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="secondary-button">
                    <Filter className="mr-2 h-4 w-4" />
                    {selectedCategory}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-panel">
                  {categories.map((category) => (
                    <DropdownMenuItem 
                      key={category} 
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? "font-medium" : ""}
                    >
                      {category}
                      {selectedCategory === category && (
                        <CheckCircle2 className="ml-2 h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </GlassmorphicCard>
      
      {/* Templates table */}
      <GlassmorphicCard className="animate-slide-up">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neu-light-gray dark:border-neu-dark-gray">
                <th className="text-left py-4 px-6 font-medium">Template Name</th>
                <th className="text-left py-4 px-6 font-medium">Category</th>
                <th className="text-left py-4 px-6 font-medium">Variables</th>
                <th className="text-left py-4 px-6 font-medium">Created</th>
                <th className="text-left py-4 px-6 font-medium">Status</th>
                <th className="text-right py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTemplates.map((template) => (
                <tr 
                  key={template.id} 
                  className="border-b border-neu-light-gray/50 dark:border-neu-dark-gray/50 hover:bg-neu-light-gray/30 dark:hover:bg-neu-dark-gray/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-3 text-neu-gray dark:text-neu-light-gray" />
                      <span>{template.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">{template.category}</td>
                  <td className="py-4 px-6">{template.variables}</td>
                  <td className="py-4 px-6">{new Date(template.created).toLocaleDateString()}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      template.status === "Active" 
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" 
                        : "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                    }`}>
                      {template.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-panel">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 focus:text-red-500 dark:text-red-400 dark:focus:text-red-400">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default Templates;
