import { MetadataRoute } from 'next'
import { servicesData, type ServiceId } from '@/lib/services-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mastechcooling.com'

  // Main pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ]

  // Service pages
  const serviceIds = Object.keys(servicesData) as ServiceId[]
  const serviceRoutes = serviceIds.map((serviceId) => ({
    url: `${baseUrl}/services/${serviceId}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...routes, ...serviceRoutes]
}