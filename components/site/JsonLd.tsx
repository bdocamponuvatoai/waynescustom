type JsonLdProps = { data: Record<string, unknown> };

/** Renders structured data, escaping `<` so content can never close the script tag. */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
