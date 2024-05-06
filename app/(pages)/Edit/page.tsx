import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from '@/components/ui/checkbox';
import { AccordionItemData, accordionItems } from './AccordionItem';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type Props = {};

function EditPage({}: Props) {
    return (
        <>
       <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="Name" className="text-left">
                Name
                </Label>
                <Input id="Name" placeholder=' Name' className="col-span-3" />
              </div>
        <Accordion type="single" collapsible className="w-full">
            {accordionItems.map((item: AccordionItemData) => (
                <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger>{item.triggerText}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion></>
    );
}

export default EditPage;
