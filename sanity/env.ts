export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
// Use a placeholder for build time if not configured
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'

export const useCdn = false

// Check if Sanity is properly configured
export const isSanityConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder'
