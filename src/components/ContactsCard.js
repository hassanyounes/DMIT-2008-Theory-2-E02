import Card from './Card';

export default function ContactsCard({ contacts }) {
    return <Card colSpan="md:col-span-1" rowSpan="md:row-span-5">
        <div className="h-full">
            <header className="flex items-center">
                <h1 className="text-white text-xl font-bold">
                    {contacts.title}
                </h1>
            </header>
            <address className="flex flex-col mt-4">
                <h2 className="text-gray-500">{contacts.contactDetailsTitle}</h2>
                <p className="max-w-full leading-tight break-all" title={contacts.email}>
                    {contacts.email}
                </p>
                <p className="mt-1">{contacts.location}</p>
            </address>
            <div className="flex flex-col mt-4 w-fit">
                <h2 className="text-gray-500">{contacts.socialsTitle}</h2>
                <ul className="list-none">
                    {contacts.socialLinks.map((socialLink) => (
                        <li key={socialLink.label}>
                            <a href={socialLink.url} rel="noreferrer" target="_blank">
                                {socialLink.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </Card>
}
