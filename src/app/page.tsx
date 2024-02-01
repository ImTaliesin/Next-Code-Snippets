import { db } from '@/db';
import { Key } from 'react';
export default async function Home() {
	const snippets = await db.snippet.findMany();
	const renderedSnippets = snippets.map(
		(snippet: { id: Key; title: string; code: string }) => {
			return (
				<div key={snippet.id}>
					<h3>{snippet.title}</h3>
					<pre>{snippet.code}</pre>
				</div>
			);
		}
	);

	return <div>{renderedSnippets}</div>;
}
