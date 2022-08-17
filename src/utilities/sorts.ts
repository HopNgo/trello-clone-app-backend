// Order an array of object from an another array order

export const mapOrder = (array: any, order: any, key: any) => {
  array.sort((a: any, b: any) => order.indexOf(a[key]) - order.indexOf(b[key]));
  return array;
};
