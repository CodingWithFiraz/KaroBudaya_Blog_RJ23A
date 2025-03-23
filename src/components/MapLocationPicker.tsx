
import React, { useState } from 'react';
import { MapLocation } from '@/types/article';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MapLocationPickerProps {
  onLocationChange: (location: MapLocation) => void;
  onCancel: () => void;
}

const MapLocationPicker: React.FC<MapLocationPickerProps> = ({
  onLocationChange,
  onCancel
}) => {
  const [location, setLocation] = useState<MapLocation>({
    name: '',
    latitude: 3.1906, // Default to North Sumatra, Indonesia
    longitude: 98.6131,
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation(prev => ({
      ...prev,
      [name]: name === 'latitude' || name === 'longitude' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleSubmit = () => {
    if (!location.name) {
      alert('Nama lokasi tidak boleh kosong');
      return;
    }
    
    onLocationChange(location);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambahkan Lokasi</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nama Lokasi</Label>
            <Input
              id="name"
              name="name"
              value={location.name}
              onChange={handleChange}
              placeholder="Contoh: Desa Barusjahe"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                name="latitude"
                type="number"
                step="0.000001"
                value={location.latitude}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                name="longitude"
                type="number"
                step="0.000001"
                value={location.longitude}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="address">Alamat (Opsional)</Label>
            <Input
              id="address"
              name="address"
              value={location.address}
              onChange={handleChange}
              placeholder="Masukkan alamat lengkap"
            />
          </div>
          
          <div className="h-[200px] bg-gray-100 rounded-md overflow-hidden">
            <iframe 
              src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>
            Simpan Lokasi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MapLocationPicker;
