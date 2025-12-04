"use client";

import { Copy, Download, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";

interface Props {
  lang: LanguageType;
}

interface Color {
  hex: string;
  rgb: string;
  hsl: string;
}

const generateRandomColor = (): Color => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 40) + 60; // 60-100% for more vibrant colors
  const lightness = Math.floor(Math.random() * 30) + 35; // 35-65% for better visibility

  const rgb = hslToRgb(hue, saturation / 100, lightness / 100);
  const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);

  return {
    hex: `#${hex}`,
    rgb: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
    hsl: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
  };
};

const generateComplementaryPalette = (baseColor: Color): Color[] => {
  // Extract HSL values from the base color
  const hslMatch = baseColor.hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!hslMatch) return [baseColor];

  const [, h, s, l] = hslMatch;
  const hue = parseInt(h, 10);
  const saturation = parseInt(s, 10);
  const lightness = parseInt(l, 10);

  // Generate complementary color by adding 180 degrees to hue
  const complementHue = (hue + 180) % 360;
  const complementRgb = hslToRgb(
    complementHue,
    saturation / 100,
    lightness / 100,
  );
  const complementHex = rgbToHex(
    complementRgb[0],
    complementRgb[1],
    complementRgb[2],
  );

  const complementColor: Color = {
    hex: `#${complementHex}`,
    rgb: `rgb(${complementRgb[0]}, ${complementRgb[1]}, ${complementRgb[2]})`,
    hsl: `hsl(${complementHue}, ${saturation}%, ${lightness}%)`,
  };

  const result = [baseColor, complementColor];
  console.log("Generated complementary colors:", result);
  return result;
};

// Helper function for future use
const rgbToHex = (r: number, g: number, b: number): string => {
  return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const hslToRgb = (
  h: number,
  s: number,
  l: number,
): [number, number, number] => {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
};

// Color validation function
const isValidColor = (color: Color): boolean => {
  // Check if RGB values are valid (0-255)
  const rgbMatch = color.rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!rgbMatch) return false;

  const [, r, g, b] = rgbMatch.map(Number);
  return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
};

export default function ColorPaletteClient({ lang }: Props) {
  const [palette, setPalette] = useState<Color[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize on client side to avoid hydration mismatch
  useEffect(() => {
    // Define the generatePalette function inside useEffect
    const generateInitialPalette = () => {
      const newPalette: Color[] = [];

      // Generate a harmonious palette using analogous colors
      const baseHue = Math.floor(Math.random() * 360);
      const baseSaturation = Math.floor(Math.random() * 30) + 60; // 60-90%
      const baseLightness = Math.floor(Math.random() * 20) + 45; // 45-65%

      // Create 5 colors with harmonious hue variations
      const hueOffsets = [0, -30, 30, -60, 60]; // Analogous color scheme
      const lightnessOffsets = [0, 10, -10, 20, -20]; // Vary lightness for depth

      for (let i = 0; i < 5; i++) {
        const hue = (baseHue + hueOffsets[i] + 360) % 360;
        const saturation = Math.max(
          40,
          Math.min(100, baseSaturation + (i - 2) * 10),
        );
        const lightness = Math.max(
          25,
          Math.min(75, baseLightness + lightnessOffsets[i]),
        );

        const rgb = hslToRgb(hue, saturation / 100, lightness / 100);
        const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);

        const color: Color = {
          hex: `#${hex}`,
          rgb: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
          hsl: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        };

        // Validate color before adding to palette
        if (isValidColor(color)) {
          newPalette.push(color);
        } else {
          console.warn("Invalid color generated:", color);
          // Generate a fallback color
          const fallbackColor: Color = {
            hex: "#FF6B6B",
            rgb: "rgb(255, 107, 107)",
            hsl: "hsl(0, 100%, 71%)",
          };
          newPalette.push(fallbackColor);
        }
      }

      setPalette(newPalette);
      setIsLoading(false);
    };

    // Generate initial palette on client
    generateInitialPalette();
  }, []);

  const generateComplementary = () => {
    setIsLoading(true);
    const baseColor = generateRandomColor();
    const complementaryPalette = generateComplementaryPalette(baseColor);
    setPalette(complementaryPalette);
    setIsLoading(false);
  };

  const generateNewPalette = () => {
    setIsLoading(true);
    const newPalette: Color[] = [];

    // Generate a harmonious palette using analogous colors
    const baseHue = Math.floor(Math.random() * 360);
    const baseSaturation = Math.floor(Math.random() * 30) + 60; // 60-90%
    const baseLightness = Math.floor(Math.random() * 20) + 45; // 45-65%

    // Create 5 colors with harmonious hue variations
    const hueOffsets = [0, -30, 30, -60, 60]; // Analogous color scheme
    const lightnessOffsets = [0, 10, -10, 20, -20]; // Vary lightness for depth

    for (let i = 0; i < 5; i++) {
      const hue = (baseHue + hueOffsets[i] + 360) % 360;
      const saturation = Math.max(
        40,
        Math.min(100, baseSaturation + (i - 2) * 10),
      );
      const lightness = Math.max(
        25,
        Math.min(75, baseLightness + lightnessOffsets[i]),
      );

      const rgb = hslToRgb(hue, saturation / 100, lightness / 100);
      const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);

      const color: Color = {
        hex: `#${hex}`,
        rgb: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
        hsl: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      };

      // Validate color before adding to palette
      if (isValidColor(color)) {
        newPalette.push(color);
      } else {
        console.warn("Invalid color generated:", color);
        // Generate a fallback color
        const fallbackColor: Color = {
          hex: "#FF6B6B",
          rgb: "rgb(255, 107, 107)",
          hsl: "hsl(0, 100%, 71%)",
        };
        newPalette.push(fallbackColor);
      }
    }

    setPalette(newPalette);
    setIsLoading(false);
  };

  const copyToClipboard = async (text: string, colorHex: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${colorHex} copied to clipboard!`);
    } catch (_error) {
      console.error("Failed to copy text: ", _error);
      toast.error("Failed to copy to clipboard");
    }
  };

  const exportPalette = () => {
    const exportData = {
      colors: palette.map((color, index) => ({
        name: `Color ${index + 1}`,
        hex: color.hex,
        rgb: color.rgb,
        hsl: color.hsl,
      })),
      timestamp: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

    const exportFileDefaultName = "color-palette.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    
    toast.success("Color palette exported successfully!");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {t("colorPalette.title", lang)}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("colorPalette.description", lang)}
          </p>
        </div>

        {/* Show loading state until client-side initialization */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">
                Generating color palette...
              </p>
            </div>
          </div>
        )}

        {/* Main content - only show when not loading */}
        {!isLoading && (
          <Tabs defaultValue="random" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="random">
                {t("colorPalette.randomTab", lang)}
              </TabsTrigger>
              <TabsTrigger value="complementary">
                {t("colorPalette.complementaryTab", lang)}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="random" className="space-y-6">
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={generateNewPalette}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  {t("colorPalette.generateNewPalette", lang)}
                </Button>
                <Button
                  onClick={exportPalette}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  {t("colorPalette.exportJson", lang)}
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("colorPalette.generatedPalette", lang)}
                  </CardTitle>
                  <CardDescription>
                    {t("colorPalette.clickToCopy", lang)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {palette.map((color, index) => (
                      <div key={index} className="space-y-3">
                        <button
                          type="button"
                          className="w-full h-32 rounded-lg cursor-pointer border-2 border-border hover:border-primary transition-colors relative overflow-hidden group"
                          style={{ backgroundColor: color.hex }}
                          onClick={() => copyToClipboard(color.hex, color.hex)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              copyToClipboard(color.hex, color.hex);
                            }
                          }}
                          aria-label={`Copy ${color.hex} color code`}
                        >
                          <div className="absolute inset-0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2">
                              <Copy className="h-4 w-4 text-black" />
                            </div>
                          </div>

                        </button>
                        <div className="space-y-1 text-xs">
                          <div className="font-mono font-medium">
                            {color.hex}
                          </div>
                          <div className="text-muted-foreground">
                            {color.rgb}
                          </div>
                          <div className="text-muted-foreground">
                            {color.hsl}
                          </div>
                          <div className="flex gap-1 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                copyToClipboard(color.hex, color.hex)
                              }
                              className="text-xs h-6 px-2"
                            >
                              {t("colorPalette.copyHex", lang)}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                copyToClipboard(color.rgb, color.hex)
                              }
                              className="text-xs h-6 px-2"
                            >
                              {t("colorPalette.copyRgb", lang)}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="complementary" className="space-y-6">
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={generateComplementary}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  {t("colorPalette.generateComplementary", lang)}
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("colorPalette.complementaryScheme", lang)}
                  </CardTitle>
                  <CardDescription>
                    {t("colorPalette.oppositeColors", lang)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {palette.map((color, index) => (
                      <div key={index} className="space-y-3">
                        <button
                          type="button"
                          className="w-full h-40 rounded-lg cursor-pointer border-2 border-border hover:border-primary transition-colors relative overflow-hidden group"
                          style={{ backgroundColor: color.hex }}
                          onClick={() => copyToClipboard(color.hex, color.hex)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              copyToClipboard(color.hex, color.hex);
                            }
                          }}
                          aria-label={`Copy ${color.hex} color code`}
                        >
                          <div className="absolute inset-0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2">
                              <Copy className="h-4 w-4 text-black" />
                            </div>
                          </div>

                        </button>
                        <div className="space-y-1 text-sm">
                          <div className="font-mono font-medium">
                            {color.hex}
                          </div>
                          <div className="text-muted-foreground">
                            {color.rgb}
                          </div>
                          <div className="text-muted-foreground">
                            {color.hsl}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
