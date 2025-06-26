export default function ExternalLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return <a href={href} className="font-bold hover:underline">{text}</a>;
}
