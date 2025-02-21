import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import qs from "qs";
import { useCategoryStore } from "@/store/category";
import { useAnchorStore } from "@/store/anchor";

export interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export interface FiltersType {
  selectedIds: Set<string>;
  prices: PriceProps;
  sizes: Set<string>;
  pizzaType: Set<string>;
}

export function useFilters(filters: FiltersType) {
  const isMounted = useRef<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const { anchor } = useAnchorStore();

  const isRoot = pathname === "/";

  useEffect(() => {
    if (isMounted.current && isRoot) {
      const params = {
        ...filters.prices,
        selectedIds: Array.from(filters.selectedIds),
        sizes: Array.from(filters.sizes),
        pizzaType: Array.from(filters.pizzaType),
      };

      const query = qs.stringify(params, { arrayFormat: "comma" });

      router.push(`?${query}#${anchor}`);
    }

    isMounted.current = true;
  }, [filters, anchor]);
}
