// src/components/SchemaMarkup.tsx

interface SchemaMarkupProps {
  schema: object | object[] | null | undefined;
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  // Handle null/undefined
  if (!schema) {
    return null;
  }

  // Flatten arrays and filter out null/undefined values
  const schemas = Array.isArray(schema) ? schema : [schema];
  const validSchemas = schemas.filter((s): s is object => s != null);

  // Don't render anything if no valid schemas
  if (validSchemas.length === 0) {
    return null;
  }

  // If single schema, output as single object
  // If multiple, output as array (for @graph pattern)
  const output = validSchemas.length === 1 ? validSchemas[0] : validSchemas;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(output) }}
    />
  );
}
