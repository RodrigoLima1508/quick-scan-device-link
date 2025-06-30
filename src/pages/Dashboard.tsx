
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Search, Filter, Download, Smartphone, Wifi, WifiOff, Eye } from 'lucide-react';
import { DeviceCard } from '@/components/DeviceCard';
import { AddDeviceModal } from '@/components/AddDeviceModal';
import { DeviceDetailModal } from '@/components/DeviceDetailModal';
import { Sidebar } from '@/components/Sidebar';
import { Device } from '@/types/device';
import { generateMockDevices } from '@/utils/mockData';

const Dashboard = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Simular carregamento de dados
    const mockDevices = generateMockDevices();
    setDevices(mockDevices);
    setFilteredDevices(mockDevices);
  }, []);

  useEffect(() => {
    let filtered = devices.filter(device => 
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.macAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (statusFilter !== 'all') {
      filtered = filtered.filter(device => device.status === statusFilter);
    }

    setFilteredDevices(filtered);
  }, [searchTerm, statusFilter, devices]);

  const handleAddDevice = (newDevice: Omit<Device, 'id' | 'qrHash' | 'lastActivity'>) => {
    const device: Device = {
      ...newDevice,
      id: Date.now().toString(),
      qrHash: btoa(newDevice.macAddress).replace(/[^a-zA-Z0-9]/g, '').substring(0, 12),
      lastActivity: new Date()
    };
    setDevices(prev => [...prev, device]);
  };

  const stats = {
    total: devices.length,
    online: devices.filter(d => d.status === 'online').length,
    offline: devices.filter(d => d.status === 'offline').length,
    active: devices.filter(d => {
      const daysSinceActivity = (Date.now() - new Date(d.lastActivity).getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceActivity <= 7;
    }).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <main className={`flex-1 p-6 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Dispositivos</h1>
              <p className="text-gray-600 mt-1">Controle e monitore todos os seus dispositivos físicos</p>
            </div>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Dispositivo
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total de Dispositivos</CardTitle>
                <Smartphone className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Online</CardTitle>
                <Wifi className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.online}</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Offline</CardTitle>
                <WifiOff className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.offline}</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Ativos (7 dias)</CardTitle>
                <Eye className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{stats.active}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar por nome, MAC ou localização..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full md:w-80"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant={statusFilter === 'all' ? 'default' : 'outline'}
                      onClick={() => setStatusFilter('all')}
                      size="sm"
                    >
                      Todos
                    </Button>
                    <Button
                      variant={statusFilter === 'online' ? 'default' : 'outline'}
                      onClick={() => setStatusFilter('online')}
                      size="sm"
                    >
                      Online
                    </Button>
                    <Button
                      variant={statusFilter === 'offline' ? 'default' : 'outline'}
                      onClick={() => setStatusFilter('offline')}
                      size="sm"
                    >
                      Offline
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Devices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onClick={() => setSelectedDevice(device)}
              />
            ))}
          </div>

          {filteredDevices.length === 0 && (
            <Card className="bg-white shadow-md">
              <CardContent className="p-12 text-center">
                <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum dispositivo encontrado</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Tente ajustar os filtros de busca' 
                    : 'Comece adicionando seu primeiro dispositivo'
                  }
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Primeiro Dispositivo
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Modals */}
      <AddDeviceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddDevice}
      />

      {selectedDevice && (
        <DeviceDetailModal
          device={selectedDevice}
          isOpen={!!selectedDevice}
          onClose={() => setSelectedDevice(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
