'use client';

import * as actions from '@/actions';
import { useFormState } from 'react-dom';

export default function SnippetCreatePage() {
	const [formState, action] = useFormState(actions.createSnippet, {
		message: '',
	});

	return (
		<form action={action}>
			<h3 className='font-bold pt-3 pb-3 text-white'>Create a Snippet</h3>
			<div className='flex flex-col gap-4'>
				<div className='flex gap-4'>
					<label
						className='w-12 text-white'
						htmlFor='title'>
						Title:
					</label>
					<input
						name='title'
						className='border roundeed p-2 w-full'
						id='title'
					/>
				</div>
				<div className='flex gap-4'>
					<label
						className='w-12 text-white'
						htmlFor='code'>
						Code:
					</label>
					<textarea
						name='code'
						className='border roundeed p-2 w-full '
						id='code'
					/>
				</div>
				 {formState.message ? <div className='my-2 p-2 bg-red-400 border rounded border-red-800 text-center'>{formState.message}</div> : null}
				 {/* Code above checks if a formstate message exists, if it does then display error with message in it, if not then return null */}
				<button
					type='submit'
					className='rounded p2 bg-teal-400'>
					Create
				</button>
			</div>
		</form>
	);
}
