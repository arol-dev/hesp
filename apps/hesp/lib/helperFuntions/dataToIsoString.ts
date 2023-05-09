function dateToISOString(obj: any): any {
  if (obj instanceof Date) {
    return obj.toISOString();
  } else if (Array.isArray(obj)) {
    return obj.map(dateToISOString);
  } else if (typeof obj === "object" && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = dateToISOString(obj[key]);
    }
    return newObj;
  } else {
    return obj;
  }
}
export default dateToISOString;
