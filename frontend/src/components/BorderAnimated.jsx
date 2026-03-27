// components/BorderAnimated.jsx
import React from "react";

const BorderAnimated = ({ children }) => {
  return (
    // 1. Removed max-w-105.5. Added h-full.
    <div className="w-full h-full [background:linear-gradient(45deg,#172033,--theme(--color-slate-800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),--theme(--color-slate-600/.48)_80%,--theme(--color-indigo-500)_86%,--theme(--color-indigo-300)_90%,--theme(--color-indigo-500)_94%,--theme(--color-slate-600/.48))_border-box] rounded-2xl border border-transparent animate-border">
      {/* 2. Added this inner wrapper so the form background doesn't bleed out of the border */}
      <div className="w-full h-full rounded-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default BorderAnimated;
