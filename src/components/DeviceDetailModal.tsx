
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Wifi, 
  WifiOff, 
  MapPin, 
  Calendar, 
  QrCode, 
  Download, 
  Edit, 
  Trash2,
  Activity,
  Shield,
  Clock
} from 'lucide-react';
import { Device } from '@/types/device';

interface DeviceDetailModalProps {
  device: Device;
  isOpen: boolean;
  onClose: () => void;
}

export const DeviceDetailModal: React.FC<DeviceDetailModalProps> = ({ 
  device, 
  isOpen, 
  onClose 
}) => {
  const isOnline = device.status === 'online';
  
  const formatLastActivity = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const generateQRUrl = () => {
    return `${window.location.origin}/device/${device.qrHash}`;
  };

  const downloadQRCode = () => {
    // TODO: Implementar geração e download do QR code
    console.log('Download QR code for:', device.name);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Detalhes do Dispositivo
            </DialogTitle>
            <Badge 
              variant={isOnline ? 'default' : 'secondary'}
              className={`${
                isOnline 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : 'bg-red-100 text-red-800 border-red-200'
              } px-3 py-1`}
            >
              {isOnline ? (
                <><Wifi className="w-3 h-3 mr-1" /> Online</>
              ) : (
                <><WifiOff className="w-3 h-3 mr-1" /> Offline</>
              )}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Nome</label>
                  <p className="text-gray-900 mt-1">{device.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Modelo</label>
                  <p className="text-gray-900 mt-1">{device.model}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Tipo</label>
                  <p className="text-gray-900 mt-1 capitalize">{device.type.replace('-', ' ')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">MAC Address</label>
                  <p className="text-gray-900 mt-1 font-mono bg-gray-50 px-2 py-1 rounded">
                    {device.macAddress}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Localização</label>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{device.location}</p>
                </div>
              </div>

              {device.description && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Descrição</label>
                  <p className="text-gray-900 mt-1">{device.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Atividade e Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                Atividade e Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Status Atual</label>
                  <div className="flex items-center gap-2 mt-1">
                    {isOnline ? (
                      <><Wifi className="w-4 h-4 text-green-600" /> <span className="text-green-600">Online</span></>
                    ) : (
                      <><WifiOff className="w-4 h-4 text-red-600" /> <span className="text-red-600">Offline</span></>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Última Atividade</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{formatLastActivity(device.lastActivity)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <QrCode className="w-5 h-5 text-purple-600" />
                QR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">URL de Acesso</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                  <code className="text-sm text-gray-800 break-all">{generateQRUrl()}</code>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Hash do QR Code</label>
                <p className="text-gray-900 mt-1 font-mono bg-gray-50 px-2 py-1 rounded">
                  {device.qrHash}
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={downloadQRCode}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar QR Code
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(generateQRUrl());
                    // TODO: Mostrar toast de sucesso
                  }}
                >
                  Copiar URL
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <Edit className="w-4 h-4 mr-2" />
              Editar Dispositivo
            </Button>
            <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir Dispositivo
            </Button>
            <Button onClick={onClose} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
