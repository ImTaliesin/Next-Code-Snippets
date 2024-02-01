import { db } from '@/db';

interface SnippetShowPageProps {
	params: {
		id: string;
	};
}
export default async function SnipperShowPage(props: any) {
	const snippet = await db.snippet.findFirst({
		where: {
			id: parseInt(props.params.id)
		},
	});

	return (<div>{snippet.title}<pre>{snippet.code}</pre></div>);
}
