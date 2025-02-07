"use client";
import SingleForm from "@/components/SingleForm";
import { Input } from "@/components/ui/input";
import React, { useRef, useTransition } from "react";
import EmptyFormsList from "./EmptyFormsList";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Loader, Search, XCircleIcon } from "lucide-react";
import { Button } from "./ui/button";

interface myFormsProps {
  forms?: FormResponseProps[];
}
interface FormResponseProps {
  id: string;
  updatedAt: Date;
  title: string;
  description: string;
  buttonText: string;
  formConfig: [];
  viewCount: number;
  _count: Record<"submissions", number>;
}
const MyForms = ({ forms }: myFormsProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isSearching, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const s = searchParams.get("search")?.toString() || "";
  const handleSearch = useDebouncedCallback((query: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }
      replace(`${pathname}?${params.toString()}`);
    });
  }, 0);
  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      handleSearch("");
    }
  };

  if (!s && (!forms || forms.length === 0)) {
    return <EmptyFormsList />;
  }

  return (
    <>
      <div className="search flex mt-8 gap-1 flex-col">
        <p className="text-muted-foreground text-[14px] font-[500]">
          Search for a form
        </p>
        <div className="flex w-full rounded-md border border-input bg-transparent px-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent  items-center">
          {!isSearching ? (
            <Search className="text-muted-foreground size-4" />
          ) : (
            <Loader className=" animate-spin size-4 text-muted-foreground" />
          )}
          <Input
            ref={inputRef}
            placeholder="Customer complaint form"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            className="flex-1 shadow-none border-none focus:outline-none focus-visible:ring-0 focus:border-none"
            defaultValue={s}
          />
          {s && (
            <Button
              className="size-4"
              onClick={handleClearInput}
              variant={"ghost"}
              size={"icon"}
            >
              <XCircleIcon className="size-5 text-muted-foreground" />
            </Button>
          )}
        </div>
      </div>
      <div className="forms mt-4">
        {forms?.map((f) => (
          <SingleForm
            id={f.id}
            viewCount={f.viewCount}
            key={f.id}
            submissionsCount={f._count.submissions}
            title={f.title}
            updatedAt={f.updatedAt.toDateString()}
          />
        ))}
        {s && forms?.length == 0 && (
          <p className="text-subtle text-[14px] font-[500]">No matching forms found</p>
        )}
      </div>
    </>
  );
};

export default MyForms;
