export const convertPascalToCamelCase = obj => {
  const camelCaseObj = {};

  Object.entries(obj).forEach(([key, value]) => {
    const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
    if (typeof value === "object") {
      camelCaseObj[camelKey] = convertPascalToCamelCase(value);
    } else {
      camelCaseObj[camelKey] = value;
    }
  });

  return camelCaseObj;
};
