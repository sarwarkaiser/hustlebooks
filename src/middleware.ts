import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Demo mode - no authentication required
export function middleware(request: NextRequest) {
  // Allow all requests in demo mode
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\.[\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
