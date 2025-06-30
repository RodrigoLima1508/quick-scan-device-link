
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Device } from '@/types/device';

interface AddDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (device: Omit<Device, 'id' | 'qrHash' | 'lastActivity'>) => void;
}

export const AddDeviceModal: React.FC<AddDeviceModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    macAddress: '',
    location: '',
    status: 'offline' as 'online' | 'offline',
    type: '',
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateMacAddress = (mac: string): boolean => {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$/;
    return macRegex.test(mac);
  };

  const formatMacAddress = (value: string): string => {
    // Remove todos os caracteres que não são hexadecimais
    const cleaned = value.replace(/[^0-9A-Fa-f]/g, '');
    // Adiciona ":" a cada 2 caracteres
    const formatted = cleaned.match(/.{1,2}/g)?.join(':') || cleaned;
    return formatted.substring(0, 17); // Limita a 17 caracteres (XX:XX:XX:XX:XX:XX)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.model.trim()) newErrors.model = 'Modelo é obrigatório';
    if (!formData.macAddress.trim()) newErrors.macAddress = 'MAC Address é obrigatório';
    else if (!validateMacAddress(formData.macAddress)) {
      newErrors.macAddress = 'Formato de MAC Address inválido (ex: 00:1B:44:11:3A:B7)';
    }
    if (!formData.location.trim()) newErrors.location = 'Localização é obrigatória';
    if (!formData.type.trim()) newErrors.type = 'Tipo é obrigatório';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAdd(formData);
    
    // Reset form
    setFormData({
      name: '',
      model: '',
      macAddress: '',
      location: '',
      status: 'offline',
      type: '',
      description: ''
    });
    setErrors({});
    onClose();
  };

  const handleMacAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatMacAddress(e.target.value);
    setFormData(prev => ({ ...prev, macAddress: formatted.toUpperCase() }));
    if (errors.macAddress) {
      setErrors(prev => ({ ...prev, macAddress: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Adicionar Novo Dispositivo
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Dispositivo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                }}
                placeholder="ex: Router Sala Principal"
                className={errors.name ? 'border-red-300' : ''}
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Modelo *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, model: e.target.value }));
                  if (errors.model) setErrors(prev => ({ ...prev, model: '' }));
                }}
                placeholder="ex: TP-Link Archer C7"
                className={errors.model ? 'border-red-300' : ''}
              />
              {errors.model && <p className="text-sm text-red-600">{errors.model}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="macAddress">MAC Address *</Label>
            <Input
              id="macAddress"
              value={formData.macAddress}
              onChange={handleMacAddressChange}
              placeholder="ex: 00:1B:44:11:3A:B7"
              className={`font-mono ${errors.macAddress ? 'border-red-300' : ''}`}
              maxLength={17}
            />
            {errors.macAddress && <p className="text-sm text-red-600">{errors.macAddress}</p>}
            <p className="text-xs text-gray-500">Formato: XX:XX:XX:XX:XX:XX</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Localização *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, location: e.target.value }));
                  if (errors.location) setErrors(prev => ({ ...prev, location: '' }));
                }}
                placeholder="ex: Sala de Servidores"
                className={errors.location ? 'border-red-300' : ''}
              />
              {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Dispositivo *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => {
                  setFormData(prev => ({ ...prev, type: value }));
                  if (errors.type) setErrors(prev => ({ ...prev, type: '' }));
                }}
              >
                <SelectTrigger className={errors.type ? 'border-red-300' : ''}>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="router">Router</SelectItem>
                  <SelectItem value="switch">Switch</SelectItem>
                  <SelectItem value="access-point">Access Point</SelectItem>
                  <SelectItem value="server">Servidor</SelectItem>
                  <SelectItem value="printer">Impressora</SelectItem>
                  <SelectItem value="camera">Câmera IP</SelectItem>
                  <SelectItem value="iot">Dispositivo IoT</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status Inicial</Label>
            <Select
              value={formData.status}
              onValueChange={(value: 'online' | 'offline') => 
                setFormData(prev => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (Opcional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Informações adicionais sobre o dispositivo..."
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Adicionar Dispositivo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
