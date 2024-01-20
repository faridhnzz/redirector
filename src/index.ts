import { Router } from 'itty-router';
const router = Router();

export interface Env {
	LINKS: KVNamespace;
}

router.get('/', () => Response.redirect('https://fayln.com', 307));
router.get('/favicon.ico', () => Response.redirect('https://fayln.com/favicon.ico', 301));

// Redirect go!
router.get('/:slug/:to+?', async (request, env: Env) => {
	const { slug, to }: Record<string, string> = request.params;
	const slugTo: string = to ? `/${request.params?.to}` : '';

	const alias: Record<string, string> = {
		gh: 'github',
		ig: 'instagram',
		tw: 'twitter',
		X: 'twitter',
		poly: 'polywork',
	};

	const normalizedParams: string = alias[slug] || slug;
	const origin = await env.LINKS.get(normalizedParams, { cacheTtl: 3600 });

	if (!origin) {
		return new Response('No links exist with the name.', {
			status: 404,
		});
	}

	return new Response(null, {
		status: 301,
		headers: {
			Location: origin + slugTo,
			'Referrer-Policy': 'no-referrer',
		},
	});
});

// Bruhh
router.all('*', () => Response.redirect('https://fayln.com', 307));

// Let's go!
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return router.handle(request, env, ctx);
	},
};
