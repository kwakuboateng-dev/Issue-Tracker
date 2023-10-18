'use client';
import dynamic from 'next/dynamic';
import { IssueSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from 'axios'
import "easymde/dist/easymde.min.css"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ErrorMessage, Spinner } from '@/app/components'
import { Issue } from '@prisma/client';

//Laxy load the SimpleMDE component
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false
});

type IssueFormData = z.infer<typeof IssueSchema>;


const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema)
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue)
        await axios.patch('/api/issues/' + issue.id, data);
      else
        await axios.post('/api/issues', data);
      router.push('/issues');

    } catch (error) {
      setIsSubmitting(false);
      setError('An unexpected error occured');
    }
  })


  return (
    <div className='max-w-xl'>

      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}

      <form className='space-y-3'
        onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
        </TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE
              {...field}
              placeholder='Description'
            />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}{isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  )
}

export default IssueForm