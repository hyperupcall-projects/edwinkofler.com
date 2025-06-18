import path from 'node:path'
import fs from 'node:fs/promises'
import TOML from 'smol-toml'
import type { Config, Options } from 'sauerkraut'
import { transformUri } from './sauerkraut.config.ts'

export async function getPosts({
	config,
	options,
}: {
	config: Config
	options: Options
}) {
	const posts = []
	for (const year of await fs
		.readdir(path.join(config.contentDir, 'posts'))
		.catch((err) => {
			if (err.code !== 'ENOENT') throw err
			return []
		})) {
		if (year === 'drafts') continue

		for (const post of await fs.readdir(path.join(config.contentDir, 'posts', year))) {
			const inputFile = await getInputFile(
				path.join(config.contentDir, 'posts', year, post),
				post,
			)
			let markdown = await fs.readFile(inputFile, 'utf-8')
			const { html, frontmatter } = (() => {
				let frontmatter = {}
				markdown = markdown.replace(/^\+\+\+$(.*)\+\+\+$/ms, (_, toml) => {
					frontmatter = TOML.parse(toml)
					return ''
				})

				return {
					html: globalThis.MarkdownItInstance.render(markdown),
					frontmatter: config.validateFrontmatter(
						config,
						inputFile,
						frontmatter,
						/** @type {ContentForm} */ '',
					),
				}
			})()
			const slug = path.basename(path.dirname(transformUri(config, inputFile)))
			const dateNice = formattedDate(new Date(frontmatter.date.toISOString()))
			posts.push({ uri: `${year}/${post}`, frontmatter, slug, dateNice })
		}
	}

	return posts
}

export async function getNotes({
	config,
	options,
}: {
	config: Config
	options: Options
}) {
	const posts = []
	for (const year of await fs
		.readdir(path.join(config.contentDir, 'notes'))
		.catch((err) => {
			if (err.code !== 'ENOENT') throw err
			return []
		})) {
		if (year === 'drafts') continue

		for (const post of await fs.readdir(path.join(config.contentDir, 'notes', year))) {
			const inputFile = await getInputFile(
				path.join(config.contentDir, 'notes', year),
				post.replace(/\.md$/, ''),
			)
			let markdown = await fs.readFile(inputFile, 'utf-8')
			const { html, frontmatter } = (() => {
				let frontmatter = {}
				markdown = markdown.replace(/^\+\+\+$(.*)\+\+\+$/ms, (_, toml) => {
					frontmatter = TOML.parse(toml)
					return ''
				})

				return {
					html: globalThis.MarkdownItInstance.render(markdown),
					frontmatter: config.validateFrontmatter(
						config,
						inputFile,
						frontmatter,
						/** @type {ContentForm} */ '',
					),
				}
			})()
			const slug = path.basename(transformUri(config, inputFile)).replace(/\.md$/, '')
			const dateNice = formattedDate(new Date(frontmatter.date.toISOString()))
			posts.push({ uri: `${year}/${post}`, frontmatter, slug, dateNice })
		}
	}

	return posts
}

function formattedDate(date: Date) {
	const year = date.getUTCFullYear()
	const month = date.toLocaleDateString('en-US', { month: '2-digit' })
	const day = date.toLocaleDateString('en-US', { day: '2-digit' })
	return `${year}.${month}.${day}`
}

async function getInputFile(dir: string, dirname: string) {
	try {
		const htmlFile = path.join(dir, `${dirname}.html`)
		await fs.stat(htmlFile)
		return htmlFile
	} catch (err) {
		if (err.code !== 'ENOENT') throw err
	}

	try {
		const mdFile = path.join(dir, `${dirname}.md`)
		await fs.stat(mdFile)
		return mdFile
	} catch (err) {
		if (err.code !== 'ENOENT') throw err
	}

	throw new Error(
		`No content files (with the correct filename) found at ${path.join(dir, `${dirname}.md`)}`,
	)
}
