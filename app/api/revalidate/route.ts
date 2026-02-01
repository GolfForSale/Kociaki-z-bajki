import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Secret token to verify the webhook is from Sanity
const REVALIDATION_SECRET = process.env.SANITY_REVALIDATE_SECRET

export async function POST(request: NextRequest) {
  try {
    // Verify secret token
    const token = request.nextUrl.searchParams.get('secret')
    
    if (token !== REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret token' },
        { status: 401 }
      )
    }

    // Get the webhook body from Sanity
    const body = await request.json()
    
    // Sanity sends the document type that was changed
    const { _type, slug } = body
    
    // Revalidate based on content type
    switch (_type) {
      case 'siteSettings':
      case 'aboutBreed':
      case 'aboutUs':
      case 'galleryImage':
      case 'litter':
      case 'kitten':
        // These affect the main page
        revalidatePath('/')
        break
      case 'cat':
        // Revalidate main page and specific cat page
        revalidatePath('/')
        if (slug?.current) {
          revalidatePath(`/kot/${slug.current}`)
        }
        break
      default:
        // Revalidate everything for unknown types
        revalidatePath('/', 'layout')
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: _type,
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}
