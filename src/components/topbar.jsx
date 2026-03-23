import {
    ChevronDown,
    Search,
    UserCircle2,
    ShoppingCart,
  } from "lucide-react";
  
  export default function Navbar() {
    return (
      <header className="w-full">
        {/* Top announcement bar */}
        <div className="w-full bg-[#c7ebc9] text-[#2d3a2d]">
          <div className="mx-auto flex max-w-[1780px] items-center justify-between px-8 py-3">
            {/* Left - About dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-[18px] font-medium">
                <span>About</span>
                <ChevronDown size={18} strokeWidth={2.2} />
              </button>
  
              <div className="absolute left-0 top-full z-50 pt-3">
                <div className="invisible min-w-[230px] translate-y-2 rounded-[18px] border border-[#e8e8e8] bg-white p-2 opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <a
                    href="#"
                    className="block rounded-[14px] px-4 py-4 text-[18px] font-medium text-[#2b2b2b] transition hover:bg-[#f6f6f6]"
                  >
                    About Us
                  </a>
                  <a
                    href="#"
                    className="block rounded-[14px] px-4 py-4 text-[18px] font-medium text-[#2b2b2b] transition hover:bg-[#f6f6f6]"
                  >
                    Koala Second Home
                  </a>
                  <a
                    href="#"
                    className="block rounded-[14px] px-4 py-4 text-[18px] font-medium text-[#2b2b2b] transition hover:bg-[#f6f6f6]"
                  >
                    Koala Showroom
                  </a>
                </div>
              </div>
            </div>
  
            {/* Center */}
            <div className="flex items-center gap-3 text-[18px] font-medium">
              <span className="whitespace-nowrap">
                Up to 30% off + EXTRA $100 off ends
              </span>
  
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-white px-2 py-[2px] font-bold text-black">
                  01:D
                </div>
                <div className="rounded-md bg-white px-2 py-[2px] font-bold text-black">
                  01:H
                </div>
                <div className="rounded-md bg-white px-2 py-[2px] font-bold text-black">
                  21:M
                </div>
                <div className="rounded-md bg-white px-2 py-[2px] font-bold text-black">
                  41:S
                </div>
              </div>
            </div>
  
            {/* Right */}
            <div className="flex items-center gap-10 text-[18px] font-medium">
              <span className="cursor-pointer">FAQs</span>
              <span className="cursor-pointer">Trade</span>
              <span className="cursor-pointer">Manage my orders</span>
  
              <div className="cursor-pointer flex items-center gap-1">
                <span className="text-[20px]">🇦🇺</span>
                <ChevronDown size={18} strokeWidth={2.2} />
              </div>
            </div>
          </div>
        </div>
  
        {/* Main navbar */}
        <nav className="w-full border-b border-[#e8e8e8] bg-white">
          <div className="mx-auto flex max-w-[1780px] items-center justify-between px-8 py-5">
            {/* Logo */}
            <div className="flex min-w-fit items-center">
              <h1 className="text-[74px] font-extrabold lowercase leading-none tracking-[-3px] text-[#7b8168]">
                koala
              </h1>
              <span className="ml-1 mt-7 text-[14px] text-[#7b8168]">®</span>
            </div>
  
            {/* Center menu */}
            <div className="hidden items-center gap-12 lg:flex">
              <button className="rounded-full bg-[#cdeccf] px-5 py-2 text-[16px] font-semibold text-[#556b58] transition hover:opacity-90">
                Shop Sale
              </button>
  
              <button className="flex items-center gap-2 text-[18px] font-medium text-[#1f1f1f]">
                <span>Living Room</span>
                <ChevronDown size={20} />
              </button>
  
              <button className="flex items-center gap-2 text-[18px] font-medium text-[#1f1f1f]">
                <span>Bedroom</span>
                <ChevronDown size={20} />
              </button>
  
              <button className="flex items-center gap-2 text-[18px] font-medium text-[#1f1f1f]">
                <span>Outdoor</span>
                <ChevronDown size={20} />
              </button>
  
              <button className="flex items-center gap-2">
                <ChevronDown size={20} className="text-[#1f1f1f]" />
              </button>
            </div>
  
            {/* Right icons */}
            <div className="flex items-center gap-6 text-[#1f1f1f]">
              <button className="transition hover:scale-105">
                <Search size={34} strokeWidth={2} />
              </button>
  
              <button className="transition hover:scale-105">
                <UserCircle2 size={34} strokeWidth={2} />
              </button>
  
              <button className="transition hover:scale-105">
                <ShoppingCart size={34} strokeWidth={2} />
              </button>
            </div>
          </div>
        </nav>
      </header>
    );
  }
  
  