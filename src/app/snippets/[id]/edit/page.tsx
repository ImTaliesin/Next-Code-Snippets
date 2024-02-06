import { db } from '@/db';
import { notFound } from 'next/navigation';
import SnippetEditForm from '@/components/snippetEditForm';

interface SnippetEditPageProps {
	params: {
		id: string;
	};
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
	const id = parseInt(props.params.id);

	const snippet = await db.snippet.findFirst({
		where: { id },
	});
	if (!snippet) {
		notFound();
	}
	return (
		<div className='pt-8'>
			<SnippetEditForm snippet={snippet} />
		</div>
	);
}
