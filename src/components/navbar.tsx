'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Check if we're on documents or research pages
  const isInvertedPage = pathname?.startsWith('/documents') || pathname?.startsWith('/research') || pathname?.startsWith('/live');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof Element) {
        if (!event.target.closest('.navbar-container')) {
          setIsDropdownOpen(false);
        }
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isDropdownOpen]);

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/live', label: 'البث المباشر' },
    { href: '/research', label: 'البحوث' },
    { href: '/documents', label: 'الوثائق' },
  ];

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 navbar-container transition-all duration-700`}
    >
      <div
        className="relative"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
        onClick={(e) => {
          if (!isDropdownOpen) {
            e.preventDefault();
            setIsDropdownOpen(true);
          }
        }}
      >
        <div className="relative flex flex-col items-center justify-center">
          <div
            className={`px-5 py-1 rounded-2xl transition-all duration-500 ease-out ${isDropdownOpen ? 'rounded-b-none navbar-active' : 'navbar-pulse'} ${isInvertedPage ? 'bg-sand' : 'bg-mud'}`}
          >
            <div className="block cursor-pointer">
              <Image
                src={isInvertedPage ? '/signature-mud.png' : '/signature-sand.png'}
                alt="سليمان"
                width={180}
                height={100}
                priority
                className="transition-transform duration-500 hover:scale-107 w-[120px] h-auto md:w-[180px]"
              />
            </div>
          </div>

          <div
            className={`absolute w-full top-full left-1/2 -translate-x-1/2 transition-all duration-500 ease-out ${isDropdownOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
              }`}
          >
            <div className={`rounded-2xl rounded-t-none p-3 flex flex-col gap-1 ${isInvertedPage ? 'bg-sand' : 'bg-mud'}`}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <Link
                    href={link.href}
                    key={link.href}
                    className={`
                      py-3 px-4 flex items-center justify-center
                      transition-all duration-300 rounded-xl
                      text-base md:text-lg font-medium
                      ${isInvertedPage
                        ? `text-mud hover:bg-mud hover:text-sand ${isActive ? 'bg-mud/10' : ''}`
                        : `text-sand hover:bg-sand hover:text-mud ${isActive ? 'bg-sand/10' : ''}`
                      }
                    `}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
