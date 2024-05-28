import { ComponentProps, forwardRef } from 'react'
import { Text as NativeText, Platform, Linking, TextStyle } from 'react-native'
import { styled, StyledProps } from 'nativewind'

export const Text = styled(NativeText)

/**
 * This is a more advanced component with custom styles and per-platform functionality
 */
export interface AProps extends ComponentProps<typeof Text> {
  href?: string
  target?: '_blank'
  onPress?: (_event: any) => void
  style?: TextStyle
  className?: string
  ref?: any
  children?: React.ReactNode
  hrefAttrs?: {
    rel?: string
    target?: string
  }
}

export const A = forwardRef<NativeText, StyledProps<AProps>>(function A(
  { className = '', href, target, ...props },
  ref,
) {
  const nativeAProps = Platform.select<Partial<AProps>>({
    web: {
      href,
      target,
      hrefAttrs: {
        rel: 'noreferrer',
        target,
      },
    },
    default: {
      onPress: (event) => {
        props.onPress && props.onPress(event)
        if (Platform.OS !== 'web' && href !== undefined) {
          Linking.openURL(href)
        }
      },
    },
  })

  return (
    <Text
      role="link"
      className={`text-blue-500 hover:underline ${className}`}
      {...props}
      {...nativeAProps}
      ref={ref}
    />
  )
})
