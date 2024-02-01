import { db } from '@/db';
import { notFound } from 'next/navigation';
interface SnippetShowPageProps {
	params: {
		id: string;
	};
}
export default async function SnippetShowPage(props: SnippetShowPageProps) {
	await new Promise<void>((r) => setTimeout(r, 100));
	const snippet = await db.snippet.findFirst({
		where: {
			id: parseInt(props.params.id)
		},
	});

	if (!snippet) {
		notFound();
	}

	return (<div>{snippet.title}<pre>{snippet.code}</pre></div>);
}
