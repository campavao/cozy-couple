import { Couch, COUNT_TYPES } from "../types/types";
import { Input } from "./input";
import { Select } from "./select";

export function CouchForm({ couch }: { couch?: Couch }) {
  return (
    <div className='w-full col-span-2'>
      <h2>Couch details</h2>
      <Input label='Color' name='couchColor' defaultValue={couch?.color} />
      <Input label='Brand' name='couchBrand' defaultValue={couch?.brand} />
      <Select
        label='Type'
        name='couchType'
        defaultValue={couch?.type}
        options={COUNT_TYPES}
      />
      <Input
        label='Dimensions'
        name='dimensions'
        defaultValue={couch?.dimensions}
      />
    </div>
  );
}

export function getCouchValues(data: any): Couch {
  return {
    color: data.couchColor.value,
    brand: data.couchBrand.value,
    type: data.couchType.value,
    dimensions: data.dimensions.value,
  };
}
