// Filter allowed fields from payload
export const filterPayload = (
  payload: Record<string, any>,
  allowedFields: string[]
) => {
  const disallowedFields = Object.keys(payload).filter(
    (key) => !allowedFields.includes(key)
  );

  if (disallowedFields.length > 0) {
    throw new Error(`Invalid fields: ${disallowedFields.join(', ')}`);
  }

  return Object.keys(payload)
    .filter((key) => allowedFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = payload[key];
      return obj;
    }, {} as Record<string, any>);
};
