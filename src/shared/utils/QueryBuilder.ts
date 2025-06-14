/**
 * Builds a SET clause for SQL UPDATE queries based on an object of data to update.
 * @param data An object where keys are column names and values are the new values.
 * @returns An object containing the SET clause string and an array of parameters.
 */
export const buildUpdateSetClause = (
  data: Record<string, any>
): { setClause: string; params: any[] } => {
  const setParts: string[] = [];
  const params: any[] = [];

  for (const key in data) {
    if (
      Object.prototype.hasOwnProperty.call(data, key) &&
      data[key] !== undefined
    ) {
      setParts.push(`${key} = ?`);
      params.push(data[key]);
    }
  }

  const setClause = setParts.join(", ");
  return { setClause, params };
};
