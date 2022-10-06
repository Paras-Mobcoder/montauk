import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { Stack } from "@mui/system";
import { getAllItems, getBySearch } from "../API/Services/Services";
import { DebounceInput } from 'react-debounce-input';
import CircularProgress from '@mui/material/CircularProgress';
import RowData from "./RowData";

interface FoodList {
  brandOwner: string;
  dataType: string;
  description: string;
  fdcId: number;
  gtinUpc: number;
}

export function FoodList() {
  const [pageNo, setPageNo] = useState<number>(1);
  const [foodlist, setFoodList] = useState<FoodList[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [Loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getFoodItem(pageNo);
  }, [pageNo, searchInput]);

  const handleSearch = (data: string) => {
    setPageNo(1);
    setSearchInput(data)
  }

  const getFoodItem = async (prop: number) => {
    if (searchInput.length > 0) {
      let payload = {
        pageNo: prop,
        input: `${searchInput}`,
      };
      await getBySearch(payload).then((res) => {
        console.log("res in getBySearch",res);
        if (res.data.foods.length > 0) {
          setLoading(false)
          console.log("res",res)
          setFoodList(res.data.foods);
        }
        else {
          setLoading(false)
          setFoodList([]);
        }
      });
    } else {
      await getAllItems(prop).then((res) => {
        if (res.data.length > 0) {
          setLoading(false)
          setFoodList(res.data);
        }
      });
    }
  };
  const onPageChange = (event:any, value: number) => {
    setPageNo(value);
  };

  if (Loading) {
    return (
      <CircularProgress className="mt-4"/>
    )
  }

  return (
    <>
      <div className="flex flex-row justify-center items-center bg-[#EDECFA] mb-4">
        <h2 className="italic font-bold text-xl py-12">List of Food Items</h2>
      </div>
      <DebounceInput id="standard-basic" className="text-center" placeholder="Search Food Item" type="text" debounceTimeout={500} variant="standard" onChange={(data) => handleSearch(data.target.value)} autoFocus />
      {/* <div className="mx-auto">
        <DebounceInput id="standard-basic" className="text-center" placeholder="Search Food Item" type="text" debounceTimeout={300} variant="standard" onChange={(data) => handleSearch(data.target.value)} autoFocus />
      </div> */}
      {foodlist?.length && !Loading ?
        <>
          <RowData rows={foodlist} searchInput={searchInput} />
          <Stack className="py-4" spacing={2}>
            <Pagination className="mx-auto" count={10} onChange={onPageChange} color="primary" />
          </Stack> </>
        : <div>No Data Found</div>}
    </>
  );
}
