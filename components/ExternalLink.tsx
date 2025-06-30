export default function ExternalLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return <a href={href} target="_blank" className="font-semibold underline hover:font-bold">{text}</a>;
}
