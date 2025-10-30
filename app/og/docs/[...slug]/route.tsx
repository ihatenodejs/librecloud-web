import { getPageImage, source } from "@/docs/lib/source"
import { generate as DefaultImage } from "fumadocs-ui/og"
import { notFound } from "next/navigation"
import { ImageResponse } from "next/og"

export const revalidate = false

type OgRouteContext = {
  params: Promise<{
    slug: string[]
  }>
}

export async function GET(_req: Request, { params }: OgRouteContext) {
  const { slug } = await params
  if (!slug?.length) notFound()

  const page = source.getPage(slug.slice(0, -1))
  if (!page) notFound()

  return new ImageResponse(
    (
      <DefaultImage
        title={page.data.title}
        description={page.data.description}
        site="LibreCloud Docs"
      />
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }))
}
