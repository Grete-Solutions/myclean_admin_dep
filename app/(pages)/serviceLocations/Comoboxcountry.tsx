"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Countrydata,CountryDataType } from "@/app/components/countryConstants"

export function ComboboxForm() {
  const [open, setOpen] = React.useState(false)
  const [selectedCountry, setSelectedCountry] = React.useState<CountryDataType | null>(
    null
  )

  return (
    <div className="flex items-center z-[9999] space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedCountry ? <>{selectedCountry.Name}</> : <> Set Country</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 z-[99999]" side="top" align="start">
          <Command>
            <CommandInput placeholder="Choose Country..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {Countrydata.map((status) => (
                  <CommandItem
                    key={status.id}
                    value={status.id}
                    onSelect={(id) => {
                      setSelectedCountry(
                        Countrydata.find((priority) => priority.id === id) ||
                          null
                      )
                      setOpen(false)
                    }}
                  >
                    {status.Name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
