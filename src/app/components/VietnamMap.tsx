"use client";
import { useEffect, useRef, useState } from "react";
import { VisitedLocation } from "../model";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { NEW_VIETNAM_MAP } from "../data/new-vietnam-map";

type VietnamMapProps = {
  locationId?: number | null;
  visitedLocations?: VisitedLocation[];
  onClick?: (id: number) => void;
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
  onClick,
  zoomToElement,
}: VietnamMapProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [locations, setLocations] = useState(NEW_VIETNAM_MAP);

  const [popupPos, setPopupPos] = useState<{
    x: number;
    y: number;
  } | null>(null);


  const getSvgPoint = (evt: React.MouseEvent, svg: SVGSVGElement) => {
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;

    const screenCTM = svg.getScreenCTM();
    if (!screenCTM) return null;

    return pt.matrixTransform(screenCTM.inverse());
  };


  const handleClick = (evt: any, id: number) => {
    evt.stopPropagation();
     const svg = svgRef.current;
     if (!svg) return;

     const point = getSvgPoint(evt, svg);
     if (!point) return;

     setPopupPos({
       x: point.x,
       y: point.y,
     });
    if (onClick) {
      onClick(id);
    }
  };

  useEffect(() => {
    if (!locationId) return;

    const el = document.getElementById(`VN${locationId}`);
    if (el) {
      zoomToElement(el, 3, 500, "easeOutQuint"); 
    }
  }, [locationId, zoomToElement]);

  return (
    <TransformComponent
      wrapperStyle={{ width: "100%", height: "100%", position: "relative" }}
    >
      {popupPos && (
        <div
          style={{
            position: "absolute",
            left: popupPos.x,
            top: popupPos.y,
            transform: "translate(-50%, -100%)",
            background: "#fff",
            padding: "6px 12px",
            borderRadius: 6,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            pointerEvents: "none",
          }}
        >
          hahaha
        </div>
      )}
      <svg
        ref={svgRef}
        viewBox="0 0 800 800"
        className="relative w-[600px] md:w-[800px] h-[600px] md:h-[800px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {NEW_VIETNAM_MAP.map((item) => (
            <g
              id={`VN${item.id}`}
              key={`VN${item.id}`}
              dangerouslySetInnerHTML={{ __html: item.svgData }}
              fill={locationId === item.id ? "#9790ee" : "#A3B3FF"}
              style={{ cursor: "pointer" }}
              onClick={(e) => handleClick(e, item.id)}
            />
          ))}
        </g>
      </svg>
    </TransformComponent>
  );
}
