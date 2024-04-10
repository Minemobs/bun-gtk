import { ptr, read, toArrayBuffer, CString } from "bun:ffi";
import type { Pointer } from "bun:ffi";

function readStringArray(array: Pointer): string[] {
  const arr: string[] = [];
  let offset = 0;
  while(true) {
    const calculatedOffset = offset * BigInt64Array.BYTES_PER_ELEMENT;
    const pointer = read.ptr(array, calculatedOffset) as Pointer;
    const str = new CString(pointer);
    if(str.length === 0) break;
    arr.push(str.toString());
    offset++;
  }
  return arr;
}

readStringArray(
  ptr(new BigUint64Array(["Hello", "World", ""]
    .map(it => ptr(Buffer.from(it + "\0", "utf-8")))
    .map(BigInt)
  ))
).map(it => console.log(`Read: '${it}'`));
