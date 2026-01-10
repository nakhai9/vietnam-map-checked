"use client";

import React, { use, useEffect, useRef } from 'react';

import { Checkbox, Dialog, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import MapViewer from './components/MapViewer';
import { Footprints, Pin, X } from 'lucide-react';
import { LocationInfo } from './model';

export default function Home() {
  const [location, setLocation] = React.useState<LocationInfo | null>(null);
  const [selectedLocationIds, setSelectedLocationIds] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const fetchProvinces = async () => {
    const res = await fetch("https://provinces.open-api.vn/api/v2/");
    const data = await res.json();
  }

  const handleChooseLocation = (location: LocationInfo) => {
    setOpen(true);
    setLocation(location);
  }

  const hasVisited = (location: LocationInfo) => {
    console.log("hasVisited", location);
    setOpen(false);
    setSelectedLocationIds((prev: any) => {
      if (prev.includes(location.id)) {
        return prev;
      } else {
        return [...prev, location.id];
      }
    });
  }

  useEffect(()=> {
    // fetchProvinces();
  }, []);


  return (
    <div className="flex flex-col justify-center min-h-screen overflow-hidden font-sans">
      <main className="gap-2 md:gap-16 grid grid-cols-1 md:grid-cols-2 mx-auto w-full md:w-6xl max-w-full min-h-screen">
        <div className="flex flex-col justify-center gap-3 md:p-6 px-2">
          <h2 className="font-medium text-slate-600 text-xl sm:text-2xl md:text-3xl text-justify leading-tight">
            Mỗi điểm ghim là một bước chân, mỗi nơi đến là một hành trình.
          </h2>
          <p className="text-slate-600 italic">
            Hãy tự tay tạo bảng đồ du lịch cho riêng bạn để lưu giữ những kỉ
            niệm thật đẹp.
          </p>
          {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Tỉnh/Thành phố bạn đã đến
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedProvinceId || ""}
              label="Tỉnh/Thành phố bạn đã đến"
              onChange={(e) => setSelectedProvinceId(e.target.value)}
            >
              {provinces.map((province) => (
                <MenuItem key={province.code} value={province.code}>
                  {province.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          {/* <p>
            Hãy kể lại cho chúng tôi nghe những trải nhiệm của bạn về tỉnh/thành
            phố xinh đẹp này nhé
          </p> */}

          <div className="flex flex-row justify-center items-center gap-4">
            <div className="flex flex-col justify-center items-center p-5 text-gray-700 text-lg md:text-2xl">
              <div className="text-amber-600">
                {selectedLocationIds.length}/34
              </div>
              <p>TỈNH/THÀNH PHỐ</p>
            </div>
            <div className="flex flex-col justify-center items-center p-5 text-gray-700 text-lg md:text-2xl">
              <div className="text-amber-600">
                {Math.round((selectedLocationIds.length * 100) / 34)}%
              </div>
              <p>VIỆT NAM</p>
            </div>
          </div>
        </div>
        <div className="p-2 md:p-6 overflow-auto">
          <MapViewer
            locationIds={selectedLocationIds}
            onChoose={(location) => handleChooseLocation(location)}
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
