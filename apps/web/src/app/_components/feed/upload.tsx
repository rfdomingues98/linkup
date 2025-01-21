"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useDropzone } from "@uploadthing/react";
import { ImageIcon } from "lucide-react";
import { createPortal } from "react-dom";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";

import { Button } from "@linkup/ui/button";
import { TextWithTooltip } from "@linkup/ui/text-with-tooltip";

import { useUploadThing } from "~/utils/uploadthing";

export function MultiUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, routeConfig } = useUploadThing("videoAndImage", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: (fileName) => {
      console.log("upload has begun for", fileName);
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes,
    ),
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div>
        {files.length > 0 &&
          createPortal(
            <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
              {files.map((file) => (
                <ImagePreview file={file} />
              ))}
            </div>,
            document.getElementById("ut-attachments") ?? document.body,
          )}
      </div>
      <Button variant="ghost" className="w-max gap-1 p-2">
        <ImageIcon className={"text-blue-500"} />
        <TextWithTooltip text={"Photo"} />
      </Button>
    </div>
  );
}

function ImagePreview({ file }: { file: File }) {
  const fileUrl = URL.createObjectURL(file);

  return (
    <div className="group relative aspect-[3/4] h-48 rounded">
      <Image
        alt=""
        fill
        sizes="100%"
        className="rounded object-cover"
        src={fileUrl}
      />
      <button className="absolute right-1 top-1 hidden h-6 w-6 rounded-full bg-white shadow-md hover:bg-gray-100 group-hover:block">
        <span className="text-gray-600">×</span>
      </button>
    </div>
  );
}
