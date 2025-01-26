"use client";

import Image from "next/image";
import IconPicker from "./components/IconPicker";
import { useState } from "react";
import { Download, icons } from "lucide-react";
import ColorPicker from "./components/ColorPicker";

type IconName = keyof typeof icons;

export default function Home() {
  const [selectedIcon, setSelectedIcon] = useState<string>("Apple");
  const SelectedIconComponent =
    selectedIcon && icons[selectedIcon as IconName]
      ? icons[selectedIcon as IconName]
      : null;

  const [IconSize, setIconSize] = useState<number>(200);
  const [IconStrokeWidth, setIconStrokeWidth] = useState<number>(3);
  const [IconRotation, setIconRotation] = useState<number>(0);
  const [Shadow, setShadow] = useState<string>("shadow-none");
  const [shadowNumber, setShadowNumber] = useState<number>(0);
  const [Radius, setRadius] = useState<number>(80);
  const [activeTab, setActiveTab] = useState<"stroke" | "background" | "fill">(
    "stroke"
  );
  const [iconStrokeColor, setIconStrokeColor] = useState<string>("white");
  const [backgroundColor, setBackgroundColor] = useState<string>(
    "linear-gradient(45deg, rgba(2,0,36,1) 0%, RGBA(9, 61, 121, 1) 35%, rgba(0,212,255,1) 100%)"
  );
  const [fillColor, setFillColor] = useState<string>("black");

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIconSize(parseInt(e.target.value));
  };
  const handleIconStrokeWidthChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIconStrokeWidth(parseInt(e.target.value));
  };
  const handleIconRotationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIconRotation(parseInt(e.target.value));
  };
  const handleShadowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setShadowNumber(value);

    switch (value) {
      case 25:
        setShadow("shadow-sm");
        break;
      case 50:
        setShadow("shadow-md");
        break;
      case 75:
        setShadow("shadow-lg");
        break;
      case 100:
        setShadow("shadow-2xl");
        break;
      default:
        setShadow("shadow-none");
        break;
    }
  };

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(parseInt(e.target.value));
  };

  const getBackgroundStyle = () => {
    return backgroundColor.startsWith("linear-gradient")
      ? { background: backgroundColor }
      : { backgroundColor: backgroundColor };
  };

  return (
    <div>
      <section className="flex flex-col md:flex-row md:justify-between">
        {/* Left column */}
        <div className="md:w-1/4 p-5">
          <div className="flex items-center justify-center space-x-2 mb-4 w-full">
            <button
              className={`btn w-1/3 ${
                activeTab === "stroke" ? "btn-secondary" : ""
              }`}
              onClick={() => setActiveTab("stroke")}
            >
              Bordure
            </button>
            <button
              className={`btn w-1/3 ${
                activeTab === "background" ? "btn-secondary" : ""
              }`}
              onClick={() => setActiveTab("background")}
            >
              Arrière-plan
            </button>
            <button
              className={`btn w-1/3 ${
                activeTab === "fill" ? "btn-secondary" : ""
              }`}
              onClick={() => setActiveTab("fill")}
            >
              Remplissage
            </button>
          </div>

          <div>
            {activeTab === "stroke" && (
              <ColorPicker
                color={iconStrokeColor}
                allowGradient={false}
                onColorChange={setIconStrokeColor}
              />
            )}
            {activeTab === "background" && (
              <ColorPicker
                color={backgroundColor}
                allowGradient={true}
                onColorChange={setBackgroundColor}
              />
            )}
            {activeTab === "fill" && (
              <ColorPicker
                color={fillColor}
                allowGradient={false}
                onColorChange={setFillColor}
              />
            )}
          </div>
        </div>

        {/* Middle column */}
        <div className="md:w-2/4 flex justify-center items-center h-screen bg-[url('/file.svg')] bg-cover bg-center border border-base-200 pt-4 relative">
          <div className="flex items-center justify-between absolute top-0 left-0 bg-base-100 z-50 w-full p-3">
            <div className="flex items-center font-bold italic text-2xl">
              <Image
                src="/logo.png"
                width={500}
                height={500}
                className="w-10 h-10"
                alt="Logo"
              />
              <span className="text-secondary ml-2">Fast</span>Logo
            </div>
            <div className="flex items-center">
              <IconPicker
                onIconSelect={setSelectedIcon}
                selected={selectedIcon}
              />
              <button className="btn ml-5">
                Télécharger <Download className="w-4" />
              </button>
            </div>
          </div>

          <div className="bg-neutral-content/10 hover:bg-neutral-content/20 aspect-square border-2 border-base-300 hover:border-neutral/15 border-dashed p-5 md:p-20">
            <div
              id="iconContainer"
              className={`w-[450px] h-[450px] flex justify-center items-center ${Shadow}`}
              style={{ ...getBackgroundStyle(), borderRadius: `${Radius}px` }}
            >
              {" "}
              {SelectedIconComponent && (
                <SelectedIconComponent
                  size={IconSize}
                  style={{
                    strokeWidth: IconStrokeWidth,
                    fill: fillColor,
                    stroke: iconStrokeColor,
                    display: "block",
                    transform: `rotate(${IconRotation}deg)`,
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="md:w-1/4 p-5">
          {/* Taille */}
          <div className="mt-4">
            <div className="flex justify-between mb-3 text-gray-500">
              <label className="badge badge-ghost">Taille</label>
              <span>{IconSize} px</span>
            </div>
            <input
              type="range"
              min="95"
              max="300"
              value={IconSize}
              onChange={handleIconChange}
              className="range"
            />
          </div>

          {/* Bordure */}
          <div className="mt-4">
            <div className="flex justify-between mb-3 text-gray-500">
              <label className="badge badge-ghost">Bordure</label>
              <span>{IconStrokeWidth}px</span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              value={IconStrokeWidth}
              onChange={handleIconStrokeWidthChange}
              className="range"
            />
          </div>

          {/* Rotation */}
          <div className="mt-4">
            <div className="flex justify-between mb-3 text-gray-500">
              <label className="badge badge-ghost">Rotation</label>
              <span>{IconRotation} °</span>
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              value={IconRotation}
              onChange={handleIconRotationChange}
              className="range"
            />
          </div>

          {/* Ombre */}
          <div className="mt-4">
            <div className="flex justify-between mb-3 text-gray-500">
              <label className="badge badge-ghost">Ombre</label>
              <span>{Shadow.replace("shadow-", "")}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step={25}
              value={shadowNumber}
              onChange={handleShadowChange}
              className="range"
            />
          </div>

          {/* Arrondi */}
          <div className="mt-4">
            <div className="flex justify-between mb-3 text-gray-500">
              <label className="badge badge-ghost">Arrondi</label>
              <span>{Radius} px</span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              value={Radius}
              onChange={handleRadiusChange}
              className="range"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
