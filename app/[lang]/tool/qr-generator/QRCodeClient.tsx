"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { LanguageType } from "@/lib/translation";
import { t } from "@/lib/translation";

interface Props {
  lang: LanguageType;
}

export default function QRCodeClient({ lang }: Props) {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [wifi, setWifi] = useState({ ssid: "", password: "", security: "WPA" });
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const generateQR = (content: string) => {
    if (!content.trim()) {
      setQrCodeUrl("");
      return;
    }

    // Using QR Server API for demonstration
    const encodedContent = encodeURIComponent(content);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedContent}`;
    setQrCodeUrl(qrUrl);
  };

  const handleTextGenerate = () => {
    generateQR(text);
  };

  const handleUrlGenerate = () => {
    const fullUrl = url.startsWith("http") ? url : `https://${url}`;
    generateQR(fullUrl);
  };

  const handleEmailGenerate = () => {
    const mailtoLink = `mailto:${email}`;
    generateQR(mailtoLink);
  };

  const handlePhoneGenerate = () => {
    const telLink = `tel:${phone}`;
    generateQR(telLink);
  };

  const handleWifiGenerate = () => {
    const wifiString = `WIFI:T:${wifi.security};S:${wifi.ssid};P:${wifi.password};;`;
    generateQR(wifiString);
  };

  const downloadQR = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {t("qrGenerator.title", lang)}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("qrGenerator.description", lang)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text">
                  {t("qrGenerator.textTab", lang)}
                </TabsTrigger>
                <TabsTrigger value="url">
                  {t("qrGenerator.urlTab", lang)}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("qrGenerator.textTitle", lang)}</CardTitle>
                    <CardDescription>
                      {t("qrGenerator.textDescription", lang)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="text-input">
                        {t("qrGenerator.textLabel", lang)}
                      </Label>
                      <Textarea
                        id="text-input"
                        placeholder={t("qrGenerator.textPlaceholder", lang)}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                    <Button onClick={handleTextGenerate} className="w-full">
                      {t("qrGenerator.generateTextButton", lang)}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="url" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("qrGenerator.urlTitle", lang)}</CardTitle>
                    <CardDescription>
                      {t("qrGenerator.urlDescription", lang)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="url-input">
                        {t("qrGenerator.urlLabel", lang)}
                      </Label>
                      <Input
                        id="url-input"
                        placeholder={t("qrGenerator.urlPlaceholder", lang)}
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleUrlGenerate} className="w-full">
                      {t("qrGenerator.generateUrlButton", lang)}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Tabs defaultValue="email" className="w-full mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">
                  {t("qrGenerator.emailTab", lang)}
                </TabsTrigger>
                <TabsTrigger value="phone">
                  {t("qrGenerator.phoneTab", lang)}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("qrGenerator.emailTitle", lang)}</CardTitle>
                    <CardDescription>
                      {t("qrGenerator.emailDescription", lang)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email-input">
                        {t("qrGenerator.emailLabel", lang)}
                      </Label>
                      <Input
                        id="email-input"
                        type="email"
                        placeholder={t("qrGenerator.emailPlaceholder", lang)}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleEmailGenerate} className="w-full">
                      {t("qrGenerator.generateEmailButton", lang)}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("qrGenerator.phoneTitle", lang)}</CardTitle>
                    <CardDescription>
                      {t("qrGenerator.phoneDescription", lang)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="phone-input">
                        {t("qrGenerator.phoneLabel", lang)}
                      </Label>
                      <Input
                        id="phone-input"
                        placeholder={t("qrGenerator.phonePlaceholder", lang)}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <Button onClick={handlePhoneGenerate} className="w-full">
                      {t("qrGenerator.generatePhoneButton", lang)}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Tabs defaultValue="wifi" className="w-full mt-6">
              <TabsContent value="wifi" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("qrGenerator.wifiTitle", lang)}</CardTitle>
                    <CardDescription>
                      {t("qrGenerator.wifiDescription", lang)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="wifi-ssid">
                        {t("qrGenerator.wifiSsidLabel", lang)}
                      </Label>
                      <Input
                        id="wifi-ssid"
                        placeholder={t("qrGenerator.wifiSsidPlaceholder", lang)}
                        value={wifi.ssid}
                        onChange={(e) =>
                          setWifi({ ...wifi, ssid: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="wifi-password">
                        {t("qrGenerator.wifiPasswordLabel", lang)}
                      </Label>
                      <Input
                        id="wifi-password"
                        type="password"
                        placeholder={t(
                          "qrGenerator.wifiPasswordPlaceholder",
                          lang,
                        )}
                        value={wifi.password}
                        onChange={(e) =>
                          setWifi({ ...wifi, password: e.target.value })
                        }
                      />
                    </div>
                    <Button onClick={handleWifiGenerate} className="w-full">
                      {t("qrGenerator.generateWifiButton", lang)}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t("qrGenerator.generatedQrCode", lang)}</CardTitle>
                <CardDescription>
                  {t("qrGenerator.noQrCode", lang)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {qrCodeUrl ? (
                  <>
                    <div className="flex justify-center">
                      <img
                        src={qrCodeUrl}
                        alt="Generated QR Code"
                        className="border rounded-lg"
                        style={{ maxWidth: "300px", height: "auto" }}
                      />
                    </div>
                    <Button onClick={downloadQR} className="w-full">
                      {t("qrGenerator.downloadButton", lang)}
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                    <div className="text-center text-muted-foreground">
                      <p>{t("qrGenerator.noQrCode", lang)}</p>
                      <p className="text-sm">
                        {t("qrGenerator.scanToAccess", lang)}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
