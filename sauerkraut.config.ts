import path from 'node:path'
import fs from 'node:fs/promises'
import type { Config, LayoutData, Frontmatter } from 'sauerkraut'

export const title = 'Edwin Kofler'

export function createHead(config: Config, layoutData: LayoutData) {
	const html = String.raw

	return html`<link rel="stylesheet" href="/css/open-color.css" />
		<link rel="stylesheet" href="/css/fonts.css" />
		<link rel="stylesheet" href="/css/global.css" />
		<link rel="stylesheet" href="/css/github-markdown-light-v5.7.0-modified.css" />
		<script
			data-goatcounter="https://edwinkofler-com.goatcounter.com/count"
			async
			src="https://gc.zgo.at/count.js"
		></script>`
}

export function createContent(config: Config, layoutData: LayoutData) {
	const html = String.raw
	layoutData
	return html`<header class="Header">
			<figure class="profile-picture_">
				<a href="/">
					<img src="/assets/redpanda.png" alt="Edwin&#39;s profile picture" />
				</a>
				<figcaption>
					<h1>Edwin Kofler</h1>
				</figcaption>
			</figure>
			<div class="header-bottom_">
				<nav class="nav">
					<a href="/">Home</a>
					<a href="/about/">About</a>
					<a href="/links/">Links</a>
					<a href="/posts/">Posts</a>
					<a href="/notes/">Notes</a>
				</nav>
				<div class="links">
					<div class="link">
						<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<title>GitHub</title>
							<path
								d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
							/>
						</svg>
						<a href="https://github.com/hyperupcall">GitHub</a>
					</div>
					<div class="link">
						<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<title>Bluesky</title>
							<path
								d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"
							/>
						</svg>
						<a href="https://bsky.app/profile/hyperupcall.bsky.social">BlueSky</a>
					</div>
					<div class="link">
						<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<title>Mastodon</title>
							<path
								d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"
							/>
						</svg>
						<a rel="me" href="https://tech.lgbt/@hyperupcall">Mastodon</a>
					</div>
				</div>
			</div>
			<footer class="footer">
				<p>© Edwin Kofler</p>
			</footer>
		</header>
		<body>
			${layoutData.inputFileType === 'markdown'
				? html`<div class="Content">
						<main class="markdown-body markdown-latex">
							<h1>${layoutData.title}</h1>
							${layoutData.body}
						</main>
					</div>`
				: layoutData.body}
		</body>`
}

export function transformUri(config: Config, uri: string) {
	if (uri.startsWith('pages/')) {
		uri = uri.replace(/^pages\//, '')
	} else if (uri.startsWith('posts/')) {
		uri = uri.replace(/^posts\/(?:.*?\/)?/g, 'posts/')
	} else if (uri.startsWith('notes/')) {
		uri = uri.replace(/^notes\/(?:.*?\/)?/g, 'notes/')
		uri = uri.replace(/^notes\/(.*?)\.md/g, 'notes/$1/index.html')
	}

	// drafts
	uri = uri.replaceAll('/development-philosophy', '/my-development-philosophy')

	// 2022
	uri = uri.replaceAll('/expect-terminal-automation', '/terminal-automation-with-expect')

	// 2020
	uri = uri.replaceAll('/fixing-internal-network', '/fixing-my-internal-network')
	uri = uri.replaceAll(
		'/fiddling-ubuntu-server-images',
		'/fiddling-with-ubuntu-server-images',
	)

	// 2019
	uri = uri.replaceAll(
		'/web-development-years-reflection',
		'/front-end-web-dev-a-years-reflection',
	)

	// 2018
	uri = uri.replaceAll(
		'/hugo-render-latex-with-katex',
		'/render-latex-with-katex-in-hugo-blog',
	)
	uri = uri.replaceAll(
		'/fibonacci-pascal-equation-part-1',
		'/fibonacci-equation-using-pascals-triangle-part-1',
	)
	uri = uri.replaceAll(
		'/fibonacci-pascal-equation-part-2',
		'/fibonacci-equation-using-pascals-triangle-part-2',
	)

	return uri
}

export function validateFrontmatter(
	config: Config,
	inputFile: string,
	frontmatter: Partial<Frontmatter>,
) {
	const uri = path.relative(config.contentDir, inputFile)

	if (uri.startsWith('posts/') || uri.startsWith('posts/')) {
		for (const requiredProperty of ['title', 'author', 'date']) {
			if (!(requiredProperty in frontmatter)) {
				throw new Error(
					`Missing required frontmatter property of "${requiredProperty}" in file: ${inputFile}`,
				)
			}
		}
	}

	for (const property in frontmatter) {
		if (
			!['title', 'author', 'date', 'layout', 'categories', 'tags', 'draft'].includes(
				property,
			)
		) {
			throw new Error(
				`Invalid frontmatter property of "${property}" in file: ${inputFile}`,
			)
		}
	}

	return frontmatter as Frontmatter
}
