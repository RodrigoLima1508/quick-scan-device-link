
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  QrCode, 
  Wifi, 
  WifiOff, 
  MapPin, 
  Calendar, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Settings,
  MessageCircle
} from 'lucide-react';
import { Device } from '@/types/device';
import { generateMockDevices } from '@/utils/mockData';

const DeviceScanner = () => {
  const { qrHash } = useParams<{ qrHash: string }>();
  const navigate = useNavigate();
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    // Simular busca do dispositivo pelo QR hash
    const findDevice = () => {
      const devices = generateMockDevices();
      const foundDevice = devices.find(d => d.qrHash === qrHash);
      
      setTimeout(() => {
        setDevice(foundDevice || null);
        setLoading(false);
        
        // Registrar o scan
        if (foundDevice) {
          setScanned(true);
          console.log('Device scanned:', foundDevice.name);
          // TODO: Registrar log de acesso
        }
      }, 1000);
    };

    if (qrHash) {
      findDevice();
    } else {
      setLoading(false);
    }
  }, [qrHash]);

  const formatLastActivity = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Processando QR Code...</h2>
            <p className="text-gray-600">Aguarde enquanto identificamos o dispositivo</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white shadow-lg">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">QR Code Inválido</h2>
            <p className="text-gray-600 mb-6">
              O código QR escaneado não corresponde a nenhum dispositivo registrado no sistema.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isOnline = device.status === 'online';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">QR Code Escaneado com Sucesso!</h1>
          <p className="text-gray-600">Informações do dispositivo identificado</p>
        </div>

        {/* Device Info Card */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900">{device.name}</CardTitle>
                  <p className="text-gray-600">{device.model}</p>
                </div>
              </div>
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
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Tipo</label>
                <p className="text-gray-900 mt-1 capitalize">{device.type.replace('-', ' ')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Fabricante</label>
                <p className="text-gray-900 mt-1">{device.manufacturer}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">MAC Address</label>
              <p className="text-gray-900 mt-1 font-mono bg-gray-50 px-3 py-2 rounded border">
                {device.macAddress}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Localização</label>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{device.location}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Última Atividade</label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{formatLastActivity(device.lastActivity)}</p>
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

        {/* Action Buttons */}
        <Card className="bg-white shadow-lg border-0">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Ações Disponíveis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Settings className="w-4 h-4 mr-2" />
                Configurar Dispositivo
              </Button>
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                <CheckCircle className="w-4 h-4 mr-2" />
                Marcar como Verificado
              </Button>
              <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Manutenção
              </Button>
              <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                <MessageCircle className="w-4 h-4 mr-2" />
                Solicitar Suporte
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* QR Info */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <QrCode className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">QR Code ID: {device.qrHash}</p>
                <p className="text-xs text-gray-600">Escaneado em {new Date().toLocaleString('pt-BR')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeviceScanner;
