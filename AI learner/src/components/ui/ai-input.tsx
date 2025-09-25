"use client";

import { CornerRightUp, Mic } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInputProps {
  id?: string
  placeholder?: string
  minHeight?: number
  maxHeight?: number
  onSubmit?: (value: string) => void
  onMicClick?: () => void
  disabled?: boolean
  className?: string
}

export function AIInput({
  id = "ai-input",
  placeholder = "Type your message...",
  minHeight = 52,
  maxHeight = 200,
  onSubmit,
  onMicClick,
  disabled = false,
  className
}: AIInputProps) {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  });
  const [inputValue, setInputValue] = useState("");

  const handleReset = () => {
    if (!inputValue.trim()) return;
    onSubmit?.(inputValue);
    setInputValue("");
    adjustHeight(true);
  };

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative max-w-xl w-full mx-auto">
        <Textarea
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "max-w-xl bg-black/5 dark:bg-white/5 rounded-3xl pl-6 pr-16",
            "placeholder:text-black/50 dark:placeholder:text-white/50",
            "border-none ring-black/20 dark:ring-white/20",
            "text-black dark:text-white text-wrap",
            "overflow-y-auto resize-none",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            "transition-[height] duration-100 ease-out",
            "leading-[1.2] py-[16px]",
            `min-h-[${minHeight}px]`,
            `max-h-[${maxHeight}px]`,
            "[&::-webkit-resizer]:hidden" // Скрываем ресайзер
          )}
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            adjustHeight();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleReset();
            }
          }}
        />

        <button
          onClick={onMicClick}
          type="button"
          disabled={disabled}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 rounded-xl bg-black/5 dark:bg-white/5 py-1 px-1 transition-all duration-200",
            "hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            inputValue ? "right-10" : "right-3"
          )}
        >
          <Mic className="w-4 h-4 text-black/70 dark:text-white/70" />
        </button>
       <button
  onClick={handleReset}
  type="button"
  disabled={disabled || !inputValue.trim()}
  className={cn(
    "absolute top-1/2 -translate-y-1/2 right-3",
    "rounded-xl bg-black/5 dark:bg-white/5 py-1 px-1",
    "transition-all duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    inputValue && !disabled
      ? "opacity-100 scale-100" 
      : "opacity-0 scale-95 pointer-events-none"
  )}
>
  <CornerRightUp className="w-4 h-4 text-black/70 dark:text-white/70" />
</button>
      </div>
    </div>
  );
}