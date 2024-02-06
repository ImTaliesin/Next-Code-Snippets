'use server';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function editSnippet(id: number, code: string) {
	await db.snippet.update({
		where: { id },
		data: { code },
	});
	console.log(id, code);
	redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
	await db.snippet.delete({ where: { id } });
	console.log('deleted snippet:', id);
	revalidatePath('/');
	redirect('/');
}

export async function createSnippet(
	formState: { message: string },
	formData: FormData
) {
	//get the title and code from the form data
	const title = formData.get('title') as string;
	const code = formData.get('code') as string;
	try {
		if (typeof title !== 'string' || title.length < 3) {
			return {
				message: 'Title Must Be Longer',
			};
		}

		if (typeof code !== 'string' || code.length < 10) {
			return {
				message: 'Code Must Be Longer',
			};
		}
		//create a new snippet in the database
		await db.snippet.create({
			data: {
				title,
				code,
			},
		});
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.error(err);
			return {
				message: err.message,
			};
		} else {
			return {
				message: 'Snippet Created',
			};
		}
	}

	//redirect to root route
	revalidatePath('/');
	redirect('/');
}
