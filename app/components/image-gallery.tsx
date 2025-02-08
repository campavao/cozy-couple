import { Item } from "../types/types";
import { fileType, isVideo } from "../utils/utils";
import { LoadingImage } from "./image";

export function ImageGallery({ urls, item }: { urls: string[]; item: Item }) {
  return (
    <div className='grid grid-cols-3 gap-2'>
      {urls.map((url, index) =>
        isVideo(url) ? (
          <video
            key={index}
            muted
            controls
            width={300}
            height={500}
            className='rounded-lg object-contain'
          >
            <source src={url} type={`video/${fileType(url)}`} />
          </video>
        ) : (
          <LoadingImage
            className='rounded-lg object-contain'
            src={url}
            alt=''
            width={300}
            height={500}
            loading='lazy'
            key={index}
            item={item}
          />
        )
      )}
    </div>
  );
}
