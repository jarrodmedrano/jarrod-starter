import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'

export const ComboList = ({
  page,
  setOpen,
  setSelectedItem,
  items,
}: {
  page: any
  setOpen: (_open: boolean) => void
  setSelectedItem: (_status: string | null) => void
  items?: {
    name: string
    label: string
    Icon: React.ElementType
    variant?: string
    href: string
    onSelect: (_name: string) => void
  }[]
}) => {
  return (
    <Command>
      <CommandInput placeholder={`${page.title}...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {page?.children?.map((child: any) => (
            <CommandItem
              key={child.name}
              value={child.name}
              onSelect={(value) => {
                setSelectedItem(
                  page?.children.find(() => child.name === value) || null,
                )
                setOpen(false)
              }}
            >
              {child.label}
            </CommandItem>
          ))}

          {items?.map((item) => {
            const { Icon } = item

            return (
              <CommandItem
                key={item.name}
                value={item.name}
                onSelect={(value) => {
                  setOpen(false)
                  item.onSelect(value)
                }}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
