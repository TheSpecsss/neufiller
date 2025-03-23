'use client';

import { useState, useEffect } from 'react';
import { FileText, Search, Filter, CheckCircle2, Loader2 } from 'lucide-react';
import GlassmorphicCard from '@/components/ui-custom/GlassmorphicCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const UserDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Legal', 'Financial', 'HR', 'Business', 'Real Estate'];
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='page-container pt-24'>
      <h1 className='text-3xl font-bold mb-2 animate-fade-in'>Available Templates</h1>
      <p className='text-neu-gray dark:text-neu-light-gray mb-8 animate-fade-in'>
        Select a template to begin filling out your document
      </p>
      
      <GlassmorphicCard 
        className={`mb-8 transition-all duration-1000 animate-fade-in ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neu-gray dark:text-neu-light-gray' />
            <Input
              placeholder='Search templates...'
              className='pl-10 input-field'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='flex gap-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className='secondary-button'>
                  <Filter className='mr-2 h-4 w-4' />
                  {selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='glass-panel'>
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category} 
                    className={selectedCategory === category ? 'font-medium' : ''}
                  >
                    {category}
                    {selectedCategory === category && <CheckCircle2 className='ml-2 h-4 w-4' />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </GlassmorphicCard>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
        {[...Array(6)].map((_, index) => (
          <GlassmorphicCard 
            key={index} 
            className='hover:shadow-lg transition-all duration-300 animate-fade-in'
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className='p-6'>
              <div className='flex items-center mb-4'>
                <div className='rounded-full p-2 bg-neu-light-gray dark:bg-neu-dark-gray mr-3'>
                  <FileText className='h-5 w-5' />
                </div>
                <h3 className='text-lg font-semibold'>Template {index + 1}</h3>
              </div>
              <p className='text-sm text-neu-gray dark:text-neu-light-gray mb-4'>
                Description of the template goes here.
              </p>
              <div className='flex justify-between items-center'>
                <span className='text-xs px-3 py-1 rounded-full bg-neu-light-gray dark:bg-neu-dark-gray'>
                  Category
                </span>
                <Button size='sm' className='primary-button'>
                  Select
                </Button>
              </div>
            </div>
          </GlassmorphicCard>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
