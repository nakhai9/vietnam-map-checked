"use client";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import VietnamMap from "./VietnamMap";
import { LocationInfo } from "../model";

type MapViewerProps = {
  locationIds?: string[];
  onChoose?: (location: LocationInfo) => void;
};

export default function MapViewer({ locationIds = [], onChoose }: MapViewerProps) {
  const handleChooseProvince = (location: LocationInfo) => {
    if (onChoose) {
      onChoose(location);
    }
  };
  return (
    <div className="relative bg-[#f4f4fd] shadow-xl rounded-lg w-full h-auto overflow-hidden map-viewer">
      <TransformWrapper
        minScale={1}
        maxScale={6}
        limitToBounds
        panning={{ velocityDisabled: true }}
      >
        {({ zoomToElement }) => (
          <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
            <VietnamMap
              zoomToElement={zoomToElement}
              locationIds={locationIds}
              onClick={(location) => handleChooseProvince(location)}
            />
          </TransformComponent>
        )}
      </TransformWrapper>
    </div>
  );
}
