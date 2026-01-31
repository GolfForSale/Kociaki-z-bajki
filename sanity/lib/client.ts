import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn, isSanityConfigured } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
})

// Safe fetch that returns null/empty when Sanity is not configured
export async function safeFetch<T>(query: string, params?: Record<string, string>): Promise<T | null> {
  if (!isSanityConfigured) {
    return null
  }
  try {
    if (params) {
      return await client.fetch<T>(query, params)
    }
    return await client.fetch<T>(query)
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return null
  }
}
