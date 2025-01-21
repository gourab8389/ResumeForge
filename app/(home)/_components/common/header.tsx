"use client"

import Logo from '@/components/shared/logo';
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { Loader } from 'lucide-react';
import { Fragment } from 'react';

const Header = () => {

  const { user, isAuthenticated, isLoading, error } = useKindeBrowserClient();
  
  return (
    <div className='shadow-sm w-full sticky top-0 bg-white dark:bg-gray-900 z-[9]'>
      <div className="w-full mx-auto max-w-7xl py-2 px-5 flex items-center justify-between">
        <div className="flex items-center flex-1 gap-9">
            <Logo/>
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                
                <span className='font-normal text-black/50 dark:text-primary-foreground'>
                  Hi, 
                </span>
                <h2 className='font-bold text-black dark:text-primary-foreground text-lg'>
                  {user?.given_name} {user?.family_name}
                </h2>
              </div>
            ) : null}
        </div>
        <div className="flex items-center gap-4">
          {isLoading || error ? (
            <Loader className='w-8 h-8 animate-spin'/>
          ): (
            <Fragment>
              
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header;
