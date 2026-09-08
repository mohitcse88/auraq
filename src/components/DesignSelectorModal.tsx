import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, X, Palette, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DESIGN_THEMES } from '../data/designThemes';

export const DesignSelectorModal: React.FC = () => {
  const { currentTheme, setTheme, isDesignModalOpen, setIsDesignModalOpen } = useStore();

  return (
    <AnimatePresence>
      {isDesignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-4xl bg-white border border-neutral-200 shadow-2xl overflow-hidden my-8"
            style={{ borderRadius: currentTheme.cardRadius === 'rounded-none' ? '0px' : '16px' }}
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-neutral-100 bg-neutral-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-neutral-900 text-white text-xs tracking-wider uppercase font-medium mb-2">
                  <Palette size={13} />
                  <span>Aesthetic Direction Selector</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-heading">
                  Choose Your AURAQ Design System
                </h2>
                <p className="text-sm text-neutral-600 mt-1 max-w-xl">
                  Select your preferred aesthetic direction. Each preset updates typography,
                  color accents, button styles, and spatial atmosphere across the entire storefront in real-time.
                </p>
              </div>

              <button
                onClick={() => setIsDesignModalOpen(false)}
                className="self-end sm:self-start p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200/60 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Themes Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[62vh] overflow-y-auto">
              {DESIGN_THEMES.map((theme) => {
                const isSelected = currentTheme.id === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => setTheme(theme)}
                    className={`group relative p-5 cursor-pointer border-2 transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-neutral-900 bg-neutral-50/50 shadow-md ring-1 ring-neutral-900'
                        : 'border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50/30'
                    }`}
                    style={{
                      borderRadius: theme.cardRadius === 'rounded-none' ? '0px' : '12px',
                    }}
                  >
                    {isSelected && (
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 text-white text-xs font-semibold tracking-wide">
                        <Check size={12} strokeWidth={3} />
                        <span>ACTIVE</span>
                      </div>
                    )}

                    <div>
                      {/* Color Bar / Swatches */}
                      <div className="flex items-center gap-2 mb-4">
                        <div
                          className="w-7 h-7 rounded-full shadow-inner border border-black/10 flex items-center justify-center text-white"
                          style={{ backgroundColor: theme.accentColor }}
                        >
                          {isSelected && <Check size={14} strokeWidth={2.5} />}
                        </div>
                        <div
                          className="w-5 h-5 rounded-full border border-neutral-300"
                          style={{ backgroundColor: theme.accentLight }}
                        />
                        <div className="w-5 h-5 rounded-full bg-neutral-900" />
                        <div className="w-5 h-5 rounded-full bg-neutral-100 border border-neutral-300" />
                      </div>

                      <div className="mb-1">
                        <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
                          {theme.subtitle}
                        </span>
                        <h3 className="text-lg font-bold text-neutral-900">{theme.name}</h3>
                      </div>

                      <p className="text-xs text-neutral-600 mb-4 leading-relaxed line-clamp-2">
                        {theme.vibe}
                      </p>

                      {/* Interactive Visual Preview Box */}
                      <div
                        className="p-3.5 border border-neutral-200 bg-white space-y-2 mb-4"
                        style={{
                          borderRadius: theme.cardRadius === 'rounded-none' ? '0px' : '8px',
                        }}
                      >
                        <div className="flex items-center justify-between text-xs text-neutral-500 pb-1 border-b border-neutral-100">
                          <span style={{ fontFamily: theme.fontHeading }} className="font-semibold text-neutral-900">
                            AURAQ PREVIEW
                          </span>
                          <span className="text-[10px] tracking-widest text-neutral-400">
                            {theme.fontHeading.split(',')[0].replace(/['"]/g, '')}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-1">
                          <div className="text-xs">
                            <p className="font-medium text-neutral-900">Structured Blazer</p>
                            <p className="text-[11px] text-neutral-500">$185.00</p>
                          </div>

                          <div
                            className="px-3 py-1.5 text-xs font-medium text-white transition-opacity group-hover:opacity-95"
                            style={{
                              backgroundColor: theme.accentColor,
                              borderRadius: theme.buttonRadius === 'rounded-none' ? '0px' : '6px',
                            }}
                          >
                            Add to Bag
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTheme(theme);
                      }}
                      className={`w-full py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                      }`}
                      style={{
                        borderRadius: theme.buttonRadius === 'rounded-none' ? '0px' : '6px',
                      }}
                    >
                      {isSelected ? (
                        <>
                          <Check size={14} />
                          <span>Design Applied</span>
                        </>
                      ) : (
                        <>
                          <span>Select This Aesthetic</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-neutral-100 bg-neutral-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-500 flex items-center gap-2">
                <Sparkles size={14} className="text-neutral-700" />
                <span>You can re-open this selector anytime via the top bar design pill.</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsDesignModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-neutral-900 hover:bg-neutral-800 transition-colors shadow-sm"
                  style={{
                    borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '6px',
                  }}
                >
                  Confirm & Explore AURAQ Store
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
