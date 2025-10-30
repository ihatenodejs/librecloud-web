"use client";

import type { HTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type GalleryItem = {
  alt: string;
  caption?: ReactNode;
  href?: string;
  src: string;
};

export interface GalleryProps extends HTMLAttributes<HTMLDivElement> {
  images: GalleryItem[];
  imageClassName?: string;
}

export function Gallery({
  className,
  imageClassName,
  images,
  ...props
}: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  if (!images?.length) {
    return null;
  }

  return (
    <>
      <div
      className={cn(
      'not-prose grid gap-6 mb-10 sm:gap-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] lg:mb-0 lg:pb-6',
      className,
      )}
        {...props}
      >
        {images.map((image, index) => (
          <figure
            key={`${image.src}-${index}`}
            className="group flex flex-col overflow-hidden rounded-lg border border-border bg-neutral-100 dark:bg-neutral-900 p-0 m-0"
          >
            {renderImage(image, imageClassName, () => { setSelectedImage(image); setZoom(1); setPan({ x: 0, y: 0 }); })}

            {(image.caption ?? image.href) && (
              <figcaption className="border-t border-border px-2 py-2 sm:px-4 sm:py-3 text-sm text-gray-600 dark:text-gray-400 mt-0 bg-neutral-200 dark:bg-neutral-800">
                {image.caption ?? defaultCaption(image.href)}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="w-[95vw] h-[95vh] max-w-none max-h-none p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedImage?.alt}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div
              className="relative w-full h-full overflow-hidden bg-black"
              onWheel={(e) => {
                e.preventDefault();
                setZoom(z => Math.max(0.5, Math.min(3, z + (e.deltaY > 0 ? -0.1 : 0.1))));
              }}
              onMouseDown={(e) => {
                if (zoom > 1) {
                  setIsDragging(true);
                  setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
                }
              }}
              onMouseMove={(e) => {
                if (isDragging && zoom > 1) {
                  setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
                }
              }}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              style={{ cursor: isDragging ? 'grabbing' : zoom > 1 ? 'grab' : 'default' }}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain select-none"
                onDragStart={(e) => e.preventDefault()}
                style={{
                  transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                  transformOrigin: 'center',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                }}
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => { setZoom(z => Math.max(0.5, z - 0.5)); setPan({ x: 0, y: 0 }); }}
                >
                  -
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
                >
                  Reset
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => { setZoom(z => Math.min(3, z + 0.5)); setPan({ x: 0, y: 0 }); }}
                >
                  +
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function renderImage(image: GalleryItem, imageClassName?: string, onClick?: () => void) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      loading="lazy"
      className={cn(
        'w-full h-auto max-h-80 object-contain cursor-pointer m-0 bg-muted/40',
        imageClassName,
      )}
      onClick={onClick}
    />
  );
}

function defaultCaption(href?: string): ReactNode {
  if (!href) {
    return null;
  }

  try {
    const url = new URL(href, 'https://example.com');
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="underline hover:no-underline"
      >
        {url.pathname}
      </a>
    );
  } catch {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="underline hover:no-underline"
      >
        {href}
      </a>
    );
  }
}

export default Gallery;
