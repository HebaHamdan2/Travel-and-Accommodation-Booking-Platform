import { Box } from "@mui/material";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useGetHotelGalleryQuery } from "../../../../services/hotels";
import { GALLERY } from "../../constant";
import { HotelProps } from "../../types";
import VisualGallerySkeleton from "../../skeletons/VisualGallerySkeleton";
const VisualGallery: React.FC<HotelProps> = ({ hotelId }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isError, isLoading } = useGetHotelGalleryQuery(hotelId);
  if (isLoading) return <VisualGallerySkeleton />;
  const hotelImgs = isError || !data || data?.length === 0 ? GALLERY : data;
  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };
  const mainImage = hotelImgs[0];
  const thumbnails = hotelImgs.slice(1, 4);
  const remaining = hotelImgs.length - 4;

  return (
    <Box sx={{ width: "100%", maxWidth: "40rem", mx: "auto" }}>
      <Box
        sx={{ borderRadius: 2, overflow: "hidden", mb: 1.5, cursor: "pointer" }}
        onClick={() => handleOpen(0)}
      >
        <img
          src={mainImage.url}
          alt={`Img-${mainImage.id}`}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        {thumbnails.map((item, index) => (
          <Box
            key={item.url}
            sx={{
              flex: 1,
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => handleOpen(index + 1)}
          >
            <img
              src={item.url}
              alt={`Img-${mainImage.id}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {index === thumbnails.length - 1 && remaining > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "background.default",
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                +{remaining}
              </Box>
            )}
          </Box>
        ))}
      </Box>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={hotelImgs.map((item) => ({
          src: item.url,
          alt: `Img-${item.id}`,
        }))}
        plugins={[Zoom, Fullscreen]}
        animation={{ swipe: 300, fade: 250 }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
        }}
      />
    </Box>
  );
};

export default VisualGallery;
