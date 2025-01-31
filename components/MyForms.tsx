"use client";
import SingleForm from "@/components/SingleForm";
import { Input } from "@/components/ui/input";
import { useGetForms } from "@/hooks/useGetForms";
import React from "react";
import EmptyFormsList from "./EmptyFormsList";
import { useRouter, useSearchParams } from "next/navigation";
import { FormSkeletonLoader } from "./FormSkeletonLoader";

const MyForms = () => {
  const { data: forms, isPending } = useGetForms();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";
  const [search, setSearch] = React.useState(searchQuery);
  React.useEffect(() => {
    const newParams = new URLSearchParams();
    if (search) newParams.set("search", search);
    else newParams.delete("search");
    router.replace(`?${newParams.toString()}`, { scroll: false });
  }, [search]);

  if (isPending) {
    return <FormSkeletonLoader/>;
  }
  if (!forms || forms.length === 0) {
    return <EmptyFormsList />;
  }
  const filteredForms = forms.filter((f) =>
    f.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className="search flex mt-8 gap-1 flex-col">
        <p className="text-muted-foreground text-[14px] font-[500]">
          Search for a form
        </p>
        <Input
          placeholder="Customer complaint form"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="forms mt-4">
        {filteredForms.length > 0 ? (
          filteredForms.map((f) => (
            <SingleForm
              id={f.id}
              key={f.id}
              submissionsCount={f._count.submissions}
              title={f.title}
              updatedAt={f.updatedAt}
            />
          ))
        ) : (
          <div>
            <p className="text-subtle font-[500]">No matching forms found.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MyForms;
