"use client";
import { useEffect, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { NEW_VIETNAM_MAP } from "../data/new-vietnam-map";
import { LocationInfo } from "../model";

type VietnamMapProps = {
  locationId?: number | null;
  locationIds?: string[];
  visitedLocations?: LocationInfo[];
  onClick?: (location: LocationInfo) => void;
  zoomToElement: (
    node: string | HTMLElement,
    scale?: number,
    animationTime?: number,
    animationType?:
      | "easeOut"
      | "linear"
      | "easeInQuad"
      | "easeOutQuad"
      | "easeInOutQuad"
      | "easeInCubic"
      | "easeOutCubic"
      | "easeInOutCubic"
      | "easeInQuart"
      | "easeOutQuart"
      | "easeInOutQuart"
      | "easeInQuint"
      | "easeOutQuint"
      | "easeInOutQuint"
  ) => void;
};

export default function VietnamMap({
  locationId = null,
  locationIds = [],
  onClick,
  zoomToElement,
}: VietnamMapProps) {

  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleClick = (location: LocationInfo) => {
    if (onClick) {
      onClick(location);
    }
  };

  // useEffect(() => {
  //   if (!locationIds?.length) return;

  //   const el = document.getElementById(`VN${locationId}`);

  //   if (el) {
  //     zoomToElement(el, 3, 500, "easeOutQuint"); 
  //   }

  // }, [locationIds, zoomToElement]);

  const exportSvgToPng = () => {
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
  };

  return (
    <>
      {/* <button onClick={exportSvgToPng}>export</button> */}
      <TransformComponent
        wrapperStyle={{ width: "100%", height: "100%", position: "relative" }}
      >
        <svg
          viewBox="0 0 800 800"
          className="relative w-[600px] md:w-[800px] h-[600px] md:h-[800px]"
          xmlns="http://www.w3.org/2000/svg"
          ref={svgRef}
        >
          <g>
            {NEW_VIETNAM_MAP.map((item) => (
              <g
                id={`VN${item.id}`}
                key={`VN${item.id}`}
                dangerouslySetInnerHTML={{ __html: item.svgData }}
                fill={
                  locationIds.some((id) => id.toString() === item.id.toString())
                    ? "#9790ee"
                    : "#A3B3FF"
                }
                style={{ cursor: "pointer" }}
                onClick={() =>
                  handleClick({
                    id: item.id,
                    name: item.name,
                  })
                }
              />
            ))}
          </g>
        </svg>
      </TransformComponent>
    </>
  );
}
