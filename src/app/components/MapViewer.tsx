"use client";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import VietnamMap from "./VietnamMap";


type MapViewerProps = {
    locationId?: number;
};

export default function MapViewer({
    locationId
}: MapViewerProps) {
  const handleChooseProvince = (provinceCode: number) => {

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
              locationId={locationId}
              onClick={(id) => handleChooseProvince(id)}
            />
          </TransformComponent>
        )}
      </TransformWrapper>
    </div>
  );
}
