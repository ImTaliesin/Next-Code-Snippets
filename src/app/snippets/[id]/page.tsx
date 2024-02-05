import { db } from '@/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import * as actions from '@/actions';

interface SnippetShowPageProps {
	params: {
		id: string;
	};
}
export default async function SnippetShowPage(props: SnippetShowPageProps) {
	await new Promise<void>(r => setTimeout(r, 100));
	const snippet = await db.snippet.findFirst({
		where: {
			id: parseInt(props.params.id),
		},
	});

	if (!snippet) {
		notFound();
	}

	const deleteSnippetsAction = actions.deleteSnippet.bind(null, snippet.id);
	
	return (
		<div>
			<div className='flex m-4 justify-between items-center'>
				<h1 className='text-xl font-bold'>{snippet.title}</h1>

				<div className='flex gap-2'>
					<Link
						href={`/snippets/${snippet.id}/edit`}
						className='p-2 border rounded'>
						Edit
					</Link>
					<form action={deleteSnippetsAction}>
						<button className='p-2 border rounded'>Delete</button>
					</form>
				</div>
			</div>

			<pre className='p-3 border rounder bg-gray-200'>
				<code>{snippet.code}</code>
			</pre>
		</div>
	);
}
