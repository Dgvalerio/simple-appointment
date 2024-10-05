'use client';
import { FC, useState } from 'react';

import { signOut } from 'next-auth/react';

import { SidebarItems } from '@/components/sidebar/components/items';
import { SidebarUser } from '@/components/sidebar/components/user';
import { ResizablePanel } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/tailwind/utils';
import { routes } from '@/utils/constants/routes';

export const SideBar: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = (): void => {
    setIsCollapsed(true);
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
      true
    )}`;
  };

  const handleResize = (): void => {
    setIsCollapsed(false);
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
      false
    )}`;
  };

  return (
    <ResizablePanel
      collapsedSize={4}
      collapsible={true}
      minSize={16}
      defaultSize={24}
      maxSize={24}
      onCollapse={handleCollapse}
      onResize={handleResize}
      className={cn(
        isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out'
      )}
    >
      <SidebarUser isCollapsed={isCollapsed} />
      <Separator />
      <SidebarItems
        isCollapsed={isCollapsed}
        links={[
          { title: 'Dashboard', icon: 'dashboard', link: routes.home },
          {
            title: 'Adicionar apontamento',
            icon: 'more_time',
            link: routes.addAppointment,
          },
          {
            title: 'Carregar dados',
            icon: 'work_update',
            link: routes.loadData,
          },
        ]}
      />
      <Separator />
      <SidebarItems
        isCollapsed={isCollapsed}
        links={[{ title: 'Logout', icon: 'logout', onClick: () => signOut() }]}
      />
    </ResizablePanel>
  );
};
