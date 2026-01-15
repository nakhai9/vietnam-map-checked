"use client";
import { useEffect, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { NEW_VIETNAM_MAP } from "../data/new-vietnam-map";
import { LocationInfo } from "../model";
import { OLD_VIETNAM_MAP } from "../data/old-vietnam-map";
import { useVietnamMapStore } from "../store/vietnam-map-store";
import { CircularProgress } from "@mui/material";

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
  const  currentMap  = useVietnamMapStore(state => state.currentMap);
  const exportSvgToPng = useVietnamMapStore(state => state.exportSvgToPng);
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

  useEffect(() => {
    
  }, [])

  return (
    <>
      <TransformComponent
        wrapperStyle={{ width: "100%", height: "100%", position: "relative" }}
      >
        <svg
          viewBox="0 0 800 800"
          className="relative"
          width="600"
          height="600"
          xmlns="http://www.w3.org/2000/svg"
          ref={svgRef}
        >
          <g>
            {currentMap.map((item: any) => (
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
