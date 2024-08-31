"use client";

import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickAway, useDebounce } from "react-use";
import { Product } from "@prisma/client";
import Link from "next/link";
import { Api } from "@/services/api-client";
import {X} from 'lucide-react'

interface SearchInputProps {
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ className }) => {
  const [focused, setFocused] = React.useState<boolean>(false);
  const ref = React.useRef<null | HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [products, setProducts] = React.useState<Product[]>([]);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        const response = await Api.products.seacrh(searchQuery);
        setProducts(response);
      } catch (e) {
        console.log(e);
      }
    },
    250,
    [searchQuery]
  );

  const onClickProduct=()=>{
    setFocused(false)
    setSearchQuery('')
    setProducts([])
  }

  const onClickRemove=()=>{
    setSearchQuery('')
  }

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
      )}
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1  justify-between relative h-11 z-30",
          className
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3" />
        <input
          value={searchQuery}
          type="text"
          placeholder="Найти пиццу..."
          className="outline-none w-full bg-gray-100 rounded-2xl pl-10"
          onFocus={() => setFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery &&  
        <X className="absolute top-1/2 translate-y-[-50%] right-2 opacity-50 cursor-pointer" onClick={onClickRemove}/>        
        
        }
        {
            products?.length>0 &&(
              <div
              className={cn(
                "absolute w-full bg-white rounded-l-2xl top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30 h-[200px] overflow-y-auto scrollbar",
                focused && "visible opacity-100 top-12"
              )}
            >
              {products.map((product) => (
                <Link
                href={`/product/${product.id}`}
                className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10 w-hull"
                onClick={() =>onClickProduct() }
                >
                  <img  className="h-12 w-12" src={product.imageUrl} alt={product.name}/>
                  <span>{product.name}</span>
                </Link>
              ))}
            </div>
            )
          }
        
      </div>
    </>
  );
};
