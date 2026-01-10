"use client";

import React, { use, useEffect, useRef } from 'react';

import { VisitedLocation } from './model';
import { Checkbox, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import MapViewer from './components/MapViewer';

type VietnamProvinces = {
  code: number;
  codeName: string;
  division_type: string;
  name: string;
  phone_code: number;
}

export default function Home() {
  const [provinces, setProvinces] = React.useState<VietnamProvinces[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = React.useState<number|undefined>(undefined);
  const fetchProvinces = async () => {
    const res = await fetch("https://provinces.open-api.vn/api/v2/");
    const data = await res.json();
    setProvinces(data);
  }

  useEffect(()=> {
    fetchProvinces();
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
          <FormControl fullWidth>
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
          </FormControl>
          <p>
            Hãy kể lại cho chúng tôi nghe những trải nhiệm của bạn về tỉnh/thành
            phố xinh đẹp này nhé
          </p>
        </div>
        <div className="p-2 md:p-6 overflow-auto">
          <MapViewer locationId={selectedProvinceId} />
        </div>
      </main>
    </div>
  );
}
