import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";

interface ImageCarouselProps {
  images: string[];
  interval?: number; // Time in milliseconds between transitions
  className?: string; // Additional classes for the container
  children?: ReactNode; // Child component to be displayed in the middle
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  interval = 5000, // Default 5 seconds
  className = "",
  children,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next image
  const nextImage = useCallback(() => {
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500); // Longer duration of transition effect (1500ms)
  }, [images.length]);

  // Set up interval for automatic sliding
  useEffect(() => {
    const slideTimer = setInterval(nextImage, interval);

    // Clear timer when component unmounts
    return () => clearInterval(slideTimer);
  }, [nextImage, interval]);

  // Function to manually navigate to a specific image
 
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Images Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1500 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Centered Child Component */}
      {children && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
          {children}
        </div>
      )}


    
    </div>
  );
};

export default ImageCarousel;
