"use client";

import React, { useEffect, useState } from "react";
import GradientColorPicker from "react-best-gradient-color-picker";

interface ColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
  allowGradient: boolean;
}
const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onColorChange,
  allowGradient,
}) => {
  const [currentColor, setCurrentColor] = useState<string>(color);
  const [isClient, setIsClient] = useState<boolean>(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (isClient) {
      setCurrentColor(color);
    }
  }, [color, isClient]);

  const handleColorChange = (newColor: string) => {
    setCurrentColor(newColor);
    onColorChange(newColor);
  };

  return (
    <div className="w-full border-base-300 border-2 rounded-xl p-5 flex justify-center items-center">
      <GradientColorPicker
        width={280}
        value={currentColor}
        onChange={handleColorChange}
        hideColorTypeBtns={!allowGradient}
      />
    </div>
  );
};

export default ColorPicker;
