"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type AnimationType = "up" | "left" | "right" | "scale" | "fade";

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  type?: AnimationType;
  className?: string;
  threshold?: number;
}

const typeToClass: Record<AnimationType, string> = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
  fade: "reveal",
};

export function AnimateIn({
  children,
  delay = 0,
  type = "up",
  className,
  threshold = 0.1,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = delay;
          setTimeout(() => {
            el.classList.add("visible");
          }, t);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const revealClass = typeToClass[type] ?? "reveal";

  return (
    <div
      ref={ref}
      className={cn(revealClass, className)}
      style={delay ? ({ transitionDelay: `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

/** Stagger-animates all direct children when the container enters the viewport */
export function StaggerGroup({
  children,
  className,
  staggerMs = 60,
}: {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = Array.from(el.children) as HTMLElement[];
    items.forEach((child) => {
      child.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((child, i) => {
            setTimeout(() => child.classList.add("visible"), i * staggerMs);
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [staggerMs]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
