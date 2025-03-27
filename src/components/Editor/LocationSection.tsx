
import React from 'react';
import { MapPin, X } from 'lucide-react';
import { MapLocation } from '@/types/article';
import MapLocationPicker from '@/components/MapLocationPicker';
import FormSection from './FormSection';

interface LocationSectionProps {
  mapLocation?: MapLocation;
  showMapPicker: boolean;
  onShowMapPicker: () => void;
  onHideMapPicker: () => void;
  onLocationChange: (location: MapLocation) => void;
  onLocationRemove: () => void;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  mapLocation,
  showMapPicker,
  onShowMapPicker,
  onHideMapPicker,
  onLocationChange,
  onLocationRemove
}) => {
  return (
    <FormSection title="LOKASI">
      {mapLocation ? (
        <div className="border rounded-lg p-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{mapLocation.name}</h3>
              <p className="text-sm text-gray-500">
                {mapLocation.latitude.toFixed(6)}, {mapLocation.longitude.toFixed(6)}
              </p>
              {mapLocation.address && (
                <p className="text-sm mt-1">{mapLocation.address}</p>
              )}
            </div>
            <button 
              type="button"
              onClick={onLocationRemove}
              className="text-red-500 hover:text-red-700"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={onShowMapPicker}
          className="w-full flex items-center justify-center gap-2 p-3 border border-dashed rounded-lg text-karo-brown hover:bg-karo-cream/20 transition-colors"
        >
          <MapPin size={18} />
          Tambahkan Lokasi
        </button>
      )}
      
      {showMapPicker && (
        <MapLocationPicker
          onLocationChange={onLocationChange}
          onCancel={onHideMapPicker}
        />
      )}
    </FormSection>
  );
};

export default LocationSection;
