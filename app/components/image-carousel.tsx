import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LoadingImage } from "./image";

export function ImageCarousel({ urls }: { urls: string[] }) {
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
            {url.includes(".mp4") ? (
              <video
                muted
                controls
                width={300}
                height={500}
                className='md:max-h-[250px] w-full rounded-lg object-contain'
              >
                <source src={url} type='video/mp4' />
              </video>
            ) : (
              <a href={url} target='_blank' rel='noopener noreferrer'>
                <LoadingImage
                  className='rounded-lg object-contain'
                  src={url}
                  alt=''
                  width={300}
                  height={500}
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
