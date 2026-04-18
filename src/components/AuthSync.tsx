'use client'

import { useEffect } from 'react'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { useStore } from '@/lib/store'

export function AuthSync() {
  const setUser = useStore((state) => state.setUser)

  useEffect(() => {
    const supabase = createClient()

    const syncUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.email) return

      setUser({
        id: user.id,
        name: user.user_metadata?.name || user.user_metadata?.full_name || user.email.split('@')[0],
        email: user.email,
      })
    }

    syncUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      const user = session?.user
      if (!user?.email) return

      setUser({
        id: user.id,
        name: user.user_metadata?.name || user.user_metadata?.full_name || user.email.split('@')[0],
        email: user.email,
      })
    })

    return () => subscription.unsubscribe()
  }, [setUser])

  return null
}
