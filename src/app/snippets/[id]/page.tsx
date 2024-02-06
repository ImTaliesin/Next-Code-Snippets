import { db } from '@/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import * as actions from '@/actions';
import { Snippet } from '@prisma/client';

interface SnippetShowPageProps {
	params: {
		id: string;
	};
}
export default async function SnippetShowPage(props: SnippetShowPageProps) {
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
				<Link href={'/'}>
					<h1 className='flex p-2 border rounded bg-teal-400'>Home</h1>
				</Link>
				<h1 className='text-xl font-bold text-white'>{snippet.title}</h1>
				<div className='flex gap-2'>
					<Link
						href={`/snippets/${snippet.id}/edit`}
						className='p-2 border rounded bg-teal-400'>
						Edit
					</Link>
					<form action={deleteSnippetsAction}>
						<button className='p-2 border rounded bg-teal-400'>Delete</button>
					</form>
				</div>
			</div>

			<pre className='p-3 border rounder bg-teal-400'>
				<code>{snippet.code}</code>
			</pre>
		</div>
	);
}

export async function generateStaticParams() {
	const snippets = await db.snippet.findMany();
	return snippets.map((snippet: Snippet) => {
		return {
			id: snippet.id.toString(),
		};
	});
}
