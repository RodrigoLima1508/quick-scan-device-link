
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Smartphone, 
  BarChart3, 
  Settings, 
  User, 
  LogOut, 
  Menu,
  QrCode,
  Database,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const menuItems = [
    { icon: Smartphone, label: 'Dispositivos', active: true },
    { icon: QrCode, label: 'QR Codes', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Database, label: 'Logs de Acesso', active: false },
    { icon: Shield, label: 'Segurança', active: false },
  ];

  const settingsItems = [
    { icon: User, label: 'Perfil' },
    { icon: Settings, label: 'Configurações' },
  ];

  return (
    <Card className={cn(
      "fixed left-0 top-0 h-full bg-white shadow-xl border-r transition-all duration-300 z-50",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-gray-900">DeviceManager</h2>
              <p className="text-xs text-gray-500">Sistema de Gestão</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-2"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "default" : "ghost"}
              className={cn(
                "w-full justify-start transition-all duration-200",
                collapsed ? "px-2" : "px-3",
                item.active && "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              <item.icon className={cn("w-4 h-4", !collapsed && "mr-3")} />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>

        <Separator className="my-6" />

        {/* Settings */}
        <div className="space-y-2">
          {settingsItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                collapsed ? "px-2" : "px-3"
              )}
            >
              <item.icon className={cn("w-4 h-4", !collapsed && "mr-3")} />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </div>

        {/* User Section */}
        <div className="absolute bottom-4 left-4 right-4">
          <Separator className="mb-4" />
          {!collapsed && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@exemplo.com</p>
            </div>
          )}
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50",
              collapsed ? "px-2" : "px-3"
            )}
          >
            <LogOut className={cn("w-4 h-4", !collapsed && "mr-3")} />
            {!collapsed && <span>Sair</span>}
          </Button>
        </div>
      </div>
    </Card>
  );
};
