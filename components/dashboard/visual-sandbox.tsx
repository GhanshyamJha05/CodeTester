"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  FileImage,
  Layers,
  RefreshCw,
  Sliders,
  Sparkles,
  Upload
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PresetType = "checkout" | "modal" | "banner" | "custom";

export function VisualSandbox() {
  const [activePreset, setActivePreset] = useState<PresetType>("checkout");
  const [compareMode, setCompareMode] = useState<"split" | "overlay">("split");
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [baselineImage, setBaselineImage] = useState<string | null>(null);
  const [modifiedImage, setModifiedImage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const baselineInputRef = useRef<HTMLInputElement>(null);
  const modifiedInputRef = useRef<HTMLInputElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: "baseline" | "modified") => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        if (target === "baseline") {
          setBaselineImage(reader.result as string);
        } else {
          setModifiedImage(reader.result as string);
        }
        setActivePreset("custom");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent, target: "baseline" | "modified") => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        if (target === "baseline") {
          setBaselineImage(reader.result as string);
        } else {
          setModifiedImage(reader.result as string);
        }
        setActivePreset("custom");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const resetCustomImages = () => {
    setBaselineImage(null);
    setModifiedImage(null);
    setActivePreset("checkout");
  };

  const currentDiffCount = useMemo(() => {
    if (activePreset === "checkout") return 1; // overlapping button
    if (activePreset === "modal") return 2; // offset shift + accessibility focus escape
    if (activePreset === "banner") return 1; // outdated text content
    return baselineImage && modifiedImage ? 1 : 0;
  }, [activePreset, baselineImage, modifiedImage]);

  return (
    <section className="mt-8 rounded-[1.75rem] border border-white/[.08] bg-white/[.035] p-5 backdrop-blur-xl">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold tracking-tight">Visual Regression Sandbox</h2>
            <Badge tone="cyan">Interactive</Badge>
          </div>
          <p className="mt-1 text-sm text-white/46">
            Compare screenshots via high-end split compare slider or difference mix overlay.
          </p>
        </div>

        {/* Toggle Mode */}
        <div className="flex rounded-xl bg-black/40 p-1 border border-white/5 self-start">
          <button
            onClick={() => setCompareMode("split")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition duration-300",
              compareMode === "split" ? "bg-white/10 text-white" : "text-white/44 hover:text-white/70"
            )}
            type="button"
          >
            <Sliders className="h-3 w-3" />
            Split Slider
          </button>
          <button
            onClick={() => setCompareMode("overlay")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition duration-300",
              compareMode === "overlay" ? "bg-white/10 text-white" : "text-white/44 hover:text-white/70"
            )}
            type="button"
          >
            <Layers className="h-3 w-3" />
            Difference Map
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Left Side: Preset selection & upload slots */}
        <div className="space-y-4">
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-white/34 mb-2">
              Select Preset Pair
            </span>
            <div className="grid gap-2">
              {[
                { id: "checkout", label: "Checkout CTA Overlap" },
                { id: "modal", label: "A11y Modal Shift" },
                { id: "banner", label: "Stale Promo Banner" }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setActivePreset(p.id as PresetType);
                    setBaselineImage(null);
                    setModifiedImage(null);
                  }}
                  className={cn(
                    "w-full px-4 py-2.5 rounded-xl text-left text-xs font-medium transition",
                    activePreset === p.id
                      ? "bg-signal-cyan/10 border border-signal-cyan/35 text-white"
                      : "bg-black/20 border border-white/5 text-white/54 hover:bg-white/[0.04]"
                  )}
                  type="button"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Drag and Drop Zone */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/34">
                Or Upload Custom
              </span>
              {activePreset === "custom" && (
                <button
                  onClick={resetCustomImages}
                  className="font-mono text-[9px] text-signal-cyan hover:underline"
                  type="button"
                >
                  Reset Custom
                </button>
              )}
            </div>

            {/* Baseline Slot */}
            <div
              onDrop={(e) => handleDrop(e, "baseline")}
              onDragOver={handleDragOver}
              onClick={() => baselineInputRef.current?.click()}
              className={cn(
                "group relative h-20 rounded-xl border border-dashed flex flex-col items-center justify-center cursor-pointer transition",
                baselineImage
                  ? "border-signal-green/30 bg-signal-green/5"
                  : "border-white/15 bg-black/10 hover:border-white/30 hover:bg-white/[0.02]"
              )}
            >
              <input
                ref={baselineInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "baseline")}
                className="hidden"
              />
              {baselineImage ? (
                <div className="flex items-center gap-2 text-xs text-signal-green font-medium">
                  <FileImage className="h-4 w-4" />
                  <span>Baseline loaded</span>
                </div>
              ) : (
                <>
                  <Upload className="h-4 w-4 text-white/34 group-hover:text-white/60 transition" />
                  <span className="mt-1 text-[10px] text-white/38">Drop original image</span>
                </>
              )}
            </div>

            {/* Modified Slot */}
            <div
              onDrop={(e) => handleDrop(e, "modified")}
              onDragOver={handleDragOver}
              onClick={() => modifiedInputRef.current?.click()}
              className={cn(
                "group relative h-20 rounded-xl border border-dashed flex flex-col items-center justify-center cursor-pointer transition",
                modifiedImage
                  ? "border-signal-red/30 bg-signal-red/5"
                  : "border-white/15 bg-black/10 hover:border-white/30 hover:bg-white/[0.02]"
              )}
            >
              <input
                ref={modifiedInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "modified")}
                className="hidden"
              />
              {modifiedImage ? (
                <div className="flex items-center gap-2 text-xs text-signal-red font-medium">
                  <FileImage className="h-4 w-4" />
                  <span>Modified loaded</span>
                </div>
              ) : (
                <>
                  <Upload className="h-4 w-4 text-white/34 group-hover:text-white/60 transition" />
                  <span className="mt-1 text-[10px] text-white/38">Drop modified image</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Diff Interactive Sandbox */}
        <div className="relative min-h-[300px] rounded-2xl border border-white/10 bg-black/32 overflow-hidden flex flex-col justify-between">
          {/* Main sandbox area */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseLeave={handleMouseLeaveOrUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseLeaveOrUp}
            className="relative flex-1 w-full min-h-[320px] select-none overflow-hidden touch-none"
          >
            {compareMode === "split" ? (
              // Split Compare View
              <div className="absolute inset-0 w-full h-full p-4">
                {/* Baseline Image / Layout (Base layer, visible on right side) */}
                <div className="absolute inset-0 p-4">
                  {activePreset === "custom" ? (
                    baselineImage ? (
                      <img src={baselineImage} className="w-full h-full object-contain rounded-xl select-none" alt="Baseline" />
                    ) : (
                      <EmptyPlaceholder label="baseline" />
                    )
                  ) : (
                    renderPresetUI(activePreset, "baseline")
                  )}
                </div>

                {/* Modified Image / Layout (Overlay layer, cropped on left side) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none p-4"
                  style={{ width: `${sliderPos}%` }}
                >
                  <div
                    className="absolute inset-y-0 left-0 p-4 pointer-events-none"
                    style={{ width: containerRef.current?.getBoundingClientRect().width || 600 }}
                  >
                    {activePreset === "custom" ? (
                      modifiedImage ? (
                        <img src={modifiedImage} className="w-full h-full object-contain rounded-xl select-none" alt="Modified" />
                      ) : (
                        <EmptyPlaceholder label="modified" />
                      )
                    ) : (
                      renderPresetUI(activePreset, "modified")
                    )}
                  </div>
                </div>

                {/* Slider divider bar */}
                <div
                  className="absolute inset-y-0 w-1 bg-signal-cyan cursor-col-resize z-30 flex items-center justify-center group shadow-[0_0_12px_#00f2ff]"
                  style={{ left: `${sliderPos}%` }}
                  onMouseDown={() => setIsDragging(true)}
                  onTouchStart={() => setIsDragging(true)}
                >
                  <div className="h-8 w-4 rounded bg-signal-cyan flex flex-col justify-center items-center gap-0.5 shadow-neon">
                    <span className="h-3 w-[1px] bg-ink-950" />
                    <span className="h-3 w-[1px] bg-ink-950" />
                  </div>
                </div>
              </div>
            ) : (
              // Overlay / Difference Map View
              <div className="absolute inset-0 w-full h-full p-4">
                {/* Base Image */}
                <div className="absolute inset-0 p-4">
                  {activePreset === "custom" ? (
                    baselineImage ? (
                      <img src={baselineImage} className="w-full h-full object-contain rounded-xl select-none" alt="Baseline" />
                    ) : (
                      <EmptyPlaceholder label="baseline" />
                    )
                  ) : (
                    renderPresetUI(activePreset, "baseline")
                  )}
                </div>

                {/* Modified overlay with mix-blend-difference */}
                <div className="absolute inset-0 p-4 mix-blend-difference pointer-events-none opacity-90">
                  {activePreset === "custom" ? (
                    modifiedImage ? (
                      <img src={modifiedImage} className="w-full h-full object-contain rounded-xl select-none" alt="Modified" />
                    ) : null
                  ) : (
                    renderPresetUI(activePreset, "modified")
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sandbox Footer bar */}
          <div className="border-t border-white/[.08] bg-black/40 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-signal-cyan" />
              <span className="font-mono text-white/58">
                {activePreset === "custom" 
                  ? "Comparing custom uploads" 
                  : `Visual regression: ${activePreset.toUpperCase()}`}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-white/34">
                {compareMode === "split" 
                  ? `slider: ${Math.round(sliderPos)}%` 
                  : "blend mode: difference"}
              </span>
              <div className={cn(
                "rounded-full px-2.5 py-0.5 font-mono text-[10px] border flex items-center gap-1.5",
                currentDiffCount > 0 
                  ? "border-signal-red/25 bg-signal-red/10 text-signal-red" 
                  : "border-signal-green/25 bg-signal-green/10 text-signal-green"
              )}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {currentDiffCount > 0 ? `${currentDiffCount} shifts detected` : "no differences"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmptyPlaceholder({ label }: { label: string }) {
  return (
    <div className="w-full h-full border border-dashed border-white/10 bg-white/[0.01] rounded-2xl flex flex-col items-center justify-center font-mono text-white/28 text-xs gap-2">
      <Upload className="h-6 w-6 text-white/20 animate-pulse" />
      <span>Upload custom {label} image on the left</span>
    </div>
  );
}

function renderPresetUI(preset: PresetType, version: "baseline" | "modified") {
  switch (preset) {
    case "checkout":
      return <PresetCheckout version={version} />;
    case "modal":
      return <PresetModal version={version} />;
    case "banner":
      return <PresetBanner version={version} />;
    default:
      return null;
  }
}

function PresetCheckout({ version }: { version: "baseline" | "modified" }) {
  return (
    <div className="w-full h-full bg-[#0a0f18] p-6 rounded-xl flex flex-col justify-between font-sans select-none border border-white/5">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-20 rounded bg-white/10" />
          <div className="h-5 w-12 rounded bg-signal-cyan/20 border border-signal-cyan/30 flex items-center justify-center text-[10px] font-mono text-signal-cyan">
            MOBILE
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="h-2 w-14 rounded bg-white/20" />
            <div className="h-8 w-full rounded-lg bg-white/[0.03] border border-white/10 flex items-center px-3 text-[10px] text-white/40">
              •••• •••• •••• 4242
            </div>
          </div>
          
          <div className="space-y-1.5">
            <div className="h-2 w-16 rounded bg-white/20" />
            <div className="h-8 w-full rounded-lg bg-white/[0.03] border border-white/10 flex items-center px-3 text-[10px] text-signal-cyan font-mono">
              SPRING-OLD
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative mt-4">
        {version === "baseline" ? (
          <>
            <div className="mb-3 p-2.5 rounded-lg bg-signal-green/10 border border-signal-green/20 text-[9px] text-signal-green font-mono">
              ✓ Promo applied successfully: -$25.00
            </div>
            <div className="h-10 w-full rounded-lg bg-signal-green flex items-center justify-center text-xs font-bold text-black uppercase tracking-wider shadow-[0_4px_12px_rgba(34,197,94,0.2)]">
              Confirm Order
            </div>
          </>
        ) : (
          <div className="relative">
            {/* Error Message */}
            <div className="p-2.5 rounded-lg bg-signal-red/10 border border-signal-red/20 text-[9px] text-signal-red font-mono">
              ✗ Promo expired or invalid
            </div>
            {/* Overlapping Button */}
            <div className="absolute top-3 left-0 right-0 h-10 w-full rounded-lg bg-signal-green border border-signal-red/50 flex items-center justify-center text-xs font-bold text-black uppercase tracking-wider shadow-[0_-8px_16px_rgba(255,88,113,0.3)] animate-pulse">
              Confirm Order
            </div>
            {/* Visual indicator highlighting regression */}
            <div className="absolute -top-1 left-[20%] right-[20%] h-px bg-signal-red shadow-[0_0_12px_#ff5871]" />
          </div>
        )}
      </div>
    </div>
  );
}

function PresetModal({ version }: { version: "baseline" | "modified" }) {
  const isModified = version === "modified";
  return (
    <div className="w-full h-full bg-[#03070c] p-4 rounded-xl flex items-center justify-center relative overflow-hidden border border-white/5">
      {/* Background wireframe */}
      <div className="w-full space-y-3 opacity-10">
        <div className="h-6 w-1/3 rounded bg-white" />
        <div className="h-16 w-full rounded bg-white" />
        <div className="h-8 w-full rounded bg-white" />
      </div>
      
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      
      {/* Modal element */}
      <div 
        className={cn(
          "absolute w-[80%] max-w-[200px] bg-[#0c121e] border rounded-xl p-3.5 shadow-cinematic transition-transform duration-300",
          isModified 
            ? "border-signal-red/40 translate-x-3 -translate-y-4 rotate-2 scale-[1.02]" 
            : "border-white/10 translate-x-0 translate-y-0 rotate-0 scale-100"
        )}
      >
        <div className="flex items-center gap-1.5 mb-2">
          <div className="h-2 w-2 rounded-full bg-signal-cyan" />
          <div className="h-2.5 w-16 rounded bg-white/20" />
        </div>
        <div className="space-y-1 mb-3">
          <div className="h-1 w-full rounded bg-white/10" />
          <div className="h-1 w-[80%] rounded bg-white/10" />
        </div>
        <div className="flex justify-end gap-1.5">
          <div className="h-5 w-10 rounded bg-white/5" />
          <div className={cn("h-5 w-14 rounded", isModified ? "bg-signal-red/20" : "bg-signal-cyan/20")} />
        </div>
        
        {isModified && (
          <>
            <div className="absolute -inset-[1px] border border-signal-red rounded-xl pointer-events-none" />
            <div className="absolute -top-2 -right-2 h-4 w-4 bg-signal-red rounded-full flex items-center justify-center text-[8px] font-black text-white">
              !
            </div>
          </>
        )}
      </div>
      
      {isModified && (
        <div className="absolute bottom-2 left-2 right-2 text-center text-[8px] font-mono text-signal-red bg-signal-red/10 border border-signal-red/20 py-1 rounded">
          ⚠️ Alignment deviation: Δx +12px, Δy -16px
        </div>
      )}
    </div>
  );
}

function PresetBanner({ version }: { version: "baseline" | "modified" }) {
  const isModified = version === "modified";
  return (
    <div className="w-full h-full bg-[#06080d] p-5 rounded-xl flex flex-col justify-center gap-4 font-sans select-none border border-white/5">
      <div className={cn(
        "w-full p-3 rounded-lg border flex items-center justify-between transition",
        isModified 
          ? "bg-signal-red/5 border-signal-red/25" 
          : "bg-signal-green/5 border-signal-green/25"
      )}>
        <div className="flex items-center gap-2">
          <span className={cn(
            "h-6 w-6 rounded flex items-center justify-center font-bold text-[10px] uppercase",
            isModified ? "bg-signal-red/20 text-signal-red" : "bg-signal-green/20 text-signal-green"
          )}>
            %
          </span>
          <div>
            <div className="h-2.5 w-24 rounded bg-white/20 mb-1" />
            <div className="text-[9px] text-white/50 font-mono">
              {isModified ? (
                <span>Code: <strong className="text-signal-red underline bg-signal-red/10 px-1">SPRING-OLD</strong> (Stale)</span>
              ) : (
                <span>Code: <strong className="text-signal-green">SUMMER-50</strong> (Active)</span>
              )}
            </div>
          </div>
        </div>
        <div className="h-5 w-12 rounded bg-white/10" />
      </div>
      
      <div className="space-y-2">
        <div className="h-2 w-12 rounded bg-white/10" />
        <div className="h-5 w-full rounded bg-white/[0.02]" />
      </div>
    </div>
  );
}
