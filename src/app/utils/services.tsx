import * as React from 'react';
import { Pencil } from 'lucide-react';

export const SectionLabel = ({ text }: { text: string }) => {
    return (
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-px bg-[#1558cb]" />
        <span className="text-[#1558cb] text-[11px] font-bold tracking-[0.22em] uppercase">
          {text}
        </span>
      </div>
    );
  }

  export const EditableImage = ({
    id,
    src,
    alt,
    className,
    wrapperClassName,
    isAdmin,
    store,
    onReplace,
  }: {
    id: string;
    src: string;
    alt: string;
    className?: string;
    wrapperClassName?: string;
    isAdmin: boolean;
    store: Record<string, string>;
    onReplace: (id: string, file: File) => void;
  }) => {
    const fileRef = React.useRef<HTMLInputElement>(null);
    const displayed = store[id] ?? src;
    return (
      <div className={wrapperClassName ?? "relative group/ei w-full h-full"}>
        <img src={displayed} alt={alt} className={className} />
        {isAdmin && (
          <>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) onReplace(id, e.target.files[0]);
              }}
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 group-hover/ei:opacity-100 transition-opacity z-10 cursor-pointer"
            >
              <span className="bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                <Pencil size={12} />
                Replace Photo
              </span>
            </button>
          </>
        )}
      </div>
    );
  }