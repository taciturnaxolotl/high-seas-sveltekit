import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';

const schema = z.object({
    shipName: z.string(),
    repoUrl: z.string().url(),
    deploymentUrl: z.string().url(),
    readmeUrl: z.string().url(),
    screenshotUrl: z.string().url()
});
export type ShipDialogSchema = z.infer<typeof schema>;

export const load = async () => {
    const shipDialogForm = await superValidate(zod(schema));
    return { shipDialogForm };
};

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(schema));
        console.log(form);

        if (!form.valid) {
            // Again, return { form } and things will just work.
            return fail(400, { form });
        }

        // TODO: Do something with the validated form.data

        // Display a success status message
        return message(form, 'Form posted successfully!');
    }
};