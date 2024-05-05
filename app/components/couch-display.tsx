import { Couch } from "../types/types";

export function CouchDisplay({ couch }: { couch?: Couch }) {
  if (!couch) {
    return null;
  }

  return (
    <div className='w-full'>
      <h2 className='pt-4 pb-2'>Couch Details</h2>
      <div className='flex flex-col gap-2'>
        {couch.color && (
          <p>
            <strong>Color:</strong> {couch.color}
          </p>
        )}
        {couch.brand && (
          <p>
            <strong>Brand:</strong> {couch.brand}
          </p>
        )}
        <p>
          <strong>Type:</strong> {couch.type}
        </p>
        {couch.dimensions && (
          <p>
            <strong>Dimensions:</strong> {couch.dimensions}
          </p>
        )}
      </div>
    </div>
  );
}
