import { Tables } from "@/database.types";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "../ui/button";
import { Download, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import DeleteImage from "./DeleteImage";

interface ImageDialogProps {
  image: { url: string | undefined } & Tables<"generated_images">;
  onClose: () => void;
}

const ImageDialog = ({ image, onClose }: ImageDialogProps) => {
  const handleDownload = () => {
    fetch(image.url || "")
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `generated.images-${Date.now()}.${image?.output_format}`
        );
        document.body.appendChild(link);
        link.click();

        link.parentNode?.removeChild(link);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Image details</SheetTitle>
          <div className="relative w-fit h-fit">
            <Image
              src={image.url || ""}
              width={image.width || 0}
              height={image.height || 0}
              alt={image.prompt || "AI generated image"}
              className="w-full h-auto flex my-3 rounded"
            />
            <div className="flex gap-4 absolute bottom-4 right-2">
              <Button className="w-fit" onClick={handleDownload}>
                Download <Download className="w-4 h-4 " />
              </Button>
              <DeleteImage
                imageId={image.id.toString()}
                onDelete={onClose}
                imageName={image.image_name ?? ""}
                className="w-fit"
              />
            </div>
          </div>
          <hr className="w-full inline-block border-black/30 px-6" />

          <p className="text-black/90 w-full flex flex-col">
            <span className="text-black font-semibold">Prompt</span>
            {image.prompt}
          </p>
          <hr className="w-full inline-block border-black/30 px-6" />
          <div className="w-full h-full flex flex-wrap gap-2 my-2">
            <Badge
              className="rounded-4xl border border-black/40 px-4 py-2 text-sm font-medium"
              variant={"secondary"}
            >
              <span className="text-black uppercase font-semibold ">
                Model :
              </span>

              {image.model}
            </Badge>
            <Badge
              className="rounded-4xl border border-black/40 px-4 py-2 text-sm font-medium"
              variant={"secondary"}
            >
              <span className="text-black uppercase font-semibold ">
                Guidance :
              </span>

              {image.guidance}
            </Badge>
            <Badge
              className="rounded-4xl border border-black/40 px-4 py-2 text-sm font-medium"
              variant={"secondary"}
            >
              <span className="text-black uppercase font-semibold ">
                Format :
              </span>

              {image.output_format}
            </Badge>
            <Badge
              className="rounded-4xl border border-black/40 px-4 py-2 text-sm font-medium"
              variant={"secondary"}
            >
              <span className="text-black uppercase font-semibold ">
                Width :
              </span>

              {image.width}
            </Badge>
            <Badge
              className="rounded-4xl border border-black/40 px-4 py-2 text-sm font-medium"
              variant={"secondary"}
            >
              <span className="text-black uppercase font-semibold ">
                Height :
              </span>

              {image.height}
            </Badge>
            <Badge
              className="rounded-4xl border border-black/40 px-4 py-2 text-sm font-medium"
              variant={"secondary"}
            >
              <span className="text-black uppercase font-semibold ">
                Ratio :
              </span>

              {image.aspect_ratio}
            </Badge>
            <Badge
              className="rounded-4xl border border-black/40 px-4 py-2 text-sm font-medium"
              variant={"secondary"}
            >
              <span className="text-black uppercase font-semibold ">
                Steps :
              </span>

              {image.num_inference_steps}
            </Badge>
            <Badge
              className="rounded-4xl border border-black/40 px-4 py-2 text-sm font-medium"
              variant={"secondary"}
            >
              <span className="text-black uppercase font-semibold ">
                Created at :
              </span>

              {new Date(image.created_at).toLocaleDateString()}
            </Badge>
          </div>
          <hr className="w-full inline-block border-black/30 px-6" />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ImageDialog;
