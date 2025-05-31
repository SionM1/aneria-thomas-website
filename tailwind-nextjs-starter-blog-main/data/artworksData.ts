export interface Artwork {
  slug: string
  title: string
  medium: string
  size: string
  description: string
  imagePath: string
  year?: number
  price?: string
  available?: boolean
}

export const artworksData: Artwork[] = [
  {
    slug: 'CynffonYTan',
    title: 'Cynffon Y Tân',
    medium: 'Oil on Canvas',
    size: '45 x 75 cm',
    description: 'A vibrant exploration of color and light capturing the ethereal beauty of a summer sunset.',
    imagePath: '/static/images/gallery/CynffonYTan.jpeg',
    year: 2023,
    available: true
  },
  {
    slug: 'Duckie',
    title: 'Duckie',
    medium: 'Original painting in oil on canvas.',
    size: '31 x 92 cm',
    description: 'Contemporary cityscape reflecting the dynamic energy of modern urban life.',
    imagePath: '/static/images/gallery/Duckie.jpeg',
    year: 2023,
    available: false
  },
  {
    slug: 'MappingtheChangingColours',
    title: 'Mapping the Changing Colours',
    medium: 'Original painting in oil on canvas.',
    size: '45 x 75 cm',
    description: 'Delicate watercolor study capturing the quiet serenity of dawn breaking through forest mist.',
    imagePath: '/static/images/gallery/MappingtheChangingColours.jpeg',
    year: 2022,
    available: true
  },
  {
    slug: 'SlugTrail',
    title: 'Slug Trail',
    medium: 'Original painting in oil on canvas.',
    size: '25 x 81 cm',
    description: 'Delicate watercolor study capturing the quiet serenity of dawn breaking through forest mist.',
    imagePath: '/static/images/gallery/SlugTrail.jpeg',
    year: 2022,
    available: true
  },
  {
    slug: 'WiltedOrchidNo.1',
    title: 'Wilted Orchid No.1',
    medium: 'Original painting in oil on canvas.',
    size: '41 x 81 cm',
    description: 'Delicate watercolor study capturing the quiet serenity of dawn breaking through forest mist.',
    imagePath: '/static/images/gallery/WiltedOrchidNo.1.jpeg',
    year: 2022,
    available: true
  },
  {
    slug: 'WiltedOrchidNo.2',
    title: 'Wilted Orchid No.2',
    medium: 'Original painting in oil on canvas.',
    size: '41 x 81 cm',
    description: 'Delicate watercolor study capturing the quiet serenity of dawn breaking through forest mist.',
    imagePath: '/static/images/gallery/WiltedOrchidNo.2.jpeg',
    year: 2022,
    available: true
  }
]

export function getAllArtworks(): Artwork[] {
  return artworksData
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworksData.find((artwork) => artwork.slug === slug)
}