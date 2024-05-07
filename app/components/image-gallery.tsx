import { Item } from "../types/types";
import { LoadingImage } from "./image";

export function ImageGallery({ urls, item }: { urls: string[]; item: Item }) {
  return (
    <div className='grid grid-cols-3 gap-2'>
      {urls.map((url, index) =>
        url.includes(".mp4") ? (
          <video
            key={index}
            muted
            controls
            width={300}
            height={500}
            className='rounded-lg object-contain'
          >
            <source src={url} type='video/mp4' />
          </video>
        ) : (
          <LoadingImage
            className='rounded-lg object-contain'
            src={url}
            alt=''
            width={300}
            height={500}
            key={index}
            item={item}
          />
        )
      )}
    </div>
  );
}
