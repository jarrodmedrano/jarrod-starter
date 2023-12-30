import { SafeArea } from './safe-area'
import { Providers } from '../theme';

export function Provider({ children }: { children: React.ReactNode }) {
  return <SafeArea><Providers>{children}</Providers></SafeArea>
}
