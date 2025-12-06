'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Check if we're on documents or research pages
  const isInvertedPage = pathname?.startsWith('/documents') || pathname?.startsWith('/research');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Use a type guard to check if the target is an Element
      if (event.target instanceof Element) {
        if (!event.target.closest('.navbar-container')) {
          // TypeScript now knows that event.target is an Element
          setIsDropdownOpen(false);
        }
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isDropdownOpen]);

  // --- MODIFIED: Updated links as per your request ---
  const navLinks = [
    { href: '/#timeline', label: 'جدوــــل الندوة' },
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
            className={`px-5 py-1 rounded-2xl transition-all duration-500 ease-out ${isDropdownOpen ? 'rounded-b-none' : 'md:px-28'} ${isInvertedPage ? 'bg-sand' : 'bg-mud'}`}
          >
            <Link href="/#hero" className="block">
              <Image
                src={isInvertedPage ? '/signature-mud.png' : '/signature-sand.png'}
                alt="سليمان"
                width={180}
                height={100}
                priority
                className="transition-transform duration-500 hover:scale-107 w-[120px] h-auto md:w-[180px]"
              />
            </Link>
          </div>

          <div
            className={`transition-all duration-500 ease-out ${isDropdownOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
              }`}
          >
            <div className={`rounded-2xl p-2 flex ${isInvertedPage ? 'bg-sand' : 'bg-mud'}`}>
              {navLinks.map((link) => {
                return (
                  <Link
                    href={link.href}
                    key={link.href}
                    className={`
                      w-32 md:w-48 py-2 md:py-4 flex items-center justify-center
                      transition-all duration-500 rounded-2xl
                      text-sm md:text-base
                      ${isInvertedPage ? 'text-mud hover:text-mud/70' : 'text-sand hover:text-white'}
                    `}
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
