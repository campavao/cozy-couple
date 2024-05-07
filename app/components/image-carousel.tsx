import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LoadingImage } from "./image";
import { Item } from "../types/types";
import { fileType, isVideo } from "../utils/utils";

export function ImageCarousel({ urls, item }: { urls: string[]; item: Item }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className='w-full max-w-[60vw]'
    >
      <CarouselContent className='min-h-[100px] '>
        {urls.map((url, index) => (
          <CarouselItem
            className='basis relative flex items-center justify-center'
            key={index}
          >
            {isVideo(url) ? (
              <video
                muted
                controls
                width={300}
                height={500}
                className='md:max-h-[250px] w-full rounded-lg object-contain'
              >
                <source src={url} type={`video/${fileType(url)}`} />
              </video>
            ) : (
              <a href={url} target='_blank' rel='noopener noreferrer'>
                <LoadingImage
                  className='rounded-lg object-contain'
                  src={url}
                  alt=''
                  width={300}
                  height={500}
                  item={item}
                />
              </a>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
