"use client";

import React, { use, useEffect } from 'react';

import { Button, Checkbox, Dialog, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import MapViewer from './components/MapViewer';
import { Footprints, Pin, X } from 'lucide-react';
import { LocationInfo } from './model';
import MTAButton from './ui/button';
import { useVietnamMapStore } from './store/vietnam-map-store';
export default function Home() {
  const [location, setLocation] = React.useState<LocationInfo | null>(null);
  const [selectedLocationIds, setSelectedLocationIds] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);

  const { switchToMap, exportSvgToPng, loading, currentMap, isNewMap } =
    useVietnamMapStore();

  const handleChooseLocation = (location: LocationInfo) => {
    setOpen(true);
    setLocation(location);
  }

  const hasVisited = (location: LocationInfo) => {
    setOpen(false);
    setSelectedLocationIds((prev: any) => {
      if (prev.includes(location.id)) {
        return prev;
      } else {
        return [...prev, location.id];
      }
    });
  }

  const onSwitchToMap = () => {
    switchToMap();
    setSelectedLocationIds([]);
  } 

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden overflow-hidden font-sans">
      <main className="gap-2 md:gap-16 grid grid-cols-1 md:grid-cols-2 mx-auto w-full md:w-6xl max-w-full min-h-screen">
        <div className="flex flex-col justify-center gap-3 md:p-6 px-2">
          <h2 className="font-medium text-slate-600 text-xl sm:text-2xl md:text-3xl text-justify leading-tight">
            Mỗi điểm ghim là một bước chân, mỗi nơi đến là một hành trình.
          </h2>
          <p className="text-slate-600 italic">
            Hãy tự tay tạo bảng đồ du lịch cho riêng bạn để lưu giữ những kỉ
            niệm thật đẹp.
          </p>
          <div className="flex flex-row justify-center items-center gap-4">
            <div className="flex flex-col justify-center items-center p-5 text-gray-700 text-lg md:text-2xl">
              <div className="text-amber-600">
                {selectedLocationIds.length}/{currentMap.length}
              </div>
              <p>TỈNH/THÀNH PHỐ</p>
            </div>
            <div className="flex flex-col justify-center items-center p-5 text-gray-700 text-lg md:text-2xl">
              <div className="text-amber-600">
                {Math.round(
                  (selectedLocationIds.length * 100) / currentMap.length
                )}
                %
              </div>
              <p>VIỆT NAM</p>
            </div>
          </div>
          {selectedLocationIds.length > 0 && (
            <MTAButton
              variant="outlined"
              label="Tải xuống hình ảnh bản đồ"
              onClick={() => alert("Chức năng chưa khả dụng")}
            />
          )}

          {
            <MTAButton
              variant="contained"
              label={isNewMap ? "Bản đồ sau sáp nhập" : "Bản đồ trước sáp nhập"}
              onClick={onSwitchToMap}
            />
          }
        </div>
        <div className="flex items-center p-2 md:p-6">
          <MapViewer
            locationIds={selectedLocationIds}
            onChoose={(location) => handleChooseLocation(location)}
            loading={loading}
          />
        </div>
      </main>

      <Dialog open={open} keepMounted>
        <button
          className="cursor-pointer"
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <X />
        </button>
        <div className="p-5 min-w-56">
          <div className="mb-4 font-medium text-lg text-center">
            {location?.name ?? "-"}
          </div>
          <div className="flex justify-around gap-4">
            <button
              onClick={() => hasVisited(location as any)}
              className="flex flex-col justify-center items-center gap-2 cursor-pointer"
            >
              <Pin />
              <p>Đã đi</p>
            </button>
            <button
              onClick={() => setOpen(false)}
              className="flex flex-col justify-center items-center gap-2 cursor-pointer"
            >
              <Footprints />
              <p>Sắp đi</p>
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
