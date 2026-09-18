import { CONTACTS } from "@/lib/cv";

export function ContactList({ className = "" }: { className?: string }) {
  return (
    <ul className={`label flex flex-col text-accent ${className}`}>
      {CONTACTS.map((contact) => (
        <li key={contact.label}>
          {contact.href ? (
            <a
              href={contact.href}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline focus-visible:underline"
            >
              {contact.label}
            </a>
          ) : (
            contact.label
          )}
        </li>
      ))}
    </ul>
  );
}
