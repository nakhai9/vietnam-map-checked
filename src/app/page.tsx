"use client";

import React, { use, useEffect } from 'react';

import { Button, Checkbox, Dialog, FormControl, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import MapViewer from './components/MapViewer';
import { BookHeart, Footprints, ImageDown, Map, Pin, PinOff, Share2, X } from 'lucide-react';
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
          <div className="flex flex flex-col justify-center items-center">
            <h2 className="font-medium text-amber-600 text-xl sm:text-2xl md:text-3xl text-justify leading-tight">
              Việt Nam những chuyến đi
            </h2>
            <ul className="text-slate-600 italic">
              <li>Hôm nay tôi muốn đến những góc phố xa xôi</li>
              <li>Những nơi chưa ai tới</li>
              <li>Hôm nay tôi muốn đến những ngóc ngách thôn quê</li>
              <li>Giờ đây tôi cất hết bao nỗi buồn xách balo lên và đi</li>
              <li>Không nghĩ suy âu lo về ngày mai</li>
            </ul>
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            <div className="flex flex-col justify-center items-center p-5 text-gray-700 text-lg md:text-4xl">
              <div className="text-amber-600">
                {selectedLocationIds.length}/{currentMap.length}
              </div>
              <p className="text-xl">TỈNH/THÀNH PHỐ</p>
            </div>
            <div className="flex flex-col justify-center items-center p-5 text-gray-700 text-lg md:text-4xl">
              <div className="text-amber-600">
                {Math.round(
                  (selectedLocationIds.length * 100) / currentMap.length
                )}
                %
              </div>
              <p className="text-xl">VIỆT NAM</p>
            </div>
          </div>
          {
            <div className="flex justify-center gap-4">
              <Tooltip title="Tải hình ảnh">
                <button
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 px-4 rounded-md h-10 text-white text-xs md:text-sm cursor-pointer icon"
                  type="button"
                  onClick={onSwitchToMap}
                >
                  Xem bản đồ {isNewMap ? "trước" : "sau"} sáp nhập <Map />
                </button>
              </Tooltip>
              {selectedLocationIds.length > 0 && (
                <>
                  <Tooltip title="Lưu lại">
                    <button
                      className="px-2 border border-amber-600 rounded-full h-10 text-amber-600 cursor-pointer icon"
                      type="button"
                      onClick={() => alert("Chức năng chưa khả dụng")}
                    >
                      <BookHeart />
                    </button>
                  </Tooltip>
                  <Tooltip title="Tải hình ảnh">
                    <button
                      className="px-2 border border-amber-600 rounded-full h-10 text-amber-600 cursor-pointer icon"
                      type="button"
                      onClick={() => alert("Chức năng chưa khả dụng")}
                    >
                      <ImageDown />
                    </button>
                  </Tooltip>
                  <Tooltip title="Chia sẻ">
                    <button
                      className="p-2 border border-amber-600 rounded-full h-10 text-amber-600 cursor-pointer icon"
                      type="button"
                      onClick={() => alert("Chức năng chưa khả dụng")}
                    >
                      <Share2 />
                    </button>
                  </Tooltip>
                </>
              )}
            </div>
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
              <p>Đã đến</p>
            </button>
            <button className="hidden flex flex-col justify-center items-center gap-2 cursor-pointer">
              <PinOff />
              <p>Tháo ghim</p>
            </button>
            <button
              onClick={() => setOpen(false)}
              className="flex flex-col justify-center items-center gap-2 cursor-pointer"
            >
              <Footprints />
              <p>Sắp đến</p>
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
