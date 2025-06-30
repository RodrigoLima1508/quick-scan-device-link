
import React, { useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Copy, ExternalLink } from 'lucide-react';
import { Device } from '@/types/device';
import { useToast } from '@/hooks/use-toast';

interface QRCodeModalProps {
  device: Device | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ device, isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQRUrl = () => {
    if (!device) return '';
    return `${window.location.origin}/device/${device.qrHash}`;
  };

  const generateQRCode = async () => {
    if (!device || !canvasRef.current) return;

    try {
      // Usar uma implementação simples de QR code com canvas
      const QRCode = (await import('qrcode')).default;
      const canvas = canvasRef.current;
      const url = generateQRUrl();
      
      await QRCode.toCanvas(canvas, url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
    } catch (error) {
      console.error('Erro ao gerar QR code:', error);
      toast({
        title: "Erro",
        description: "Não foi possível gerar o QR code",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isOpen && device) {
      generateQRCode();
    }
  }, [isOpen, device]);

  const copyUrl = () => {
    const url = generateQRUrl();
    navigator.clipboard.writeText(url);
    toast({
      title: "Copiado!",
      description: "URL copiada para a área de transferência",
    });
  };

  const downloadQRCode = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = `qr-code-${device?.name || 'device'}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
    
    toast({
      title: "Download iniciado",
      description: "QR code baixado com sucesso",
    });
  };

  const openUrl = () => {
    window.open(generateQRUrl(), '_blank');
  };

  if (!device) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            QR Code - {device.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <canvas ref={canvasRef} className="block" />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">URL de Acesso</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-lg border text-xs break-all">
                {generateQRUrl()}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Dispositivo</label>
              <p className="text-gray-900 mt-1">{device.name} - {device.macAddress}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={copyUrl} variant="outline" className="flex-1">
              <Copy className="w-4 h-4 mr-2" />
              Copiar URL
            </Button>
            <Button onClick={downloadQRCode} variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Baixar
            </Button>
            <Button onClick={openUrl} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              Testar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
