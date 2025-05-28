import Image from './Image'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import Pre from './Pre'
import BlogNewsletterForm from './BlogNewsletterForm'
import ParallaxReveal from './ParallaxReveal'
import ParallaxRevealAdvanced from './ParallaxRevealAdvanced'
import type { MDXComponents } from 'mdx/types'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  ParallaxReveal,
  ParallaxRevealAdvanced,
  BlogNewsletterForm,
}
