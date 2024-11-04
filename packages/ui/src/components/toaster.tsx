"use client";

import { Toaster as Sonner } from "sonner";

import { useTheme } from "./themes";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster: React.FC<ToasterProps> = (props) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "group toast rounded-none group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          closeButton:
            "group-[.toast]:text-muted-foreground group-[.toast]:hover:text-background",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
