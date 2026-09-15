import * as React from "react";
import { cn } from "@/lib/utils";

type ShellProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
};

export function Shell({ as: Tag = "div", className, children, ...props }: ShellProps) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-[116px]", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Shell;
