import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Button } from "@linkup/ui/button";

export function PostBody({ id }: { id: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const element = contentRef.current;
        const lineHeight = parseInt(getComputedStyle(element).lineHeight);
        const height = element.clientHeight;
        const lines = height / lineHeight;
        setIsOverflowing(lines > 3);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <>
      <div className="mb-3 px-6">
        <div
          ref={contentRef}
          className={`relative overflow-hidden transition-all duration-300 ${
            isOverflowing && !isExpanded
              ? "line-clamp-3 [-webkit-box-orient:vertical] [display:-webkit-box]"
              : ""
          }`}
        >
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error
            neque reiciendis, quisquam fugiat nesciunt ad, consectetur minima
            provident doloremque tenetur sit vel odit temporibus! Aspernatur!
          </p>
          <p>
            Nisi aliquid saepe perspiciatis illum quasi nam dolorum sit
            expedita, facilis ut voluptas totam numquam perferendis quod
            corrupti eos vero, exercitationem, illo dolor doloribus rerum.
          </p>
          <p>
            Atque culpa nobis molestiae enim repellat ducimus illo quia,
            corrupti obcaecati incidunt, ipsam totam excepturi sit in eius,
            quibusdam recusandae at eveniet repudiandae. Quisquam, error.
          </p>
          {isOverflowing && !isExpanded && (
            <div className="absolute bottom-0 left-0 h-8 w-full bg-gradient-to-t from-background to-transparent" />
          )}
        </div>
        {isOverflowing && (
          <Button
            variant="link"
            className="mt-2 h-auto p-0 text-xs text-muted-foreground"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "See less" : "See more"}
          </Button>
        )}
      </div>

      <div className="relative aspect-square">
        <Image
          alt="test"
          fill
          className="object-cover"
          sizes="100%"
          src={`https://picsum.photos/seed/${id}/900/900`}
        />
      </div>
    </>
  );
}
