import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { twMerge } from 'tailwind-merge';

export const Drawer = ({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
};

export const DrawerTrigger = ({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) => {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
};

const DrawerPortal = ({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) => {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
};

export const DrawerOverlay = ({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) => {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={twMerge(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  );
};

export const DrawerContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) => {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />

      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={twMerge(
          'group/drawer-content bg-background fixed z-50 flex h-auto flex-col',
          'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b',
          'data-[vaul-drawer-direction=bottom]:rounded-t-5 data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:border-t',
          'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm',
          'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm',
          'border-none outline-none',
          className,
        )}
        {...props}
      >
        <div className="bg-bg-secondary-grey-dark/60 mx-auto mt-3 mb-5 hidden h-1 w-11 shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />

        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
};

export const DrawerHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="drawer-header"
      className={twMerge(
        'flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left',
        className,
      )}
      {...props}
    />
  );
};

export const DrawerTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) => {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={twMerge('text-foreground font-semibold', className)}
      {...props}
    />
  );
};
