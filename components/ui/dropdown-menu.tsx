"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "wordflex wordcursor-default wordselect-none worditems-center wordrounded-sm wordpx-2 wordpy-1.5 wordtext-sm wordoutline-none focus:wordbg-accent data-[state=open]:wordbg-accent",
      inset && "wordpl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="wordml-auto wordh-4 wordw-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "wordz-50 wordmin-w-[8rem] wordoverflow-hidden wordrounded-md wordborder wordbg-popover wordp-1 wordtext-popover-foreground wordshadow-lg data-[state=open]:wordanimate-in data-[state=closed]:wordanimate-out data-[state=closed]:wordfade-out-0 data-[state=open]:wordfade-in-0 data-[state=closed]:wordzoom-out-95 data-[state=open]:wordzoom-in-95 data-[side=bottom]:wordslide-in-from-top-2 data-[side=left]:wordslide-in-from-right-2 data-[side=right]:wordslide-in-from-left-2 data-[side=top]:wordslide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "wordz-50 wordmin-w-[8rem] wordoverflow-hidden wordrounded-md wordborder wordbg-popover wordp-1 wordtext-popover-foreground wordshadow-md data-[state=open]:wordanimate-in data-[state=closed]:wordanimate-out data-[state=closed]:wordfade-out-0 data-[state=open]:wordfade-in-0 data-[state=closed]:wordzoom-out-95 data-[state=open]:wordzoom-in-95 data-[side=bottom]:wordslide-in-from-top-2 data-[side=left]:wordslide-in-from-right-2 data-[side=right]:wordslide-in-from-left-2 data-[side=top]:wordslide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "wordrelative wordflex wordcursor-default wordselect-none worditems-center wordrounded-sm wordpx-2 wordpy-1.5 wordtext-sm wordoutline-none wordtransition-colors focus:wordbg-accent focus:wordtext-accent-foreground data-[disabled]:wordpointer-events-none data-[disabled]:wordopacity-50",
      inset && "wordpl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "wordrelative wordflex wordcursor-default wordselect-none worditems-center wordrounded-sm wordpy-1.5 wordpl-8 wordpr-2 wordtext-sm wordoutline-none wordtransition-colors focus:wordbg-accent focus:wordtext-accent-foreground data-[disabled]:wordpointer-events-none data-[disabled]:wordopacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="wordabsolute wordleft-2 wordflex wordh-3.5 wordw-3.5 worditems-center wordjustify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="wordh-4 wordw-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "wordrelative wordflex wordcursor-default wordselect-none worditems-center wordrounded-sm wordpy-1.5 wordpl-8 wordpr-2 wordtext-sm wordoutline-none wordtransition-colors focus:wordbg-accent focus:wordtext-accent-foreground data-[disabled]:wordpointer-events-none data-[disabled]:wordopacity-50",
      className
    )}
    {...props}
  >
    <span className="wordabsolute wordleft-2 wordflex wordh-3.5 wordw-3.5 worditems-center wordjustify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="wordh-2 wordw-2 wordfill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "wordpx-2 wordpy-1.5 wordtext-sm wordfont-semibold",
      inset && "wordpl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("word-mx-1 wordmy-1 wordh-px wordbg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("wordml-auto wordtext-xs wordtracking-widest wordopacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
