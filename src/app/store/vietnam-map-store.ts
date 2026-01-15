import { create } from "zustand";
import { OLD_VIETNAM_MAP } from "../data/old-vietnam-map";
import { NEW_VIETNAM_MAP } from "../data/new-vietnam-map";

type VietnamMapStore = {
  isNewMap: boolean;
  loading: boolean;
  map: any;
  currentMap: any;
  switchToMap: () => void;
  exportSvgToPng: (svgRef: React.RefObject<SVGSVGElement>) => void;
};

export const useVietnamMapStore = create<VietnamMapStore>((set) => ({
  isNewMap: false,
  loading: false,
  map: {
    old: {
      data: OLD_VIETNAM_MAP,
      count: OLD_VIETNAM_MAP.length,
    },
    new: {
      data: NEW_VIETNAM_MAP,
      count: NEW_VIETNAM_MAP.length,
    },
  },
  currentMap: OLD_VIETNAM_MAP,
  switchToMap: () =>
    set((state) => ({
      loading: true,
      isNewMap: !state.isNewMap,
      currentMap: state.isNewMap ? state.map.old.data : state.map.new.data,
    })),
  exportSvgToPng: (svgRef: React.RefObject<SVGSVGElement>) => {
    if (!svgRef.current) return;
     const svg = svgRef.current;

     // Serialize SVG
     const serializer = new XMLSerializer();
     const svgStr = serializer.serializeToString(svg);

     // Tạo canvas
     const canvas = document.createElement("canvas");
     const ctx = canvas.getContext("2d");
     if (!ctx) return;

     // Set kích thước ảnh export (tuỳ chỉnh)
     const width = 1600;
     const height = 1600;
     canvas.width = width;
     canvas.height = height;

     // SVG → Image
     const img = new Image();
     const svgBlob = new Blob([svgStr], {
       type: "image/svg+xml;charset=utf-8",
     });
     const url = URL.createObjectURL(svgBlob);

     img.onload = () => {
       ctx.clearRect(0, 0, width, height);
       ctx.drawImage(img, 0, 0, width, height);
       URL.revokeObjectURL(url);

       // Canvas → PNG
       const pngUrl = canvas.toDataURL("image/jpg");

       const a = document.createElement("a");
       a.href = pngUrl;
       a.download = "vietnam-map.jpg";
       a.click();
     };

     img.src = url;
  }
}));