// override react-native types with react-native-web types
import 'react-native'

declare module 'react-native' {
  export interface PressableStateCallbackType {
    hovered?: boolean
    focused?: boolean
  }
  export interface ViewStyle {
    transitionProperty?: string
    transitionDuration?: string
  }
  export interface TextProps {
    accessibilityComponentType?: never
    accessibilityTraits?: never
    accessibilityLevel?: number
    href?: string
    hrefAttrs?: {
      rel: 'noreferrer'
      target?: '_blank'
    }
  }
  export interface ViewProps {
    role?: string
    href?: string
    hrefAttrs?: {
      rel: 'noreferrer'
      target?: '_blank'
    }
    onClick?: () => void
  }
}
