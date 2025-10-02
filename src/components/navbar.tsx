'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // Intersection Observer for active section
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    // Show navbar when scrolled past 80% of viewport
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      // Show navbar when scrolled more than 80% of viewport height
      setShowNavbar(scrollPosition > windowHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
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

  const navLinks = [
    { href: '#about', label: 'المــــقدمة', section: 'about' },
    { href: '#timeline', label: 'جدوــــل الندوة', section: 'timeline' },
    { href: '#documents', label: 'الوثائق', section: 'documents' },
  ];

  const handleLinkClick = (href: string) => {
    setIsDropdownOpen(false);
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 navbar-container transition-all duration-700 ${showNavbar
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 -translate-y-20 pointer-events-none'
        }`}
    >
      <div
        className="relative"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => {
          setIsDropdownOpen(false);
        }}
      >
        {/* Background container that properly wraps the signature */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Mud background that collapses */}
          <div
            className={`bg-mud rounded-2xl transition-all duration-500 ease-out ${isDropdownOpen ? 'rounded-b-none' : ''
              }`}
            style={{
              padding: isDropdownOpen ? '4px 20px' : '4px 100px',
            }}
          >
            {/* Signature Image */}
            <Link
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#hero');
              }}
              className="block"
            >
              <Image
                src="/signature.png"
                alt="سليمان"
                width={180}
                height={100}
                priority
                className="transition-transform duration-500 hover:scale-107"
              />
            </Link>
          </div>

          <div
            className={`transition-all duration-500 ease-out ${isDropdownOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
              }`}
          >
            <div className="bg-mud rounded-2xl p-2 flex">
              {navLinks.map((link) => {
                const isActive = activeSection === link.section;

                return (
                  <Link
                    href={link.href}
                    key={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className={`
                      w-48 py-4 flex items-center justify-center 
                      transition-all duration-500 rounded-2xl
                      ${isActive
                        ? 'bg-sand text-mud'
                        : 'text-sand hover:text-white'
                      }
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
