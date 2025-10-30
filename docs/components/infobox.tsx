import * as React from "react";
import { cn } from "@/lib/utils";
import { TriangleAlert, Info, Lightbulb } from "lucide-react";

type InfoBoxType = "info" | "warning" | "tip";

const typeConfig = {
  info: {
    icon: Info,
    styles: {
      border: "border-blue-200",
      bg: "bg-blue-50",
      text: "text-blue-800",
      darkBorder: "dark:border-blue-800",
      darkBg: "dark:bg-blue-900/20",
      darkText: "dark:text-blue-200",
    },
  },
  warning: {
    icon: TriangleAlert,
    styles: {
      border: "border-yellow-200",
      bg: "bg-yellow-50",
      text: "text-yellow-800",
      darkBorder: "dark:border-yellow-800",
      darkBg: "dark:bg-yellow-900/20",
      darkText: "dark:text-yellow-200",
    },
  },
  tip: {
    icon: Lightbulb,
    styles: {
      border: "border-green-200",
      bg: "bg-green-50",
      text: "text-green-800",
      darkBorder: "dark:border-green-800",
      darkBg: "dark:bg-green-900/20",
      darkText: "dark:text-green-200",
    },
  },
};

const InfoBox = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    type?: InfoBoxType;
    title?: string;
    children: React.ReactNode;
  }
>(({ className, type = "warning", title, children, ...props }, ref) => {
  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "not-prose flex items-start gap-3 rounded-lg border p-4 text-sm",
        config.styles.border,
        config.styles.bg,
        config.styles.text,
        config.styles.darkBorder,
        config.styles.darkBg,
        config.styles.darkText,
        className
      )}
      {...props}
    >
      <IconComponent className="h-4 w-4 shrink-0 mt-0.5" />
      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
        {title && (
          <div className={cn("font-semibold leading-tight", config.styles.text, config.styles.darkText)}>
            {title}
          </div>
        )}
        <div className={cn("leading-relaxed", config.styles.text, config.styles.darkText)}>
          {children}
        </div>
      </div>
    </div>
  );
});

InfoBox.displayName = "InfoBox";

export { InfoBox };
