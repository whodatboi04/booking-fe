import { Input } from "@heroui/react";
import { CiSearch } from "react-icons/ci";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const search = ({ value, onChange }: Props) => {
  return (
    <div>
      <Input
        isClearable
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-sm",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "cursor-text!",
          ],
        }}
        label="Search"
        placeholder="Type to search..."
        radius="sm"
        size="sm"
        value={value}
        onValueChange={onChange}
        startContent={<CiSearch />}
      />
    </div>
  );
};

export default search;
