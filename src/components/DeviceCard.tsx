
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, MapPin, Calendar, QrCode, Eye } from 'lucide-react';
import { Device } from '@/types/device';

interface DeviceCardProps {
  device: Device;
  onClick: () => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onClick }) => {
  const isOnline = device.status === 'online';
  const formatLastActivity = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hoje';
    if (days === 1) return 'Ontem';
    return `${days} dias atrás`;
  };

  return (
    <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-0">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 truncate">{device.name}</h3>
              <Badge 
                variant={isOnline ? 'default' : 'secondary'}
                className={`${
                  isOnline 
                    ? 'bg-green-100 text-green-800 border-green-200' 
                    : 'bg-red-100 text-red-800 border-red-200'
                }`}
              >
                {isOnline ? (
                  <><Wifi className="w-3 h-3 mr-1" /> Online</>
                ) : (
                  <><WifiOff className="w-3 h-3 mr-1" /> Offline</>
                )}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">{device.model}</p>
            <p className="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded">
              {device.macAddress}
            </p>
          </div>
          <QrCode className="w-5 h-5 text-blue-600" />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span className="truncate">{device.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>Ativo {formatLastActivity(device.lastActivity)}</span>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              size="sm"
              variant="outline"
              className="flex-1 hover:bg-blue-50 hover:border-blue-300"
            >
              <Eye className="w-4 h-4 mr-1" />
              Detalhes
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Gerar QR code
                console.log('Generate QR for device:', device.id);
              }}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <QrCode className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
