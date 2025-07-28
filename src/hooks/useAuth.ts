'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Redirects to /login if not authenticated, or to the correct feed
 * if they land on the wrong role’s page.
 * @param requiredRole — if present, enforces that role ('sun' or 'moon')
 */
export function useAuth(requiredRole?: 'sun' | 'moon') {
  const router = useRouter()

  useEffect(() => {
    const authed = localStorage.getItem('authenticated') === 'true'
    const role = localStorage.getItem('userRole')  // expected 'sun' or 'moon'

    if (!authed) {
      // Not logged in → send to login
      router.replace('/login')
    } else if (requiredRole && role !== requiredRole) {
      // Logged in but on the wrong feed → send to their own page
      router.replace(role === 'sun' ? '/sun' : '/moon')
    }
    // otherwise: authenticated & on correct page → do nothing
  }, [requiredRole, router])
}
