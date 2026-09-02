"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function SideMenu({ open, onClose }) {
  const panelRef = useRef(null);
  const overlayRef = useRef(null);
  const itemsRef = useRef([]);
  const tlRef = useRef(null);

  const handleHover = (index) => {
    gsap.to(itemsRef.current[index], {
      scale: 1.1,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const handleLeave = (index) => {
    gsap.to(itemsRef.current[index], {
      scale: 1,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const handleClose = () => {
    tlRef.current.eventCallback("onReverseComplete", onClose);
    tlRef.current.reverse();
  };

  useLayoutEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const overlay = overlayRef.current;
    const items = itemsRef.current;

    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline();

      tlRef.current.fromTo(
        overlay,
        {
          //from
          opacity: 0,
        },
        {
          //to
          opacity: 100,
          duration: 0.6,
          ease: "power1.out",
        },
      );

      tlRef.current.fromTo(
        panel,
        { xPercent: 100 },
        {
          xPercent: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "<",
      );

      tlRef.current.fromTo(
        items,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
        "-=0.3",
      );
    });

    return () => ctx.revert();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <aside
        ref={panelRef}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-zinc-950"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="ml-auto mr-8 mt-8 flex h-10 w-10 items-center justify-center
             rounded-full text-zinc-400 hover:bg-zinc-900 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Navigation */}
        <nav className="flex h-full flex-col items-center justify-center gap-10 [perspective:1000px]">
          <Link
            ref={(el) => {
              itemsRef.current[0] = el;
            }}
            href="/"
            onClick={onClose}
            className="text-3xl font-semibold text-zinc-400 hover:text-purple-400"
            onMouseEnter={() => handleHover(0)}
            onMouseLeave={() => handleLeave(0)}
          >
            Home
          </Link>

          <Link
            ref={(el) => {
              itemsRef.current[1] = el;
            }}
            href="/favorites"
            onClick={onClose}
            className="text-3xl font-semibold text-zinc-400 hover:text-purple-400"
            onMouseEnter={() => handleHover(1)}
            onMouseLeave={() => handleLeave(1)}
          >
            Favorites
          </Link>

          <Link
            ref={(el) => {
              itemsRef.current[2] = el;
            }}
            href="/"
            onClick={onClose}
            className="text-3xl font-semibold text-zinc-400 hover:text-purple-400"
            onMouseEnter={() => handleHover(2)}
            onMouseLeave={() => handleLeave(2)}
          >
            Games (Doesn't works)
          </Link>

          <Link
            ref={(el) => {
              itemsRef.current[3] = el;
            }}
            href="/"
            onClick={onClose}
            className="text-3xl font-semibold text-zinc-400 hover:text-purple-400"
            onMouseEnter={() => handleHover(3)}
            onMouseLeave={() => handleLeave(3)}
          >
            About (Doesn't works)
          </Link>
        </nav>
      </aside>
    </div>
  );
}
