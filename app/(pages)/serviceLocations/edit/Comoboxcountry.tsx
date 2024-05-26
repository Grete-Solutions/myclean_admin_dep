"use client"
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CountriesIsoData, CountryDataType } from "../countryisocode";

interface ComboboxFormProps {
  onCountrySelect: (countryISOCode: string) => void;
  selectedCountryISOCode: string; // New prop to hold the selected country ISO code
}

export function ComboboxForm({ onCountrySelect, selectedCountryISOCode }: ComboboxFormProps) {
  const [open, setOpen] = React.useState(false);
  const selectedCountry = CountriesIsoData.find((country) => country.code === selectedCountryISOCode);

  const handleCountrySelect = (countryISOCode: string) => {
    onCountrySelect(countryISOCode); // Call the callback function with the ISO code of the selected country
    setOpen(false);
  };

  return (
    <div className="flex items-center z-[9999] space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedCountry ? <>{selectedCountry.name}</> : <>Set Country</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 z-[99999]" side="top" align="start">
          <Command>
            <CommandInput placeholder="Choose Country..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {CountriesIsoData.map((country) => (
                  <CommandItem
                    key={country.name}
                    value={country.code}
                    onSelect={(code) => handleCountrySelect(code)}
                  >
                    {country.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
