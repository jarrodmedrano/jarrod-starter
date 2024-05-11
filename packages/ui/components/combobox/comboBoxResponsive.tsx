import { useState } from 'react'
import { Button } from '../ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
export function ComboBoxResponsive({ page }: { page: any }) {
  const [open, setOpen] = useState(false)
  const isDesktop = true
  const [selectedStatus, setSelectedItem] = useState<any | null>(null)

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <ComboList
            page={page}
            setOpen={setOpen}
            setSelectedItem={setSelectedItem}
          />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <ComboList
            page={page}
            setOpen={setOpen}
            setSelectedItem={setSelectedItem}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function ComboList({
  page,
  setOpen,
  setSelectedItem,
}: {
  page: any
  setOpen: (_open: boolean) => void
  setSelectedItem: (_status: string | null) => void
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
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
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
