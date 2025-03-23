'use client';

import { useState, useEffect } from 'react';
import { Search, DownloadCloud, Eye, Trash2 } from 'lucide-react';
import GlassmorphicCard from '@/components/ui-custom/GlassmorphicCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const UserDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='page-container pt-24'>
      <h1 className='text-3xl font-bold mb-2 animate-fade-in'>My Documents</h1>
      <p className='text-neu-gray dark:text-neu-light-gray mb-8 animate-fade-in'>
        Access and manage your generated documents
      </p>
      
      <GlassmorphicCard 
        className={`mb-8 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className='p-6'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neu-gray dark:text-neu-light-gray' />
            <Input
              placeholder='Search documents...'
              className='pl-10 input-field'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </GlassmorphicCard>
      
      <GlassmorphicCard 
        className={`animate-slide-up transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className='py-12 text-center'>
          <p className='text-neu-gray dark:text-neu-light-gray mb-4'>No documents found</p>
          <Button className='primary-button'>
            Create a Document
          </Button>
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default UserDocuments;
