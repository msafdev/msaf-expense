"use client";

// Actions
import { addTransaction } from "@/utils/actions/addTransaction";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "./input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Icons
import { Plus } from "lucide-react";

const ModalButton = () => {
  return (
    <Drawer>
      <DrawerTrigger className="w-full justify-center md:w-fit h-9 px-4 py-1 rounded-md flex items-center gap-x-2 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
        <Plus size={16} />
        <span>Add</span>
      </DrawerTrigger>
      <DrawerContent className="border-border flex flex-col items-center h-full md:h-fit">
        <DrawerHeader className="max-w-sm w-full mt-auto">
          <DrawerTitle>Add a new transaction</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="max-w-sm w-full pt-0 mt-0 mb-auto">
          <form
            action={addTransaction}
            className="w-full flex flex-col gap-y-3"
          >
            <div className="flex items-center gap-x-2">
              <Input
                className="w-full text-lg placeholder:text-lg"
                name="amount"
                id="amount"
                type="number"
                placeholder="0"
              />
              <Select name="tag_id">
                <SelectTrigger className="w-fit p-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 anim" />
                <SelectContent className="border-border">
                  <SelectItem value="1">🚗 Transport</SelectItem>
                  <SelectItem value="2">💰 Salary</SelectItem>
                  <SelectItem value="3">🪙 Crypto</SelectItem>
                  <SelectItem value="4">🏦 Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DrawerClose>
              <Button type="submit">Submit</Button>
            </DrawerClose>
          </form>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export { ModalButton };
