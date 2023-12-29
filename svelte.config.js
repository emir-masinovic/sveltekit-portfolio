// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-auto';

export default {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true,
			host: '0.0.0.0'
		})
	}
};
