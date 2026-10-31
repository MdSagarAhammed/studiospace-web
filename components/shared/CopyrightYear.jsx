"use client";

import { useState, useEffect } from "react";

/** Copyright year — computed on the client so prerenders stay deterministic. */
export function CopyrightYear() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>© {year} StudioSpace. All rights reserved.</>;
}
