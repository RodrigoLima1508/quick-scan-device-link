
import { Device } from '@/types/device';

export const generateMockDevices = (): Device[] => {
  const deviceTypes = ['router', 'switch', 'access-point', 'server', 'printer', 'camera', 'iot'];
  const locations = [
    'Sala de Servidores',
    'Escritório Principal', 
    'Recepção',
    'Laboratório',
    'Almoxarifado',
    'Sala de Reunião 1',
    'Sala de Reunião 2',
    'Corredor Principal',
    'Estação de Trabalho 1',
    'Estação de Trabalho 2'
  ];

  const generateMacAddress = (): string => {
    const chars = '0123456789ABCDEF';
    let mac = '';
    for (let i = 0; i < 6; i++) {
      if (i > 0) mac += ':';
      mac += chars.charAt(Math.floor(Math.random() * 16));
      mac += chars.charAt(Math.floor(Math.random() * 16));
    }
    return mac;
  };

  const devices: Device[] = [];

  for (let i = 1; i <= 12; i++) {
    const type = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const macAddress = generateMacAddress();
    const isOnline = Math.random() > 0.3; // 70% chance de estar online
    
    // Simular atividade recente para alguns dispositivos
    const daysAgo = Math.floor(Math.random() * 30);
    const lastActivity = new Date();
    lastActivity.setDate(lastActivity.getDate() - daysAgo);

    const device: Device = {
      id: i.toString(),
      name: `${type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')} ${i}`,
      model: getModelByType(type),
      macAddress,
      location,
      status: isOnline ? 'online' : 'offline',
      qrHash: btoa(macAddress).replace(/[^a-zA-Z0-9]/g, '').substring(0, 12),
      lastActivity,
      type,
      description: `Dispositivo ${type} localizado em ${location}`,
      manufacturer: getManufacturerByType(type)
    };

    devices.push(device);
  }

  return devices;
};

const getModelByType = (type: string): string => {
  const models: Record<string, string[]> = {
    router: ['TP-Link Archer C7', 'ASUS RT-AX88U', 'Netgear Nighthawk AX12', 'Linksys EA7500'],
    switch: ['Cisco Catalyst 2960', 'HP ProCurve 2510', 'D-Link DGS-1016A', 'Netgear GS308'],
    'access-point': ['Ubiquiti UniFi AP', 'Cisco Aironet 2702i', 'Aruba AP-305', 'Ruckus R320'],
    server: ['Dell PowerEdge R740', 'HP ProLiant DL380', 'IBM System x3650', 'Supermicro SuperServer'],
    printer: ['HP LaserJet Pro 404n', 'Canon ImageRunner 2645i', 'Brother HL-L2350DW', 'Epson WorkForce Pro'],
    camera: ['Hikvision DS-2CD2385G1', 'Dahua IPC-HFW4431R-Z', 'Axis M3046-V', 'Vivotek IP8160'],
    iot: ['Raspberry Pi 4', 'Arduino Uno WiFi', 'ESP32 DevKit', 'Intel NUC Kit']
  };

  const typeModels = models[type] || ['Modelo Genérico'];
  return typeModels[Math.floor(Math.random() * typeModels.length)];
};

const getManufacturerByType = (type: string): string => {
  const manufacturers: Record<string, string[]> = {
    router: ['TP-Link', 'ASUS', 'Netgear', 'Linksys'],
    switch: ['Cisco', 'HP', 'D-Link', 'Netgear'],
    'access-point': ['Ubiquiti', 'Cisco', 'Aruba', 'Ruckus'],
    server: ['Dell', 'HP', 'IBM', 'Supermicro'],
    printer: ['HP', 'Canon', 'Brother', 'Epson'],
    camera: ['Hikvision', 'Dahua', 'Axis', 'Vivotek'],
    iot: ['Raspberry Pi Foundation', 'Arduino', 'Espressif', 'Intel']
  };

  const typeManufacturers = manufacturers[type] || ['Fabricante Genérico'];
  return typeManufacturers[Math.floor(Math.random() * typeManufacturers.length)];
};
